import styles from "./OrderSuccessModal.module.css";

const OrderSuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.modalTitle}>Congratulations!</h2>
        <p className={styles.modalText}>
          Your order has been successfully placed on the website.
        </p>
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessModal;
