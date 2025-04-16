const { RateLimiterMemory } = require('rate-limiter-flexible');

const rateLimiterMiddleware = (options = {}) => {
  const defaultOptions = {
    points: 10, 
    duration: 1, 
    blockDuration: 60 
  };

  const rateLimiter = new RateLimiterMemory({
    ...defaultOptions,
    ...options
  });

  return (req, res, next) => {
    rateLimiter.consume(req.ip)
      .then(() => {
        next();
      })
      .catch(() => {
        res.status(429).json({
          error: 'Too Many Requests',
          message: 'Please try again later'
        });
      });
  };
};

module.exports = rateLimiterMiddleware; 