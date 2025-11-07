import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./Header.module.css";
import logo from "../../assets/logo.svg";
import cartIcon from "../../assets/cart-icon.svg";

function Header() {
  const items = useSelector((state) => state.cart.items);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const location = useLocation();

  const currentPath = location.pathname;

  return (
    <header
      className={`${styles.header} ${
        currentPath !== "/" ? styles.withDivider : ""
      }`}
    >
      <div className={styles.left}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="Логотип" />
        </Link>
      </div>

      <nav className={styles.nav}>
        {currentPath === "/" ? (
          <span className={styles.inactive}>Main Page</span>
        ) : (
          <NavLink to="/" end>
            Main Page
          </NavLink>
        )}

        {currentPath === "/categories" ? (
          <span className={styles.inactive}>Categories</span>
        ) : (
          <NavLink to="/categories">Categories</NavLink>
        )}

        {currentPath === "/products" ? (
          <span className={styles.inactive}>All Products</span>
        ) : (
          <NavLink to="/products">All Products</NavLink>
        )}

        {currentPath === "/discounts" ? (
          <span className={styles.inactive}>All Sales</span>
        ) : (
          <NavLink to="/discounts">All Sales</NavLink>
        )}
      </nav>

      <div className={styles.right}>
        <Link to="/cart" className={styles.cart}>
          <img src={cartIcon} alt="Корзина" />
          {totalQuantity > 0 && (
            <span className={styles.count}>{totalQuantity}</span>
          )}
        </Link>
      </div>
    </header>
  );
}

export default Header;
