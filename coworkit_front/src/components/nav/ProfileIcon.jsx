import { useEffect, useState } from "react";
import "../../css/profileIcon.css";
import useProfile from "../../shared/hooks/useProfile";
import defaultUserPhoto from "../../assets/defaultImg.svg";

export default function ProfileIcon() {
    // const {userInfo, setUserInfo}=useProfile()
    // const[userData, setUserData]= useState(userInfo)

    return (
        <div className="profileIcon">
            
            <img  src={defaultUserPhoto} alt="profile"/>
            {/* <p>{userInfo?.name}</p> */}
        </div>
    )
}
