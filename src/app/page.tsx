"use client";
import axios from "axios";
import { HomePage } from "./_components/homePage";
import { NavBar } from "./_components/navBar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [isCat, setIsCat] = useState(false);
  const [cat, setCat] = useState<any>([]);
  const [activeIndexes, setActiveIndexes] = useState<number[]>([]);
  const toggleButton = (index: number) => {
    // Toggle the active state
    setActiveIndexes(
      (prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index) // remove if already active
          : [...prev, index] // add if not active
    );
  };
  async function handleCat() {
    try {
      const response = await axios.get("http://localhost:8000/categories");
      setCat(response.data.categories);
      console.log("Category successful:", response.data);
    } catch (error) {
      console.error("Error during category:", error);
    }
  }
  useEffect(() => {
    handleCat();
  }, [isCat]);
  function handleStart() {
    if (activeIndexes.length > 0) {
      setIsCat(false);
    } else {
      alert("Please select at least one category.");
    }
    var selectedCategories = activeIndexes.map((index) => cat[index]?.name);
    const joinedString = selectedCategories.join(",");
    console.log("Selected Categories:", joinedString);
    router.push(`/quizPlay?catNames=${joinedString}`);
  }
  return (
    <div className="flex relative bg-[#F5F5F5] text-[#333333] justify-center items-center">
      <div className="min-h-screen w-full flex flex-col">
        <NavBar />
        <div className="flex items-center">
          <HomePage show={setIsCat} />
        </div>
      </div>
      {isCat && (
        <div className="flex flex-col gap-6 z-2 absolute bg-white w-350 h-220 px-25 py-25">
          <p className="flex justify-center text-6xl font-bold">
            Choose your topic
          </p>
          <p className="flex justify-center text-2xl py-6>">
            Select at least 1 to start solving questions
          </p>
          <div className="flex flex-row flex-wrap gap-6 ">
            {cat.map((category: any, index: number) => (
              <div
                key={index}
                className="flex 
                 text-4xl font-bold
                 border-2 border-[#D1D1D1] bg-[#D1D1D1] 
                 px-5 py-1"
                onClick={() => toggleButton(index)}
                style={{
                  backgroundColor: activeIndexes.includes(index)
                    ? "#FCC822"
                    : "#D1D1D1",
                  borderColor: activeIndexes.includes(index)
                    ? "#FCC822"
                    : "#D1D1D1",
                }}
              >
                {category.name}
              </div>
            ))}
          </div>
          <button
            className="bg-[#FCC822] text-white px-6 py-2 rounded-lg text-2xl font-bold"
            onClick={handleStart}
          >
            Start Quiz
          </button>
        </div>
      )}
      {isCat && (
        <div className="fixed inset-0 bg-black opacity-40 pointer-events-none z-1" />
      )}
    </div>
  );
}
