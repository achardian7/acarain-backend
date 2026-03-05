import app from './app';
import connect from './utils/database';

const PORT = 8080;

const init = async () => {
  try {
    const result = await connect();

    console.log('Database status', result);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

init();
