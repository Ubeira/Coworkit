import UserForm from "../components/users/UserForm.jsx";
import useAuth from "../shared/hooks/useAuth";
/*
import "../css/loginForm.css";*/

export default function Login() {
  const { signIn } = useAuth();
  const typeForm = "login";

  return (
    <div className="fatherForms">
      <section className="container login">
        <header>
          <h1>Iniciar sesión</h1>
        </header>
        <UserForm onSubmit={signIn} typeForm={typeForm} />
      </section>
    </div>
  );
}
