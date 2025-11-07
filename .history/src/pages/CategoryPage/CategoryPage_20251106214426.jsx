import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./CategoryPage.module.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import ProductFilter from "../../components/ProductFilter/ProductFilter";
import PageSection from "../../layouts/PageSection/PageSection";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryItems } from "../../redux/productSlice";
import { productsSelectors } from "../../redux/productsSelectors";
import axios from "axios";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [categoryTitle, setCategoryTitle] = useState("");
  const dispatch = useDispatch();

  const selectFilteredCategory = productsSelectors(
    (state) => state.products.categoryItems
  );

  const products = useSelector(selectFilteredCategory);

  useEffect(() => {
    axios
      .get(`http://localhost:3333/categories/${categoryId}`)
      .then((res) => {
        setCategoryTitle(res.data.category?.title || "Category");
        dispatch(setCategoryItems(res.data.data || []));
      })
      .catch((err) => {
        console.error("Error loading products:", err);
      });
  }, [categoryId, dispatch]);

  return (
    <PageSection>
      <div className={styles.tabs}>
        <Link to="/" className={styles.tab}>
          Main page
        </Link>
        <div className={styles.connector}></div>

        <Link to="/categories" className={styles.tab}>
          Categories
        </Link>
        <div className={styles.connector}></div>
        <span className={`${styles.tab} ${styles.active}`}>
          {categoryTitle}
        </span>
      </div>

      <h1 className={styles.titletDry}>{categoryTitle}</h1>

      <ProductFilter />

      <div className={styles.grid}>
        {products.slice(0, 8).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </PageSection>
  );
};

export default CategoryPage;
