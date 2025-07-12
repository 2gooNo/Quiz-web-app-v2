"use client";
import { NavBar } from "../_components/navBar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export default function QuizPlayPage() {
  const [quizData, setQuizData] = useState<any>([]);
  const [cats, setCats] = useState<string[]>([]);
  const [where, setWhere] = useState<number>(0);
  const searchParams = useSearchParams();

  // Fisher-Yates (Knuth) shuffle algorithm
  const shuffleArray = (array: any[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Function to shuffle answers within each quiz question
  const shuffleQuizAnswers = (quizzes: any[]) => {
    return quizzes.map((quiz) => {
      // If answers array exists, shuffle it
      if (quiz.answers && Array.isArray(quiz.answers)) {
        const shuffledAnswers = shuffleArray(quiz.answers);
        return { ...quiz, answers: shuffledAnswers };
      }

      // If options array exists, shuffle it
      if (quiz.options && Array.isArray(quiz.options)) {
        const shuffledOptions = shuffleArray(quiz.options);
        return { ...quiz, options: shuffledOptions };
      }

      return quiz;
    });
  };

  async function fetchData() {
    try {
      const response = await axios.post("http://localhost:8000/QuizByCat", {
        cat: cats,
      });

      // First, shuffle the order of questions
      const shuffledQuizzes = shuffleArray(response.data.quiz);

      // Then, shuffle the answers within each question
      const fullyShuffledQuizzes = shuffleQuizAnswers(shuffledQuizzes);

      setQuizData(fullyShuffledQuizzes);
      console.log("Quiz Data (Fully Shuffled):", fullyShuffledQuizzes);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  }

  useEffect(() => {
    var rawCats = searchParams.get("catNames");
    setCats(rawCats?.split(",") || []);
  }, []);

  useEffect(() => {
    if (cats.length > 0) {
      fetchData();
    }
  }, [cats]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <NavBar />
      <p className="bg-[#FCC822] w-[100vw] h-60 text-white flex items-center justify-center text-6xl font-thin">
        {quizData[where]?.question}
      </p>
      <div className="flex flex-row items-center justify-center mt-30 gap-19">
        {quizData[where]?.answers?.map((answer: any, index: number) => (
          <button
            key={index}
            className="bg-[#D1D1D1] h-35 w-60 text-2xl font-bold px-10 py-3 mb-4 hover:bg-[#FCC822] transition-colors duration-300"
            onClick={() => {
              // Handle answer selection logic here
              console.log(`Selected answer:`, answer);
            }}
          >
            {answer.ans || answer}
          </button>
        ))}
      </div>
      <div className="flex gap-4 mt-10 justify-around w-full">
        <button
          className="flex flex-row justify-center items-center gap-4 bg-[#D1D1D1] h-15 w-35 text-white px-6 py-2 hover:bg-[#D1D1D1] transition-colors duration-300"
          onClick={() => setWhere((prev) => Math.max(prev - 1, 0))}
        >
          <img className="h-auto w-3" src="/leftArrow.svg" />
          <p className="text-black font-normal text-lg">Previous</p>
        </button>
        <div className="flex flex-row justify-center items-center gap-4">
          <button
            className="flex flex-row justify-center items-center gap-4 bg-[#FCC822] h-15 w-35 text-white px-6 py-2"
            onClick={() =>
              setWhere((prev) => Math.min(prev + 1, quizData.length - 1))
            }
          >
            <p className="font-normal text-lg">Next</p>
            <img className="h-auto w-2" src="/rightArrow.svg" />
          </button>
          <button className="flex flex-row justify-center items-center gap-4 h-15 w-35  px-6 py-2s">
            <p className="text-[#FCC822] font-normal text-lg">Submit</p>
            <img className="h-auto w-3" src="/skipArrow.svg" />
          </button>
        </div>
      </div>
    </div>
  );
}
