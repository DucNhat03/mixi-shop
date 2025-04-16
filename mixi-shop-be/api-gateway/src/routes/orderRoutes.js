const express = require('express');
const router = express.Router();
const circuitBreakerMiddleware = require('../middleware/circuitBreaker');

const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL || 'http://localhost:5002';


router.use('/', circuitBreakerMiddleware(ORDER_SERVICE_URL));

module.exports = router;
