import { Suspense, lazy } from "react";
import LogoGif from "../components/LogoGif";

import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { getSpaceInfo } from "../http/spaces.js";
import useBookings from "../shared/hooks/useBookings.js";
import "../css/spaces/space.css";
import Description from "../components/spaces/Description.jsx";
const PhotosCarrousel = lazy(() =>
  import("../components/spaces/PhotosCarrousel.jsx")
);
const Reviews = lazy(() => import("../components/spaces/Reviews.jsx"));
const FormSpace = lazy(() => import("../components/spaces/FormSpace.jsx"));

export default function Space() {
  let { spaceId } = useParams();
  const { space, setSpace } = useBookings();

  //Cargo la información del espacio cada vez que entro en la página spaces/:id
  useEffect(() => {
    const load = async () => {
      const data = await getSpaceInfo(spaceId);
      console.log(data);
      setSpace(data);
    };
    load();
  }, [spaceId, setSpace]);
  return (
    <Suspense fallback={<LogoGif />}>
      <div className="spaceFather">
        <section className="SpaceContainer">
          <PhotosCarrousel
            spaceId={spaceId}
            name={space?.name}
            photos={space?.photos}
            score={space?.score}
          />
          <FormSpace
            price={space?.price}
            spaceId={spaceId}
            spaceName={space?.name}
          />
          <Reviews spaceId={spaceId} />
          <Description
            description={space?.description}
            capacity={space?.capacity}
            price={space?.price}
            type={space?.type}
          />
        </section>
      </div>
    </Suspense>
  );
}
