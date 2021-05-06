
import useProfile from "../../shared/hooks/useProfile";
import Modal from "./Modal";

export default function DeletePhotoModal() {
    const{activeDeletePhotoModal,deleteUserPhoto,setActiveDeletePhotoModal}=useProfile();
const title= "Eliminar foto"
const content = "Esta acción no podrá ser revertida";

    return (
       <Modal title={title} content={content} active={activeDeletePhotoModal} 
       firstBtn={true} textBtn={"Sí"} actionBtn={deleteUserPhoto} 
       secondBtn={true} textSecBtn={"No"} actionSecBtn={()=>{setActiveDeletePhotoModal(!activeDeletePhotoModal)}} />
    )
}
