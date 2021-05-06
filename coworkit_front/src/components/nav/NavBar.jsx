import "../../css/navBar.css";

export default function NavBar(props) {
  return <nav className="nav">{props.children}</nav>;
}
