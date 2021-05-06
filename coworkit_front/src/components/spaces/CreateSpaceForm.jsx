import React from 'react'
import { useForm } from 'react-hook-form';
import { NumberInput, SelectInput, TextAreaInput, TextInput } from '../users/FormUtils'
import PhotoPreview from './PhotoPreview'

export default function CreateSpaceForm({editButtonAction, createButtonACtion,spaceTypes,errorInput, categotyErrorMessage}) {
    const { register, handleSubmit, errors,reset} = useForm();
const sendformEditSpace=(data)=>{
  createButtonACtion(data);
  reset();
}

    return (
        <form className="formEditSpace" onSubmit={handleSubmit(sendformEditSpace)}>
        <div className="typeSpaceContainer">
          <label htmlFor="type">Tipo de espacio</label>
          <SelectInput nameOfClass="selectInput" register={register} options={spaceTypes} labelInput="Tipo de espacio" name="type" />
        {errorInput && <p>{categotyErrorMessage}</p>}
        </div>
        <TextInput register={register} errors={errors} nameOfClass="nameInput"label="Nombre" name="name" max="50" min="0"/>
        <div className="textAreaContainer">
          <label htmlFor="description">Descripción de espacio</label>
          <TextAreaInput  name="description" label="Descripción"  cols="35" rows="5" placeholder="Descripción de espacio" register={register} errors={errors}/>
        </div>
        <NumberInput nameOfClass="priceInput" name="price" label="Precio" register={register} errors={errors}/>
        <NumberInput nameOfClass="capacityInput" name="capacity" label="Capacidad" register={register} errors={errors}/>
        <PhotoPreview register={register} errors={errors} required={true}/>
        <div className="buttonCreateContainer" >
          <button type="submit"> Crear</button>
          <button onClick={editButtonAction}> Editar</button>
        </div>
    </form>
    )
}

