import styles from "./Button.module.css";

const Button = ({ children, onClick, type = "button" }) => (
  <button type={type} onClick={onClick} className={styles.button}>
    {children}
  </button>
);

export default Button;
