import { useForm } from "react-hook-form";
import { useState } from "react";

export default function AuthForm(props) {
  const { register, handleSubmit, errors } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const [statusMessage, setstatusMessage] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const onSubmit = async (data) => {
    if (
      data.password &&
      data.ConfirmPassword &&
      data.password !== data.ConfirmPassword
    ) {
      setErrorPassword("Las contraseñas no coinciden");
    } else {
      try {
        const serverResponse = await props.onSubmit(data.email, data.password);
        if (errorMessage.length > 0) {
          setErrorMessage("");
        }
        if (serverResponse.message) {
          setstatusMessage(serverResponse.message);
        }
      } catch (errors) {
        setErrorMessage(errors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Nombre</label>
      <input id="name" name="name" ref={register({ required: true })} />
      <label htmlFor="surname">Apellidos</label>
      <input id="surname" name="surname" ref={register({ required: true })} />
      <label htmlFor="email">Correo</label>
      <input id="email" name="email" ref={register({ required: true })} />
      <label htmlFor="password">Contraseña</label>
      <input
        id="password"
        type="password"
        name="password"
        ref={register({ required: true, minLength: 6 })}
      />
      <label htmlFor="password">Confirmar contraseña</label>
      <input
        id="password"
        type="password"
        name="password2"
        ref={register({ required: true, minLength: 6 })}
      />
      {errorPassword.length > 0 && <p className="error">{errorPassword}</p>}

      <input type="submit" />
      {statusMessage.length > 0 && <p className="status-ok">{statusMessage}</p>}
      {errorMessage.length > 0 && <p className="error">{errorMessage}</p>}
    </form>
  );
}
