import styles from "./PromoBanner.module.css";
import bannerImage from "../../assets/background.png";

function Hero() {
  return (
    <section className={styles.hero}>
      <img src={bannerImage} alt="Баннер" className={styles.image} />

      <div className={styles.content}>
        <h1>
          Amazing Discounts <br />
          on Pets Products!
        </h1>

        <button className={styles.button}>Check out</button>
      </div>
    </section>
  );
}

export default Hero;
