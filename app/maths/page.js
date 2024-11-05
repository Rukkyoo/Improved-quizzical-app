"use client";
import React from "react";
import he from "he";
import Link from "next/link";

const Maths = () => {
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
      "https://opentdb.com/api.php?amount=5&category=19&difficulty=easy&type=multiple"
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.results) {
          setGetQuestions(data.results);
        } else {
          setGetQuestions([]); // Fallback if data.results is undefined
        }
        setDisplayPage(true); // Show button when questions are loaded
      })
      .catch((error) => {
        console.error("Error loading questions:", error);
        setGetQuestions([]); // Set to empty array on fetch error
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
      {getQuestions.length > 0 ? (
        getQuestions.map((question, index) => {
          const answers = [
            ...question.incorrect_answers,
            question.correct_answer,
          ].sort();

          return (
            <div
              className="bg-white p-2  pr-4 overflow-x-scroll text-slate-950 border border-gray-300 rounded-lg mb-5 shadow"
              key={index}
            >
              <h3 className="text-lg font-semibold mb-4">
                {he.decode(question.question)}
              </h3>
              <div className="flex gap-3 h-22 text-sm text-center">
                {answers.map((answer, i) => {
                  const decodedAnswer = he.decode(answer);
                  const isSelected = selectedAnswers[index] === decodedAnswer;
                  const isCorrect =
                    decodedAnswer === he.decode(question.correct_answer);

                  let answerClass =
                    "px-3 py-1 border  rounded-lg cursor-pointer w-full sm:w-48 text-center";
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
        })
      ) : (
        <p className="text-center">Loading questions...</p>
      )}
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
            href="/questions"
            className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg mx-auto text-center"
          >
            Go back to Home Page
          </Link>
        </div>
      )}
    </div>
  );
};

export default Maths;
