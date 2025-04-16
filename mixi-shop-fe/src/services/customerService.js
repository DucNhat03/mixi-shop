import axios from "axios";

const API_URL = "http://localhost:5000/customers";

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

const getCustomers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

const getCustomerById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

const createCustomer = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

const updateCustomer = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

const deleteCustomer = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export default {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer
};
