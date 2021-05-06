import{Button, IconButton} from "@material-ui/core"
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import LockIcon from '@material-ui/icons/Lock';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import UserInfoForm from "./UserInfoForm";


export default function UserEditableProfile({showAddPhotoModal,showDeletePhotoModal, disableProfileEdition, saveNewProfileInfo, userInfo,enablePasswordModal}) {

    return (
      <>
     <IconButton onClick={showAddPhotoModal} className="cameraIcon" size="medium" variant="contained"
        color ="primary" aria-label="photoIcon">
        <AddAPhotoIcon variant="outlined" fontSize="small" style={{ color: "white" }}  />
      </IconButton>
      <IconButton onClick={showDeletePhotoModal}  className=" deleteIcon" size="medium" variant="contained"
        color ="primary" aria-label="deleteIcon">
        <DeleteForeverIcon variant="outlined" fontSize="small" style={{ color: "white" }}  />
      </IconButton>

      <div className="buttonContainer">

        <Button onClick={disableProfileEdition} className="userCancelButton" 
        variant="outlined" color ="secondary" size="small" 
        startIcon={<CancelIcon />}>Cancelar</Button>
        
       <Button onClick={enablePasswordModal} className="userPaswordEditButton" variant="outlined"color ="primary"
       size="small" startIcon={<LockIcon />}>Editar contraseña</Button>
      </div>

      <UserInfoForm updateUserInfo={saveNewProfileInfo} userInfo={userInfo}/>
      </>
    )
}
