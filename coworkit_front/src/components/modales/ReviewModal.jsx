import { FormCreateReview } from "../users/FormUtils";
import Modal from "./Modal";
import useBookings from "../../shared/hooks/useBookings";

export default function ReviewModal({ modalTitle }) {
  const { sendReview, activeReviewModal, setActiveReviewModal } = useBookings();

  return (
    <div className="reporModal">
      <Modal
        title={modalTitle}
        content={<FormCreateReview onSubmit={sendReview} />}
        styleBtn="secondary"
        active={activeReviewModal}
        firstBtn={true}
        textBtn="Cancelar"
        actionBtn={() => {
          setActiveReviewModal(!activeReviewModal);
        }}
      />
    </div>
  );
}
