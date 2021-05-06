import ReservationFrame from "./ReservationFrame";

export default function ReservationList({ bookingsInfo, type, actionButton }) {
  return (
    <div className="reservationList ">
      {bookingsInfo.length > 0 &&
        bookingsInfo.map((reservationInfo) => {
          return (
            <ReservationFrame
              type={type}
              key={reservationInfo.id}
              reservationInfo={reservationInfo}
              actionButton={actionButton}
            />
          );
        })}
    </div>
  );
}
