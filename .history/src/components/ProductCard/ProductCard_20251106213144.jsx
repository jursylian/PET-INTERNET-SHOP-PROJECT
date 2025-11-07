import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { id, title, image, price, discont_price } = product;

  const [isAdded, setIsAdded] = useState(false);

  const discountPercent = discont_price
    ? Math.round((1 - discont_price / price) * 100)
    : null;

  const handleAddToCart = (event) => {
    event.preventDefault();

    if (!isAdded) {
      dispatch(addToCart(product));
      setIsAdded(true);
    } else {
      // при клике на "Edit" — ничего не делаем (или можно добавить переход в корзину)
    }
  };

  return (
    <div className={styles.card}>
      <Link to={`/product/${id}`} className={styles.link}>
        <div className={styles.imageWrapper}>
          <img
            src={`http://localhost:3333${image}`}
            alt={title}
            className={styles.image}
          />

          {discountPercent && (
            <span className={styles.discountBadge}>-{discountPercent}%</span>
          )}

          <button
            type="button"
            className={`${styles.addBtn} ${isAdded ? styles.added : ""}`}
            onClick={handleAddToCart}
          >
            {isAdded ? "Edit" : "Add to cart"}
          </button>
        </div>

        <div className={styles.info}>
          <p className={styles.title}>{title}</p>

          <div className={styles.priceBlock}>
            <span className={styles.cardPrice}>${discont_price || price}</span>
            {discont_price && <span className={styles.oldPrice}>${price}</span>}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
