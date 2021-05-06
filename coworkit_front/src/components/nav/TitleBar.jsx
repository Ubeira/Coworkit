import logoImg from "../../logo2.png";
import { Link } from "react-router-dom";

import "../../css/titleBar.css";
import ShowToLoggedInUsers from "../../shared/guards/ShowToLoggedInUsers";
import HideToLoggedInUsers from "../../shared/guards/HideToLoggedInUsers";
import Logout from "./Logout";
import ProfileIcon from "./ProfileIcon";

export default function TitleBar(props) {
  return (
    <div id="titleBar">
      <Link to="/" id="logo" title="Ir a la página principal">
        <img src={logoImg} alt="Logo Coworkit" />
      </Link>
      <div className="options">
      <ShowToLoggedInUsers>
      <Link  className="navItem titleChild" to="/profile">
      <ProfileIcon/>
      </Link>
      </ShowToLoggedInUsers>
      <ShowToLoggedInUsers>
      <a className="navItem titleChild">
        <Logout/>
      </a>
      </ShowToLoggedInUsers>
        <HideToLoggedInUsers>
        <Link  className="navItem titleChild"  to="/login">
          Entrar
        </Link>
        </HideToLoggedInUsers>

        <HideToLoggedInUsers>
        <Link className="navItem titleChild" to="/register">
          Registrarse
        </Link>
        </HideToLoggedInUsers>
      </div>
    </div>
  );
}
