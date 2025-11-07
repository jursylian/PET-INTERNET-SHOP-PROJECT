import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { fetchAllProducts } from "../../redux/productSlice";
import { productsSelectors } from "../../redux/productsSelectors";
import ProductFilter from "../../components/ProductFilter/ProductFilter";
import ProductCard from "../../components/ProductCard/ProductCard";
import PageSection from "../../ui/PageSection/PageSection";
import styles from "./AllProducts.module.css";

const selectAllProducts = productsSelectors((state) => state.products.items);

const AllProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <PageSection>
      <div className={styles.breadcrumb}>
        <Link to="/" className={styles.tab}>
          Main page
        </Link>

        <div className={styles.connector}></div>

        <span className={`${styles.tab} ${styles.active}`}>All products</span>
      </div>

      <h1 className={styles.pageTitle}>All products</h1>

      <ProductFilter />

      <div className={styles.productsWrapper}>
        {products.length > 0 ? (
          products
            .slice(0, 12)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </PageSection>
  );
};

export default AllProducts;
