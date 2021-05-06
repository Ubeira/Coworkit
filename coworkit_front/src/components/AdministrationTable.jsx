import "../css/administrationTable.css";
import useAdminContext from "../shared/hooks/useAdminContext";
import { useEffect, useState } from "react";
import SetRowFields from "./admin/SetRowFields";
import ActionHandler from "./admin/ActionHandler";
import { iconStorage } from "../shared/utils/iconStorage";

export default function AdministrationTable(props) {
  //Importamos lo que necesitamos del contexto de administrador
  const {
    order,
    setOrder,
    setDirection,
    inputRowId,
    setInputRowId,
  } = useAdminContext();
  let { headers } = useAdminContext();
  let fetchData = [...useAdminContext().data];
  const [activeOrderButton, setActiveOrderButton] = useState(0);
  const orderButtons = document.querySelectorAll(".orderButton");

  //Función que determina el comportamiento de los botones de ordenación
  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    setActiveOrderButton(e.currentTarget);
    const direction = ["asc", "desc"];
    const currentButton = e.currentTarget;
    const toggleDirection = currentButton.classList.contains("asc");
    //Indicamos al contexto la modificación del campo y dirección de ordenación
    setOrder(currentButton.dataset.fieldName);
    setDirection(direction[+toggleDirection]);
    //Modificamos las clases del botón para aplicar las animaciones correspondientes
    currentButton.classList.add("active", direction[+toggleDirection]);
    currentButton.classList.remove(direction[+!toggleDirection]);
  }

  useEffect(() => {
    //Reiniciamos las clases de los botones de ordenación (excepto el pulsado)
    for (const button of orderButtons) {
      if (button !== activeOrderButton || order === "") {
        button.classList.remove("active", "asc", "desc");
      }
    }
  }, [activeOrderButton, order]);

  // Creación de las cabeceras (títulos)
  headers = headers.map((item, index) => (
    <th key={"th" + index}>
      <div className="headerContainer">
        <span>{item[0]}</span>
        <button
          onClick={handleClick}
          className="orderButton"
          data-field-name={item[1]}
        >
          {iconStorage("multiSort")}
        </button>
      </div>
    </th>
  ));

  // Añadimos las acciones a las cabeceras
  headers.push(<th key="thActions">Acciones</th>);

  // Creación de las filas con los datos
  const tBodyRows = [];
  for (let i = 0; i < fetchData.length; i++) {
    const rowId = Object.values(fetchData[i])[0];
    const action = inputRowId === rowId ? "edit" : "";
    const rowContent = [];
    rowContent.push(
      <SetRowFields
        key={"fieldSet" + rowId}
        rowId={rowId}
        inputRowId={inputRowId}
      >
        {fetchData[i]}
      </SetRowFields>,
      <td>
        <ActionHandler
          formId="tableForm"
          currentAction={action}
          rowId={rowId}
          inputRowId={inputRowId}
          setInputRowId={setInputRowId}
        />
      </td>
    );
    //En caso de haber acciones, las asignamos a la última columna

    tBodyRows.push(<tr key={"tr" + rowId}>{rowContent}</tr>);
  }

  return (
    <div className="table-generator ">
      <table>
        <thead>
          <tr>{headers}</tr>
        </thead>
        <tbody>{tBodyRows}</tbody>
      </table>
    </div>
  );
}
