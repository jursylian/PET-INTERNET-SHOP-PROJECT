import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./Header.module.css";
import logo from "../../assets/logo.svg";
import cartIcon from "../../assets/cart-icon.svg";

function Header() {
  const items = useSelector((state) => state.cart.items);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const getActiveClass = ({ isActive }) =>
    isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        {/* Лого ведёт на главную страницу */}
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="Логотип PetShop" />
        </Link>
      </div>

      {/* Навигация */}
      <nav className={styles.nav}>
        <NavLink to="/" className={getActiveClass}>
          Main Page
        </NavLink>
        <NavLink to="/categories" className={getActiveClass}>
          Categories
        </NavLink>
        <NavLink to="/products" className={getActiveClass}>
          All Products
        </NavLink>
        <NavLink to="/sales" className={getActiveClass}>
          All Sales
        </NavLink>
      </nav>

      {/* Корзина */}
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
