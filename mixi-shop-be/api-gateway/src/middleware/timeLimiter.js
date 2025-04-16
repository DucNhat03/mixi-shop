const timeLimiterMiddleware = (timeout = 5000) => {
  return (req, res, next) => {
    const timeoutId = setTimeout(() => {
      if (!res.headersSent) {
        res.status(408).json({
          error: 'Request Timeout',
          message: 'The request has timed out'
        });
      }
    }, timeout);

    const originalEnd = res.end;

    res.end = function(...args) {
      clearTimeout(timeoutId);
      originalEnd.apply(res, args);
    };

    next();
  };
};

module.exports = timeLimiterMiddleware; 