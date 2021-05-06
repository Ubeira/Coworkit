import useProfile from "../../shared/hooks/useProfile";


export default function UserPhoto() {
  const{userInfo}=useProfile();

    return (
        <div className="profileInfoPhoto">
        {/* <img style={{width: "200px"}}src={userInfo?.photo} /> */}
        <img style={{width: "200px", height:"200px"}}src={userInfo?.photo} 
        alt="foto" />
      </div>
    )
}
