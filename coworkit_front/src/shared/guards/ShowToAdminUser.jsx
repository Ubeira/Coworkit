import useAuth from "../hooks/useAuth";

export default function ShowToAdminUser({children}) {

const { isUserLogged, userData } = useAuth();

return <>{(isUserLogged && userData?.admin )? children : null}</>;
}
