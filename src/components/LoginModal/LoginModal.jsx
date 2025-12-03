import { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ isOpen, onLogin, onClose, onRedirect }) => {
  const defaultValues = {
    email: "",
    password: "",
  };
  const { values, handleChange, setValues } = useForm(defaultValues);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setValues(defaultValues);
      setError("");
    }
  }, [isOpen, setValues]);

  function handleSubmit(evt) {
    evt.preventDefault();
    setError("");
    onLogin({ email: values.email, password: values.password, setError });
  }

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      redirectText="or Sign up"
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
      {error && <p className="modal__error">{error}</p>}
    </ModalWithForm>
  );
};

export default LoginModal;
