import  React,{ useEffect, useState} from 'react';
import { changePasswordInAPI, getUserInfo, updateUserInfo } from '../../http/users';
import useAuth from '../hooks/useAuth';


// Se crean un contexto y su respectivo proveedor para tener a disposición de todo el componente de bookings las funciones usadas
// No es estrictamente necesario pero facilia la legibilidad del código
export const ProfileContext = React.createContext();
const ProfileContextProvider= ProfileContext.Provider;

//Este objeto se usa para darle una valor inicial el State de userInfo
const initialState ={admin: 0,
  company: "",
  email: "",
  name: "",
  nif: "",
  photo: "http://localhost:3000/static/uploads/users/defaultImg.svg",
  registration_date: "",
  surname: "",
  tel: ""
}


export function ProfileProvider({ children }) {
  //Este hook es para traer del context authContext lo que se necesita en la página de profile
  const {userData, signOut} =useAuth();

  //Tiene la función de almacenar la información del usuario que  inicia sesión
  const [userInfo, setUserInfo]=useState(initialState);

  //Esto gestiona la posibilidad de visualizar el formulario para editar los datos de usuario
  const[activeForm, setActiveForm]=useState(false); 

  //Esto gestiona la foto que se envia cada vez que se cambia de foto de perfil
  const[photoFile, setPhotoFile]=useState(null);

  //Este estate contiene el mensage de error que se mostrará en el formulario de cambio de contraseña en caso de error
  const[errorChangePassword, setErrorChangePassword]=useState(null); 

  //Los siguientes  States tienen la función de gestionar la visibiliad de los modales
  const[activeAddPhotoModal, setActiveAddPhotoModal]=useState(false); 
  const[activeDeletePhotoModal, setActiveDeletePhotoModal]=useState(false);
  const[activeChangePasswordModal, setActiveChangePasswordModal]=useState(false);
  const[activeInfoChangePasswordModal, setActiveInfoChangePasswordModal]=useState(false);
  const[activeInfoChangeEmailModal, setActiveInfoChangeEmailModal]=useState(false);

  //Se obtiene el Id que inicia sesión
  const userId =userData?.id;
  
  /**
 * @info Esta función es la engargada de llamar a la función que hace la consulta de la información del usuario que ha iniciado sesión 
 * @return{Object} Devuelve un objeto con la linformación del usuario
 */
  async function userQueryApi(){
  try {
    
    const userDataApi = await getUserInfo(userData?.id);
    setUserInfo(userDataApi)   
  } catch (error) {
    console.error(error.message);
  }
   
  };
  /**
 * @info Esta función es la engargada de llamar a la función que hace la consulta  de tipo POST para modificar la información del usuario
 * @param {String} reservationType Solo són validos lo valores "finished", "pending" y "current"
 */
  async function  updateInfoInApi(newProfileInfo){
    
    if(newProfileInfo.name){
    try {
      
      await updateUserInfo(newProfileInfo); 
    } catch (error) {
      console.error(error.message);
    }
    
    }
  };
  //Al renderrizar el componente se llamará a la función que se encarga de obtner la información del usuario
  //posteriormente esta información se usará en el formulario que muestra los campos ya cubiertos con dicha información
  useEffect(()=>{
    userQueryApi();
  },[]);
  useEffect(()=>{
    userQueryApi();
  },[userInfo]);
  
  /**
 * @info Esta función muestra el modal encargado de añadir una foto de perfil nueva
 */
    const showAddPhotoModal = () => {
      setActiveAddPhotoModal(!activeAddPhotoModal);
    };
  /**
 * @info Esta función muestra el modal encargado de eliminar una foto de perfil actual
 */
    const showDeletePhotoModal = () => {
      setActiveDeletePhotoModal(!activeDeletePhotoModal);
    };
  /**
 * @info Esta función se ejecuta al aceptar la opción de eliminar foto de usuario
 */  
    const deleteUserPhoto=()=>{
      const userInfoWithOutPhoto ={...userInfo}
      delete userInfoWithOutPhoto.photo;
      updateInfoInApi({userId,...userInfoWithOutPhoto,deletePhoto:1});
      userQueryApi();
      setActiveDeletePhotoModal(!activeDeletePhotoModal)
    }
  
      /**
 * @info Esta función alterna la visualización del formulario de edición de información de usuario
 */
    const toogleForm = () => {
      setActiveForm(!activeForm);
    };

  /**
 * @info Esta función se ejecuta al aceptar la opción guardar en el formulario de edición de información de usuario
 */
  const saveNewProfileInfo = async(data)=>{
  
    setActiveForm(false);
      await updateInfoInApi({userId,...data});
      if(data?.email!==userInfo?.email ){
        setActiveInfoChangeEmailModal(true)
      }else{ 
        await userQueryApi();
      }
  }
    /**
 * @info Esta función muestra el modal encargado de cambiar contraseña
 */
  const enablePasswordModal =()=>{
    setActiveChangePasswordModal(true);
  }

   /**
 * @info Esta función se ejecuta al aceptar la opción cambiar contraseña en el formulario de edición de contraseña
 */ 
  const changePassword = async(data)=>{
  try {
    const result =await changePasswordInAPI({userId,...data});
    if(result.status==="error"){
      setErrorChangePassword(result)
    }else{
      setActiveChangePasswordModal(false);
      setActiveInfoChangePasswordModal(true);
    }
  } catch (error) {
    console.error(error.message);
  }
  }
  
  
   /**
 * @info Esta función se ejecuta al aceptar la opción añadir nueva foto de usuario
 */ 
  const addPhoto = async(data)=>{
  console.log(data);
    setPhotoFile(data.photo);
    setActiveAddPhotoModal(false);
    console.log(data.photo);
    console.log({userId,...userInfo,photo:photoFile});
     await updateInfoInApi({userId,...userInfo,photo:data.photo});
     await userQueryApi();
    
  }


    return (
        <ProfileContextProvider
        value={{userInfo, setUserInfo,activeForm, setActiveForm,photoFile, setPhotoFile,errorChangePassword, setErrorChangePassword,
          activeAddPhotoModal, setActiveAddPhotoModal,activeDeletePhotoModal, setActiveDeletePhotoModal,activeChangePasswordModal, setActiveChangePasswordModal,
          activeInfoChangePasswordModal, setActiveInfoChangePasswordModal, activeInfoChangeEmailModal, setActiveInfoChangeEmailModal,
          initialState,userId,signOut,showAddPhotoModal,showDeletePhotoModal, deleteUserPhoto, toogleForm ,saveNewProfileInfo, enablePasswordModal,
          changePassword,addPhoto,userQueryApi,updateInfoInApi,userData,getUserInfo
        }}
        >
          {children}
        </ProfileContextProvider>
    )
}
