import styles from "./PageSection.module.css";

const PageSection = ({ children }) => {
  return <section className={styles.section}>{children}</section>;
};

export default PageSection;
