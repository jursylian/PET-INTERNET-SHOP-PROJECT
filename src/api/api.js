import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333",
});

export const getCategories = () => api.get("/categories/all");

export const getSaleProducts = () => api.get("/products/sale");

export const sendSaleForm = (data) => api.post("/sale/send", data);

export default api;
