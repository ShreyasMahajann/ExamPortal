import React, { useState } from 'react';

const Question = ({ question, onAnswerChange, onMarkForReview, isMarkedForReview }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (option) => {
    let newSelectedOptions;
    if (question.type === 'single') {
      newSelectedOptions = [option];
    } else {
      newSelectedOptions = selectedOptions.includes(option)
        ? selectedOptions.filter(item => item !== option)
        : [...selectedOptions, option];
    }
    setSelectedOptions(newSelectedOptions);
    onAnswerChange(newSelectedOptions);
  };

  return (
    <div className="mb-6 p-4 bg-white rounded shadow">
      <h3 className="text-xl font-semibold mb-3">{question.text}</h3>
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <label key={index} className="flex items-center space-x-2">
            <input
              type={question.type === 'single' ? 'radio' : 'checkbox'}
              name={`question-${question.id}`}
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={() => handleOptionChange(option)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
      <button
        onClick={onMarkForReview}
        className={`mt-4 px-3 py-1 rounded ${
          isMarkedForReview ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'
        }`}
      >
        {isMarkedForReview ? 'Unmark for Review' : 'Mark for Review'}
      </button>
    </div>
  );
};

export default Question;