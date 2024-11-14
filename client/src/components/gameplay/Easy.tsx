// src/components/gameplay/EasyLevel.tsx
import React, { useEffect, useState } from 'react';
import { GraphType } from '../../types';
import Graph from '../Graph';

interface Question {
  parameters: {
    a: number;
    b: number;
    c: number;
    d: number;
  };
}

const EasyLevel: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState({ a: 0, b: 0, c: 0, d: 0 });
  const [questionNumber, setQuestionNumber] = useState(1);
  const [score, setScore] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  // Generate random parameters between -5 and 5
  const generateQuestion = () => {
    const newQuestion = {
      parameters: {
        a: Math.floor(Math.random() * 11) - 5, // -5 to 5
        b: Math.floor(Math.random() * 11) - 5,
        c: Math.floor(Math.random() * 11) - 5,
        d: Math.floor(Math.random() * 11) - 5
      }
    };
    setCurrentQuestion(newQuestion);
    setUserAnswer({ a: 0, b: 0, c: 0, d: 0 });
    setIsChecking(false);
  };

  useEffect(() => {
    generateQuestion();
  }, [questionNumber]);

  const handleParameterChange = (param: keyof typeof userAnswer, value: number) => {
    setUserAnswer(prev => ({ ...prev, [param]: value }));
  };

  const checkAnswer = () => {
    setIsChecking(true);
    const isCorrect = Object.keys(userAnswer).every(
      param => userAnswer[param as keyof typeof userAnswer] === 
                currentQuestion?.parameters[param as keyof typeof userAnswer]
    );

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (questionNumber < 10) {
        setQuestionNumber(prev => prev + 1);
      }
    }, 2000);
  };

  if (!currentQuestion) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Question {questionNumber}/10</h2>
        <p className="text-xl">Score: {score}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Question Graph */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Match this graph:</h3>
          <Graph 
            type={GraphType.CUBIC}
            readOnly
            initialParameters={currentQuestion.parameters}
          />
        </div>

        {/* User Answer Graph */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Your Answer:</h3>
          <div className="mb-6">
            {Object.keys(userAnswer).map((param) => (
              <div key={param} className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  {param}: {userAnswer[param as keyof typeof userAnswer]}
                </label>
                <input
                  type="range"
                  min="-5"
                  max="5"
                  step="1"
                  value={userAnswer[param as keyof typeof userAnswer]}
                  onChange={(e) => handleParameterChange(param as keyof typeof userAnswer, parseInt(e.target.value))}
                  className="w-full mt-1"
                  disabled={isChecking}
                />
              </div>
            ))}
          </div>
          <Graph 
            type={GraphType.CUBIC}
            readOnly
            initialParameters={userAnswer}
          />
          <button
            onClick={checkAnswer}
            disabled={isChecking}
            className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 disabled:opacity-50"
          >
            Check Answer
          </button>
        </div>
      </div>

      {isChecking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">
              {Object.keys(userAnswer).every(
                param => userAnswer[param as keyof typeof userAnswer] === 
                          currentQuestion?.parameters[param as keyof typeof userAnswer]
              ) 
                ? '🎉 Correct!'
                : '❌ Incorrect!'}
            </h3>
            <p>The correct equation was:</p>
            <p className="text-lg font-semibold mt-2">
              y = {currentQuestion.parameters.a}x³ + {currentQuestion.parameters.b}x² + 
              {currentQuestion.parameters.c}x + {currentQuestion.parameters.d}
            </p>
          </div>
        </div>
      )}

      {questionNumber === 10 && isChecking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">Game Complete!</h3>
            <p className="text-xl mb-4">Final Score: {score}/10</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EasyLevel;