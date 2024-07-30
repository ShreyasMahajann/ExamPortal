import React, { useState, useEffect } from 'react';

const AdminPanel = () => {
  const [topics, setTopics] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [newTopic, setNewTopic] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/proctor/getTopic/');
        const data = await response.json();
        const topicNames = data.map(topic => topic.topic);
        setTopics(topicNames);
      } catch (error) {
        console.error('Error fetching topics:', error);
        alert('Failed to fetch topics. Please try again.');
      }
    };

    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/proctor/getQuestion/');
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
        alert('Failed to fetch questions. Please try again.');
      }
    };

    fetchTopics();
    fetchQuestions();
  }, []);

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

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
  };

  const currentQuestion = questions[currentQuestionIndex];

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

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">All Questions</h2>
        {currentQuestion ? (
          <div>
            <p className="font-bold">{currentQuestion.question}</p>
            <ul className="list-disc pl-5">
              <li>{currentQuestion.option1}</li>
              <li>{currentQuestion.option2}</li>
              <li>{currentQuestion.option3}</li>
              <li>{currentQuestion.option4}</li>
            </ul>
            <p className="font-bold">Correct Answer: {currentQuestion.answer}</p>
            {questions.length > 1 && (
              <button
                className="bg-blue-500 text-white px-4 py-1 rounded mt-4"
                onClick={handleNextQuestion}
              >
                Next
              </button>
            )}
          </div>
        ) : (
          <p>No questions available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
