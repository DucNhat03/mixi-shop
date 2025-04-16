const retryMiddleware = (options = {}) => {
  const defaultOptions = {
    retries: 3,
    minTimeout: 1000,
    maxTimeout: 5000,
    factor: 2
  };

  const config = { ...defaultOptions, ...options };

  return async (req, res, next) => {
    let attempts = 0;
    let timeout = config.minTimeout;

    const attempt = async () => {
      try {
        await next();
      } catch (error) {
        attempts++;

        if (attempts >= config.retries) {
          throw error;
        }

        timeout = Math.min(timeout * config.factor, config.maxTimeout);
        await new Promise(resolve => setTimeout(resolve, timeout));
        return attempt();
      }
    };

    try {
      await attempt();
    } catch (error) {
      res.status(500).json({
        error: 'Service Error',
        message: 'Failed after multiple retries'
      });
    }
  };
};

module.exports = retryMiddleware; 