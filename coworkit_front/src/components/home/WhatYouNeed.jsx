import { Link } from "react-router-dom";
import useBookings from "../../shared/hooks/useBookings";

export default function WhatYouNeed() {
  const { spaceTypes, imageTypeSpaces, setFilter, filter } = useBookings();

  return (
    <>
      <header>
        <h1 className="principal">¿Qué necesitas?</h1>
      </header>
      <article className="whatYouNeed">
        {spaceTypes.map((type, index) => {
          return (
            <Link
              onClick={async () => {
                await setFilter({ ...filter, type });
              }}
              to="/spaces"
              key={type}
            >
              <figure>
                <img src={imageTypeSpaces[index]} alt={`foto de ${type}`} />
                <figcaption>{type}</figcaption>
              </figure>
            </Link>
          );
        })}
      </article>
    </>
  );
}
