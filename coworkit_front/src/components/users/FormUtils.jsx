import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import "./../../css/users/formUtils.css";
import { Button, IconButton, Icon } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import SaveIcon from "@material-ui/icons/Save";
import ImageIcon from "@material-ui/icons/Image";
import { useState } from "react";
import Stars from "../spaces/Stars";
import StartsRating from "../spaces/StartsRating";

export function Name(props) {
  return (
    <div className="inputField">
      <label htmlFor="name">Nombre</label>
      <input
        name="name"
        id="name"
        type="text"
        ref={props.register({
          required: { value: true, message: "Nombre es un campo obligatorio" },
          minLength: {
            value: 2,
            message: "Nombre puede tener como mínimo 2 caracteres",
          },
          maxLength: {
            value: 50,
            message: "Nombre puede tener como máximo 50 caracteres",
          },
          // pattern: {
          //   value: /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/i,
          //   message: "No un nombre válido",
          // },
        })}
      ></input>
      {props.errors.name && <p>{props.errors.name.message}</p>}
    </div>
  );
}

export function InputInfo(props) {
  return (
    <div className="inputField">
      <label htmlFor="infoUser">{props.label}</label>
      <input name="infoUser" type="text" value={props.value} disabled></input>
    </div>
  );
}

export function Surname(props) {
  return (
    <div className="inputField">
      <label htmlFor="surname">Apellido</label>
      <input
        name="surname"
        id="surname"
        type="text"
        ref={props.register({
          required: {
            value: true,
            message: "Apellido es un campo obligatorio",
          },
          minLength: {
            value: 2,
            message: "Apellido puede tener como mínimo 2 caracteres",
          },
          maxLength: {
            value: 100,
            message: "Apellido puede tener como máximo 100 caracteres",
          },
          // pattern: {
          //   value: /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/i,
          //   message: "No un apellido válido",
          // },
        })}
      ></input>
      {props.errors.surname && <p>{props.errors.surname.message}</p>}
    </div>
  );
}

export function Company(props) {
  return (
    <div className="inputField">
      <label htmlFor="company">Empresa</label>
      <input
        name="company"
        id="company"
        type="text"
        defaultValue=""
        ref={props.register()}
      ></input>
      {props.errors.company && <p>{props.errors.company.message}</p>}
    </div>
  );
}

export function Nif(props) {
  return (
    <div className="inputField">
      <label htmlFor="nif">NIF</label>
      <input
        name="nif"
        id="nif"
        type="text"
        ref={props.register({
          required: { value: true, message: "NIF es un campo obligatorio" },
          minLength: { value: 1, message: "NIF debe de tener 9 caracteres" },
          maxLength: { value: 9, message: "NIF debe de tener 9 caracteres" },
        })}
      ></input>
      {props?.errors?.nif && <p>{props.errors.nif.message}</p>}
    </div>
  );
}

export function Email(props) {
  return (
    <div className="inputField">
      <label htmlFor="email">Email</label>
      <input
        name="email"
        id="email"
        type="text"
        ref={props.register({
          required: { value: true, message: "Email es un campo obligatorio" },
          pattern: {
            value: /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
            message: "No es un email válido",
          },
        })}
      ></input>
      {props.errors.email && <p>{props.errors.email.message}</p>}
    </div>
  );
}

