import TextField from "@material-ui/core/TextField";
export default function FormBookings() {
  const actionText = function () {
    console.log("cambio");
  };
  return (
    <form id="formSpace" className="spaceForm">
      <TextField
        id="textField"
        label="textField"
        select
        value={"algo"}
        onChange={actionText}
      ></TextField>
    </form>
  );
}
