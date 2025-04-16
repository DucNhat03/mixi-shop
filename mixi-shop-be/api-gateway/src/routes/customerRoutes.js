const express = require('express');
const router = express.Router();
const circuitBreakerMiddleware = require('../middleware/circuitBreaker');

// URL của customer service
const CUSTOMER_SERVICE_URL = process.env.CUSTOMER_SERVICE_URL || 'http://localhost:5003';

// Sử dụng Circuit Breaker
router.use('/', circuitBreakerMiddleware(CUSTOMER_SERVICE_URL));

module.exports = router;
