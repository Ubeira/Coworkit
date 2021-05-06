import { Button } from "@material-ui/core";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginForm(props) {
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const serverResponse = await props.onSubmit(data.email, data.password);
      if (errorMessage.length > 0) {
        setErrorMessage("");
      }
      if (serverResponse.message) {
        setStatusMessage(serverResponse.message);
      }
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">Email </label>
      <input id="email" name="email" ref={register({ required: true })} />
      <label htmlFor="password">Password </label>
      <input
        id="password"
        type="password"
        name="password"
        ref={register({ required: true, minLength: 1 })}
      />
      <Button variant="contained" color="primary" type="submit">
        Enviar
      </Button>
      {statusMessage.length > 0 && <p className="status-ok">{statusMessage}</p>}
      {errorMessage.length > 0 && <p className="error">{errorMessage}</p>}
    </form>
  );
}
