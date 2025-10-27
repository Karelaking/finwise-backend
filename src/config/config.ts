const _config = {
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    rate_limit: {
      window_ms: 15 * 60 * 1000, // 15 minutes
      max_requests: 100,
    },
    api_prefix: process.env.API_KEY_PREFIX || 'api/v1',
  },
  session: {
    secret: process.env.SESSION_SECRET || 'default_session_secret',
    resave: false,
    saveUninitialized: false,
  },
  database: {
  }
}

export const config = Object.freeze(_config);