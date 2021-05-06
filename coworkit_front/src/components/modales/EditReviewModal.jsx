
import useBookings from "../../shared/hooks/useBookings";
import {  FormEditReview } from "../users/FormUtils";
import Modal from "./Modal";


export default function EditReviewModal({active, onSubmit, cancelAction,modalTitle})  {
    const{ activeEditReviewModal, changeReview, reviewInfo,setEditReviewOption}=useBookings(); 

    return (
        <>
        <div className="reporModal">
            <Modal title= {modalTitle} content={<FormEditReview onSubmit={changeReview} reviewInfo={reviewInfo}/>} 
            styleBtn="secondary" active={activeEditReviewModal} firstBtn={true} textBtn="Cancelar" actionBtn={()=>{setEditReviewOption(!activeEditReviewModal)}} 
            />
        </div>
        </>
    )
}
