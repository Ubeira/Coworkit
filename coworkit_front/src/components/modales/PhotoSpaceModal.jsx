import { FormDeleteSpacePhotos, FormPhoto } from "../users/FormUtils";
import Modal from "./Modal";
import "./../../css/modales/photoModal.css";
//https://source.unsplash.com/random/400x400

export default function PhotoSpaceModal({
  active,
  onSubmit,
  cancelAction,
  modalTitle,
  photoSpaceList,
}) {
  return (
    <div className="photoModal">
      <Modal
        title={modalTitle}
        content={
          <FormDeleteSpacePhotos
            photoSpaceList={photoSpaceList}
            onSubmit={onSubmit}
          />
        }
        styleBtn="primary"
        active={active}
        firstBtn={true}
        textBtn="Cancelar"
        actionBtn={cancelAction}
      />
    </div>
  );
}
