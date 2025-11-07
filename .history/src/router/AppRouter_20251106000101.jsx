import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";

import Home from "../pages/Home/Home";
import CategoriesAll from "../pages/CategoriesAll/CategoriesAll";
import AllProducts from "../pages/AllProducts/AllProducts";
import ProductDescription from "../pages/ProductDescription/ProductDescription";
import Cart from "../pages/Cart/Cart";
import NotFound from "../pages/NotFound/NotFound";
import AllSales from "../pages/AllSales/AllSales";
import CategoryPage from "../pages/CategoryPage/CategoryPage";

function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<CategoriesAll />} />
        <Route path="/categories/:categoryId" element={<CategoryPage />} />
        <Route path="/discounts" element={<AllSales />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/product/:productId" element={<ProductDescription />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
