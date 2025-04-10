import axios from "axios";

const API_URL = "http://localhost:5000/customers";

const getCustomers = () => axios.get(API_URL);
const getCustomerById = (id) => axios.get(`${API_URL}/${id}`);
const createCustomer = (data) => axios.post(API_URL, data);
const updateCustomer = (id, data) => axios.put(`${API_URL}/${id}`, data);
const deleteCustomer = (id) => axios.delete(`${API_URL}/${id}`);

export default {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer
};
