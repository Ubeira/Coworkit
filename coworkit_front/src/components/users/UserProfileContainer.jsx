import React from 'react'
import useProfile from '../../shared/hooks/useProfile';
import UserEditableProfile from './UserEditableProfile'
import UserProfileInfo from './UserProfileInfo'

export default function UserProfileContainer() {
    const{activeForm,toogleForm,userInfo,showAddPhotoModal,showDeletePhotoModal,enablePasswordModal,saveNewProfileInfo}=useProfile();
    return (
        <>
{!activeForm && <UserProfileInfo enableProfileEdition ={toogleForm} userInfo={userInfo} />}

{activeForm && <UserEditableProfile showAddPhotoModal={showAddPhotoModal} 
showDeletePhotoModal={showDeletePhotoModal}  disableProfileEdition={toogleForm}  
saveNewProfileInfo={saveNewProfileInfo}  userInfo={userInfo} enablePasswordModal={enablePasswordModal} />     
}
        </>
    )
}
