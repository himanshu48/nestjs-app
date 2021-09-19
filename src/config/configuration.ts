import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: process.env.PORT,
  apiPrefix: process.env.API_PREFIX,
  database: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
  },
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY,
    expirationTime: process.env.JWT_EXPIRATION_TIME,
  },
}));
