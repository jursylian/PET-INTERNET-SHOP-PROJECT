import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";
import dog404 from "../../assets/404.png";

function NotFound() {
  return (
    <section className={styles.notFound}>
      <div className={styles.errorBlock}>
        <div className={styles.errorCode}>
          <img src={dog404} alt="Dog" className={styles.dog} />
        </div>

        <h2 className={styles.title}>Page Not Found</h2>
        <p className={styles.text}>
          We're sorry, the page you requested could not be found.
          <br /> Please go back to the homepage.
        </p>

        <Link to="/" className={styles.button}>
          Go Home
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
