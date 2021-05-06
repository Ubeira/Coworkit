import useProfile from "../../shared/hooks/useProfile";
import InfoModal from "../modales/InfoModal";


export default function InfoModalsGroup() {
const{activeInfoChangePasswordModal,signOut,activeInfoChangeEmailModal}=useProfile();
    return (
        <>
 <InfoModal active={activeInfoChangePasswordModal} title={"¡Atención!"} agreeAction={signOut}
 content={"Inicia nuevamente sesión con tu nueva contraseña"}/>
 <InfoModal active={activeInfoChangeEmailModal} title={"¡Atención!"} agreeAction={signOut}
 content={"Se ha enviado un correo para poder confirmar el cambio de email"}/>
<div className="profileInfo"></div> 
        </>
    )
}
