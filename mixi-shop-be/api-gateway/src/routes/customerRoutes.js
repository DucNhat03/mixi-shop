const express = require('express');
const router = express.Router();
const circuitBreakerMiddleware = require('../middleware/circuitBreaker');

const CUSTOMER_SERVICE_URL = process.env.CUSTOMER_SERVICE_URL || 'http://localhost:5003';

const circuitBreakerOptions = {
  timeout: 10000,
  errorThresholdPercentage: 70,
  resetTimeout: 10000,
  volumeThreshold: 10,
  errorFilter: (err) => {
    return !err.response || err.code === 'ECONNABORTED';
  }
};

router.use((req, res, next) => {
  req.url = '/customers' + req.url;
  next();
});

router.use('/', circuitBreakerMiddleware(CUSTOMER_SERVICE_URL, circuitBreakerOptions));

module.exports = router;