export function Telephone(props) {
  return (
    <div className="inputField">
      <label htmlFor="tel">Teléfono</label>
      <input
        name="tel"
        id="tel"
        type="tel"
        ref={props.register({
          required: {
            value: true,
            message: "Telefono es un campo obligatorio",
          },
          minLength: {
            value: 3,
            message: "Telefono debe de tener más de 8 caracteres",
          },
        })}
      ></input>
      {props.errors.phone && <p>{props.errors.phone.message}</p>}
    </div>
  );
}
export function Password(props) {
  return (
    <div className="inputField">
      <label htmlFor="password">Password </label>
      <input
        id="password"
        type="password"
        name="password"
        ref={props.register({ required: true, minLength: 1 })}
      />
    </div>
  );
}
export function ConfirmPassword(props) {
  return (
    <div className="inputField">
      <label htmlFor="ConfirmPassword">Confirmar contraseña </label>
      <input
        id="ConfirmPassword"
        type="password"
        name="ConfirmPassword"
        ref={props.register({ required: true, minLength: 1 })}
      />
    </div>
  );
}
export function InsertPhoto(props) {
  const namePhoto = props.namePhoto;
  return (
    <div className="inputField">
      <label htmlFor={namePhoto}>Añadir foto </label>
      <input
        id={namePhoto}
        type="file"
        name={namePhoto}
        ref={props.register({ required: true, minLength: 1 })}
        accept=".pgn,.jpg,.gif,.tiff,.tif,.raw,.psd,.jpeg,.bmp,.svg"
      />
    </div>
  );
}

export function Photo(props) {
  return (
    <div className="inputField" id={props.id}>
      <label htmlFor="photo">Cambiar foto </label>
      <input
        type="file"
        name="photo"
        ref={props.register()}
        accept=".pgn,.jpg,.gif,.tiff,.tif,.raw,.psd,.jpeg,.bmp,.svg"
      />
    </div>
  );
}

export function FormPhoto({ onSubmit }) {
  const { register, handleSubmit } = useForm();

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
      })}
      className=" formPhoto "
    >
      <input
        className=" inputFormPhoto "
        type="file"
        name="photo"
        ref={register()}
        accept=".pgn,.jpg,.gif,.tiff,.tif,.raw,.psd,.jpeg,.bmp,.svg"
      />

      <div>
        <Button
          className="userAddPhotoButton"
          type="submit"
          variant="contained"
          color="primary"
          size="medium"
          startIcon={<SaveIcon />}
        >
          Guardar
        </Button>
      </div>
    </form>
  );
}

export function FormChangePassword({ onSubmit, resultAPI }) {
  const { register, handleSubmit, errors } = useForm();

  return (
    <form
      className="formChangePassword"
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
      })}
    >
      <input
        id="oldPasswordInput"
        className="inputFieldFormChangePassword"
        name="oldPassword"
        type="password"
        placeholder="Antigua contraseña"
        ref={register({
          required: {
            value: true,
            message: "Antigua contraseña es un campo obligatorio",
          },
          maxLength: {
            value: 100,
            message:
              "Antigua contraseña puede tener como máximo 100 caracteres",
          },
        })}
      />
      <input
        id="newPasswordInput"
        className="inputFieldFormChangePassword"
        name="newPassword"
        type="password"
        placeholder="Nueva contraseña"
        ref={register({
          required: {
            value: true,
            message: "Nueva contraseña es un campo obligatorio",
          },
          maxLength: {
            value: 100,
            message: "Nueva contraseña puede tener como máximo 100 caracteres",
          },
        })}
      />
      <a href="/login">
        <h4>Olvidé mi contraseña</h4>
      </a>
      <div>
        <Button
          className="userAddPhotoButton"
          type="submit"
          variant="contained"
          color="primary"
          size="medium"
          startIcon={<SaveIcon />}
        >
          Guardar
        </Button>
      </div>
      {errors.oldPassword && <p>{errors.oldPassword.message}</p>}
      {errors.newPassword && <p>{errors.newPassword.message}</p>}
      {resultAPI?.status && <p>{resultAPI.message}</p>}
    </form>
  );
}

export function SelectInput({
  options,
  labelInput,
  register,
  name,
  nameOfClass,
  defaultValue,
}) {
  return (
    <select
      className={nameOfClass}
      name={name}
      id="typeChoice"
      defaultValue={defaultValue}
      ref={register()}
    >
      <option value="labelOption">{labelInput}</option>
      {options.map((option) => {
        return (
          <option key={option} value={option}>
            {option}
          </option>
        );
      })}
    </select>
  );
}

