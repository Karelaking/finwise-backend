export default () => ({
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    api_prefix: process.env.API_KEY_PREFIX || 'api/v1',
  },
  session: {
    secret: process.env.SESSION_SECRET || 'default_session_secret',
    resave: false,
    saveUninitialized: false,
  },
  clerk: {
    clerk_secret_key:
      process.env.CLERK_SECRET_KEY,
    clerk_publish_key:
      process.env.CLERK_PUBLISHABLE_KEY,
  },
  resend_api_key: process.env.RESEND_API_KEY,
  database: {},
});
