const express = require('express');
const router = express.Router();
const circuitBreakerMiddleware = require('../middleware/circuitBreaker');


const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || 'http://localhost:5001';


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

  req.url = '/products' + req.url;
  next();
});


router.use('/', circuitBreakerMiddleware(PRODUCT_SERVICE_URL, circuitBreakerOptions));

module.exports = router;

