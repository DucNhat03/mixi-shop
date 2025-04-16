const timeLimiterMiddleware = (timeout = 5000) => {
  return async (req, res, next) => {
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error('Request timeout'));
      }, timeout);
    });

    try {
      await Promise.race([
        new Promise((resolve) => next(resolve)),
        timeoutPromise
      ]);
    } catch (error) {
      res.status(408).json({
        error: 'Request Timeout',
        message: 'The request has timed out'
      });
    }
  };
};

module.exports = timeLimiterMiddleware; 