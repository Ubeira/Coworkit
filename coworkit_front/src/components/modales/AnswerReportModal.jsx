import { FormAnswerReport } from "../users/FormUtils";
import Modal from "./Modal";
import useAdminContext from "../../shared/hooks/useAdminContext";
import { contactActions } from "../../shared/utils/adminActions";

export default function AnswerReportModal() {
  const { fieldId } = useAdminContext();
  let title = "Contactar con el usuario";
  const {
    activeAnswerReportModal,
    setActiveAnswerReportModal,
    renderedComponent,
  } = useAdminContext();

  if (renderedComponent === "reports") {
    title = "Respuesta a la incidencia";
  }

  return (
    <div className="answerReportModal">
      <Modal
        title={title + " " + fieldId}
        content={<FormAnswerReport component={renderedComponent} />}
        styleBtn="secondary"
        active={activeAnswerReportModal}
        firstBtn={true}
        desableClicOutsideToCloseModal={true}
        textBtn="Enviar"
        secondBtn={true}
        textSecBtn={"Cancelar"}
        actionBtn={async () => {
          const formData = new FormData(document.querySelector(".contactForm"));
          const body = {};
          for (var pair of formData.entries()) {
            body[pair[0]] = pair[1];
          }

          await contactActions[renderedComponent](body, fieldId);
          setActiveAnswerReportModal(false);
        }}
        actionSecBtn={() => {
          setActiveAnswerReportModal(false);
        }}
      />
    </div>
  );
}
