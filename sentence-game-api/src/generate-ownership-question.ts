// generate-ownership-question.ts
import { Router, Request, Response } from 'express';
import OpenAI from 'openai';

const router = Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.get('/generate-ownership-question', async (req: Request, res: Response) => {
  try {
    const prompt = `
Generate one multiple-choice challenge question for a game about ownership and sharing. The game’s theme is:
"Ideology of ownership and sharing, connection on real life activities; telling the truth gives extra points, however an ugly truth is punished with a task. Participation of neighbors and friends is encouraged."
The challenge question should test the player's understanding of these values. The question must have exactly 4 answer choices. Exactly one choice must be the best (correct) answer that aligns with the ideal of honest sharing and responsible ownership. Each answer choice should be output as a JSON object with two keys: "text" (the choice string) and "isCorrect" (a boolean, true only for the correct answer).  
Return the entire result as a JSON object wrapped within a key named "ownershipChallenge" with two properties:
- "question": A string representing the challenge question.
- "choices": An array of 4 answer choice objects.
Return only the JSON object with no additional commentary.
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
    const ownershipChallenge = parsed.ownershipChallenge;
    if (!ownershipChallenge) {
      throw new Error('Expected "ownershipChallenge" key in the response');
    }
    res.json(ownershipChallenge);
  } catch (err: any) {
    console.error('Error generating ownership question:', err.response?.data || err);
    res.status(500).json({ error: 'Error generating ownership question' });
  }
});

export default router;
