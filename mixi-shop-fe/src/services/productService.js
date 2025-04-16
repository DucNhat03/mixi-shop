import axios from 'axios';

const API_URL = 'http://localhost:5000/products';

const handleError = (error) => {
  if (axios.isCancel(error)) {
    console.log('Request canceled:', error.message);
    return;
  }

  if (error.response) {
    if (error.response.status === 503) {
      throw {
        ...error,
        message: 'Dịch vụ tạm thời không khả dụng. Vui lòng thử lại sau.',
        status: 503
      };
    }
    throw {
      ...error,
      message: error.response.data?.message || 'Có lỗi xảy ra',
      status: error.response.status
    };
  }

  if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
    throw {
      ...error,
      message: 'Yêu cầu hết thời gian. Vui lòng thử lại.',
      status: 'TIMEOUT'
    };
  }

  throw error;
};

const getProducts = async (signal) => {
  try {
    const response = await axios.get(API_URL, { 
      signal,
      timeout: 5000 // 5 seconds timeout
    });
    return response;
  } catch (error) {
    throw handleError(error);
  }
};

const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      timeout: 5000
    });
    return response;
  } catch (error) {
    throw handleError(error);
  }
};

const createProduct = async (data) => {
  try {
    const response = await axios.post(API_URL, data, {
      timeout: 5000
    });
    return response;
  } catch (error) {
    throw handleError(error);
  }
};

const updateProduct = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data, {
      timeout: 5000
    });
    return response;
  } catch (error) {
    throw handleError(error);
  }
};

const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      timeout: 5000
    });
    return response;
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
