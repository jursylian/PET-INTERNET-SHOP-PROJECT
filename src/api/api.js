import axios from "axios";

const api = axios.create({
  baseURL: "https://petshop-backend.onrender.com",
});

export const getCategories = () => api.get("/categories/all");

export const getSaleProducts = () => api.get("/products/all");

export const sendSaleForm = (data) => api.post("/sale/send", data);

export default api;
