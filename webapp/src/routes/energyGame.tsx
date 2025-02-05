// EnergyGame.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Sentence {
  text: string;
  isGood: boolean;
}

const EnergyGame: React.FC = () => {
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(20);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch sentences when component mounts
  useEffect(() => {
    const fetchSentences = async () => {
      try {
        const response = await axios.get<Sentence[]>('http://localhost:5000/api/generate-sentences');
        setSentences(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching sentences:', err);
      }
    };
    fetchSentences();
  }, []);

  // Countdown timer effect
  useEffect(() => {
    if (!loading && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      // Calculate the score when time is up
      const computedScore = selected.reduce((acc, idx) => {
        return acc + (sentences[idx].isGood ? 1 : 0);
      }, 0);
      setScore(computedScore);
      setGameOver(true);
    }
  }, [timeLeft, loading, selected, sentences]);

  const handleSentenceClick = (index: number) => {
    if (gameOver) return;
    // Toggle selection: add if not selected, remove if already selected.
    if (selected.includes(index)) {
      setSelected(selected.filter((i) => i !== index));
    } else {
      setSelected([...selected, index]);
    }
  };

  if (loading) {
    return <div>Loading sentences...</div>;
  }

  if (gameOver) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1>Time's Up!</h1>
        <h2>Your Score: {score}</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Energy Game</h1>
      <h2>Time left: {timeLeft}s</h2>
      <p>
        Click on the sentences that describe <strong>good (green)</strong> energy.
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '10px',
          marginTop: '20px'
        }}
      >
        {sentences.map((sentence, idx) => (
          <div
            key={idx}
            onClick={() => handleSentenceClick(idx)}
            style={{
              border: '1px solid #333',
              padding: '10px',
              backgroundColor: selected.includes(idx) ? '#cceeff' : '#fff',
              cursor: 'pointer',
              userSelect: 'none'
            }}
          >
            {sentence.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnergyGame;
