import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

export default function Profile({
  clothingItems,
  onCardClick,
  handleAddClick,
  onEditProfileClick,
  onCardLike,
  onSignOut,
}) {
  return (
    <section className="profile">
      <div className="profile__sidebar-column">
        <SideBar />
        <button onClick={onEditProfileClick} className="profile__edit-button">
          Change Profile Data
        </button>
        <button onClick={onSignOut} className="profile__signout-button">
          Sign Out
        </button>
      </div>
      <ClothesSection
        onCardClick={onCardClick}
        clothingItems={clothingItems}
        handleAddClick={handleAddClick}
        onCardLike={onCardLike}
      />
    </section>
  );
}
