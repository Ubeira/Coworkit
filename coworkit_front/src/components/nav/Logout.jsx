
import "../../css/logout.css";
import useAuth from '../../shared/hooks/useAuth';
import exitIcon from "../../assets/exit.svg";
export default function Logout() {
    const { signOut } = useAuth();
    return (<div  className="logout" onClick={signOut}>
        <img src={exitIcon} alt=""/>
    </div>)
}
