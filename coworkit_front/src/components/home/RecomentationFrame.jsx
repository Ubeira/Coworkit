import { Parallax } from "react-parallax";
import carretera from "../../assets/principal/Carretera.jpg";
import edificio from "../../assets/principal/Edificio_alto.jpg";
import julian from "../../assets/principal/Julian.jpeg";
import raul from "../../assets/principal/raul.jpeg";
import Stars from "../spaces/Stars";
import "../../css/Home/recomentationsFrame.css";

export default function RecomentationFrame({ infoSpace, position, actionBtn }) {
  const space = infoSpace[Number(position)];
  const numStars = Math.ceil(Number(space?.score));

  return (
    <article className="recomendationFrame">
      <section className="headerSpace">
        <h2>{space?.name}</h2>
        <div>
          <Stars number={numStars} />
        </div>
      </section>
      <img src={space?.url} alt="recomended space" />
      <section className="infoRecomendation">
        <p>{space?.description}</p>
        <div className="infoToRent">
          <h3>{`Precio: ${space?.price}`} €/día</h3>
          <button
            className="button red submitButton"
            onClick={() => actionBtn(space.ID)}
          >
            Alquilar
          </button>
        </div>
      </section>
    </article>
  );
}
