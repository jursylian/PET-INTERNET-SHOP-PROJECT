import axios from "axios";

const api = axios.create({
  baseURL: "http://petshop-backend.onrender.com",
});

export const getCategories = () => api.get("/categories/all");

export const getSaleProducts = () => api.get("/products/sale");

export const sendSaleForm = (data) => api.post("/sale/send", data);

export default api;
