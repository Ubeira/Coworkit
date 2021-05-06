import moment from "moment";
import { iconStorage } from "../../shared/utils/iconStorage";
moment.locale();

export default function VisualizationField(props) {
  const { children, index } = props;
  const fieldName = children[0];

  //En caso de que el campo llegue vacío, cambiamos el contenido por unos guiones
  let fieldContent =
    children[1] !== null && children[1] !== "" ? children[1] : " --- ";
  const booleanFields = ["admin", "verified", "deleted", "solved", "enabled"];

  //En caso de ser campos booleanos, les asignamos el icono correspondiente al valor
  if (fieldContent === 1 && booleanFields.includes(fieldName)) {
    fieldContent = iconStorage("fieldChecked", "fieldIcon enabled");
  } else if (fieldContent === 0 && booleanFields.includes(fieldName)) {
    fieldContent = iconStorage("fieldUnchecked", "fieldIcon disabled");
  }

  //En caso de ser fechas, las pasamos al formato dd/mm/aaa
  if (fieldName.match("date")) {
    const defaultDate = fieldContent;
    const formatedDate = [];
    formatedDate.push(
      <span className="date">{moment(children[1]).format("L")}</span>
    );
    if (!defaultDate.match("T00:00:00.000Z")) {
      formatedDate.push(
        <span key={"time" + fieldName + index} className="time">
          {moment(defaultDate).format("LTS")}
        </span>
      );
    }
    fieldContent = formatedDate;
  }
  if (fieldName.match("photo") || fieldName.match("url")) {
    fieldContent = (
      <div className="photoDiv">
        <img src={fieldContent} alt="fieldImg"></img>
      </div>
    );
  }

  return fieldContent;
}