export function NumberInput({
  register,
  name,
  errors,
  label,
  nameOfClass,
  defaultValue,
}) {
  return (
    <div className={nameOfClass}>
      <label htmlFor={name}>{label}</label>
      <input
        type="number"
        id={name}
        name={name}
        defaultValue={defaultValue}
        ref={register({
          required: {
            value: true,
            message: `${label} es un campo ogligatorio`,
          },
          min: {
            value: 0,
            message: `${label} debe ser mayor que 0`,
          },
        })}
      />
      {errors[`${name}`] && <p>{errors[`${name}`].message}</p>}
    </div>
  );
}

export function NumberInputWithOutLabel({
  register,
  name,
  errors,
  nameOfClass,
}) {
  return (
    <div className={nameOfClass}>
      <input
        type="number"
        id={name}
        name={name}
        ref={register({
          required: {
            value: true,
            message: `ES es un campo ogligatorio`,
          },
          min: {
            value: 0,
            message: `Este campo debe ser mayor que 0`,
          },
        })}
      />
      {errors[`${name}`] && <p>{errors[`${name}`].message}</p>}
    </div>
  );
}

export function FormDeleteSpacePhotos({ photoSpaceList, onSubmit }) {
  const { register, handleSubmit } = useForm();
  const ToogleAsMakedToDelete = (e) => {
    const photoSpace = e.target.parentElement.previousElementSibling;
    photoSpace.classList.toggle("delete");
    console.log(photoSpace);
  };

  return (
    <form
      className="formDeleteSpacePhotos"
      onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      <button type="submit">ELIMINAR</button>
      {photoSpaceList.length>0 &&
        photoSpaceList.map((space) => {
          console.log(space);
          const photoNameChunks = space.split("/");
          const photoName = photoNameChunks[photoNameChunks.length - 1].split(
            "."
          );

          return (
            <section key={photoName[0]} className="spacePhoto">
              <label htmlFor={photoName[0]}>
                <img src={space} alt="Space url" />
              </label>
              <div>
                <input
                  type="checkbox"
                  onClick={(e) => ToogleAsMakedToDelete(e)}
                  name={photoName[0]}
                  id={photoName[0]}
                  value={photoName[0]}
                  ref={register()}
                />
              </div>
            </section>
          );
        })}
    </form>
  );
}

export function TextInput({
  register,
  errors,
  nameOfClass,
  label,
  name,
  max,
  min,
  defaultValue,
}) {
  nameOfClass = nameOfClass ? nameOfClass : "";
  return (
    <div className={nameOfClass}>
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        id={name}
        type="text"
        defaultValue={defaultValue}
        ref={register({
          required: {
            value: true,
            message: `${label} es un campo ogligatorio`,
          },
          minLength: {
            value: Number(min),
            message: `${label} puede tener como mínimo ${min} caracteres`,
          },
          maxLength: {
            value: Number(max),
            message: `${label} puede tener como mínimo ${max} caracteres`,
          },
        })}
      ></input>
      {errors[`${name}`] && <p>{errors[`${name}`].message}</p>}
    </div>
  );
}

