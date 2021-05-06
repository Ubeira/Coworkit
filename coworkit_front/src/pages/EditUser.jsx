import UserForm from "../components/users/UserForm.jsx";
import useAuth from "../shared/hooks/useAuth";

import "../css/editUser.css";

export default function EditUser() {
  //Hay que cambiar signIn por el de editar usuario
  const { signIn } = useAuth();
  const typeForm = "editUser";

  return (
    <section className="container editUser">
      <header>
        <h1>Editar usuario</h1>
      </header>
      <UserForm onSubmit={signIn} typeForm={typeForm} namePhoto="Avatar" />
    </section>
  );
}
