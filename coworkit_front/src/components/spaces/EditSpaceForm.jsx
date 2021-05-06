import React from "react";
import { useForm } from "react-hook-form";
import {
  NumberInput,
  SelectInput,
  TextAreaInput,
  TextInput,
} from "../users/FormUtils";
import PhotoPreview from "./PhotoPreview";

export default function EditSpaceForm({
  cancelButtonAction,
  saveButtonAction,
  spaceTypes,
  errorInput,
  categotyErrorMessage,
  spaceInfo,
  detelePhotosButtonAction,
}) {
  const { register, handleSubmit, errors } = useForm();

  const clickOnDetetePhotosButton = (e) => {
    e.preventDefault();
    detelePhotosButtonAction();
  };

  const clickOnCancelButton = (e) => {
    e.preventDefault();
    cancelButtonAction();
  };

  return (
    <>
      <div className="EditSpaceForm">
        <form
          className="formEditSpace"
          onSubmit={handleSubmit(saveButtonAction)}
        >
          <div className="typeSpaceContainer">
            <label htmlFor="type">Tipo de espacio</label>
            <SelectInput
              nameOfClass="selectInput"
              register={register}
              options={spaceTypes}
              labelInput="Tipo de espacio"
              name="type"
              defaultValue={spaceInfo?.type}
            />
            {errorInput && <p>{categotyErrorMessage}</p>}
          </div>
          <TextInput
            register={register}
            errors={errors}
            nameOfClass="nameInput"
            label="Nombre"
            name="name"
            max="50"
            min="0"
            defaultValue={spaceInfo?.name}
          />
          <div className="textAreaContainer">
            <label htmlFor="description">Descripción de espacio</label>
            <TextAreaInput
              name="description"
              label="Descripción"
              cols="35"
              rows="5"
              placeholder="Descripción de espacio"
              register={register}
              errors={errors}
              defaultValue={spaceInfo?.description}
            />
          </div>
          <NumberInput
            nameOfClass="priceInput"
            name="price"
            label="Precio"
            register={register}
            errors={errors}
            defaultValue={spaceInfo?.price}
          />
          <NumberInput
            nameOfClass="capacityInput"
            name="capacity"
            label="Capacidad"
            register={register}
            errors={errors}
            defaultValue={spaceInfo?.capacity}
          />

          <PhotoPreview register={register} errors={errors} />

          <div className="buttonCreateContainer">
            <div>
              <button onClick={clickOnCancelButton}> Cancelar</button>
            </div>
            <div>
              <button onClick={clickOnDetetePhotosButton}>
                Eliminar fotos
              </button>
            </div>
            <div>
              <button type="submit"> Guardar</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
