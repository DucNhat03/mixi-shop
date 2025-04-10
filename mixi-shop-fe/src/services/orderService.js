import axios from "axios";

const API_URL = "http://localhost:5000/orders";

const getOrders = () => axios.get(API_URL);
const getOrderById = (id) => axios.get(`${API_URL}/${id}`);
const createOrder = (data) => axios.post(API_URL, data);
const updateOrder = (id, data) => axios.put(`${API_URL}/${id}`, data);
const deleteOrder = (id) => axios.delete(`${API_URL}/${id}`);

export default {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
};
