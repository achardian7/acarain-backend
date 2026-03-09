import dotenv from 'dotenv';
import { bool, cleanEnv, port, str, url } from 'envalid';

dotenv.config();

const env = cleanEnv(process.env, {
  SECRET: str(),
  MONGO_URI: url(),
  EMAIL_SMTP_SECURE: bool({ default: false }),
  EMAIL_SMTP_PASS: str(),
  EMAIL_SMTP_USER: str(),
  EMAIL_SMTP_PORT: port(),
  EMAIL_SMTP_HOST: str(),
  EMAIL_SMTP_SERVICE_NAME: str(),
  CLIENT_HOST: url({ default: 'http://localhost:3000' }),
  CLOUDINARY_CLOUD_NAME: str(),
  CLOUDINARY_API_KEY: str(),
  CLOUDINARY_API_SECRET: str(),
});

export default env;
