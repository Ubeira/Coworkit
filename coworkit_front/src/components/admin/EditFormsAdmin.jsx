import useAdminContext from "../../shared/hooks/useAdminContext";
import moment from "moment";
moment.locale();

export default function EditFormsAdmin(props) {
  const { children, type } = props;
  const { register } = useAdminContext();

  const checkBox = (
    <>
      <input
        className="checkbox"
        type="hidden"
        name={children[0]}
        id={children[0] + "_edit"}
        value="0"
        ref={register}
      />
      <input
        className="checkbox"
        type="checkbox"
        name={children[0]}
        id={children[0] + "_edit"}
        value="1"
        disabled={children[0] === "verified"}
        defaultChecked={children[1]}
        ref={register}
      />
    </>
  );

  const date = (
    <input
      className="date"
      type="date"
      name={children[0]}
      id={children[0] + "_edit"}
      defaultValue={moment(children[1]).format("YYYY-MM-DD")}
      ref={register}
    />
  );

  const text = (
    <input
      className="text"
      type="text"
      name={children[0]}
      id={children[0] + "_edit"}
      defaultValue={children[1]}
      ref={register}
    ></input>
  );

  const fixed = (
    <input
      className="fixed"
      value={children[1]}
      name="no-send"
      disabled
      ref={register}
    ></input>
  );

  const file = (
    <input
      className="file"
      type="file"
      name={children[0]}
      id={children[0] + "_edit"}
      ref={register}
    />
  );

  const fieldTypes = { checkBox, date, text, fixed, file };

  return fieldTypes[type];
}
