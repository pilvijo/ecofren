import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import path from 'path';
import cors from 'cors';
import generateSentencesRouter from './generate-sentences';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());
app.use('/api', generateSentencesRouter);

// Serve static files (e.g., your built React app)
app.use(express.static(path.join(__dirname, 'build')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
