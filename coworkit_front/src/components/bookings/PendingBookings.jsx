
import useBookings from "../../shared/hooks/useBookings";
import FormSpaceModal from "../modales/FormSpaceModal";
import ReportModal from "../modales/ReportModal"
import BookingsNavBar from "./BookingsNavBar";
import ReservationList from "./ReservationList"




export default function PendingBookings() {
  const{ pendingBookingsInfo,editReservation}=useBookings();

    return (<>
<BookingsNavBar/>
<ReservationList type="pending" bookingsInfo={pendingBookingsInfo} actionButton={editReservation} />
</>
    )
}
