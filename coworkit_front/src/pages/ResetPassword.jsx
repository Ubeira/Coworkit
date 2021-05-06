import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import UserForm from "../components/users/UserForm";
import useAuth from "../shared/hooks/useAuth";
import "../css/users/forms.css";
export default function ResetPassword() {
  const { resetPassword } = useAuth();
  const typeForm = "resetPassword";
  const { recoverCode } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const { history } = useHistory();
  const handleSubmit = async (data) => {
    setErrorMessage("");
    const response = await resetPassword({
      recoverCode,
      newPassword: data.password,
    });

    if (response.status === "error") {
      setErrorMessage(response.message);
    } else {
      history.push("/");
    }
  };

  return (
    <div className="fatherForms">
      <section className="container resetPassword">
        <header>
          <h1>Cambiar contraseña</h1>
        </header>
        <UserForm onSubmit={handleSubmit} typeForm={typeForm} />
        {errorMessage && <h2 className="error">{errorMessage}</h2>}
      </section>
    </div>
  );
}
