import "./ItemModal.css";
import X from "../../assets/WhiteX.svg";

function ItemModal({ activeModal, card, onClose, onOpenConfirmation }) {
  if (!card || !card.id) return null;
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={X} alt="close button" />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__header-row">
            <h2 className="modal__caption">{card.name}</h2>
            <button
              className="modal__delete"
              onClick={() => onOpenConfirmation(card)}
            >
              <p className="modal__delete_text">Delete item</p>
            </button>
          </div>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
