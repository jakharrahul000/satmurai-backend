import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  env: process.env.APP_ENV,
  name: process.env.APP_NAME,
  url: process.env.APP_URL,
  port: process.env.APP_PORT,
  secretKey: process.env.WEBTOKEN_SECRET_KEY,
  expirationTime: process.env.WEBTOKEN_EXPIRATION_TIME,
  dbPassword: process.env.DB_PASSWORD,
  dbUsername: process.env.DB_USERNAME,
  dbName: process.env.DB_NAME,
}));
