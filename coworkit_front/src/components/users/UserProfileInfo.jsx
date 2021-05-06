import InfoUser from "./InfoUser";
import{Button} from "@material-ui/core"
import EditIcon from '@material-ui/icons/Edit';

export default function UserProfileInfo({enableProfileEdition,userInfo}) {
    return (
        <>
        <div className="buttonContainer">
        
        <Button onClick={enableProfileEdition} 
        className="userEditButton" 
        variant="contained"  color ="primary" 
        size="small" startIcon={<EditIcon />}>Editar </Button>
      </div>
       <InfoUser  userInfo={userInfo} className="infoUser"/>
        </>
    )
}
