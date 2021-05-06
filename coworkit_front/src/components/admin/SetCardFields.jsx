import EditField from "./EditField";
import VisualizationField from "./VisualizationField";

export default function SetCardFields(props) {
  const { children, rowId, inputRowId, headers } = props;

  //Introducimos cada uno de los campos que nos pasan por props dentro de una celda
  return Object.entries(children).map((cardDataFields, index) => {
    if (rowId === inputRowId) {
      return (
        <div className="cardDataRow" key={"card" + { rowId } + "data" + index}>
          <h3 className="cardTitle">{headers[index][0] + ":"}</h3>
          <span className="dataField input">
            {
              <EditField
                key={"card" + { rowId } + "data" + index}
                index={index}
              >
                {cardDataFields}
              </EditField>
            }
          </span>
        </div>
      );
    }
    return (
      <div className="cardDataRow" key={"card" + { rowId } + "data" + index}>
        <h3 className="cardTitle">
          {headers[index] && headers[index][0] + ":"}
        </h3>
        <span className="dataField">
          {
            <VisualizationField
              key={"card" + { rowId } + "data" + index}
              index={index}
            >
              {cardDataFields}
            </VisualizationField>
          }
        </span>
      </div>
    );
  });
}
