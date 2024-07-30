import React, { useState, useEffect } from 'react';
import '../Style/AdminPanel.css';

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
      // try {
      //   const response = await fetch('http://127.0.0.1:8000/proctor/getTopic/');
      //   const data = await response.json();
      //   const topicNames = data.map(topic => topic.topic);
      //   setTopics(topicNames);
      // } catch (error) {
      //   console.error('Error fetching topics:', error);
      //   alert('Failed to fetch topics. Please try again.');
      // }
    };

    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://127.0.0.1:8000/api/v1/questions/getAllQuestions?token=${token}`);
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
        alert('Failed to fetch questions. Please try again.');
      }
    };

    // fetchTopics();
    fetchQuestions();
  }, []);

  const handleTopicChange = (e) => {
    setSelectedTopic(e.target.value);
  };

  const handleNewTopicChange = (e) => {
    setNewTopic(e.target.value);
  };

  const handleAddTopic = () => {
    // if (newTopic && !topics.includes(newTopic)) {
    //   setTopics([...topics, newTopic]);
    //   setNewTopic('');
    // }
  };

  const handleGenerateQuestion = async () => {
    // if (!selectedTopic) {
    //   alert('Please select a topic first');
    //   return;
    // }

    // try {
    //   const response = await fetch(`/api/generate-question?topic=${selectedTopic}`);
    //   const data = await response.json();

    //   setQuestion(data.question);
    //   setOptions(data.options);
    //   setCorrectAnswer(data.correctAnswer);
    // } catch (error) {
    //   console.error('Error generating question:', error);
    //   alert('Failed to generate question. Please try again.');
    // }
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
      const token = localStorage.getItem('token');
      const response = await fetch(`http://127.0.0.1:8000/api/v1/questions/createQuestion?token=${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionNumber,
          "question":question,
          "options":options,
          "answer":correctAnswer,
        }),

        // {
        //   "questionNumber": 5,
        //   "question": "What is the speed of light in vacuum?",
        //   "options": ["300,000 km/s", "150,000 km/s", "299,792 km/s", "310,000 km/s"],
        //   "answer": 3,
        //   "difficulty": "hard",
        //   "slot": 2
        // }
        

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
    <div className="container">
      <h1 className="title">Quiz Generator Admin Panel</h1>
      
      <div className="flex-row">
        <select
          className="select"
          value={selectedTopic}
          onChange={handleTopicChange}
        >
          <option value="">Select a topic</option>
          {topics.map((topic, index) => (
            <option key={index} value={topic}>{topic}</option>
          ))}
        </select>
        
        <button
          className="button generate-button"
          onClick={handleGenerateQuestion}
        >
          Generate New Question
        </button>
      </div>
      
      <div className="flex-row">
        <input
          type="text"
          className="input"
          placeholder="Enter new topic"
          value={newTopic}
          onChange={handleNewTopicChange}
        />
        
        <button
          className="button add-button"
          onClick={handleAddTopic}
        >
          Add Topic
        </button>
      </div>

      <div className="textarea-container">
        <textarea
          className="textarea"
          rows="4"
          placeholder="Question"
          value={question}
          onChange={handleQuestionChange}
        ></textarea>
      </div>

      <div className="options-container">
        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            className="input option-input"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
        ))}
      </div>

      <div className="input-container">
        <input
          type="text"
          className="input"
          placeholder="Correct Answer"
          value={correctAnswer}
          onChange={handleCorrectAnswerChange}
        />
      </div>

      <button
        className="button add-question-button"
        onClick={handleAddQuestion}
      >
        Add Question to Quiz
      </button>

      <div className="questions-container">
        <h2 className="subtitle">All Questions</h2>
        {currentQuestion ? (
          <div>
            <p className="question">{currentQuestion.question}</p>
            <ul className="options-list">
              <li>{currentQuestion.option1}</li>
              <li>{currentQuestion.option2}</li>
              <li>{currentQuestion.option3}</li>
              <li>{currentQuestion.option4}</li>
            </ul>
            <p className="correct-answer">Correct Answer: {currentQuestion.answer}</p>
            {questions.length > 1 && (
              <button
                className="button next-button"
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
