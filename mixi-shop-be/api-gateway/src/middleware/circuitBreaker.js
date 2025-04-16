const CircuitBreaker = require('opossum');
const axios = require('axios');

const circuitBreakerMiddleware = (targetUrl, options = {}) => {
  const defaultOptions = {
    timeout: 10000, // Tăng timeout lên 10s
    errorThresholdPercentage: 70, // Tăng ngưỡng lỗi lên 70%
    resetTimeout: 10000, // Giảm thời gian reset xuống 10s
    volumeThreshold: 10, // Tăng số lượng request cần thiết lên 10
    errorFilter: (err) => {
      // Chỉ tính các lỗi timeout và network
      return !err.response || err.code === 'ECONNABORTED';
    }
  };

  const breaker = new CircuitBreaker(
    async (req) => {
      try {
        const response = await axios({
          method: req.method,
          url: `${targetUrl}${req.path}`,
          headers: {
            ...req.headers,
            host: undefined
          },
          data: req.body,
          timeout: defaultOptions.timeout
        });

        // Chỉ throw error nếu status >= 500
        if (response.status >= 500) {
          throw new Error(`Service error: ${response.status}`);
        }

        return response.data;
      } catch (error) {
        // Log lỗi để debug
        console.error(`[Service Error] ${error.message}`);
        throw error;
      }
    },
    { ...defaultOptions, ...options }
  );

  breaker.fallback(async () => {
    throw new Error('Service is currently unavailable');
  });

  breaker.on('open', () => {
    console.log(`[Circuit Breaker] OPEN: ${targetUrl} is unavailable`);
  });

  breaker.on('halfOpen', () => {
    console.log(`[Circuit Breaker] HALF-OPEN: Testing ${targetUrl}`);
  });

  breaker.on('close', () => {
    console.log(`[Circuit Breaker] CLOSED: ${targetUrl} is available`);
  });

  breaker.on('success', () => {
    console.log(`[Circuit Breaker] Request to ${targetUrl} succeeded`);
  });

  breaker.on('failure', (error) => {
    console.log(`[Circuit Breaker] Request to ${targetUrl} failed: ${error.message}`);
  });

  breaker.on('timeout', () => {
    console.log(`[Circuit Breaker] Request to ${targetUrl} timed out`);
  });

  return async (req, res, next) => {
    try {
      const data = await breaker.fire(req);
      res.json(data);
    } catch (error) {
      // Log chi tiết lỗi
      console.error(`[Circuit Breaker] Error details:`, {
        state: breaker.status.state,
        stats: breaker.stats,
        error: error.message
      });

      if (error.response) {
        // Nếu là lỗi từ service, giữ nguyên status và response
        res.status(error.response.status).json(error.response.data);
      } else {
        // Nếu là lỗi Circuit Breaker hoặc network
        res.status(503).json({
          error: 'Service Unavailable',
          message: 'The service is currently down. Please try again later.'
        });
      }
    }
  };
};

module.exports = circuitBreakerMiddleware;
