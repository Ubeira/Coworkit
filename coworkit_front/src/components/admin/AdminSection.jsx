import AdministrationTable from "../AdministrationTable";
import FilterForm from "./FilterForm";
import useAdminContext from "../../shared/hooks/useAdminContext";
import { useEffect } from "react";
import AdministrationCards from "./AdministrationCards";
import "../../css/adminSection.css";
import InfoModal from "../modales/InfoModal";
import AnswerReportModal from "../modales/AnswerReportModal";
import EasterEgg from "./EasterEgg";
import ConfigurateSpace from "../spaces/ConfigurateSpace";

export default function AdminSection(props) {
  const section = props.section;
  //Importamos del context lo necesario
  const {
    setQuery,
    setOrder,
    setDirection,
    setHeaders,
    setRenderedComponent,
    setInputRowId,
    spaceConfig,
  } = useAdminContext();

  //Asignamos el nombre en español a la sección introducida
  const sectionName = {
    spaces: "espacios",
    users: "usuarios",
    packs: "packs",
    orders: "reservas",
    reports: "reportes",
    reviews: "reseñas",
  };

  //Al desmontar el componente, reiniciamos las variables
  useEffect(() => {
    return () => {
      setHeaders([]);
      setOrder("");
      setDirection("");
    };
  }, []);

  useEffect(() => {
    //Avisamos al contexto cuando se cambia de sección ej: de usuarios a espacios
    setRenderedComponent(section);

    return () => {
      //Al cambiar de sección reseteamos valores
      setHeaders([]);
      setOrder("");
      setDirection("");
      setQuery("?");
      setInputRowId(0);
    };
  }, [section]);

  return (
    <>
      <h1>Administración de {sectionName[section]}</h1>
      <FilterForm section={section}></FilterForm>
      <form id="cardsForm">
        <AdministrationCards
          section={sectionName[section]}
        ></AdministrationCards>
      </form>
      <form id="tableForm">
        <AdministrationTable
          section={sectionName[section]}
        ></AdministrationTable>
      </form>
      <AnswerReportModal />
      {spaceConfig && <ConfigurateSpace />}

      {/*  <EasterEgg /> */}
    </>
  );
}
