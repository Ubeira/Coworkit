import "../css/lateralMenu.css";
import "../css/hamburger.css";

function toggleMenu() {
  const nav = document.querySelector("#menu");
  const button = document.querySelector(".hamburger");
  const overlay = document.querySelector("#overlay");

  if (nav.classList[0] === undefined) {
    nav.classList.add("open");
    button.classList.add("is-active");
    overlay.classList.add("enabled");
  } else {
    nav.classList.remove("open");
    button.classList.remove("is-active");
    overlay.classList.remove("enabled");
  }
}

export default function LateralMenu(props) {
  return (
    <>
      <div id="overlay" onClick={toggleMenu} />
      <button
        id="navButton"
        className="hamburger hamburger--vortex"
        type="button"
        onClick={toggleMenu}
      >
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </button>
      <div id="menu">
        <h1 id="menuTitle">{props.title}</h1>
        {props.children.props.children.map((item, index) => {
          return (
            <div className="menuItem" key={"menuItem" + index}>
              {item}
            </div>
          );
        })}
      </div>
    </>
  );
}
