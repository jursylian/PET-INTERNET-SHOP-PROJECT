import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Categories.module.css";

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3333/categories/all");
        setCategories(res.data.slice(0, 4));
      } catch (err) {
        console.error("Ошибка загрузки категорий:", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className={styles.categories}>
      <div className={styles.header}>
        <h2 className={styles.title}>Categories</h2>
        <div className={styles.line}></div>
        <button
          onClick={() => navigate("/categories")}
          className={styles.showAllBtn}
        >
          All categories
        </button>
      </div>

      <div className={styles.cards}>
        {categories.map(({ id, title, image }) => (
          <div
            key={id}
            className={styles.card}
            onClick={() => navigate(`/categories/${id}`)}
          >
            <img
              src={`http://localhost:3333${image}`}
              alt={title}
              className={styles.image}
            />
            <p className={styles.label}>{title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
