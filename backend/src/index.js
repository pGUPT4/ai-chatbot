import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';

import authRoutes from './routes/auth.route.js';
import { connectDB } from './lib/db.js';

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//remove it in production
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);

app.get('/', (req, res) => {
  res.send('Test!')
});

app.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  // connectDB();
});
