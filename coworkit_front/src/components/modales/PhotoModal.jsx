
import { FormPhoto } from "../users/FormUtils";
import Modal from "./Modal";
import "./../../css/modales/photoModal.css";


export default function PhotoModal({active, onSubmit, cancelAction,modalTitle})  {

    return (
        <div className="photoModal">
            <Modal title= {modalTitle} content={<FormPhoto onSubmit={onSubmit} />} 
            styleBtn="secondary" active={active} firstBtn={true} textBtn="Cancelar" actionBtn={cancelAction} 
            />
        </div>
    )
}
