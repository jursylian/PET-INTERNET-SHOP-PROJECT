import styles from "./Input.module.css";

const Input = ({
  type = "text",
  name,
  label,
  placeholder,
  value,
  onChange,
  error,
  id,
  ...rest
}) => {
  const inputId = id || name;

  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={`${styles.input} ${error ? styles.errorBorder : ""}`}
        autoComplete="off"
        {...rest}
      />
      {error && (
        <p id={`${inputId}-error`} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
