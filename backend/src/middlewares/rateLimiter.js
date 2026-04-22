const rateLimit = require('express-rate-limit');

const toInt = (value, fallback) => {
  const parsed = parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const authWindowMs = toInt(process.env.AUTH_RATE_LIMIT_WINDOW_MS, 60 * 1000);
const authMax = toInt(process.env.AUTH_RATE_LIMIT_MAX, 5);
const apiWindowMs = toInt(process.env.API_RATE_LIMIT_WINDOW_MS, 60 * 1000);
const apiMax = toInt(process.env.API_RATE_LIMIT_MAX, 100);
const disableAuthRateLimit = process.env.DISABLE_AUTH_RATE_LIMIT === 'true';
const disableApiRateLimit = process.env.DISABLE_API_RATE_LIMIT === 'true';

/**
 * Rate limiter for authentication routes
 * Prevents brute force attacks on login/register
 */
const authLimiter = rateLimit({
  windowMs: authWindowMs,
  max: authMax,
  message: {
    success: false,
    message: 'Quá nhiều yêu cầu từ IP này, vui lòng thử lại sau 1 phút'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // Skip successful requests
  skipSuccessfulRequests: false,
  // Skip failed requests
  skipFailedRequests: false,
  skip: () => disableAuthRateLimit
});

/**
 * General API rate limiter
 * For all other API endpoints
 */
const apiLimiter = rateLimit({
  windowMs: apiWindowMs,
  max: apiMax,
  message: {
    success: false,
    message: 'Quá nhiều yêu cầu từ IP này, vui lòng thử lại sau 1 phút'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => disableApiRateLimit
});

module.exports = {
  authLimiter,
  apiLimiter
};
