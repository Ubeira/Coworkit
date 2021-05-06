import "../../css/Home/recomentations.css";
import { Parallax } from "react-parallax";
import carretera from "../../assets/principal/Carretera.jpg";
import edificio from "../../assets/principal/Edificio_alto.jpg";
import julian from "../../assets/principal/Julian.jpeg";
import raul from "../../assets/principal/raul.jpeg";
import RecomentationFrame from "./RecomentationFrame";
import { useEffect, useState } from "react";
import { filterSpaces } from "../../http/spaces";
import { useHistory } from "react-router-dom";

const infoSpace = {
  name: "nombre espacio",
  score: 7,
  url: "https://source.unsplash.com/random/400x400",
  description: "badawfwafawfawfwafawfawf",
  price: 524,
};
const queryString = {
  score: 0,
  order: "score",
  direction: "DESC",
};
export default function Recomentations() {
  const [infoRecomendation, setInfoRecomendation] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getRecomendations = async () => {
      const reservations = await filterSpaces(queryString);
      setInfoRecomendation(reservations);
    };
    getRecomendations();
  }, []);

  const goToDetailOfSpace = (spaceId) => {
    history.push(`/spaces/${spaceId}`);
    // console.log(`/spaces/${spaceId}`);
  };

  return (
    <>
      <article className="recomendationsContainer">
        <h1 id="ourRecomendation" className="title">Recomendaciones</h1>

        <section className="recomendations">
          <RecomentationFrame
            infoSpace={infoRecomendation}
            position="0"
            actionBtn={goToDetailOfSpace}
          />
          <RecomentationFrame
            infoSpace={infoRecomendation}
            position="1"
            actionBtn={goToDetailOfSpace}
          />
          <RecomentationFrame
            infoSpace={infoRecomendation}
            position="2"
            actionBtn={goToDetailOfSpace}
          />
        </section>
      </article>
    </>
  );
}
