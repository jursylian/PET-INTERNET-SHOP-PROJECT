import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

import styles from "./ProductDescription.module.css";
import { addToCart } from "../../redux/cartSlice";
import PageSection from "../../layouts/PageSection/PageSection";

// --- Breadcrumbs Component ---
const Breadcrumbs = ({ backPath, label, title }) => (
  <div className={styles.menuTabs}>
    <Link to="/" className={styles.tab}>
      Main page
    </Link>
    <div className={styles.connector}></div>
    <Link to="/categories" className={styles.tab}>
      Categories
    </Link>
    <div className={styles.connector}></div>
    <Link to={backPath} className={styles.tab}>
      {label}
    </Link>
    <div className={styles.connector}></div>
    <span className={`${styles.tab} ${styles.active}`}>{title}</span>
  </div>
);

// --- Image Gallery Component with fade animation ---
const ImageGallery = ({ images, mainImage, setMainImage, title }) => {
  const [fade, setFade] = useState(false);

  const handleChangeImage = (img) => {
    setFade(true);
    setTimeout(() => {
      setMainImage(img);
      setFade(false);
    }, 150);
  };

  return (
    <>
      <div className={styles.thumbnails}>
        {images.map((img, index) => (
          <img
            key={index}
            src={`http://localhost:3333${img}`}
            alt={`Thumbnail ${index + 1}`}
            className={`${styles.thumbnail} ${
              mainImage === img ? styles.activeThumbnail : ""
            }`}
            onClick={() => handleChangeImage(img)}
          />
        ))}
      </div>
      <div className={`${styles.imageWrapper} ${fade ? styles.fade : ""}`}>
        <img
          src={`http://localhost:3333${mainImage}`}
          alt={title}
          className={styles.productImage}
          onError={(e) => {
            if (!e.target.dataset.fallback) {
              e.target.src = "/fallback.jpg";
              e.target.dataset.fallback = "true";
            }
          }}
        />
      </div>
    </>
  );
};

// --- Quantity Selector Component with live total price ---
const QuantitySelector = ({
  quantity,
  setQuantity,
  handleAddToCart,
  unitPrice,
}) => {
  const totalPrice = (unitPrice * quantity).toFixed(2);

  return (
    <div className={styles.counterRow}>
      <div className={styles.quantityBlock}>
        <button
          className={styles.quantityButton}
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
        ></button>
        <span className={styles.quantityDisplay}>{quantity}</span>
        <button
          className={styles.quantityButton}
          onClick={() => setQuantity((q) => q + 1)}
        >
          +
        </button>
      </div>
      <div className={styles.totalPrice}>
        Total: <strong>${totalPrice}</strong>
      </div>
      <button className={styles.addButton} onClick={handleAddToCart}>
        Add to cart
      </button>
    </div>
  );
};

// --- Main ProductDescription Component ---
const ProductDescription = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const source = searchParams.get("source");
  const label = searchParams.get("label") || "Category Products";
  const categoryId = searchParams.get("categoryId");

  const backPath =
    source === "products"
      ? "/products"
      : source === "discounts"
      ? "/discounts"
      : categoryId
      ? `/categories/${categoryId}`
      : "/categories";

  // Fetch product
  useEffect(() => {
    axios
      .get(`http://localhost:3333/products/${productId}`)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data[0] : res.data;
        setProduct(data);
        const imgs = data.images?.length ? data.images : [data.image];
        setMainImage(imgs[0]);
      })
      .catch((err) => console.error("Error loading product:", err));
  }, [productId]);

  if (!product) return <p>Loading...</p>;

  const {
    title,
    images = [],
    image,
    price,
    discont_price: discountedPrice,
    description,
  } = product;

  const allImages = images.length ? images : [image];
  const discountPercent =
    price && discountedPrice
      ? Math.round((1 - discountedPrice / price) * 100)
      : null;
  const unitPrice =
    typeof discountedPrice === "number" ? discountedPrice : price;

  const MAX_DESCRIPTION_LENGTH = 450;
  const isLongDescription = description?.length > MAX_DESCRIPTION_LENGTH;
  const visibleDescription =
    isDescriptionExpanded || !isLongDescription
      ? description
      : description.slice(0, MAX_DESCRIPTION_LENGTH) + "...";

  const handleAddToCart = () => {
    console.log("🟢 Добавляем в корзину:", product);
    dispatch(addToCart({ ...product, quantity }));
  };

  return (
    <PageSection className={styles.productSection}>
      <Breadcrumbs backPath={backPath} label={label} title={title} />

      <div className={styles.productGrid}>
        <ImageGallery
          images={allImages}
          mainImage={mainImage}
          setMainImage={setMainImage}
          title={title}
        />

        <div className={styles.productInfo}>
          <h1 className={styles.productTitle}>{title}</h1>

          <div className={styles.priceBlock}>
            <span className={styles.newPrice}>
              ${(unitPrice * quantity).toFixed(2)}
            </span>
            {price && <span className={styles.oldPrice}>${price}</span>}
            {discountPercent && (
              <span className={styles.discount}>-{discountPercent}%</span>
            )}
          </div>

          <QuantitySelector
            quantity={quantity}
            setQuantity={setQuantity}
            handleAddToCart={handleAddToCart}
            unitPrice={unitPrice}
          />

          <div className={styles.descriptionBlock}>
            <h3 className={styles.titleDecription}>Description</h3>
            <p className={styles.descriptionText}>{visibleDescription}</p>
            {isLongDescription && !isDescriptionExpanded && (
              <button
                className={styles.readMoreButton}
                onClick={() => setIsDescriptionExpanded(true)}
              >
                Read more
              </button>
            )}
          </div>
        </div>
      </div>
    </PageSection>
  );
};

export default ProductDescription;
