"use client";
import { NavBar } from "../_components/navBar";
import { useState, useEffect, use } from "react";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";

export default function QuizPlayPage() {
  const [quizData, setQuizData] = useState<any>([]);
  const [cats, setCats] = useState<string[]>([]);
  const [where, setWhere] = useState<number>(0);
  const searchParams = useSearchParams();
  async function fetchData() {
    try {
      const response = await axios.post("http://localhost:8000/QuizByCat", {
        cat: cats,
      });
      setQuizData(response.data.quiz);
      console.log("Quiz Data:", response.data.quiz);
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
    <div className="">
      <NavBar />
      <p className="bg-[#FCC822] w-[100vw] h-60 text-white flex items-center justify-center text-6xl font-thin">
        {quizData[where]?.question}
      </p>
    </div>
  );
}