export function TextAreaInput({
  register,
  name,
  errors,
  label,
  cols,
  rows,
  placeholder,
  nameOfClass,
  defaultValue,
}) {
  nameOfClass = nameOfClass ? nameOfClass : "";
  return (
    <>
      <textarea
        className={nameOfClass}
        cols={String(cols)}
        rows={String(rows)}
        name={name}
        id={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        ref={register({
          required: {
            value: true,
            message: `${label} es un campo ogligatorio`,
          },
          minLength: {
            value: 10,
            message: `${label} puede tener como mínimo 10 caracteres`,
          },
          maxLength: {
            value: 500,
            message: `${label} puede tener como mínimo 500 caracteres`,
          },
        })}
      />
      {errors[`${name}`] && <p>{errors[`${name}`].message}</p>}
    </>
  );
}

export function FormEditSpace() {
  const { register, handleSubmit, errors } = useForm();
  const [errorInput, setErrorInput] = useState(false);
  const spaceTypes = [
    "Sala de reuniones",
    "Oficina compartida",
    "Oficina individual",
    "Sala audiovisual",
  ];
  const test = (data) => {
    console.log(data);
  };
  const categotyErrorMessage =
    "La categoria seleccionada no es una categoria válida";
  const selectInputValidator = (data) => {
    console.log(data);
    if (spaceTypes.includes(data.type)) {
      setErrorInput(false);
      test(data);
    } else {
      setErrorInput(true);
    }
  };
  return (
    <form
      className="formEditSpace"
      onSubmit={handleSubmit(selectInputValidator)}
    >
      <label htmlFor="type">Tipo de espacio</label>
      <SelectInput
        register={register}
        options={spaceTypes}
        labelInput="Tipo de espacio"
        name="type"
      />
      {errorInput && <p>{categotyErrorMessage}</p>}
      <TextInput
        register={register}
        errors={errors}
        nameOfClass="formEditSpaceText"
        label="Nombre"
        name="name"
        max="50"
        min="0"
      />
      <div className="textAreaContainer">
        <label htmlFor="description">Descripción de espacio</label>
      </div>
      <TextAreaInput
        name="description"
        label="Descripción"
        cols="35"
        rows="5"
        placeholder="Descripción de espacio"
        register={register}
        errors={errors}
      />
      <NumberInput
        name="price"
        label="Precio"
        register={register}
        errors={errors}
      />
      <NumberInput
        name="capacity"
        label="Capacidad"
        register={register}
        errors={errors}
      />

      <div>
        <button> guardar</button>
      </div>
    </form>
  );
}

export function FormCreateReport({ onSubmit, addPhotoButtonAction }) {
  const { register, handleSubmit, errors } = useForm();
  const [errorInput, setErrorInput] = useState(false);
  const reportTypes = [
    "Hardware",
    "Software",
    "Conectividad",
    "Limpieza",
    "Atención al cliente",
    "Otros",
  ];

  const categotyErrorMessage =
    "La categoria seleccionada no es una categoria válida";
  const formValidator = (data) => {
    console.log(data);
    if (reportTypes.includes(data.category)) {
      setErrorInput(false);
      onSubmit(data);
    } else {
      setErrorInput(true);
    }
  };

  return (
    <>
      <form
        className="formChangePassword"
        onSubmit={handleSubmit((data) => {
          formValidator(data);
        })}
      >
        <select name="category" id="reportTypeChoice" ref={register()}>
          <option value="labelOption">Tipo de incidencia</option>
          {reportTypes.map((reportOption) => {
            return (
              <option key={reportOption} value={reportOption}>
                {reportOption}
              </option>
            );
          })}
        </select>

        <textarea
          cols="35"
          rows="5"
          name="description"
          id="reportDescription"
          placeholder="Describe tu indicencia"
          ref={register({
            required: {
              value: true,
              message: "Descripción es un campo obligatorio",
            },
            minLength: {
              value: 30,
              message: "Descripción puede tener como mínimo 30 caracteres",
            },
            maxLength: {
              value: 500,
              message: "Descripción puede tener como máximo 500 caracteres",
            },
          })}
        />
        <div>
          <Button
            className="userAddPhotoButton"
            type="submit"
            variant="contained"
            color="primary"
            size="medium"
            startIcon={<SendIcon />}
          >
            Enviar
          </Button>
        </div>
        {errors.description && <p>{errors.description.message}</p>}
        {errorInput && <p>{categotyErrorMessage}</p>}
      </form>
      <div>
        <Button
          onClick={addPhotoButtonAction}
          className="userAddPhotoButton"
          type="submit"
          variant="contained"
          color="primary"
          size="medium"
          startIcon={<ImageIcon />}
        >
          Añadir foto
        </Button>
      </div>
    </>
  );
}

export function FormCreateReview({ onSubmit, reviewInfo }) {
  const intialValuesForm = { comment: "", score: "" };
  const { register, handleSubmit, errors } = useForm();

  return (
    <form
      className="formCreateReview"
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
      })}
    >
      <StartsRating register={register} />
      <textarea
        cols="35"
        rows="5"
        name="comment"
        id="reviewComment"
        placeholder="Describe valoracion"
        ref={register({
          required: {
            value: true,
            message: "Descripción de es un campo obligatorio",
          },
          minLength: {
            value: 30,
            message: "Descripción puede tener como mínimo 30 caracteres",
          },
          maxLength: {
            value: 500,
            message: "Descripción puede tener como máximo 500 caracteres",
          },
        })}
      />
      <div>
        <Button
          className="userAddPhotoButton"
          type="submit"
          variant="contained"
          color="primary"
          size="medium"
          startIcon={<SendIcon />}
        >
          Enviar
        </Button>
      </div>
      {errors.comment && <p>{errors.comment.message}</p>}
    </form>
  );
}

