import UserForm from "../components/users/UserForm.jsx";
import useAuth from "../shared/hooks/useAuth";
import "../css/users/forms.css";
import "../css/loginForm.css";

export default function Login() {
  const { signUp } = useAuth();
  const typeForm = "register";

  return (
    <div className="fatherForms">
      <section className="container register">
        <header>
          <h1>Registro</h1>
        </header>
        <UserForm onSubmit={signUp} typeForm={typeForm} />
      </section>
    </div>
  );
}
{
  /*<div className="fatherForms">
<section className="container login">
  <header>
    <h1>Iniciar sesión</h1>
  </header>
  <UserForm onSubmit={signIn} typeForm={typeForm} />
</section>
</div>*/
}
