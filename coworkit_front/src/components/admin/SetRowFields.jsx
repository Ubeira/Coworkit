import EditField from "./EditField";
import VisualizationField from "./VisualizationField";

export default function SetRowFields(props) {
  const { children, rowId, inputRowId } = props;

  //Introducimos cada uno de los campos que nos pasan por props dentro de una celda
  return Object.entries(children).map((rowDataFields, index) => {
    if (rowId === inputRowId) {
      return (
        <td key={"tr" + { rowId } + "td" + index}>
          {
            <EditField key={"tr" + { rowId } + "td" + index} index={index}>
              {rowDataFields}
            </EditField>
          }
        </td>
      );
    }
    return (
      <td key={"tr" + { rowId } + "td" + index}>
        {
          <VisualizationField
            key={"tr" + { rowId } + "td" + index}
            index={index}
          >
            {rowDataFields}
          </VisualizationField>
        }
      </td>
    );
  });
}
