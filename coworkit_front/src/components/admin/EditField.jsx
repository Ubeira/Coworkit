import useAdminContext from "../../shared/hooks/useAdminContext";
import EditFormsAdmin from "./EditFormsAdmin";

export default function EditField(props) {
  const { renderedComponent } = useAdminContext();
  const { children, index } = props;
  let fieldName = children[0].toLowerCase();
  let type = "text";

  if (renderedComponent === "orders") {
    const regExp = /\(([^)]+)\)/;
    const newNames = {
      space_name: "space_id",
      pack: "pack_id",
      user_name: "user_name",
      price: "order_price",
    };

    if (children && newNames[fieldName]) {
      children[0] = newNames[fieldName] ? newNames[fieldName] : fieldName;
      console.log(fieldName + ":" + children[0]);
      if (children[0] !== "order_price") {
        children[1] = regExp.exec(children[1])[1];
      }
      fieldName = children[0];
    }
  }

  const booleanFields = ["admin", "verified", "deleted", "solved"];
  const dateFields = ["start_date", "end_date"];
  const fixedFields = [
    "id",
    "registration_date",
    "user_name",
    "space_name",
    "order_date",
    "enabled",
    "space_type",
    "order_price",
  ];

  const photoFields = ["photo"];

  if (booleanFields.includes(fieldName)) {
    type = "checkBox";
  } else if (dateFields.includes(fieldName)) {
    type = "date";
  } else if (fixedFields.includes(fieldName)) {
    type = "fixed";
  } else if (photoFields.includes(fieldName)) {
    type = "file";
  }
  return (
    <EditFormsAdmin key={"input" + index} type={type}>
      {children}
    </EditFormsAdmin>
  );
}
