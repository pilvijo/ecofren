// generate-question.ts
import { Router, Request, Response } from 'express';
import OpenAI from 'openai';

const router = Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.get('/generate-question', async (req: Request, res: Response) => {
  try {
    const prompt = `
Generate one multiple-choice question about energy. The question should have exactly 4 choices and only one choice should be marked as correct. For the answer choices, output each as a JSON object with two keys: "text" (the choice text) and "isCorrect" (true if this is the correct answer, false otherwise). Then, output the question text. Return the results as a JSON object wrapped within a key named "energyQuestion". For example:

{
  "energyQuestion": {
    "question": "Your question text here?",
    "choices": [
      { "text": "Choice 1", "isCorrect": false },
      { "text": "Choice 2", "isCorrect": true },
      { "text": "Choice 3", "isCorrect": false },
      { "text": "Choice 4", "isCorrect": false }
    ]
  }
}
Do not include any extra commentary or text.
    `.trim();

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',  // Use your preferred model name here.
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
      response_format: { type: "json_object" }
    });

    const answer = response.choices[0].message?.content;
    if (!answer) {
      throw new Error('No response content received from OpenAI');
    }
    // Log the raw answer for debugging
    console.log('Raw GPT Response:', answer);

    // Parse the answer as JSON and extract the wrapped object
    const parsed = JSON.parse(answer);
    const energyQuestion = parsed.energyQuestion;
    if (!energyQuestion) {
      throw new Error('Expected "energyQuestion" key in the response');
    }
    res.json(energyQuestion);
  } catch (err: any) {
    console.error('Error generating question:', err.response?.data || err);
    res.status(500).json({ error: 'Error generating question' });
  }
});

export default router;
