import React, { useState } from 'react';
import Question from './Question';
import { useEffect } from 'react';
import { FaClock } from "react-icons/fa";

const QuizPage = () => {
  const [timeRemaining, setTimeRemaining] = useState(1800);
  const [markedForReview, setMarkedForReview] = useState({});
  const [answers, setAnswers] = useState({});
  const [questions] = useState([
    {
      id: 1,
      text: 'What is the capital of France?',
      options: ['London', 'Berlin', 'Paris', 'Madrid'],
      type: 'single',
    },
    {
      id: 2,
      text: 'Which of these are primary colors?',
      options: ['Red', 'Green', 'Blue', 'Yellow'],
      type: 'single',
    },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId, selectedOptions) => {
    setAnswers(prev => ({ ...prev, [questionId]: selectedOptions }));
  };

  const handleSubmit = () => {
    console.log('Submitting answers:', answers);
  };

  const getQuestionStatus = (questionId) => {
    if (markedForReview[questionId]) return 'review';
    if (answers[questionId]) return 'attempted';
    return 'unattempted';
  };

  const statusColors = {
    attempted: 'bg-green-500',
    unattempted: 'bg-gray-300',
    review: 'bg-yellow-500',
  };

  const handleMarkForReview = (questionId) => {
    setMarkedForReview(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white p-6 shadow-lg">
        <div className="text-center mb-6">
          <p className="text-4xl font-bold text-blue-600">{formatTime(timeRemaining)}</p>
        </div>
        <div className="mb-6">
          <div className="grid grid-cols-5 gap-2">
            {questions.map((question) => (
              <div
                key={question.id}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${statusColors[getQuestionStatus(question.id)]}`}
              >
                {question.id}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded-full ${statusColors.attempted} mr-2`}></div>
              <span>Attempted</span>
            </div>
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded-full ${statusColors.unattempted} mr-2`}></div>
              <span>Unattempted</span>
            </div>
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded-full ${statusColors.review} mr-2`}></div>
              <span>Mark For Review</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="w-3/4 p-6">
        <h1 className="text-3xl font-bold mb-6">Quiz Title</h1>
        {questions.map(question => (
          <Question
          key={question.id}
          question={question}
          onAnswerChange={(selectedOptions) => handleAnswerChange(question.id, selectedOptions)}
          onMarkForReview={() => handleMarkForReview(question.id)}
          isMarkedForReview={markedForReview[question.id] || false}
          />
        ))}
      </div>
    </div>
  );
};

export default QuizPage;