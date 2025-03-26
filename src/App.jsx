import "./App.css";
import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import StartQuiz from "./components/StartQuiz";
import Quiz from "./components/Quiz";
import "./index.css"; // ✅ Import Tailwind styles
const bgImage = "../src/assets/bg1.jpg";

function App() {
  const [quizStarted, setQuizStarted] = useState(false);

  const startQuizHandler = () => {
    setQuizStarted(true);
  };

  return (
    <>
      <div>
        <div className="min-h-screen w-full bg-gray-100">
          <main className=" md:flex justify-between md:row-auto items-center w-full mx-auto">
            <div className="flex-1 ">
              {!quizStarted ? (
                <StartQuiz onStart={startQuizHandler} />
              ) : (
                <Quiz />
              )}
            </div>
            <div className="flex-1">
              <img src={bgImage} alt="Logo" className="w-full" />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
