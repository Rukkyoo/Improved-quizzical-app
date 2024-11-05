"use client";
import React from "react";
import he from "he";
import Link from "next/link";

const Animals = () => {
  const [getQuestions, setGetQuestions] = React.useState([]);
  const [selectedAnswers, setSelectedAnswers] = React.useState({});
  const [checkCorrectAnswer, setCheckCorrectAnswer] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [displayPage, setDisplayPage] = React.useState(false);

  React.useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = () => {
    setDisplayPage(false); // Hide button while loading new questions
    fetch(
      "https://opentdb.com/api.php?amount=5&category=27&difficulty=easy&type=multiple"
    )
      .then((res) => res.json())
      .then((data) => {
        setGetQuestions(data.results);
        setDisplayPage(true); // Show button when questions are loaded
      });
  };

  const handleChange = (questionIndex, answer) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [questionIndex]: answer,
    }));
  };

  const checkAnswer = () => {
    let correctCount = 0;
    getQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === he.decode(question.correct_answer)) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setCheckCorrectAnswer(true);
  };

  const startAgain = () => {
    setGetQuestions([]);
    setSelectedAnswers({});
    setCheckCorrectAnswer(false);
    setScore(0);
    loadQuestions(); // Reload questions
  };

  return (
    <div className="bg-white flex flex-col p-5">
      {getQuestions.map((question, index) => {
        const answers = [
          ...question.incorrect_answers,
          question.correct_answer,
        ].sort();

        return (
          <div
            className="bg-white p-2 overflow-scroll text-slate-950 border border-gray-300 rounded-lg mb-5 shadow"
            key={index}
          >
            <h3 className="text-lg font-semibold mb-4">
              {he.decode(question.question)}
            </h3>
            <div className="flex gap-3 text-sm h-22 text-center">
              {answers.map((answer, i) => {
                const decodedAnswer = he.decode(answer);
                const isSelected = selectedAnswers[index] === decodedAnswer;
                const isCorrect =
                  decodedAnswer === he.decode(question.correct_answer);

                let answerClass =
                  "p-3 border rounded-lg cursor-pointer w-full sm:w-48 text-center";
                if (checkCorrectAnswer) {
                  if (isCorrect) {
                    answerClass += " bg-green-100 border-green-500"; // Highlight correct answers in green
                  } else if (isSelected && !isCorrect) {
                    answerClass += " bg-red-100 border-red-500"; // Highlight incorrect selected answers in red
                  }
                } else {
                  answerClass += " bg-blue-100 border-blue-300"; // Default style
                }

                return (
                  <div
                    key={i}
                    className={`${answerClass} ${
                      isSelected ? "font-bold bg-purple-100" : ""
                    }`}
                    onClick={() => handleChange(index, decodedAnswer)}
                  >
                    <input
                      type="radio"
                      id={`question-${index}-answer-${i}`}
                      name={`question-${index}`}
                      value={decodedAnswer}
                      onChange={() => handleChange(index, decodedAnswer)}
                      disabled={checkCorrectAnswer}
                      checked={isSelected}
                      className="hidden"
                    />
                    <label
                      htmlFor={`question-${index}-answer-${i}`}
                      className="cursor-pointer"
                    >
                      {decodedAnswer}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <div className="bg-white text-black w-full text-center my-4 text-lg font-semibold">
        {checkCorrectAnswer && `You scored ${score}/${getQuestions.length}`}
      </div>
      {displayPage && (
        <div className="flex flex-col">
          <button
            className="bg-red-500 text-white font-semibold mb-3 py-2 px-4 rounded-lg mx-auto"
            onClick={checkCorrectAnswer ? startAgain : checkAnswer}
          >
            {checkCorrectAnswer ? "Start Again" : "Check Answers"}
          </button>
          <Link
            className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg mx-auto"
            href="/questions"
          >
            <button>Go back to Home Page</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Animals;
