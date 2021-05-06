
import "./../../css/modales/photoModal.css";
import useProfile from "../../shared/hooks/useProfile";
import PhotoModal from "./PhotoModal";
// {/* <PhotoProfileModal active={activeAddPhotoModal}  onSubmit={addPhoto} 
// cancelAction={()=>{setActiveAddPhotoModal(false)}} modalTitle="Añade tu foto de usuario 📸👤"/> */}

export default function PhotoProfileModal()  {
    const{activeAddPhotoModal,addPhoto,setActiveAddPhotoModal}=useProfile();
    return (
         <PhotoModal active={activeAddPhotoModal}  onSubmit={addPhoto} 
                     cancelAction={()=>{setActiveAddPhotoModal(!activeAddPhotoModal)}} modalTitle="Añade tu foto de usuario 📸👤"/>
    )
}
