import { useState } from "react";
import styles from "./AddedButton.module.css";

const AddedButton = ({ onClick, resetDelay = 2000 }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = (e) => {
    if (onClick) onClick(e);
    setIsAdded(true);

    setTimeout(() => {
      setIsAdded(false);
    }, resetDelay);
  };

  return (
    <button
      className={`${styles.button} ${isAdded ? styles.active : ""}`}
      onClick={handleClick}
      disabled={isAdded}
    >
      {isAdded ? "Added" : "Add to cart"}
    </button>
  );
};

export default AddedButton;
