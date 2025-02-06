import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Choice {
  text: string;
  isCorrect: boolean;
}

interface EnergyQuestion {
  question: string;
  choices: Choice[];
}

const EnergyQuiz: React.FC = () => {
  const [questionData, setQuestionData] = useState<EnergyQuestion | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get<EnergyQuestion>('http://localhost:5000/api/generate-question');
        setQuestionData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching question:', err);
        setLoading(false);
      }
    };
    fetchQuestion();
  }, []);

  const handleChoiceClick = (index: number) => {
    if (selectedChoice !== null) return; // prevent multiple selections
    setSelectedChoice(index);
    if (questionData) {
      const chosen = questionData.choices[index];
      if (chosen.isCorrect) {
        setFeedback('Correct! You have been rewarded!');
      } else {
        setFeedback('Incorrect. Better luck next time!');
      }
    }
  };

  if (loading) {
    return <div>Loading question...</div>;
  }

  if (!questionData) {
    return <div>There was an error loading the question.</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Energy Quiz</h1>
      <h2>{questionData.question}</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {questionData.choices.map((choice, idx) => (
          <li
            key={idx}
            onClick={() => handleChoiceClick(idx)}
            style={{
              padding: '10px',
              margin: '8px 0',
              border: '1px solid #333',
              borderRadius: '4px',
              cursor: selectedChoice === null ? 'pointer' : 'default',
              backgroundColor:
                selectedChoice === idx
                  ? choice.isCorrect
                    ? 'lightgreen'
                    : 'lightcoral'
                  : '#fff'
            }}
          >
            {choice.text}
          </li>
        ))}
      </ul>
      {feedback && (
        <div style={{ marginTop: '20px', fontSize: '1.2em' }}>
          {feedback}
        </div>
      )}
    </div>
  );
};

export default EnergyQuiz;
