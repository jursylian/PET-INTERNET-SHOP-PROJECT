import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./CategoriesAll.module.css";
import PageSection from "../../ui/PageSection/PageSection";

const CategoriesAll = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3333/categories/all")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error loading categories", err));
  }, []);

  return (
    <PageSection>
      <div className={`${styles.tabs} ${styles.breadcrumb}`}>
        <Link to="/" className={styles.tab}>
          Main page
        </Link>

        <div className={styles.connector}></div>

        <span className={`${styles.tab} ${styles.active}`}>Categories</span>
      </div>

      <h1 className={styles.pageTitle}>Categories</h1>

      <div className={styles.grid}>
        {categories.map(({ id, title, image }) => (
          <Link to={`/categories/${id}`} key={id} className={styles.card}>
            <img
              src={`http://localhost:3333${image}`}
              alt={title}
              className={styles.cardImage}
            />
            <p className={styles.cardTitle}>{title}</p>
          </Link>
        ))}
      </div>
    </PageSection>
  );
};

export default CategoriesAll;
