import useProfile from "../../shared/hooks/useProfile";
import { FormChangePassword } from "../users/FormUtils";
import Modal from "./Modal";

export default function PasswordModal() {
    const{activeChangePasswordModal,setActiveChangePasswordModal,changePassword,errorChangePassword}=useProfile();
const title= "Cambiar contraseña"
    return (
        <Modal title={title} content={<FormChangePassword  onSubmit={changePassword} resultAPI={errorChangePassword} />} active={activeChangePasswordModal} 
        firstBtn={true} textBtn={"Cancelar"} styleBtn="secondary" actionBtn={()=>{setActiveChangePasswordModal(!activeChangePasswordModal)}}/>
    )
}

