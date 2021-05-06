import { Link } from "react-router-dom";
import Stars from "../Stars";
export default function SpaceCard({ space }) {
  const spaceCardStyle = {
    backgroundImage: `url(${space.url})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };
  return (
    <Link
      to={`spaces/${space.ID}`}
      className="spaceCard"
      style={spaceCardStyle}
    >
      <div>
        <Stars number={Math.ceil(space.score)} />
      </div>

      <h2>{space.name}</h2>
    </Link>
  );
}
