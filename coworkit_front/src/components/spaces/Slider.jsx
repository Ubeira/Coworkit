import ReactSwipe from "react-swipe";
import nextArrow from "../../assets/iconos/next.svg";
import prevArrow from "../../assets/iconos/prev.svg";
export default function Slider(props) {
  let reactSwipeEl;
  return (
    <div className="carouselContainer ">
      <button className=" prevButton " onClick={() => reactSwipeEl.prev()}>
        {/*<ChevronLeftIcon className="leftIcon" />*/}
        <img src={prevArrow} alt="prevArrow" className="prevArrow" />
      </button>
      <ReactSwipe
        className="carousel materialUi"
        swipeOptions={{ continuous: true }}
        childCount={props.Photos?.length}
        ref={(el) => (reactSwipeEl = el)}
      >
        {props?.Photos}
      </ReactSwipe>
      <button className=" nextButton " onClick={() => reactSwipeEl.next()}>
        <img src={nextArrow} alt="nextArrow" className="nextArrow" />
        {/*<ChevronRightIcon className="rightIcon" />*/}
      </button>
    </div>
  );
}
