// src/services/productService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/products';

const getProducts = () => axios.get(API_URL);
const getProductById = (id) => axios.get(`${API_URL}/${id}`);
const createProduct = (product) => axios.post(API_URL, product);
const updateProduct = (id, product) => axios.put(`${API_URL}/${id}`, product);
const deleteProduct = (id) => axios.delete(`${API_URL}/${id}`);

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
