import { useEffect } from "react";
import "../../css/filterFormAdmin.css";
import useAdminContext from "../../shared/hooks/useAdminContext";
import queryGenerator from "../../shared/utils/queryGenerator";
import SetFilterForm from "./SetFilterForm";

export default function FilterForm() {
  // Importamos del contexto lo que necesitamos
  const {
    handleSubmit,
    setQuery,
    setOrder,
    setDirection,
    reset,
    renderedComponent,
    setInputRowId,
    inputRowId,
  } = useAdminContext();

  //Cada vez que cambiemos de sección (tabla) reiniciaremos el formulario
  useEffect(() => {
    const form = document.getElementById("filterFormAdmin");
    form.reset();
  }, [renderedComponent, inputRowId]);

  return (
    <div className="filterContainer">
      <form
        id="filterFormAdmin"
        className="filterFormAdmin"
        onSubmit={handleSubmit((formData) => {
          if (inputRowId === 0) {
            const newQuery = queryGenerator(formData);
            setQuery(newQuery);
          }
        })}
      >
        <div className="filterFields">{SetFilterForm(renderedComponent)}</div>
        <div className="filterButtons">
          <button type="submit">Filtrar</button>
          <button
            onClick={(e) => {
              reset();
              setQuery("?");
              setOrder("");
              setDirection("");
              setInputRowId(0);
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
