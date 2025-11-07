import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  console.log("product:", product);
  const { id, title, image, price, discont_price } = product;
  const discountPercent =
    price && discont_price
      ? Math.round((1 - discont_price / price) * 100)
      : null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
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

          {discountPercent && (
            <span className={styles.discountBadge}>-{discountPercent}%</span>
          )}
          <button className={styles.addBtn} onClick={handleAddToCart}>
            Add to cart
          </button>
        </div>
        <div className={styles.info}>
          <p className={styles.title}>{title}</p>
          <div className={styles.priceBlock}>
            <span className={styles.cardPrice}>${discont_price}</span>
            {price && <span className={styles.oldPrice}>${price}</span>}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
