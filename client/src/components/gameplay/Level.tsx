// src/components/Level.tsx
import React, { useEffect, useState } from 'react';
import { GraphType } from '../../types';
import Graph from '../Graph';

interface LevelProps {
  difficulty: 'easy' | 'medium' | 'hard';
  onComplete: (score: number, totalTime: number) => void;
}

const MAX_QUESTIONS = 10;

const Level: React.FC<LevelProps> = ({ difficulty, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState({ a: 0, b: 0, c: 0, d: 0 });
  const [questionNumber, setQuestionNumber] = useState(1);
  const [score, setScore] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [totalTime, setTotalTime] = useState(0);
  const [message, setMessage] = useState<string | null>(null);

  const getQuestionConfig = (difficulty: 'easy' | 'medium' | 'hard'): Question => {
    const randomInt = () => Math.floor(Math.random() * 21) - 10; // -10 to 10

    switch (difficulty) {
      case 'easy':
        return {
          parameters: {
            a: 0,
            b: 0,
            c: randomInt(),
            d: randomInt(),
          },
          graphType: GraphType.CUBIC
        };
      case 'medium':
        return {
          parameters: {
            a: randomInt(),
            b: randomInt(),
            c: randomInt(),
            d: randomInt(),
          },
          graphType: GraphType.CUBIC
        };
      case 'hard':
        const graphTypes = [GraphType.CUBIC, GraphType.SINUS, GraphType.COSINUS, GraphType.TANGEN];
        return {
          parameters: {
            a: randomInt(),
            b: randomInt(),
            c: randomInt(),
            d: randomInt(),
          },
          graphType: graphTypes[Math.floor(Math.random() * graphTypes.length)]
        };
    }
  };

  const generateQuestion = () => {
    if (questionNumber > MAX_QUESTIONS) {
      onComplete(score, totalTime);
      return;
    }
    const newQuestion = getQuestionConfig(difficulty);
    setCurrentQuestion(newQuestion);
    setUserAnswer({ a: 0, b: 0, c: 0, d: 0 });
    setIsChecking(false);
    setTimeLeft(60);
    setMessage(null);
  };

  useEffect(() => {
    generateQuestion();
  }, [questionNumber]);

  useEffect(() => {
    if (timeLeft > 0 && !isChecking) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        setTotalTime(prev => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isChecking) {
      setMessage("⏰ Time's Up!");
      checkAnswer();
    }
  }, [timeLeft, isChecking]);

  const handleSliderChange = (param: keyof typeof userAnswer, value: number) => {
    setUserAnswer(prev => ({ ...prev, [param]: value }));
  };

  const checkAnswer = () => {
    setIsChecking(true);
    const isCorrect = Object.keys(userAnswer).every(
      param => userAnswer[param as keyof typeof userAnswer] === 
                currentQuestion?.parameters[param as keyof typeof userAnswer]
    );

    if (isCorrect) {
      setScore(prev => prev + Math.max(10, timeLeft));
      setMessage("🎉 Correct!");
    } else {
      setMessage("❌ Incorrect!");
    }

    setTimeout(() => {
      if (questionNumber < MAX_QUESTIONS) {
        setQuestionNumber(prev => prev + 1);
      } else {
        onComplete(score, totalTime);
      }
    }, 2000);
  };

  if (!currentQuestion) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">
          Question {questionNumber} of {MAX_QUESTIONS}
        </h2>
        <p className="text-xl">Score: {score}</p>
        <p className="text-lg">Time Left: {timeLeft} seconds</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Match this graph:</h3>
          <Graph
            type={currentQuestion.graphType}
            readOnly={true}
            initialParameters={currentQuestion.parameters}
          />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Your Answer:</h3>
          <Graph
            type={currentQuestion.graphType}
            initialParameters={userAnswer}
          />
          <div className="mt-4">
            {Object.keys(userAnswer).map((param) => (
              <div key={param} className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  {param}: {userAnswer[param as keyof typeof userAnswer]}
                </label>
                <input
                  type="range"
                  min="-10"
                  max="10"
                  step="1"
                  value={userAnswer[param as keyof typeof userAnswer]}
                  onChange={(e) => handleSliderChange(
                    param as keyof typeof userAnswer, 
                    parseInt(e.target.value)
                  )}
                  className="w-full mt-1"
                  disabled={isChecking}
                />
              </div>
            ))}
          </div>
          <button
            onClick={checkAnswer}
            disabled={isChecking}
            className="mt-4 bg-purple-600 text-white py-2 px-4 rounded-md 
                     hover:bg-purple-700 disabled:opacity-50 w-full"
          >
            Check Answer
          </button>
        </div>
      </div>

      {message && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">{message}</h3>
            <p>The correct equation was:</p>
            <p className="text-lg font-semibold mt-2">
              y = {currentQuestion.parameters.a}x³ + {currentQuestion.parameters.b}x² + 
              {currentQuestion.parameters.c}x + {currentQuestion.parameters.d}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Level;