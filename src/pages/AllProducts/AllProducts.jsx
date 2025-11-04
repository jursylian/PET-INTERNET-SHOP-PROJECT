import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { fetchAllProducts } from "../../redux/productSlice";
import styles from "./AllProducts.module.css";
import { productsSelectors } from "../../redux/productsSelectors";
import ProductFilter from "../../components/ProductFilter/ProductFilter";
import ProductCard from "../../components/ProductCard/ProductCard";
import PageSection from "../../layouts/PageSection/PageSection";

const selectFilteredAll = productsSelectors((state) => state.products.items);

const AllProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectFilteredAll);

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

        <span className={`${styles.tab} ${styles.active}`}>All products</span>
      </div>

      <h1 className={styles.pageTitle}>All products</h1>
      <ProductFilter />
      <div className={styles.productsWrapper}>
        {products.slice(0, 12).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </PageSection>
  );
};

export default AllProducts;
