import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Sales.module.css";
import { Link, useNavigate } from "react-router-dom";

const Sales = () => {
  const [saleProducts, setSaleProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3333/products/all")
      .then((res) => {
        const discounted = res.data;
        const withDiscount = discounted.filter((product) => {
          return (
            product.price &&
            product.discont_price &&
            product.discont_price < product.price
          );
        });

        const selected = withDiscount.slice(0, 4);
        setSaleProducts(selected);
      })
      .catch((err) => console.error("Error loading products:", err));
  }, []);
  return (
    <section className={styles.saleSection}>
      <div className={styles.titleCategories}>
        <h2 className={styles.sectionTitle}>Sale</h2>
        <div className={styles.line}></div>
        <button
          onClick={() => navigate("/discounts")}
          className={styles.categoriBottom}
        >
          {" "}
          All sales{" "}
        </button>
      </div>
      <div className={styles.saleFlex}>
        {saleProducts.map((product) => {
          const { id, title, image, price, discont_price } = product;
          const discountPercent =
            price && discont_price
              ? Math.round((1 - discont_price / price) * 100)
              : null;

          return (
            <div
              onClick={() => navigate(`/products/${id}`)}
              key={id}
              className={styles.card}
            >
              {discountPercent && (
                <div className={styles.discountBadge}>-{discountPercent}%</div>
              )}
              <Link to="/discounts">
                <img
                  src={
                    image ? `http://localhost:3333${image}` : "/fallback.jpg"
                  }
                  alt={title}
                  className={styles.cardImage}
                  onError={(e) => {
                    if (!e.target.dataset.fallback) {
                      e.target.src = "/fallback.jpg";
                      e.target.dataset.fallback = "true";
                    }
                  }}
                />
              </Link>

              <div className={styles.cardInfo}>
                <p className={styles.cardTitle}>{title}</p>
                <div className={styles.price}>
                  <p className={styles.cardPrice}>${discont_price}</p>
                  <div className={styles.oldPrice}>${price}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Sales;
