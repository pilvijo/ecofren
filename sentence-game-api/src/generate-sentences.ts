import { Router, Request, Response } from 'express';
import OpenAI from 'openai';

const router = Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.get('/generate-sentences', async (req: Request, res: Response) => {
  try {
    const prompt = `
Generate 20 short sentences about energy. Exactly 10 sentences should describe good green energy (e.g., renewable, sustainable) and 10 sentences should describe energy sources that damage the environment (e.g., fossil fuels, pollution). For each sentence, output a JSON object with two keys: "text" (the sentence) and "isGood" (true if the sentence is about good energy, false if it is about bad energy). Return the results as a JSON array, wrapped within an object in a "energySentences" key.
    `.trim();

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 1500,
      response_format: { type: "json_object" }
    });

    const answer = response.choices[0].message?.content;
    if (!answer) {
      throw new Error('No response content received from OpenAI');
    }
    // Parse the answer as JSON
    console.log(answer);
    const sentences = JSON.parse(answer)["energySentences"];
    res.json(sentences);
  } catch (err: any) {
    console.error('Error generating sentences:', err.response?.data || err);
    res.status(500).json({ error: 'Error generating sentences' });
  }
});

export default router;
