import { useState } from "react";
import styles from "./AddedButton.module.css";

const AddedButton = ({
  onClick,
  resetDelay = 2000,
  className = "",
  style = {},
}) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = (e) => {
    if (onClick) onClick(e);
    setIsAdded(true);

    // Через resetDelay вернуть исходное состояние
    setTimeout(() => {
      setIsAdded(false);
    }, resetDelay);
  };

  return (
    <button
      // сохраняем внутренние module-стили и добавляем внешний className (для локального позиционирования)
      className={`${styles.button} ${
        isAdded ? styles.active : ""
      } ${className}`}
      style={style}
      onClick={handleClick}
      disabled={isAdded}
      type="button"
    >
      {isAdded ? "Added" : "Add to cart"}
    </button>
  );
};

export default AddedButton;
