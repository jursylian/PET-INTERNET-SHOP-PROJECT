import { createSelector } from "@reduxjs/toolkit";

export const productsSelectors = (getItems) =>
  createSelector(
    [getItems, (state) => state.products.filters],
    (items, filters) => {
      let result = [...items];

      if (filters.discountOnly) {
        result = result.filter(
          (p) => p.discont_price && p.discont_price < p.price
        );
      }
      if (filters.priceFrom) {
        result = result.filter((p) => p.price >= Number(filters.priceFrom));
      }
      if (filters.priceTo) {
        result = result.filter((p) => p.price <= Number(filters.priceTo));
      }

      if (filters.sort === "price-low") {
        result.sort((a, b) => a.price - b.price);
      } else if (filters.sort === "price-high") {
        result.sort((a, b) => b.price - a.price);
      } else if (filters.sort === "newest") {
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }

      return result;
    }
  );
