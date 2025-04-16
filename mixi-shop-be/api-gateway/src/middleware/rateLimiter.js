const { RateLimiterMemory } = require('rate-limiter-flexible');

const rateLimiterMiddleware = (options = {}) => {
  const defaultOptions = {
    points: 10, // Number of points
    duration: 1, // Per second
    blockDuration: 60 // Block for 1 minute if consumed more than points
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