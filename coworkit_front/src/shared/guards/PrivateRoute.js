import { Redirect } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PrivateRoute({ children }) {
  const { isUserLogged } = useAuth();
  return <>{isUserLogged ? children : <Redirect to="/login"></Redirect>}</>;
}
