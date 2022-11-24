import { Fragment } from "react";
import ReactDOM from "react-dom";
import { IoClose } from "react-icons/io5";

import Card from "../UI/Card";
import IconButton from "../UI/IconButton";
import Button from "../UI/Button";
import classes from "./Modal.module.css";

const Modal = ({ status, onClose, onConfirm, children }) => {
  const stopPropagationHandler = (event) => {
    event.stopPropagation();
  };

  return ReactDOM.createPortal(
    <div className={classes.backdrop} onClick={onClose}>
      <Card hasPadding={true} className={classes.container} onClick={stopPropagationHandler}>
        <div className={classes.header}>
          <span className={classes[status]}>{status}!</span>
          <IconButton icon={IoClose} label="Close modal" onClick={onClose} />
        </div>
        <p>{children}</p>
        <div className={classes.btnsContainer}>
          {status === "warn" ? (
            <Fragment>
              <Button primary onClick={onConfirm}>
                Confirm
              </Button>
              <Button secondary onClick={onClose}>
                Cancel
              </Button>
            </Fragment>
          ) : (
            <Button primary onClick={onClose}>
              OK
            </Button>
          )}
        </div>
      </Card>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
