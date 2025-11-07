import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import CategoriesAll from "../pages/CategoriesAll/CategoriesAll";
import AllProducts from "../pages/AllProducts/AllProducts";
import ProductDescription from "../pages/ProductDescription/ProductDescription";
import Cart from "../pages/Cart/Cart";
import NotFound from "../pages/NotFound/NotFound";
import AllSales from "../pages/AllSales/AllSales";
import CategoryPage from "../pages/CategoryPage/CategoryPage";
import MainLayout from "../components/MainLayout/MainLayout"; // 🟢 импортируем layout

function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
      <Route
        path="/categories"
        element={
          <MainLayout>
            <CategoriesAll />
          </MainLayout>
        }
      />
      <Route
        path="/categories/:categoryId"
        element={
          <MainLayout>
            <CategoryPage />
          </MainLayout>
        }
      />
      <Route
        path="/discounts"
        element={
          <MainLayout>
            <AllSales />
          </MainLayout>
        }
      />
      <Route
        path="/products"
        element={
          <MainLayout>
            <AllProducts />
          </MainLayout>
        }
      />
      <Route
        path="/product/:productId"
        element={
          <MainLayout>
            <ProductDescription />
          </MainLayout>
        }
      />
      <Route
        path="/cart"
        element={
          <MainLayout>
            <Cart />
          </MainLayout>
        }
      />
      <Route
        path="*"
        element={
          <MainLayout>
            <NotFound />
          </MainLayout>
        }
      />
    </Routes>
  );
}

export default AppRouter;
