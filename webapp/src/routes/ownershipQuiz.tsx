// OwnershipQuiz.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Choice {
  text: string;
  isCorrect: boolean;
}

interface OwnershipChallenge {
  question: string;
  choices: Choice[];
}

const OwnershipQuiz: React.FC = () => {
  const [challenge, setChallenge] = useState<OwnershipChallenge | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const fetchChallenge = async () => {
    setLoading(true);
    try {
      const response = await axios.get<OwnershipChallenge>('http://localhost:5000/api/generate-ownership-question');
      setChallenge(response.data);
      setSelectedChoice(null);
      setFeedback(null);
      setShowDialog(false);
    } catch (err) {
      console.error('Error fetching challenge:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChallenge();
  }, []);

  const handleChoiceClick = (index: number) => {
    if (selectedChoice !== null) return; // Prevent multiple selections
    setSelectedChoice(index);
    if (challenge) {
      const chosen = challenge.choices[index];
      if (chosen.isCorrect) {
        setFeedback('Correct! Your honest and balanced choice wins extra points for ownership and sharing.');
      } else {
        setFeedback('Incorrect. Remember, telling the truth and sharing responsibly is key—even if the truth is hard to hear, it may come with a task!');
      }
      setShowDialog(true);
    }
  };

  const handleNextChallenge = () => {
    fetchChallenge();
  };

  if (loading) {
    return <div>Loading challenge...</div>;
  }

  if (!challenge) {
    return <div>There was an error loading the challenge.</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Ownership Challenge</h1>
      <h2>{challenge.question}</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {challenge.choices.map((choice, idx) => (
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
                  : '#fff',
            }}
          >
            {choice.text}
          </li>
        ))}
      </ul>

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
              onClick={handleNextChallenge}
              style={{
                padding: '10px 20px',
                marginTop: '20px',
                cursor: 'pointer',
              }}
            >
              Next Challenge
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnershipQuiz;
