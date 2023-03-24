import { Question } from "../types";

async function dataFetch(amount: number) {
    const url = `https://opentdb.com/api.php?amount=${amount}&category=9&difficulty=easy&type=multiple`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error loading the questions data');
    }
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

    return questions;
}

export { dataFetch }
