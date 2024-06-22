import React, { useState, useEffect } from 'react';

const AdminPanel = () => {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [newTopic, setNewTopic] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');

  const handleTopicChange = (e) => {
    setSelectedTopic(e.target.value);
  };

  const handleNewTopicChange = (e) => {
    setNewTopic(e.target.value);
  };

  const handleAddTopic = () => {
    if (newTopic && !topics.includes(newTopic)) {
      setTopics([...topics, newTopic]);
      setNewTopic('');
    }
  };

  const handleGenerateQuestion = async () => {
    if (!selectedTopic) {
      alert('Please select a topic first');
      return;
    }
    
    try {
      
      const response = await fetch(`/api/generate-question?topic=${selectedTopic}`);
      const data = await response.json();
      
      setQuestion(data.question);
      setOptions(data.options);
      setCorrectAnswer(data.correctAnswer);
    } catch (error) {
      console.error('Error generating question:', error);
      alert('Failed to generate question. Please try again.');
    }
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleCorrectAnswerChange = (e) => {
    setCorrectAnswer(e.target.value);
  };

  const handleAddQuestion = async () => {
    if (!question || options.some(opt => !opt) || !correctAnswer) {
      alert('Please fill in all fields');
      return;
    }

    try {
      
      const response = await fetch('/api/add-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: selectedTopic,
          question,
          options,
          correctAnswer,
        }),
      });

      if (response.ok) {
        alert('Question added successfully');
        setQuestion('');
        setOptions(['', '', '', '']);
        setCorrectAnswer('');
      } else {
        alert('Failed to add question. Please try again.');
      }
    } catch (error) {
      console.error('Error adding question:', error);
      alert('Failed to add question. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quiz Generator Admin Panel</h1>
      
      <div className="flex items-center mb-4">
        <select
          className="border rounded px-2 py-1 mr-2"
          value={selectedTopic}
          onChange={handleTopicChange}
        >
          <option value="">Select a topic</option>
          {topics.map((topic, index) => (
            <option key={index} value={topic}>{topic}</option>
          ))}
        </select>
        
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded"
          onClick={handleGenerateQuestion}
        >
          Generate New Question
        </button>
      </div>
      
      <div className="flex items-center mb-4">
        <input
          type="text"
          className="border rounded px-2 py-1 mr-2"
          placeholder="Enter new topic"
          value={newTopic}
          onChange={handleNewTopicChange}
        />
        
        <button
          className="bg-green-500 text-white px-4 py-1 rounded"
          onClick={handleAddTopic}
        >
          Add Topic
        </button>
      </div>

      <div className="mb-4">
        <textarea
          className="w-full border rounded p-2"
          rows="4"
          placeholder="Question"
          value={question}
          onChange={handleQuestionChange}
        ></textarea>
      </div>

      <div className="mb-4">
        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            className="w-full border rounded px-2 py-1 mb-2"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
        ))}
      </div>

      <div className="mb-4">
        <input
          type="text"
          className="w-full border rounded px-2 py-1"
          placeholder="Correct Answer"
          value={correctAnswer}
          onChange={handleCorrectAnswerChange}
        />
      </div>

      <button
        className="bg-purple-500 text-white px-4 py-2 rounded"
        onClick={handleAddQuestion}
      >
        Add Question to Quiz
      </button>
    </div>
  );
};

export default AdminPanel;