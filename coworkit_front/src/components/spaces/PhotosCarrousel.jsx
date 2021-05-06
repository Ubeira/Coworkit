import Slider from "./Slider";
import Stars from "./Stars";

/**
 *
 * @param {Object} props-name:nombre del espacio, photos: array con la ubicación de las fotos del espacio, score: puntuación media del espacio
 */
export default function PhotosCarrousel(props) {
  return (
    <article className="articleContainerSpaces spaceCarousel">
      <header>
        <h2>{props?.name}</h2>
        <Stars number={Math.floor(props?.score) + 1} />
      </header>
      <Slider
        Photos={props?.photos?.map((photo, index) => {
          return (
            <img key={`photoSpace${index}`} src={photo} alt="foto Espacio" />
          );
        })}
      />
    </article>
  );
}
