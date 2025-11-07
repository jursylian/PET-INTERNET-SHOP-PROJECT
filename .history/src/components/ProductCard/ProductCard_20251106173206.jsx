import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { id, title, image, price, discont_price } = product;

  // Вычисляем процент скидки (если есть)
  const discountPercent = discont_price
    ? Math.round((1 - discont_price / price) * 100)
    : null;

  const handleAddToCart = (event) => {
    event.preventDefault(); // не переходить по ссылке
    dispatch(addToCart(product));
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

          {/* Бейдж скидки */}
          {discountPercent && (
            <span className={styles.discountBadge}>-{discountPercent}%</span>
          )}

          {/* Кнопка добавления в корзину */}
          <button
            type="button"
            className={styles.addBtn}
            onClick={handleAddToCart}
          >
            Add to cart
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
