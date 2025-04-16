const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Import middlewares
const rateLimiterMiddleware = require('./middleware/rateLimiter');
const timeLimiterMiddleware = require('./middleware/timeLimiter');
const retryMiddleware = require('./middleware/retry');

app.use(cors());
app.use(express.json());

// Áp dụng Rate Limiter và Time Limiter cho toàn bộ app
app.use(rateLimiterMiddleware({
  points: 50,           // Số request tối đa
  duration: 60,         // Trong 1 phút
  blockDuration: 300    // Block trong 5 phút nếu vượt quá
}));

app.use(timeLimiterMiddleware(5000)); // Timeout sau 5s

// Import routes
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const customerRoutes = require('./routes/customerRoutes');

// Áp dụng retry middleware cho từng route
const retryOptions = {
  retries: 3,
  minTimeout: 1000,
  maxTimeout: 5000,
  factor: 2
};

// Apply routes with all middlewares
app.use('/products', retryMiddleware(retryOptions), productRoutes);
app.use('/orders', retryMiddleware(retryOptions), orderRoutes);
app.use('/customers', retryMiddleware(retryOptions), customerRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Global Error Handler:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

app.listen(PORT, () => {
  console.log(`API Gateway running at http://localhost:${PORT}`);
});
