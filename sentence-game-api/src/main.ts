import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import path from 'path';
import cors from 'cors';
import generateSentencesRouter from './generate-sentences';
import generateChoicesRouter from './generate-choices';
import generateActivityQuestion from './generate-activity-question';
import generateOwnershipQuestion from './generate-ownership-question';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());
app.use('/api', generateSentencesRouter);
app.use('/api', generateChoicesRouter);
app.use('/api', generateActivityQuestion);
app.use('/api', generateOwnershipQuestion);

// Serve static files (e.g., your built React app)
app.use(express.static(path.join(__dirname, 'build')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
