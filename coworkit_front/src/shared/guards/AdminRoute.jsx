import useAuth from "../hooks/useAuth";
import { Redirect } from "react-router-dom";

export default function AdminRoute({children}) {

const { isUserLogged, userData } = useAuth();

return <>{(isUserLogged && userData?.admin )? children : <Redirect to="/login"></Redirect>}</>;
}
