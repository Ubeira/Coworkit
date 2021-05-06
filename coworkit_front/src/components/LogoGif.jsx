import "../css/logo.css";
import logo from "../assets/logo.gif";

export default function LogoGif() {
  return (
    <aside className="logoContainer">
      <img className="logoGif" src={logo} alt="loading" />
      <h2>Cargando...</h2>
    </aside>
  );
}
