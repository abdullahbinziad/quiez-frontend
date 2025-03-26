import React from "react";

function StartQuiz({ onStart }) {
  return (
    <div className="bg-white p-6 min-h-screen mx-auto rounded shadow-md text-center w-full">
      <p className="text-xl mb-4">Ready to test your knowledge?</p>
      <button
        onClick={onStart}
        className="py-2 px-6 text-2xl bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
      >
        Start Quiz
      </button>
    </div>
  );
}

export default StartQuiz;
