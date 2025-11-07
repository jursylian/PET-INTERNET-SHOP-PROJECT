import styles from "./Footer.module.css";
import chatIcon from "../../assets/ic-instagram.svg";
import phoneIcon from "../../assets/ic-whatsapp.svg";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <h3 className={styles.contact}>Contact</h3>
      <div className={styles.info}>
        <div className={styles.container}>
          <div className={styles.card}>
            <p className={styles.text}>Phone</p>
            <p className={styles.textInfo}>+49 30 915-88492</p>
          </div>
          <div className={styles.icons}>
            <p className={styles.text}>Socials</p>
            <div className={styles.socialsMedien}>
              <img src={chatIcon} alt="Chat" />
              <img src={phoneIcon} alt="Phone" />
            </div>
          </div>
        </div>

        <div className={styles.container}>
          <div className={styles.card}>
            <p className={styles.text}>Address</p>
            <p className={styles.textInfo}>
              Wallstraẞe 9-13, 10179 Berlin, Deutschland
            </p>
          </div>
          <div className={styles.icons}>
            <p className={styles.text}>Working Hours</p>
            <p className={styles.textInfo}>24 hours a day</p>
          </div>
        </div>
      </div>
      <div className={styles.map}>
        <iframe
          className={styles.iframe}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3642.428115488763!2d13.40018838277564!3d52.5113162995337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84e27db4748a5%3A0x1d538c01013c2c7!2sWallstra%C3%9Fe%209-13%2C%2010179%20Berlin!5e0!3m2!1suk!2sde!4v1760550313224!5m2!1suk!2sde"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </footer>
  );
}
