import { InputInfo } from "./FormUtils";

export default function InfoUser({userInfo}) {
   
    return (<div className="infoUser">   
  
      <InputInfo label="Nombre" value={ userInfo?.name}/>
      <InputInfo label="Apellido" value={ userInfo?.surname}/>
      <InputInfo label="Email" value={ userInfo?.email}/>
      <InputInfo label="Empresa" value={ userInfo?.company}/>
      <InputInfo label="NIF" value={ userInfo?.nif}/>
      <InputInfo label="Teléfono" value={ userInfo?.tel}/>
    </div>
    )
  }