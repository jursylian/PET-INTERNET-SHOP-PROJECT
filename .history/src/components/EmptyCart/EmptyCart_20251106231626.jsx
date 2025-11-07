import { useNavigate } from "react-router-dom";
import styles from "./EmptyCart.module.css";

const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.emptyCart}>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>Shopping cart</h1>
        <div className={styles.divider}></div>
        <button className={styles.backButton} onClick={() => navigate("/")}>
          Back to the store
        </button>
      </div>

      <div className={styles.content}>
        <p className={styles.text}>
          Looks like you have no items in your basket currently.
        </p>
        <button className={styles.continueButton} onClick={() => navigate("/")}>
          Continue shopping
        </button>
      </div>
    </div>
  );
};

export default EmptyCart;
