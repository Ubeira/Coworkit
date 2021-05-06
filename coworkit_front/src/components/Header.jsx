import "../css/header.css";
import NavDriver from "./nav/NavDriver";
import TitleBar from "./nav/TitleBar";

export default function Header(props) {
  return (
    <header className="main">
      <TitleBar />
      <NavDriver />
    </header>
  );
}
