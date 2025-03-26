import React from "react";

export default function QuizForm({ score, answers, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4 font-black">
      <h2 className="text-2xl font-bold">Quiz Completed! 🎉</h2>
      <p className="text-lg font-semibold">Your Score: {score.toFixed(2)}</p>

      <input
        type="text"
        name="name"
        placeholder="Your Name"
        required
        className="w-full p-2 border rounded font-black border-black placeholder-black text-black"
      />
      <input
        type="text"
        name="department"
        placeholder="Department"
        required
        className="w-full p-2 border rounded font-black border-black placeholder-black text-black"
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        required
        className="w-full p-2 border rounded font-black border-black placeholder-black text-black"
      />
      <input
        type="text"
        name="batch"
        placeholder="Batch"
        required
        className="w-full p-2 border rounded font-black border-black placeholder-black text-black"
      />

      <button
        type="submit"
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        Submit Quiz
      </button>
    </form>
  );
}
