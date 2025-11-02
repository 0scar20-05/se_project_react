import "./DeleteConfirmationModal.css";
import closeIcon from "../../assets/X.svg";

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  card,
}) {
  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_confirm">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeIcon} alt="close button" />
        </button>
        <p className="confirmation__modal_title">
          Are you sure you want to delete this item? <br /> This action is
          irreversible.
        </p>
        <div className="modal__buttons">
          <button
            className="modal__button modal__button_type_confirm"
            onClick={() => onConfirm(card.id || card._id)}
          >
            Yes, delete item
          </button>
          <button
            className="modal__button modal__button_type_cancel"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
