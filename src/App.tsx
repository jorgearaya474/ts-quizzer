import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Question} from "./types";

function App() {
  const [quizzData, setQuizzData] = useState<Question[]>([]);

  /**
   * Get data function
   * @param amount
   */
  async function getData(amount: number) {
    try{
      const endpoint_url = `https://opentdb.com/api.php?amount=${amount}&category=9&difficulty=easy&type=multiple`;
      const response = await fetch(endpoint_url);
      const data = await response.json();

      // Create question instances
      const questions: Question[] = data.results.map((question: Question) => {
        // Create all answers array
        const answers = [
          ...question.incorrect_answers,
          question.correct_answer
        ];
        // Sort answers
        answers.sort(() => Math.random() - 0.5);
        return {
          ...question,
          answers
        };
      });
      setQuizzData(questions)
    } catch (error) {
      console.log(error);
    }

  }
  useEffect(() => {
    getData(5);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
        {quizzData?.map( (question, index) => (
            <p key={index}>{question.question}</p>
        ) )}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
