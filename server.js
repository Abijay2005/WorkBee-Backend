import express from 'express';
import connectDB from './config/database.js';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js'

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/health', (req, res) => {
  res.json({ message: 'WorkBee API is running' })
})

app.use('/api/auth', authRoutes);
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
  }
  );
}

startServer();
