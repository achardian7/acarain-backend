import mongoose from 'mongoose';

import env from './env';

const connect = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI, {
      dbName: 'acara',
    });

    return Promise.resolve(`Database connected on ${conn.connection.host}`);
  } catch (error) {
    return Promise.reject(error);
  }
};

export default connect;
