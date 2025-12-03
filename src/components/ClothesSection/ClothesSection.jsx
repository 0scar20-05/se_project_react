import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function ClothesSection({
  clothingItems,
  onCardClick,
  handleAddClick,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser._id
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p className="clothes-section__text">Your items</p>
        <button
          onClick={handleAddClick}
          type="button"
          className="clothes-section__button"
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__list">
        {userItems.map((item) => (
          <ItemCard
            key={item.id || item._id}
            item={item}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
          />
        ))}
      </ul>
    </div>
  );
}
