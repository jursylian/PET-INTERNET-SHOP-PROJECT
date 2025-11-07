import { Link } from "react-router-dom";
import styles from "./PromoBanner.module.css";
import bannerImage from "../../assets/background.png";

function PromoBanner() {
  return (
    <section className={styles.hero}>
      <img src={bannerImage} alt="Баннер" className={styles.image} />

      <div className={styles.content}>
        <h1>
          Amazing Discounts <br />
          on Pets Products!
        </h1>

        <Link to="/discount" className={styles.button}>
          Check out
        </Link>
      </div>
    </section>
  );
}

export default PromoBanner;
