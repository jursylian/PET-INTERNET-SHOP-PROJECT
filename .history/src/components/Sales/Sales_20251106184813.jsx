import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SaleSection.module.css";

const SaleSection = () => {
  const [saleProducts, setSaleProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3333/products/all")
      .then((res) => {
        const discounted = res.data.filter(
          (p) => p.price && p.discont_price && p.discont_price < p.price
        );
        setSaleProducts(discounted.slice(0, 4));
      })
      .catch((err) => console.error("Error loading products:", err));
  }, []);

  if (saleProducts.length === 0) {
    return (
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Sale</h2>
        <p className={styles.empty}>No discounted products yet.</p>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>Sale</h2>
        <div className={styles.line}></div>
        <button
          onClick={() => navigate("/discounts")}
          className={styles.showAllButton}
        >
          All sales
        </button>
      </div>

      <div className={styles.cardsGrid}>
        {saleProducts.map(({ id, title, image, price, discont_price }) => {
          const discountPercent = Math.round((1 - discont_price / price) * 100);

          return (
            <div
              key={id}
              className={styles.card}
              role="button"
              tabIndex={0}
              onClick={() => navigate(`/products/${id}`)}
            >
              <div className={styles.discountBadge}>-{discountPercent}%</div>

              <Link to={`/products/${id}`} className={styles.imageLink}>
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
                <div className={styles.priceRow}>
                  <p className={styles.newPrice}>${discont_price}</p>
                  <span className={styles.oldPrice}>${price}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SaleSection;
