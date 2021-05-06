import { useEffect, useState, Suspense, lazy } from "react";
import { deletePhotoSpace, editSpace, newSpace } from "../../http/spaces";
import "../../css/spaces/configurateSpace.css";
import LoadingGif from "../LoadingGif";
import useAdminContext from "../../shared/hooks/useAdminContext";
import { useHistory } from "react-router-dom";

const CreateSpaceForm = lazy(() => import("./CreateSpaceForm"));
// import CreateSpaceForm from './CreateSpaceForm';

const EditSpaceForm = lazy(() => import("./EditSpaceForm"));
// import EditSpaceForm from './EditSpaceForm';

const PhotoSpaceModal = lazy(() => import("../modales/PhotoSpaceModal"));

export default function ConfigurateSpace() {
  const history = useHistory();
  const [activeSpaceModal, setActiveSpaceModal] = useState(false);
  const [errorInput, setErrorInput] = useState(false);
  const [spaceInfo, setSpaceInfo] = useState(null);
  const [spacePhotos, setSpacePhotos] = useState([]);
  const [previewImageContainers, setPreviewImageContainers] = useState([]);
  const {
    spaceEdition,
    setSpaceEdition,
    spaceData,
    setSpaceData,
    query,
    setQuery,
  } = useAdminContext();
  //Esta función eliminar una photo en la BBDD mandandole el sólo el nombre de la foto sin extensión de archivo
  async function sendList(url) {
    await deletePhotoSpace(spaceInfo.ID, url);
  }
  //Esta función toma los datos del espacio del id enviado por props
  function getInfoSpaceFromApi() {
    setSpaceInfo(spaceData);
    setSpacePhotos(spaceData.photos);
  }

  useEffect(() => {
    setPreviewImageContainers(document.querySelectorAll(".imagePreviewImg")); //Esta selaccion se usará para limpiar el cuadro de previsualización de las imágenes
    getInfoSpaceFromApi();
    return () => {
      setSpaceData({});
    };
  }, []);

  //esta función es para limpiar el cuadro d eprevisualización de imágenes
  const cleanpreviewImageContainers = () => {
    previewImageContainers.forEach((container) => {
      container.setAttribute("src", "");
      container.style.display = null;
    });
  };
  //Esta funsión es para modificar en la BBDD la información de un espacio
  const changeSpace = async (data) => {
    await editSpace(data, spaceInfo.ID);
    getInfoSpaceFromApi();
    query === "?" ? setQuery("?id") : setQuery("?");
    history.push("/admin/spaces");
  };
  //son los tipos de espacios que hay en la BBDD.
  const spaceTypes = [
    "Sala de reuniones",
    "Oficina compartida",
    "Oficina individual",
    "Sala audiovisual",
    "Auditorio",   
  ];

  //Esa función garantiza que se envia una de las opciones del array de tupos de espacios
  const categotyErrorMessage =
    "La categoria seleccionada no es una categoria válida";
  const selectInputValidator = (data) => {
    if (spaceTypes.includes(data.type)) {
      setErrorInput(false);
      addSpace(data);
    } else {
      setErrorInput(true);
    }
  };
  //Esta función hace la petición de tipo POST en sel servidor para añadir un nuevo espacio
  const addSpace = async (data) => {
    await newSpace(data);
    getInfoSpaceFromApi();
    cleanpreviewImageContainers();
  };
  //Esta función se usa pata eliminar de forma iterativa en la BBDD las fotos que se eligieron en el modal
  const listPhotosToDelete = async (data) => {
    const listOfPhotos = Object.values(data).filter((photo) => photo[0]);
    listOfPhotos.map((photo) => sendList(photo));
    setActiveSpaceModal(!activeSpaceModal);
    getInfoSpaceFromApi();
  };
  return (
    <Suspense fallback={<LoadingGif />}>
      <PhotoSpaceModal
        active={activeSpaceModal}
        onSubmit={listPhotosToDelete}
        photoSpaceList={spacePhotos}
        cancelAction={() => setActiveSpaceModal(!activeSpaceModal)}
        modalTitle={"FOTOS GUARDADAS"}
      />
      {!spaceEdition && (
        <CreateSpaceForm
          editButtonAction={() => setSpaceEdition(!spaceEdition)}
          createButtonACtion={selectInputValidator}
          spaceTypes={spaceTypes}
          errorInput={errorInput}
          categotyErrorMessage={categotyErrorMessage}
        />
      )}
      {spaceEdition && (
        <EditSpaceForm
          spaceInfo={spaceInfo}
          cancelButtonAction={() => {
            history.push("/admin/spaces");
            setSpaceEdition(!spaceEdition);
          }}
          saveButtonAction={changeSpace}
          detelePhotosButtonAction={() =>
            setActiveSpaceModal(!activeSpaceModal)
          }
          spaceTypes={spaceTypes}
          errorInput={errorInput}
          categotyErrorMessage={categotyErrorMessage}
        />
      )}
    </Suspense>
  );
}
