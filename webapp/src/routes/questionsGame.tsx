// EnergyQuiz.tsx
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

const QuestionGame: React.FC = () => {
  const [questionData, setQuestionData] = useState<EnergyQuestion | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showDialog, setShowDialog] = useState<boolean>(false);

  // Function to fetch a new question
  const fetchQuestion = async () => {
    setLoading(true);
    try {
      const response = await axios.get<EnergyQuestion>('http://localhost:5000/api/generate-question');
      setQuestionData(response.data);
      setSelectedChoice(null);
      setFeedback(null);
      setShowDialog(false);
    } catch (err) {
      console.error('Error fetching question:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial question on mount
  useEffect(() => {
    fetchQuestion();
  }, []);

  // Handle answer selection
  const handleChoiceClick = (index: number) => {
    // Prevent multiple selections
    if (selectedChoice !== null) return;
    setSelectedChoice(index);
    if (questionData) {
      const chosen = questionData.choices[index];
      if (chosen.isCorrect) {
        setFeedback('Correct! You have been rewarded!');
      } else {
        setFeedback('Incorrect. Better luck next time!');
      }
      // Open the dialog after submission
      setShowDialog(true);
    }
  };

  // Handler for moving on to the next question
  const handleNextQuestion = () => {
    fetchQuestion();
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

      {/* Dialog after answer submission */}
      {showDialog && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '30px',
              borderRadius: '8px',
              textAlign: 'center',
              minWidth: '300px',
            }}
          >
            <h2>Result</h2>
            <p>{feedback}</p>
            <button
              onClick={handleNextQuestion}
              style={{
                padding: '10px 20px',
                marginTop: '20px',
                cursor: 'pointer',
              }}
            >
              Next Question
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionGame;
