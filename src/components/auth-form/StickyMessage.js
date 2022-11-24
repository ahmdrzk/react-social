import { IoClose } from "react-icons/io5";

import IconButton from "../UI/IconButton";
import classes from "./StickyMessage.module.css";

const StickyMessage = ({ onClose, children }) => {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <span className={classes.title}>Notice!</span>
        <IconButton icon={IoClose} label="Close message" className={classes.closeIcon} onClick={onClose} />
      </div>
      <p className={classes.content}>{children}</p>
    </div>
  );
};

export default StickyMessage;
