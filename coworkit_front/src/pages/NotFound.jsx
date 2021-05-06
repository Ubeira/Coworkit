import "../css/notFound.css";
import picture404 from "../assets/lula.jpeg";



// const headerItem = document.querySelector(".main");
// console.log(headerItem);
// headerItem?.classList.add("hiddenHeader");
// headerItem?.classList.remove("main");
export default function NotFound() {
    return (
        <div className="notFound">
        <h1>¡ERROR!</h1>
        <div className="notFoundMessage">
        <p>Lo sentimos hoy el es primer dia de trabajo de nuestra nueva becaria, así que es posible que este cometiendo errores </p>
        <p>Oooo Es posible que tu estés en una ruta incorrecta</p>
        <p>Mejor ve a nuestra página de inicio</p>
        </div>
        <img src={picture404} alt="picture404"/>

        </div>
    )
}
