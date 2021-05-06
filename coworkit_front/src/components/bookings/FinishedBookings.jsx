import useBookings from "../../shared/hooks/useBookings";
import EditReviewModal from "../modales/EditReviewModal";
import ReviewModal from "../modales/ReviewModal";
import BookingsNavBar from "./BookingsNavBar";
import ReservationList from "./ReservationList"


export default function FinishedBookings() {
  const{ finishedBookingsInfo, activeReviewOfSpace}=useBookings();  

    return (<>
    <BookingsNavBar/>
    <ReviewModal modalTitle="Valoración de Espacio" />
    <EditReviewModal modalTitle="Edición de Valoración"/>
    <ReservationList type="finished" bookingsInfo={finishedBookingsInfo} actionButton={activeReviewOfSpace}/>
</>
    )
}
