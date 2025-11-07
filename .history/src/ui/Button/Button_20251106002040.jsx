import { useState } from "react";
import styles from "./Button.module.css";

const Button = ({ children, onClick, type = "button" }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleClick = (e) => {
    setSubmitted(true);
    if (onClick) onClick(e);
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`${styles.button} ${submitted ? styles.submitted : ""}`}
    >
      {submitted ? "Request submitted" : children}
    </button>
  );
};

export default Button;
