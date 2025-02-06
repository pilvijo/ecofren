import { Router, Request, Response } from 'express';
import OpenAI from 'openai';

const router = Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.get('/generate-activity-question', async (req: Request, res: Response) => {
  try {
    const prompt = `
Generate one multiple-choice challenge question for a game where physical activities and nutrition "bad habits" are chasing you. The challenge should test the player’s ability to choose a healthy action or option that overcomes the bad habit. The question should have exactly 4 choices. Exactly one choice must be the best (correct) answer that represents a healthy activity or nutritional decision. Output the result as a JSON object wrapped within a key named "activityChallenge". The JSON object should have:
- "question": A string with the challenge question.
- "choices": An array of 4 objects. Each object should have:
  - "text": A string for the choice.
  - "isCorrect": A boolean that is true only for the correct answer.
Return only the JSON object without extra commentary.
    `.trim();

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const answer = response.choices[0].message?.content;
    if (!answer) {
      throw new Error('No response content received from OpenAI');
    }
    
    const parsed = JSON.parse(answer);
    const activityChallenge = parsed.activityChallenge;
    if (!activityChallenge) {
      throw new Error('Expected "activityChallenge" key in the response');
    }
    res.json(activityChallenge);
  } catch (err: any) {
    console.error('Error generating activity question:', err.response?.data || err);
    res.status(500).json({ error: 'Error generating activity question' });
  }
});

export default router;
