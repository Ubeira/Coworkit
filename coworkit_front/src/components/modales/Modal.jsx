import "./../../css/modales/modal.css";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useState, useEffect } from "react";

export default function Modal({
  title,
  content,
  active,
  firstBtn,
  textBtn,
  secondBtn,
  textSecBtn,
  actionBtn,
  actionSecBtn,
  styleBtn,
  styleSecBtn,
  desableClicOutsideToCloseModal,
  desableClicEscapeToCloseModal,
}) {
  const [open, setOpen] = useState(false);
  const actBtn = actionBtn ?? false;
  const actSecBtn = actionSecBtn ?? false;
  const fullWidth = useMediaQuery("(min-width:700px)");
  useEffect(() => {
    setOpen(active);
  }, [active]);

  const handleBtn = () => {
    if (actBtn) actBtn();
    setOpen(false);
  };

  const handleSecBtn = () => {
    if (actSecBtn) actSecBtn();
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="modal">
      <Dialog
        fullWidth={!fullWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby="coworkit-Modal"
        disableBackdropClick={desableClicOutsideToCloseModal ?? false}
        disableEscapeKeyDown={desableClicEscapeToCloseModal ?? false}
      >
        <DialogTitle>
          <div className="modalTitle">{title}</div>
        </DialogTitle>
        <DialogContent className="modal">
          <DialogContentText>{content}</DialogContentText>
          <DialogActions className="modalButtons">
            {secondBtn && (
              <Button
                onClick={handleSecBtn}
                color={styleSecBtn ?? "primary"}
                autoFocus
              >
                {textSecBtn}
              </Button>
            )}
            {firstBtn && (
              <Button
                onClick={handleBtn}
                color={styleBtn ?? "primary"}
                autoFocus
              >
                {textBtn}
              </Button>
            )}
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}
