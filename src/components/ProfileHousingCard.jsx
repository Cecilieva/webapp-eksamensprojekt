/**
 * ProfileHousingCard
 * - Viser et bolig-kort på profilsiden for den bolig profilen er tilknyttet.
 * - Henter selv data via getHousingCardForProfile(profileId) (housing_roomies -> housing_listings).
 * - Skjuler sig selv hvis der ikke findes en boligrelation (housingCard === null).
 * - Viser title + (rent/rooms/square_meters) og kalder onPreview(housingCard) ved klik.
 */

import { useEffect, useRef, useState } from "react";
import { getHousingCardForProfile } from "../lib/housing";
import "./ProfileHousingCard.css";

// Formatterer tal (rent/m²) til dansk tusindtalsformat
function formatNumber(value) {
  if (value === null || value === undefined || value === "") return "";
  const asNumber = Number(value);
  if (Number.isNaN(asNumber)) return "";
  return new Intl.NumberFormat("da-DK").format(asNumber);
}

export default function ProfileHousingCard({ profileId, onPreview }) {
  // Lokal state: data til kortet (null => ingen bolig eller ikke hentet endnu)
  const [housingCard, setHousingCard] = useState(null);

  // Track tidligere profileId så vi kan nulstille card ved profilskift
  const prevProfileIdRef = useRef(profileId);

  useEffect(() => {
    // Nulstil kortet hvis vi skifter profil
    if (prevProfileIdRef.current !== profileId) {
      prevProfileIdRef.current = profileId;
      setHousingCard(null);
    }

    // Ingen profil => ingen fetch
    if (!profileId) return;

    // Guard mod state update hvis komponenten unmountes under fetch
    let cancelled = false;

    // Hent boligdata (housing_roomies -> housing_listings)
    async function load() {
      const data = await getHousingCardForProfile(profileId);
      if (!cancelled) setHousingCard(data);
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [profileId]);

  // Hvis der ikke findes en boligrelation for profilen, rendrer vi ingenting
  if (!housingCard) return null;

  // Sammensæt “meta”-linjen (vis kun værdier der findes)
  const meta = [
    housingCard.rent != null ? `${formatNumber(housingCard.rent)} kr.` : null,
    housingCard.rooms != null ? `${housingCard.rooms} vær.` : null,
    housingCard.square_meters != null
      ? `${formatNumber(housingCard.square_meters)} m²`
      : null,
  ].filter(Boolean);

  return (
    <section className="profile-housing-section" aria-label="Dit boligopslag">
      <div className="profile-housing-card">
        {/* Billede (fallback hvis der mangler URL) */}
        <img
          className="profile-housing-image"
          src={housingCard.image || "/apartment.jpg"}
          alt="Bolig"
          loading="lazy"
        />

        <div className="profile-housing-body">
          {/* Titel */}
          <p className="profile-housing-card-title">{housingCard.title}</p>

          {/* Fakta (rent/rooms/m²) */}
          {meta.length > 0 ? (
            <div className="profile-housing-meta" aria-label="Bolig fakta">
              {meta.map((item, index) => (
                <h5
                  key={`${item}-${index}`}
                  className="profile-housing-metaItem"
                >
                  {item}
                </h5>
              ))}
            </div>
          ) : null}

          {/* CTA: send housingCard tilbage til parent */}
          <button
            type="button"
            className="profile-housing-previewButton"
            onClick={() => onPreview?.(housingCard)}
          >
            <h5>Se boligopslag</h5>
          </button>
        </div>
      </div>
    </section>
  );
}
