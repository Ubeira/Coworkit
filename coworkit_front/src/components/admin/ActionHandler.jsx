import { useEffect, useState } from "react";
import {
  sectionActions,
  checkActions,
  deleteActions,
  editActions,
} from "../../shared/utils/adminActions";
import { iconStorage } from "../../shared/utils/iconStorage";
import useAdminContext from "../../shared/hooks/useAdminContext";
import AdminModals from "../modales/AdminModals";
import { useHistory } from "react-router-dom";
import { getSpaceInfo } from "../../http/spaces";
let overlayStatus = "hidden";

export default function ActionHandler(props) {
  const history = useHistory();
  let { rowId, setInputRowId, formId, currentAction } = props;
  const {
    renderedComponent,
    query,
    setQuery,
    setInfoModalStatus,
    userData,
    setActiveAnswerReportModal,
    setFieldId,
    setSpaceData,
    setSpaceEdition,
  } = useAdminContext();

  if (currentAction === "") currentAction = renderedComponent;

  const buttonFunctions = {
    edit: async (id) => {
      if (renderedComponent !== "spaces") {
        setInputRowId(id);
      } else {
        setSpaceData(await getSpaceInfo(id));
        setFieldId(id);
        setSpaceEdition(true);
        history.push("/admin/spaceConfig");
      }

      // query === "?" ? setQuery("?id") : setQuery("?");
      overlayStatus = "shown";
    },
    undo: (id) => {
      setInputRowId(0);
      const editForm = document.getElementById(formId);
      editForm.reset();
      query === "?" ? setQuery("?" + id) : setQuery("?");
      //overlayStatus = "hidden";
    },
    delete: async (id) => {
      await deleteActions[renderedComponent](id, userData.id);
      //setInfoModalStatus(true);
      query === "?" ? setQuery("?id") : setQuery("?");
    },
    check: async (id) => {
      await checkActions[renderedComponent](id);
      query === "?" ? setQuery("?id") : setQuery("?");
    },

    save: async (id) => {
      const formData = new FormData(document.getElementById(formId));
      const body = {};
      for (var pair of formData.entries()) {
        body[pair[0]] = pair[1];
      }

      await editActions[renderedComponent](body, id, userData.id);
      query === "?" ? setQuery("?id") : setQuery("?");
    },
    contact: (id) => {
      setActiveAnswerReportModal(true);
      setFieldId(id);
    },
  };

  const actions =
    currentAction &&
    sectionActions[currentAction].map((action, index) => {
      const buttonType = action === "save" ? "submit" : "button";
      return (
        <>
          <button
            key={"actionButton" + index}
            className={"actionButton " + action}
            type={buttonType}
            onClick={(e) => {
              e.preventDefault();
              buttonFunctions[action] && buttonFunctions[action](rowId);
            }}
          >
            {iconStorage(action)}
          </button>
        </>
      );
    });

  return (
    <>
      <div className="actionField">{actions}</div>

      {/* <div
        className={"editOverlay " + overlayStatus}
        onClick={() => {
          buttonFunctions.undo();
        }}
      /> */}
    </>
  );
}
