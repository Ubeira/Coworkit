import UserForm from "../components/users/UserForm";
import useAuth from "../shared/hooks/useAuth";
import { useHistory } from "react-router-dom";
import Modal from "../components/modales/Modal";
import "../css/users/forms.css";
export default function RecoverPassword() {
  const { recoverPassword, state, setState } = useAuth();
  const history = useHistory();
  const typeForm = "recoverPassword";
  const action = () => {
    setState(false);
    history.push("/");
  };
  return (
    <div className="fatherForms">
      <section className="container">
        <header>
          <h1>Recuperar contraseñaaa</h1>
        </header>
        <UserForm onSubmit={recoverPassword} typeForm={typeForm} />
        <Modal
          active={state}
          actionBtn={action}
          title="Le acabamos de mandar un email, compruebe su correo electrónico."
          firstBtn={true}
          textBtn={"Aceptar"}
          desableClicOutsideToCloseModal={true}
        />
      </section>
    </div>
  );
}

/**
 *   <Modal title={title} content={content } active={active} actionBtn={agreeAction}
            desableClicEscapeToCloseModal={true} desableClicOutsideToCloseModal={true}
            firstBtn={true} textBtn={"Aceptar"}/>
 */
