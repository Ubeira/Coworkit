import useAdminContext from "../../shared/hooks/useAdminContext";
import InfoModal from "./InfoModal";

export default function AdminModals(props) {
  const {
    infoModalStatus,
    query,
    setQuery,
    renderedComponent,
    setInfoModalStatus,
  } = useAdminContext();
  const { id, action } = props;

  const translator = {
    users: "Usuario",
    reviews: "Reseña",
    reports: "Reports",
    spaces: "Espacio",
    orders: "Reserva",
    delete: "eliminado",
    save: "modificado",
    check: "modificado",
  };

  return (
    <InfoModal
      active={infoModalStatus}
      title={"¡Atención!"}
      agreeAction={() => {
        query === "?" ? setQuery("?") : setQuery("?" + id);
        setInfoModalStatus(false);
      }}
      content={`${translator[renderedComponent]} ${id} ${translator[action]} con éxito`}
    />
  );
}
