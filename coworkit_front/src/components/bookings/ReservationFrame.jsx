import "../../css/bookings/reservationFrame.css";
import moment from "moment";
moment.locale();
export default function ReservationFrame({
  type,
  reservationInfo,
  actionButton,
}) {
  const reviewId = reservationInfo?.reviewId ?? 0;
  const editReviewOption =
    type === "finished" && reviewId ? 1 : type === "finished" ? 2 : 3;
  let pendingButtonActive = false;

  function distanceDateInHours(startDate, endDate) {
    return (endDate.getTime() - startDate.getTime()) / (1000 * 3600);
  }
  if (type === "pending") {
    pendingButtonActive = true;
    console.log(
      "La reserva se hizo hace: ",
      distanceDateInHours(new Date(reservationInfo.orderDate), new Date())
    );
    if (
      distanceDateInHours(new Date(reservationInfo.orderDate), new Date()) >= 48
    ) {
      pendingButtonActive = false;
    }
    console.log(
      "La reserva sba a empezar en: ",
      distanceDateInHours(new Date(), new Date(reservationInfo.startDate))
    );
    if (
      distanceDateInHours(new Date(), new Date(reservationInfo.startDate)) <= 48
    ) {
      pendingButtonActive = false;
    }
  }

  return (
    <div className="reservationFrame">
      <div className="infoSpaceReservation">
        <h2>{reservationInfo?.spaceName}</h2>
        <img
          className="photoSpaceReservation"
          src={reservationInfo.spacePhoto}
          alt="space reservation"
        />
      </div>

      <div className="infoReservation">
        <div className="inputReservation startDate">
          <label htmlFor="startDate">Fecha inicio</label>
          <input
            id="DateReservation"
            name="startDate"
            disabled
            value={moment(reservationInfo?.startDate).format("L")}
          />
        </div>
        <div className="inputReservation endDate">
          <label htmlFor="endDate">Fecha fin</label>
          <input
            id="endDateReservation"
            name="endDate"
            disabled
            value={moment(reservationInfo?.endDate).format("L")}
          />
        </div>
        <div className="inputReservation typePack">
          <label htmlFor="pack">Complemento</label>
          <input
            id="packReservation"
            name="pack"
            disabled
            value={reservationInfo?.packName}
          />
        </div>
      </div>
      <div className="actionReservationButton">
        {type === "current" && (
          <button
            className="button lightblue submitButton"
            onClick={() => {
              actionButton(reservationInfo.spaceId);
            }}
          >
            REPORTE
          </button>
        )}
        {editReviewOption === 2 && (
          <button
            className="button rebeccapurple submitButton"
            onClick={() => {
              actionButton(reservationInfo.spaceId);
            }}
          >
            VALORAR
          </button>
        )}
        {editReviewOption === 1 && (
          <button
            className="button rebeccapurple submitButton"
            onClick={() => {
              actionButton(reservationInfo.spaceId, reservationInfo.reviewId);
            }}
          >
            Editar Valoración
          </button>
        )}
        {pendingButtonActive && (
          <button
            className="button blue submitButton"
            onClick={() => {
              actionButton(reservationInfo, "change");
            }}
          >
            MODIFICAR
          </button>
        )}
        {pendingButtonActive && (
          <button
            className="button red submitButton"
            onClick={() => {
              actionButton(reservationInfo, "delete");
            }}
          >
            ELIMINAR
          </button>
        )}
      </div>
    </div>
  );
}
