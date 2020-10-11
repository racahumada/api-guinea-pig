import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const db = async () => {
  await mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default db;
