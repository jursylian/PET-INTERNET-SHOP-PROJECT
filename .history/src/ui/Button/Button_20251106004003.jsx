import { useState } from "react";
import styles from "./Button.module.css";

const Button = ({ children, onClick, type = "button", disabled = false }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleClick = async (e) => {
    if (onClick) {
      const result = await onClick(e);

      if (result === true) {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
      }
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`${styles.button} ${submitted ? styles.submitted : ""}`}
      disabled={disabled || submitted}
    >
      {submitted ? "Request submitted" : children}
    </button>
  );
};

export default Button;
