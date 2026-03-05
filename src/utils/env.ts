import dotenv from 'dotenv';
import { cleanEnv, str, url } from 'envalid';

dotenv.config();

const env = cleanEnv(process.env, {
  SECRET: str(),
  MONGO_URI: url(),
});

export default env;
