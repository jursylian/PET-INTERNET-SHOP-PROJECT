export default function Button({ children, onClick, variant = "primary" }) {
  const base = "px-4 py-2 rounded-lg font-semibold transition";
  const styles = {
    primary: `${base} bg-green-600 text-white hover:bg-green-700`,
    outline: `${base} border border-green-600 text-green-600 hover:bg-green-100`,
  };
  return (
    <button onClick={onClick} className={styles[variant]}>
      {children}
    </button>
  );
}
