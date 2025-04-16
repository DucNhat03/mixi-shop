const express = require('express');
const router = express.Router();
const circuitBreakerMiddleware = require('../middleware/circuitBreaker');

// URL của product service
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || 'http://localhost:5001';

// Circuit Breaker config
const circuitBreakerOptions = {
  timeout: 10000,                // 10s timeout
  errorThresholdPercentage: 70,  // 70% lỗi để kích hoạt
  resetTimeout: 10000,           // 10s để reset
  volumeThreshold: 10,           // Cần ít nhất 10 request
  errorFilter: (err) => {
    return !err.response || err.code === 'ECONNABORTED';
  }
};

// Sử dụng Circuit Breaker với config
router.use('/', circuitBreakerMiddleware(PRODUCT_SERVICE_URL, circuitBreakerOptions));

module.exports = router;

