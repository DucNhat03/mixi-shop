const CircuitBreaker = require('opossum');
const axios = require('axios');

const circuitBreakerMiddleware = (targetUrl, options = {}) => {
  const defaultOptions = {
    timeout: 10000, 
    errorThresholdPercentage: 70, 
    resetTimeout: 10000, 
    volumeThreshold: 10, 
    errorFilter: (err) => {
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

        if (response.status >= 500) {
          throw new Error(`Service error: ${response.status}`);
        }

        return response.data;
      } catch (error) {
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
      console.error(`[Circuit Breaker] Error details:`, {
        state: breaker.status.state,
        stats: breaker.stats,
        error: error.message
      });

      if (error.response) {
        res.status(error.response.status).json(error.response.data);
      } else {
        res.status(503).json({
          error: 'Service Unavailable',
          message: 'The service is currently down. Please try again later.'
        });
      }
    }
  };
};

module.exports = circuitBreakerMiddleware;
