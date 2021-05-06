import useProfile from "../../shared/hooks/useProfile";
// import { FormChangePassword } from "../users/FormUtils";
import Modal from "./Modal";

// <Modal title={title} content={<FormChangePassword  onSubmit={changePassword} resultAPI={errorChangePassword} />} active={activeChangePasswordModal} 
// firstBtn={true} textBtn={"Cancelar"} styleBtn="secondary" actionBtn={()=>{setActiveChangePasswordModal(!activeChangePasswordModal)}}/>
export default function FormSpaceModal() {
    // const{activeChangePasswordModal,setActiveChangePasswordModal,changePassword,errorChangePassword}=useProfile();
const title= "Modifica tu reserva"
    return (
        <Modal title={title} content={<h1>hola</h1>} active={true} 
        firstBtn={true} textBtn={"Cancelar"} styleBtn="secondary" actionBtn={()=>{console.log("actionBtn")}}/>
    )
}

