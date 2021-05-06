import "../../css/administrationCards.css";
import useAdminContext from "../../shared/hooks/useAdminContext";
import SetCardFields from "./SetCardFields";
import ActionHandler from "../admin/ActionHandler";

export default function AdministrationCards(props) {
  //Importamos lo que necesitamos del contexto de administrador
  const { inputRowId, setInputRowId } = useAdminContext();
  let { headers } = useAdminContext();
  let fetchData = [...useAdminContext().data];

  // Creación de las filas con los datos
  const cards = [];

  for (let i = 0; i < fetchData.length; i++) {
    const cardId = Object.values(fetchData[i])[0];
    const action = inputRowId === cardId ? "edit" : "";
    const cardContent = [];
    cardContent.push(
      <SetCardFields
        key={"fieldSet" + cardId}
        rowId={cardId}
        inputRowId={inputRowId}
        headers={headers}
      >
        {fetchData[i]}
      </SetCardFields>
    );
    //En caso de haber acciones, las asignamos a la última columna

    cards.push(
      <div className="card" key={"div" + cardId}>
        {cardContent}

        <ActionHandler
          formId="cardsForm"
          currentAction={action}
          rowId={cardId}
          inputRowId={inputRowId}
          setInputRowId={setInputRowId}
        />
      </div>
    );
  }

  return <div className="card-generator">{cards}</div>;
}
