
import { FormCreateReport } from "../users/FormUtils";
import {useState } from "react";
import Modal from "./Modal";
import PhotoModal from "./PhotoModal";
import useBookings from "../../shared/hooks/useBookings";

export default function ReportModal({modalTitle})  {
    const{ sendReport,activeReportModal,setActiveReportModal}=useBookings();
const[activeAddPhotoModal, setActiveAddPhotoModal]=useState(false); 
const[photoReport, setPhotoReport]=useState(null);
const addPhoto=(data)=>{
setPhotoReport(data);
setActiveAddPhotoModal(!activeAddPhotoModal);
}

const sendFormReport=(data)=>{
    sendReport({...data,photo:photoReport?.photo[0]?? null});
}


    
    return (
        <>
        <PhotoModal active={activeAddPhotoModal} onSubmit={addPhoto} cancelAction={()=>{setActiveAddPhotoModal(!activeAddPhotoModal)}} modalTitle="Añade la foto de tu indidencia"/> 
        <div className="reporModal">
            <Modal title= {modalTitle} content={<FormCreateReport onSubmit={sendFormReport} addPhotoButtonAction={()=>setActiveAddPhotoModal(!activeAddPhotoModal)}/>} 
            styleBtn="secondary" active={activeReportModal} firstBtn={true} textBtn="Cancelar" actionBtn={()=>{setActiveReportModal(!activeReportModal)}}
            />
        </div>
        </>
    )
}
