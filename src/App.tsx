import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Question} from "./types";
import { dataFetch } from './components/Api';

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);

  /**
   * Get data function
   * @param amount
   */
  const getData = async () => {
    try{
      const questions_data =  await dataFetch(10);
      setQuestions(questions_data)
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    getData();
  }, []);

  const {question, answers, correct_answer} = questions[currentQuestion] || {};
  
  /**
   * Check the user answer
   * @param event 
   */
  const checkAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    const element = event.target;
    const answer = element.value;

    if (answer === correct_answer) {
      element.parentElement?.classList.add('bg-green-400');
    } else {
      element.parentElement?.classList.add('bg-red-400');
      const correctAnswerIndex = answers?.findIndex((a) => a === correct_answer);
      const correctAnswerElement = document.getElementById(`answer-${correctAnswerIndex}`);
      correctAnswerElement?.parentElement?.classList.add('bg-green-400');
    }
  };

  return (
    <div className='App'>
      <div className='flex w-full h-screen justify-center items-center'>
        <div className='w-full max-w-xl p-3'>
          <h1 className='font-bold text-5xl text-center text-indigo-700'>QUIZZER</h1>
          <div className='bg-white p-12 rounded-lg shadow-lg w-full mt-8'>
              <div className=''>
                <p className='text-2xl font-bold'>{question}</p>
                <div id="answers_box" className='pt-4'>
                  {answers?.map((answer, index) => (
                    <label 
                    key={`answer-${index}`} 
                    htmlFor={`answer-${index}`} 
                    className="mb-3 inline-flex items-center justify-between w-full p-3 text-black bg-white border border-gray-200 rounded-lg cursor-pointer hover:text-gray-600">
                      <input type="radio" id={`answer-${index}`} name={`answer-${index}`} value={answer} className="hidden peer" onChange={checkAnswer}/>
                      <div className="w-full text-lg font-semibold text-left">{answer}</div>
                    </label>
                  ))}
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
