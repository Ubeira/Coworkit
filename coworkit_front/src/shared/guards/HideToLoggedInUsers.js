import useAuth from "../hooks/useAuth";

export default function HideToLoggedInUsers({ children }) {
  const { isUserLogged } = useAuth();
  console.log(isUserLogged);
  return <>{!isUserLogged ? children : null}</>;
}
