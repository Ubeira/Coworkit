import { NavLink } from "react-router-dom";
import HideToLoggedInUsers from "../../shared/guards/HideToLoggedInUsers";
import ShowToAdminUser from "../../shared/guards/ShowToAdminUser";
import ShowToLoggedInUsers from "../../shared/guards/ShowToLoggedInUsers";
import LateralMenu from "../LateralMenu";
import NavBar from "./NavBar";

export default function NavDriver(props) {
  const itemClass = "navItem";
  const Navlinks = (
    <>
      <HideToLoggedInUsers>
        <a className={itemClass} href="/#ourRecomendation">
          Recomendaciones
        </a>
        <a className={itemClass} href="/#us">
          Nosotros
        </a>
      </HideToLoggedInUsers>
      <ShowToLoggedInUsers>
        <NavLink to="/bookings" className={itemClass}>
          Reservas
        </NavLink>
      </ShowToLoggedInUsers>
      <NavLink to="/spaces" className={itemClass}>
        Espacios
      </NavLink>
      <ShowToAdminUser>
        <NavLink to="/admin" className={itemClass}>
          Admin
        </NavLink>
      </ShowToAdminUser>
    </>
  );

  return (
    <>
      <NavBar>{Navlinks}</NavBar>
      <LateralMenu title="Menu">{Navlinks}</LateralMenu>
    </>
  );
}
