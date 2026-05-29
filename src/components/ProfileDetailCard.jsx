import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../lib/api";

import "./ProfileDetailCard.css";

import ProfileIcon from "./ProfileIcon";
import ProfileInfoRow from "./ProfileInfoRow";
import ProfileSection from "./ProfileSection";
import EditableTextCard from "./EditableTextCard";
import TagList from "./TagList";
import ActiveToggle from "./ActiveToggle";
import MatchButton from "./MatchButton";
import EditIconButton from "./EditIconButton";
import backButton from "../assets/back-button-icon.svg";
import ConnectionButton from "./ConnectionButton";
import LikeButton from "./LikeButton";
import ProfileImageCarousel from "./ProfileImageCarousel";

/* komponent til profil detalje kort */
export default function ProfileDetailCard({
  profileId,
  score,
  canEdit = false,
  showActiveToggle = false,
  showMatchButton = false,
  showBackButton = true,
  showConnectionButton = false,
  showLikeButton = false,
  liked = false,
  onToggleFavorite,
}) {
  /* state */
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(null);
  const [editValue, setEditValue] = useState("");

  /* læs profil */
  useEffect(() => {
    async function loadProfile() {
      const data = await getProfile(profileId);
      setProfile(data);
    }

    loadProfile();
  }, [profileId]);

  /* profil redigering */
  function startEdit(field, value) {
    if (!canEdit) return;

    setEditing(field);
    setEditValue(value || "");
  }

  function cancelEdit() {
    setEditing(null);
    setEditValue("");
  }

  function getThings() {
    if (Array.isArray(profile?.profile_description)) {
      return profile.profile_description;
    }

    return [];
  }

  /* gemmer ændringer */
  async function saveField(field) {
    const updatedProfile = await updateProfile(profileId, {
      [field]: editValue,
    });

    setProfile(updatedProfile);
    cancelEdit();
  }

  /* tilføj array element */
  async function addArrayItem(field, value) {
    const updated = [...(profile[field] || []), value];

    const updatedProfile = await updateProfile(profileId, {
      [field]: updated,
    });

    setProfile(updatedProfile);
  }

  /* fjern array element */
  async function removeArrayItem(field, value) {
    const updated = (profile[field] || []).filter((item) => item !== value);

    const updatedProfile = await updateProfile(profileId, {
      [field]: updated,
    });

    setProfile(updatedProfile);
  }

  /* opdatering af array element*/
  async function saveThing(index) {
    const things = [...getThings()];
    things[index] = editValue;

    const updatedProfile = await updateProfile(profileId, {
      profile_description: things,
    });

    setProfile(updatedProfile);
    cancelEdit();
  }

  /* render */
  if (!profile) return null;

  /* hero */
  const profileImage = profile.images?.[0] || "/default-profile.jpg";

  return (
    <main className="profile-page">
      <section className="profile-hero">
        {showBackButton && (
          <button className="back-button" onClick={() => navigate(-1)}>
            <img src={backButton} alt="Tilbage" />
          </button>
        )}

        {showLikeButton && (
          <LikeButton
            liked={liked}
            onToggle={() =>
              onToggleFavorite({
                id: profile.id,
                name: profile.name,
                age: profile.age,
                city: profile.city,
                image: profile.image,
                caption: profile.caption,
                occupation: profile.occupation,
                interests: profile.interests,
                score: score ?? profile.score,
              })
            }
            label="Gem profil"
            className="profile-detail-like-button"
          />
        )}

        <ProfileImageCarousel
          images={profile.images}
          fallback={profileImage}
          alt={profile.name}
          className="profile-image"
        />
      </section>

      {/* indhold */}
      <section className="profile-content">
        {/* header */}
        <div className="profile-header">
          <div className="profile-title">
            <h2>
              {profile.name}, {profile.age} år
            </h2>
            <ProfileIcon
              name="big-verified-icon.svg"
              className="verified-icon"
            />
          </div>

          {showActiveToggle && <ActiveToggle enabled />}
        </div>

        {/* info række */}

        <ProfileInfoRow
          icon={<ProfileIcon name="city-icon.svg" />}
          field="city"
          value={profile.city}
          editing={editing}
          editValue={editValue}
          setEditValue={setEditValue}
          editable={canEdit}
          onEdit={() => startEdit("city", profile.city)}
          onSave={() => saveField("city")}
        />

        <ProfileInfoRow
          icon={<ProfileIcon name="occupation-icon.svg" />}
          field="occupation"
          value={profile.occupation}
          editing={editing}
          editValue={editValue}
          setEditValue={setEditValue}
          editable={canEdit}
          onEdit={() => startEdit("occupation", profile.occupation)}
          onSave={() => saveField("occupation")}
        />

        <ProfileInfoRow
          icon={<ProfileIcon name="caption-icon.svg" />}
          field="caption"
          value={profile.caption}
          editing={editing}
          editValue={editValue}
          setEditValue={setEditValue}
          editable={canEdit}
          onEdit={() => startEdit("caption", profile.caption)}
          onSave={() => saveField("caption")}
        />

        <ProfileInfoRow
          icon={<ProfileIcon name="budget-icon.svg" />}
          field="budget"
          value={`${profile.budget} kr.`}
          editing={editing}
          editValue={editValue}
          setEditValue={setEditValue}
          editable={canEdit}
          onEdit={() => startEdit("budget", profile.budget)}
          onSave={() => saveField("budget")}
        />

        <ProfileInfoRow
          icon={<ProfileIcon name="gender-icon.svg" />}
          field="gender"
          value={profile.gender}
          editing={editing}
          editValue={editValue}
          setEditValue={setEditValue}
          editable={canEdit}
          onEdit={() => startEdit("gender", profile.gender)}
          onSave={() => saveField("gender")}
        />

        {/* om mig */}

        <ProfileSection title="Om mig">
          <EditableTextCard
            editing={editing === "about_me"}
            value={editValue}
            setValue={setEditValue}
            editable={canEdit}
            onEdit={() => startEdit("about_me", profile.about_me)}
            onSave={() => saveField("about_me")}
          >
            {profile.about_me}
          </EditableTextCard>
        </ProfileSection>

        {/* interesser */}

        <ProfileSection title="Interesser">
          <TagList
            items={profile.interests || []}
            editable={canEdit}
            removable={canEdit}
            onAdd={(value) => addArrayItem("interests", value)}
            onRemove={(value) => removeArrayItem("interests", value)}
          />
        </ProfileSection>

        {/* house vibe */}
        <ProfileSection title="House vibe">
          <TagList
            items={profile.house_vibes || []}
            editable={canEdit}
            removable={canEdit}
            onAdd={(value) => addArrayItem("house_vibes", value)}
            onRemove={(value) => removeArrayItem("house_vibes", value)}
          />
        </ProfileSection>

        {/* dealbreakers */}

        <ProfileSection title="Dealbreakers">
          <TagList
            items={profile.dealbreakers || []}
            editable={canEdit}
            removable={canEdit}
            onAdd={(value) => addArrayItem("dealbreakers", value)}
            onRemove={(value) => removeArrayItem("dealbreakers", value)}
          />
        </ProfileSection>

        {/* 3 ting du hurtigt opdager om mig */}

        <ProfileSection title="3 ting du hurtigt opdager om mig">
          <div className="three-things-wrapper">
            {getThings().map((thing, index) => {
              const field = `thing_${index}`;

              return (
                <div className="single-thing-card" key={field}>
                  {editing === field ? (
                    <p>
                      {index + 1}.{" "}
                      <input
                        className="thing-inline-input"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                      />
                    </p>
                  ) : (
                    <p>
                      {index + 1}. {thing}
                    </p>
                  )}

                  <EditIconButton
                    enabled={canEdit}
                    editing={editing === field}
                    onClick={
                      editing === field
                        ? () => saveThing(index)
                        : () => startEdit(field, thing)
                    }
                  />
                </div>
              );
            })}
          </div>
        </ProfileSection>

        {/* søger roomie som */}

        <ProfileSection title="Søger roomie som">
          <EditableTextCard
            editing={editing === "roomie_preference"}
            value={editValue}
            setValue={setEditValue}
            editable={canEdit}
            onEdit={() =>
              startEdit("roomie_preference", profile.roomie_preference)
            }
            onSave={() => saveField("roomie_preference")}
          >
            {profile.roomie_preference}
          </EditableTextCard>
        </ProfileSection>

        {profile.has_housing_boolean_default_false && (
          <div className="housing-card">
            <h4>Dit boligopslag</h4>

            <div className="housing-content">
              <img src="/apartment.jpg" alt="Bolig" />

              <div>
                <p>Titel</p>

                <button type="button">Forhåndsvisning</button>
              </div>
            </div>
          </div>
        )}

        {/* ret matchsvar */}

        <MatchButton enabled={showMatchButton} />

        <ConnectionButton enabled={showConnectionButton} />
      </section>
    </main>
  );
}
