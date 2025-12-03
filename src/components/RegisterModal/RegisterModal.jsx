import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({ isOpen, onRegister, onClose, onRedirect }) => {
  const defaultValues = {
    email: "",
    password: "",
    name: "",
    avatarUrl: "",
  };
  const { values, handleChange, setValues } = useForm(defaultValues);

  useEffect(() => {
    if (isOpen) {
      setValues(defaultValues);
    }
  }, [isOpen, setValues]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister({
      name: values.name,
      email: values.email,
      password: values.password,
      avatarUrl: values.avatarUrl,
    });
  }

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      redirectText="or Log in"
      onRedirect={onRedirect}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email{" "}
        <input
          type="email"
          className="modal__input"
          id="email"
          name="email"
          placeholder="Email"
          required
          value={values.email}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password{" "}
        <input
          type="password"
          className="modal__input"
          id="password"
          name="password"
          placeholder="Password"
          required
          value={values.password}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Name"
          required
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="Avatar URL" className="modal__label">
        Avatar URL{" "}
        <input
          type="url"
          className="modal__input"
          id="avatarUrl"
          name="avatarUrl"
          placeholder="Avatar URL"
          required
          value={values.avatarUrl}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
