import "./ModalWithForm.css";
import closeIcon from "../../assets/X.svg";

function ModalWithForm({
  children,
  title,
  buttonText,
  redirectText,
  onRedirect,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeIcon} alt="close button" />
        </button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__buttons-row">
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>
            {redirectText && onRedirect && (
              <button
                type="button"
                className="modal__redirect"
                onClick={onRedirect}
              >
                {redirectText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
