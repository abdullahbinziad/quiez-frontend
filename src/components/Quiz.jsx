import React, { useState, useEffect } from "react";
import questionsData from "../../public/question.json";
import QuizForm from "./QuizForm"; // Import the form component

function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [showForm, setShowForm] = useState(false);
  const [answers, setAnswers] = useState([]);

  const currentQuestion = questionsData[currentQuestionIndex];

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion(null);
    }

    const timer = setTimeout(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  // Prevent Right-Click and Copy
  useEffect(() => {
    document.addEventListener("contextmenu", (event) => event.preventDefault());
    document.addEventListener("copy", (event) => {
      event.preventDefault();
      alert("Copying is not allowed! The quiz will be submitted.");
      setShowForm(true);
    });

    return () => {
      document.removeEventListener("contextmenu", (event) =>
        event.preventDefault()
      );
      document.removeEventListener("copy", (event) => event.preventDefault());
    };
  }, []);

  // Detect Tab Switching
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        alert("You switched tabs! The exam is now submitted.");
        setShowForm(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const handleAnswer = (index) => {
    const isCorrect = index === currentQuestion.correctAnswerIndex;
    const updatedScore = isCorrect ? score + 1 : score - 0.25;

    setScore(updatedScore);
    setAnswers([
      ...answers,
      {
        question: currentQuestion.questionText,
        answer: currentQuestion.answerOptions[index],
        isCorrect,
      },
    ]);

    handleNextQuestion(index);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionsData.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setTimeLeft(20);
    } else {
      setShowForm(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      department: e.target.department.value,
      phone: e.target.phone.value,
      batch: e.target.batch.value,
      score: score.toFixed(2),
    };

    try {
      const response = await fetch(
        "https://mec-shibir-quiz-back.vercel.app/api/data",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      alert(data.message, data);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("Submission failed.");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-3/4 mx-auto items-center justify-center min-h-screen text-center">
      {showForm ? (
        <QuizForm score={score} answers={answers} handleSubmit={handleSubmit} />
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Question {currentQuestionIndex + 1}/{questionsData.length}
          </h2>
          <p className="text-2xl mb-4">{currentQuestion.questionText}</p>
          <div className="mb-4 text-red-500 font-bold text-2xl">
            Time Left: {timeLeft}s
          </div>
          <div className="space-y-2">
            {currentQuestion.answerOptions.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className="block w-full text-xl py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
              >
                {answer}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;
