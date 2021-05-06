import { Button } from "@material-ui/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Company,
  ConfirmPassword,
  Email,
  InsertPhoto,
  Name,
  Nif,
  Password,
  Surname,
  Telephone,
} from "./FormUtils";

export default function UserForm(props) {
  const { register, handleSubmit, errors } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [algo, setAlgo] = useState();
  const onSubmit = async (data) => {
    if (
      data.password &&
      data.ConfirmPassword &&
      data.password !== data.ConfirmPassword
    ) {
      setErrorPassword("Las contraseñas no coinciden");
    } else {
      try {
        const serverResponse = await props.onSubmit(data);
        setAlgo(serverResponse);
        if (errorMessage.length > 0) {
          setErrorMessage("");
        }
        if (serverResponse.message) {
          setStatusMessage(serverResponse.message);
        }
      } catch (error) {
        setErrorMessage(error);
      }
    }
  };
  console.log(algo);
  return (
    <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
      {props.typeForm === "login" && (
        <>
          <Email register={register} errors={errors} />
          <Password register={register} errors={errors} />
          {statusMessage.length > 0 && (
            <>
              <p className="error">{statusMessage} </p>
              <p>
                Si ha olvidado su contraseña haga click
                <Link to="/recoverPassword">Aquí</Link>
              </p>
            </>
          )}
        </>
      )}
      {props.typeForm === "resetPassword" && (
        <>
          <Email register={register} errors={errors} />
          <Password register={register} errors={errors} />
          <ConfirmPassword register={register} errors={errors} />

          {errorPassword.length > 0 && <p>{errorPassword}</p>}
        </>
      )}

      {props.typeForm === "editUser" && (
        <>
          <Name register={register} errors={errors} />
          <Surname register={register} errors={errors} />
          <Email register={register} errors={errors} />
          <Company register={register} errors={errors} />
          <Nif register={register} errors={errors} />
          <Telephone register={register} errors={errors} />
          <InsertPhoto
            register={register}
            errors={errors}
            namePhoto={props.namePhoto}
          />
        </>
      )}
      {props.typeForm === "register" && (
        <>
          <Name register={register} errors={errors} />
          <Surname register={register} errors={errors} />
          <Email register={register} errors={errors} />
          <Password register={register} errors={errors} />
          <ConfirmPassword register={register} errors={errors} />
          <Nif register={register} errors={errors} />

          {errorPassword.length > 0 && <p>{errorPassword}</p>}
        </>
      )}
      {props.typeForm === "recoverPassword" && (
        <Email register={register} errors={errors} />
      )}
      <button type="submit" className="button blue submitButton">
        Enviar
      </button>
      {/*      <Button variant="contained" color="primary" type="submit">
        Enviar
      </Button>*/}
      {/*{errorMessage.length > 0 && <p className="error">{errorMessage} </p>}*/}
    </form>
  );
}
