import { useSelector, useDispatch } from "react-redux";
import { setFilters } from "../../redux/productSlice";
import styles from "./ProductFilter.module.css";

const ProductFilters = ({ showDiscountCheckbox = true }) => {
  const filters = useSelector((state) => state.products.filters);
  const dispatch = useDispatch();

  return (
    <form className={styles.filters} onSubmit={(e) => e.preventDefault()}>
      {/* Price range */}
      <div className={styles.filterPriceGroup}>
        <label className={styles.filterLabel}>Price</label>
        <input
          type="number"
          placeholder="from"
          value={filters.priceFrom}
          onChange={(e) => dispatch(setFilters({ priceFrom: e.target.value }))}
          className={styles.filterInput}
        />
        <input
          type="number"
          placeholder="to"
          value={filters.priceTo}
          onChange={(e) => dispatch(setFilters({ priceTo: e.target.value }))}
          className={styles.filterInput}
        />
      </div>

      {/* Discounted items */}
      {showDiscountCheckbox && (
        <div className={styles.filterCheckboxGroup}>
          <label className={styles.filterLabel}>
            Discounted items
            <input
              aria-label="Show only discounted items"
              className={styles.checkbox}
              type="checkbox"
              checked={filters.discountOnly}
              onChange={() =>
                dispatch(setFilters({ discountOnly: !filters.discountOnly }))
              }
            />
          </label>
        </div>
      )}

      {/* Sort selector */}
      <div className={styles.filterSortGroup}>
        <label className={styles.filterLabel}>Sorted</label>
        <select
          value={filters.sort}
          onChange={(e) => dispatch(setFilters({ sort: e.target.value }))}
          className={styles.filterSelect}
        >
          <option value="default">by default</option>
          <option value="newest">newest</option>
          <option value="price-high">price: high-low</option>
          <option value="price-low">price: low-high</option>
        </select>
      </div>
    </form>
  );
};

export default ProductFilters;
