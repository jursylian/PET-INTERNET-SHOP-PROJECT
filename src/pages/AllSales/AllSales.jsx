import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { fetchAllProducts } from "../../redux/productSlice";
import { productsSelectors } from "../../redux/productsSelectors";
import styles from "./AllSales.module.css";

import ProductFilter from "../../components/ProductFilter/ProductFilter";
import ProductCard from "../../components/ProductCard/ProductCard";
import PageSection from "../../layouts/PageSection/PageSection";

const selectFilteredDiscounted = productsSelectors((state) =>
  state.products.items.filter((item) => item.discont_price)
);

const AllSales = () => {
  const dispatch = useDispatch();
  const AllSales = useSelector(selectFilteredDiscounted);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  return (
    <PageSection>
      <div className={styles.tabs}>
        <Link to="/" className={styles.tab}>
          Main page
        </Link>
        <div className={styles.connector}></div>
        <span className={`${styles.tab} ${styles.active}`}>All sales</span>
      </div>
      <h1 className={styles.pageTitle}>Discounted items</h1>
      <ProductFilter showDiscountCheckbox={false} />
      <div className={styles.productsWrapper}>
        {AllSales.slice(0, 8).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </PageSection>
  );
};

export default AllSales;
