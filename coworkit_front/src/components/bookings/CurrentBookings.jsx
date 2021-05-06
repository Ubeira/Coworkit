import useBookings from "../../shared/hooks/useBookings";
import ReportModal from "../modales/ReportModal";
import BookingsNavBar from "./BookingsNavBar";
import ReservationList from "./ReservationList";

export default function CurrentBookings() {
  const { activeReportOfSpace, currentBookingsInfo } = useBookings();

  return (
    <>
      <BookingsNavBar />
      <ReportModal modalTitle="Reporte de incidencias" />
      <ReservationList
        type="current"
        bookingsInfo={currentBookingsInfo}
        actionButton={activeReportOfSpace}
      />
    </>
  );
}