export function FormAnswerReport({ component }) {
  const { register, errors } = useForm();
  const subjectInput = (
    <input
      type="text"
      name="subject"
      id="subject"
      placeholder="Asunto"
      ref={register({
        required: {
          value: true,
          message: "No puedes enviar un correo sin asunto",
        },
        maxLength: {
          value: 150,
          message: "El asunto puede tener como máximo 150 caracteres",
        },
      })}
    />
  );

  const optionalInput = component === "users" ? subjectInput : [];
  return (
    <form
      className="contactForm"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      {optionalInput}
      <textarea
        cols="35"
        rows="5"
        name="emailBody"
        id="emailBody"
        placeholder="Escribe aquí el cuerpo del correo"
        ref={register({
          required: {
            value: true,
            message: "No puedes enviar un correo sin contenido",
          },
          minLength: {
            value: 30,
            message: "El email debe tener como mínimo 30 caracteres",
          },
          maxLength: {
            value: 500,
            message: "El email puede tener como máximo 500 caracteres",
          },
        })}
      />

      {errors.comment && <p>{errors.comment.message}</p>}
    </form>
  );
}

export function FormEditReview({ onSubmit, reviewInfo }) {
  console.log(reviewInfo);
  const intialValuesForm = { ...reviewInfo, score: String(reviewInfo?.score) };

  const { register, handleSubmit, errors } = useForm({
    defaultValues: intialValuesForm,
  });

  return (
    <form
      className="formCreateReview"
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
      })}
    >
      <StartsRating register={register} />
      <textarea
        cols="35"
        rows="5"
        name="comment"
        id="reviewComment"
        placeholder="Describe valoracion"
        ref={register({
          required: {
            value: true,
            message: "Descripción de es un campo obligatorio",
          },
          minLength: {
            value: 30,
            message: "Descripción puede tener como mínimo 30 caracteres",
          },
          maxLength: {
            value: 500,
            message: "Descripción puede tener como máximo 500 caracteres",
          },
        })}
      />
      <div>
        <Button
          className="userAddPhotoButton"
          type="submit"
          variant="contained"
          color="primary"
          size="medium"
          startIcon={<SendIcon />}
        >
          Enviar
        </Button>
      </div>
      {errors.comment && <p>{errors.comment.message}</p>}
    </form>
  );
}

export const StyleButton = styled.button({
  fontSize: 30,
  background: "purple",
  "&:hover": {
    borderRadius: "10px",
  },
});

export function IncBtn({
  icon = "question-circle",
  text,
  size = 16,
  color = "black",
  pv = 0,
  ph = 0,
  pvb = 0,
  phb = 0,
  bgcolor = "rgba(255, 255, 255, 0.26)",
}) {
  return (
    <button
      style={{
        fontSize: `${size}px`,
        color: `${color}`,
        padding: `${pv}rem ${ph}rem`,
        backgroundColor: `${bgcolor}`,
      }}
    >
      {" "}
      <i
        style={{ fontSize: `${size}px`, padding: `${pvb}rem ${phb}rem` }}
        class={`far fa-${icon}`}
      ></i>{" "}
      {text}{" "}
    </button>
  );
}
