import { useSelector, useDispatch } from "react-redux";
import { setFilters } from "../../redux/productSlice";
import styles from "./ProductFilter.module.css";

const ProductFilters = ({ showDiscountCheckbox = true }) => {
  const filters = useSelector((state) => state.products.filters);
  const dispatch = useDispatch();

  return (
    <div className={styles.filters}>
      <div className={styles.priceGroup}>
        <label className={styles.labelName}>Price</label>
        <input
          type="number"
          placeholder="from"
          value={filters.priceFrom}
          onChange={(e) => dispatch(setFilters({ priceFrom: e.target.value }))}
          className={styles.priceInput}
        />
        <input
          type="number"
          placeholder="to"
          value={filters.priceTo}
          onChange={(e) => dispatch(setFilters({ priceTo: e.target.value }))}
          className={styles.priceInput}
        />
      </div>

      {showDiscountCheckbox && (
        <div className={styles.filterGroup}>
          <label className={styles.labelName}>Discounted items</label>
          <input
            className={styles.checkbox}
            type="checkbox"
            checked={filters.discountOnly}
            onChange={() =>
              dispatch(setFilters({ discountOnly: !filters.discountOnly }))
            }
          />
        </div>
      )}

      <div>
        <label className={styles.labelName}>Sorted</label>
        <select
          value={filters.sort}
          onChange={(e) => dispatch(setFilters({ sort: e.target.value }))}
        >
          <option value="default">by default</option>
          <option value="newest">newest</option>
          <option value="price-high">price: high-low</option>
          <option value="price-low">price: low-high</option>
        </select>
      </div>
    </div>
  );
};

export default ProductFilters;
