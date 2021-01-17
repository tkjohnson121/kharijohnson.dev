require('./env.js');

module.exports = {
  // Public, build-time env vars.
  // https://nextjs.org/docs#build-time-configuration
  env: {
    APP_URL: process.env.APP_URL,
    WAKATIME_API_KEY: process.env.WAKATIME_API_KEY,
  },
};
