import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const defaultValues = {
    name: "",
    weatherType: "",
    imageUrl: "",
  };
  const { values, handleChange, setValues } = useForm(defaultValues);

  useEffect(() => {
    if (isOpen) {
      setValues(defaultValues);
    }
  }, [isOpen, setValues]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddItem(values);
  }

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="addItem-name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="addItem-name"
          name="name"
          placeholder="Name"
          required
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="addItem-imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          id="addItem-imageUrl"
          name="imageUrl"
          placeholder="Image Url"
          required
          value={values.imageUrl}
          onChange={handleChange}
        />
      </label>
      <fieldset className="modal__radio-btns">
        <legend required className="modal__legend">
          Select the weather type:
        </legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="addItem-hot"
            type="radio"
            className="modal__radio-input"
            name="weatherType"
            value="hot"
            checked={values.weatherType === "hot"}
            onChange={handleChange}
            required
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="addItem-warm"
            type="radio"
            className="modal__radio-input"
            name="weatherType"
            value="warm"
            checked={values.weatherType === "warm"}
            onChange={handleChange}
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="addItem-cold"
            type="radio"
            className="modal__radio-input"
            name="weatherType"
            value="cold"
            checked={values.weatherType === "cold"}
            onChange={handleChange}
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
