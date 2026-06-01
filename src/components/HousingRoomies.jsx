import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HousingRoomies.css";

import { getRoomiesByHousingId } from "../lib/housingRoomies";

export default function HousingRoomies({ housingId, roomies }) {
  const navigate = useNavigate();

  const [loadedRoomies, setLoadedRoomies] = useState(null);
  const [error, setError] = useState(null);

  const hasPropRoomies = Array.isArray(roomies) && roomies.length > 0;

  // Hent roomies og håndter fejl/loading
  useEffect(() => {
    let cancelled = false;

    if (hasPropRoomies) return;
    if (!Number.isFinite(housingId)) return;

    async function run() {
      try {
        setError(null);
        const data = await getRoomiesByHousingId(housingId);
        if (cancelled) return;
        setLoadedRoomies(data);
      } catch (e) {
        if (cancelled) return;
        setError(e?.message ?? "Kunne ikke hente roomies.");
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [housingId, hasPropRoomies]);

  const list = useMemo(() => {
    const src = hasPropRoomies ? roomies : loadedRoomies;
    return Array.isArray(src) ? src : [];
  }, [hasPropRoomies, roomies, loadedRoomies]);

  // Tjek om profile_id 14 findes blandt roomies
  const hasProfile14 = list.some((r) => Number(r.profile_id ?? r.id) === 14);

  if (error) return <div style={{ color: "crimson" }}>{error}</div>;
  if (!list || list.length === 0) return null;

  return (
    <div className="housing-roomies">
      <div className="housing-roomies-list">
        {list.map((r) => {
          const id = r.profile_id ?? r.id;

          // Hent første billede i images-arrayet
          const avatar = Array.isArray(r.images) ? r.images[0] : null;

          return (
            <div key={id} className="housing-roomie-row">
              <div className="housing-roomie-left">
                {avatar ? (
                  <img
                    className="housing-roomie-avatar"
                    src={avatar}
                    alt={r.name ?? "Roomie"}
                    loading="lazy"
                  />
                ) : (
                  <div
                    className="housing-roomie-avatar housing-roomie-avatar--placeholder"
                    aria-hidden="true"
                  />
                )}

                <div className="housing-roomie-meta">
                  <div className="housing-roomie-name">
                    <h4>{r.name}</h4>
                  </div>
                  <div className="housing-roomie-sub text-small">
                    {/* Vis alder og occupation */}
                    {Number.isFinite(Number(r.age))
                      ? `${Number(r.age)} år`
                      : null}
                    {r.occupation ? ` • ${r.occupation}` : null}
                  </div>
                </div>
              </div>

              {/* Skjul 'Se profil'-knap for profile_id 14 */}
              {Number(id) !== 14 && (
                <button
                  className="housing-roomie-profile-btn"
                  type="button"
                  onClick={() => navigate(`/profiles/${id}`)}
                >
                  <h5>Se profil</h5>
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Vis nederste knap afhængig af om profile_id 14 findes */}
      {hasProfile14 ? (
        <button
          className="housing-roomie-profile-btn"
          type="button"
          onClick={() => {
            const first = list.find((r) => Number(r.profile_id ?? r.id) === 14);
            const firstId = first?.profile_id ?? first?.id;
            if (firstId) navigate(`/profiles/${firstId}`);
          }}
        >
          <h5>Se profil</h5>
        </button>
      ) : (
        <button
          className="housing-roomies-message-btn"
          type="button"
          onClick={() => {
            const first = list[0];
            const firstId = first?.profile_id ?? first?.id;
            if (firstId) navigate(`/chat/${firstId}`);
            else navigate("/chat");
          }}
        >
          <h5>Send besked</h5>
        </button>
      )}
    </div>
  );
}
