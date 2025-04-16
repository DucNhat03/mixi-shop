const express = require('express');
const router = express.Router();
const circuitBreakerMiddleware = require('../middleware/circuitBreaker');

// URL của order service
const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL || 'http://localhost:5002';

// Sử dụng Circuit Breaker
router.use('/', circuitBreakerMiddleware(ORDER_SERVICE_URL));

module.exports = router;
