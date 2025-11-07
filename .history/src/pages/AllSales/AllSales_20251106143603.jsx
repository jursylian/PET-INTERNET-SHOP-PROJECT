import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { fetchAllProducts } from "../../redux/productSlice";
import { productsSelectors } from "../../redux/productsSelectors";
import styles from "./AllSales.module.css";

import ProductFilter from "../../components/ProductFilter/ProductFilter";
import ProductCard from "../../components/ProductCard/ProductCard";
import PageSection from "../../layouts/PageSection/PageSection";

const selectDiscountedProducts = productsSelectors((state) =>
  state.products.items.filter((item) => item.discont_price)
);

const AllSales = () => {
  const dispatch = useDispatch();
  const discountedProducts = useSelector(selectDiscountedProducts);
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const isOnSalesPage = location.pathname === "/discounts";

  return (
    <PageSection>
      <div className={styles.breadcrumb}>
        {!isOnSalesPage ? (
          <Link to="/" className={styles.tab}>
            Main page
          </Link>
        ) : (
          <span className={`${styles.tab} ${styles.disabled}`}>Main page</span>
        )}

        <div className={styles.connector}></div>

        <span className={`${styles.tab} ${styles.active}`}>All sales</span>
      </div>

      <h1 className={styles.pageTitle}>Discounted items</h1>

      <ProductFilter showDiscountCheckbox={false} />

      <div className={styles.productsWrapper}>
        {discountedProducts.length > 0 ? (
          discountedProducts
            .slice(0, 8)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
        ) : (
          <p>No discounted products found.</p>
        )}
      </div>
    </PageSection>
  );
};

export default AllSales;
