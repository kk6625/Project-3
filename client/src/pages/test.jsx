import React, { useContext, useState } from 'react';
import { TestContext } from '../contexts/TestContext';
import QuestionCard from '../components/QuestionCard';
import { useHistory } from 'react-router-dom';

const Test = () => {
    const { questions, submitAnswer } = useContext(TestContext); 
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); 
    const [completed, setCompleted] = useState(false); 
    const history = useHistory(); 
    
    const handleSelect = (option) => {
      submitAnswer(option); 
  
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setCompleted(true);
      }
    };
  
    const handleFinishTest = () => {
      history.push('/results');
    };
  
    const currentQuestion = questions[currentQuestionIndex];
  
    return (
      <div className="test-page">
        {!completed ? (
          currentQuestion ? (
            <QuestionCard
              question={currentQuestion.question}
              options={currentQuestion.options}
              onSelect={handleSelect}
            />
          ) : (
            <p>Loading question...</p>
          )
        ) : (
          <div className="test-completed">
            <h2>Test Completed!</h2>
            <button onClick={handleFinishTest}>View Results</button>
          </div>
        )}
      </div>
    );
  };
  
  export default Test;