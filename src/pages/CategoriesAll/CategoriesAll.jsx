import { useEffect, useState } from "react";
import api, { BASE_URL } from "../../api/api";
import { Link } from "react-router-dom";
import styles from "./CategoriesAll.module.css";
import PageSection from "../../ui/PageSection/PageSection";

const CategoriesAll = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api
      .get("/categories/all")
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
              src={`${BASE_URL}${image}`}
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
