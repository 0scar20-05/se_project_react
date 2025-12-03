import "./EditProfileModal.css";
import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function EditProfileModal({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [isOpen, currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({ name, avatar });
  }

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save Changes"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label htmlFor="avatar" className="modal__label">
        Avatar URL
        <input
          type="url"
          className="modal__input"
          id="avatar"
          name="avatar"
          placeholder="Avatar URL"
          required
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
      </label>
    </ModalWithForm>
  );
}
