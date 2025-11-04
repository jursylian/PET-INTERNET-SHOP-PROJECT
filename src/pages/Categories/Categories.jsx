import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Categories.module.css";
const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3333/categories/all`)
      .then((res) => {
        const data = res.data;
        const firstFour = data.length >= 4 ? data.slice(0, 4) : data;
        setCategories(firstFour);
      })
      .catch((err) => {
        console.error("Ошибка загрузки категорий:", err);
      });
  }, []);
  return (
    <div>
      <section className={styles.categories}>
        <div className={styles.titleCategories}>
          <h2 className={styles.sectionTitle}>Categories</h2>
          <div className={styles.line}></div>
          <button
            onClick={() => navigate("/categories")}
            className={styles.categoriBottom}
          >
            All categories{" "}
          </button>
        </div>

        <div className={styles.categoriesImage}>
          {categories.map(({ id, title, image }) => (
            <div
              key={id}
              className={styles.card}
              onClick={() => navigate(`/categories/${id}`)}
            >
              <img
                src={`http://localhost:3333${image}`}
                alt={title}
                className={styles.cardImage}
              />
              <p className={styles.cardLabel}>{title}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Categories;
