// src/services/productService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/products';

// Hàm xử lý lỗi chung
const handleError = (error) => {
  if (error.response) {
    // Circuit Breaker error (503)
    if (error.response.status === 503) {
      throw new Error('Service tạm thời không khả dụng. Vui lòng thử lại sau.');
    }
    throw new Error(error.response.data.message || 'Có lỗi xảy ra');
  }
  throw error;
};

const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    // Trả về trực tiếp response data vì đó là mảng products
    return { data: response.data };
  } catch (error) {
    throw handleError(error);
  }
};

const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return { data: response.data };
  } catch (error) {
    throw handleError(error);
  }
};

const createProduct = async (product) => {
  try {
    const response = await axios.post(API_URL, product);
    return { data: response.data };
  } catch (error) {
    throw handleError(error);
  }
};

const updateProduct = async (id, product) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, product);
    return { data: response.data };
  } catch (error) {
    throw handleError(error);
  }
};

const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return { data: response.data };
  } catch (error) {
    throw handleError(error);
  }
};

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
