import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import like from "../../assets/Like button.svg";
import liked from "../../assets/State=Liked.svg";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLoggedIn = Boolean(currentUser);

  const isLiked =
    isLoggedIn && item.likes && item.likes.some((id) => id === currentUser._id);

  function handleLike() {
    if (!isLoggedIn) return;
    onCardLike({ id: item._id, isLiked });
  }

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        {isLoggedIn && (
          <button className="card__like-button" onClick={handleLike}>
            <img src={isLiked ? liked : like} alt="like" />
          </button>
        )}
      </div>

      <img
        onClick={() => {
          onCardClick(item);
        }}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
