import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HousingDetailCard.css";

// Importer nødvendige funktioner og komponenter
import {
  getHousingById,
  getHousingIdByProfileId,
  updateHousing,
} from "../lib/housing";

import HousingImageCarousel from "./HousingImageCarousel";
import HousingSection from "./HousingSection";
import HousingInfoScroller from "./HousingInfoScroller";
import HousingDescription from "./HousingDescription";
import HousingFacilities from "./HousingFacilities";
import HousingRoomies from "./HousingRoomies";
import HousingInfoRow from "./HousingInfoRow";
import ProfileIcon from "./ProfileIcon";
import EditIconButton from "./EditIconButton";

import backButton from "../assets/back-button-icon.svg";

// Hovedkomponent for boligdetaljer
export default function HousingDetailCard({
  profileId,
  /*  score,
  canEdit = false,*/
  showBackButton = true,
  canEdit = false,
}) {
  const navigate = useNavigate();

  // State til boligdata, loading og fejl
  const [housing, setHousing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* Holder styr på hvilket felt der redigeres */
  const [editing, setEditing] = useState(null);

  /* Midlertidig edit værdi */
  const [editValue, setEditValue] = useState("");

  /* Starter redigering af et specifikt felt */
  function startEdit(field, value) {
    if (!canEdit) return;
    setEditing(field);
    setEditValue(value ?? "");
  }

  /* Lukker edit mode */
  function cancelEdit() {
    setEditing(null);
    setEditValue("");
  }

  /* Gemmer enkelt felt til databasen */
  async function saveField(field) {
    if (!housing?.id) return;

    const updatedHousing = await updateHousing(housing.id, {
      [field]: editValue,
    });

    setHousing(updatedHousing);
    cancelEdit();
  }

  // Hent boligdata baseret på profileId
  useEffect(() => {
    let cancelled = false;

    if (!Number.isFinite(profileId)) return;

    async function run() {
      try {
        setLoading(true);
        setError(null);

        // Find housingId ud fra profileId
        const housingId = await getHousingIdByProfileId(profileId);
        if (cancelled) return;

        // Hent boligdata
        const data = await getHousingById(housingId);
        if (cancelled) return;

        setHousing(data);
      } catch (e) {
        if (cancelled) return;
        setError(e?.message ?? "Kunne ikke hente bolig.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [profileId]);

  // Håndter forskellige loading/error states
  if (!Number.isFinite(profileId)) return <div>Ugyldigt profile-id.</div>;
  if (loading) return <div>Indlæser bolig...</div>;
  if (error) return <div style={{ color: "crimson" }}>{error}</div>;
  if (!housing) return <div>Bolig ikke fundet.</div>;

  // Robust: nogle gange bliver data mappet/nestet anderledes.
  const seekingRoomiesValue =
    housing?.seeking_roomies ??
    housing?.listing?.seeking_roomies ??
    housing?.housing_listings?.seeking_roomies ??
    null;

  // Udregn tekst for hvor mange roomies der søges
  const rawSeeking =
    typeof seekingRoomiesValue === "string"
      ? seekingRoomiesValue.trim()
      : seekingRoomiesValue;

  const seekingNum =
    rawSeeking === "" || rawSeeking === null || rawSeeking === undefined
      ? null
      : Number(rawSeeking);

  const seekingRoomiesText = Number.isFinite(seekingNum)
    ? `Søger ${seekingNum} roomie${seekingNum === 1 ? "" : "s"}`
    : "Søger roomie";

  return (
    <main className="housing-detail-card">
      {/* Hero billede og tilbage-knap */}
      <section className="housing-hero">
        {showBackButton && (
          <button className="back-button" onClick={() => navigate(-1)}>
            <img src={backButton} alt="Tilbage" />
          </button>
        )}

        <HousingImageCarousel
          images={housing.images}
          alt={housing.title}
          className="housing-image"
        />
      </section>

      <section className="housing-detail-content">
        <div className="housing-header">
          <div className="housing-title">
            {/* Titel med mulighed for redigering */}
            {editing === "title" ? (
              <h2 className="housing-title-text">
                <input
                  className="housing-title-input"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveField("title");
                    if (e.key === "Escape") cancelEdit();
                  }}
                  onBlur={() => saveField("title")}
                  autoFocus
                  aria-label="Redigér titel"
                />
              </h2>
            ) : (
              <h2 className="housing-title-text">{housing.title}</h2>
            )}

            <EditIconButton
              enabled={canEdit}
              editing={editing === "title"}
              onClick={
                editing === "title"
                  ? () => saveField("title")
                  : () => startEdit("title", housing.title)
              }
            />
          </div>
        </div>
        {/* Info-række: by */}
        <HousingInfoRow
          icon={<ProfileIcon name="city-icon.svg" />}
          field="city"
          value={housing.city}
          editing={editing}
          editValue={editValue}
          setEditValue={setEditValue}
          editable={canEdit}
          onEdit={() => startEdit("city", housing.city)}
          onSave={() => saveField("city")}
        />

        {/* Info-række: søger roomies */}
        <HousingInfoRow
          icon={<ProfileIcon name="caption-icon.svg" />}
          field="seeking_roomies"
          value={seekingRoomiesText}
          editing={editing}
          editValue={editValue}
          setEditValue={setEditValue}
          editable={canEdit}
          onEdit={() => startEdit("seeking_roomies", seekingRoomiesValue)}
          onSave={() => saveField("seeking_roomies")}
        />

        {/* Scroller med boligfelter */}
        <HousingSection>
          <HousingInfoScroller
            housing={housing}
            editable={canEdit}
            onSaveField={(field, value) => {
              // Normalisér number felter
              const numberFields = new Set([
                "square_meters",
                "rooms",
                "rent",
                "aconto",
                "deposit",
              ]);

              const updates = {
                [field]: numberFields.has(field) ? Number(value) : value,
              };

              return updateHousing(housing.id, updates).then((updated) => {
                setHousing(updated);
              });
            }}
          />
        </HousingSection>

        {/* Beskrivelse af lejligheden */}
        <HousingSection title="Om lejligheden">
          <HousingDescription
            text={housing.description}
            editable={canEdit}
            onSaveDescription={(nextText) =>
              updateHousing(housing.id, { description: nextText }).then(
                (updated) => {
                  setHousing(updated);
                },
              )
            }
          />
        </HousingSection>

        {/* Faciliteter */}
        <HousingSection title="Faciliteter">
          <HousingFacilities
            facilities={housing.facilities}
            editable={canEdit}
            onAdd={(value) => {
              const next = Array.from(
                new Set([...(housing.facilities || []), value]),
              );
              return updateHousing(housing.id, { facilities: next }).then(
                (updated) => {
                  setHousing(updated);
                },
              );
            }}
            onRemove={(value) => {
              const next = (housing.facilities || []).filter(
                (x) => x !== value,
              );
              return updateHousing(housing.id, { facilities: next }).then(
                (updated) => {
                  setHousing(updated);
                },
              );
            }}
          />
        </HousingSection>

        {/* Roomies */}
        <HousingSection title="Tilhørende roomies">
          <HousingRoomies housingId={housing.id} roomies={housing.roomies} />
        </HousingSection>
      </section>
    </main>
  );
}
