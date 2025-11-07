import styles from "./Input.module.css";

const Input = ({
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  error,
}) => {
  return (
    <div className={styles.field}>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${styles.input} ${error ? styles.errorBorder : ""}`}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Input;
