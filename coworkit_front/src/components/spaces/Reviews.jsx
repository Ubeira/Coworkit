import { useEffect, useState } from "react";
import { getReviewInfo } from "../../http/reviews";
import Slider from "./Slider";
import Stars from "./Stars";

export default function Reviews(props) {
  const [reviewInfo, setReviewInfo] = useState([]);

  useEffect(() => {
    getReviewInfo(props.spaceId).then((data) => {
      setReviewInfo(data);
    });
  }, [props.spaceId]);

  return (
    <section className="reviewSlider">
      <header>
        <h2>Valoraciones</h2>
      </header>
      <Slider
        Photos={reviewInfo?.map((review, index) => {
          return (
            <section className="reviewCard" key={`review${index}`}>
              <header>
                <div>
                  <Stars number={review.score} />
                </div>
                <img
                  src={`http://${review.photo.slice(6)}`}
                  alt="foto avatar"
                />
                <h4>
                  {review.name} {review.surname}
                </h4>
              </header>
              <p>{review.comment}</p>
            </section>
          );
        })}
      />
    </section>
  );
}
