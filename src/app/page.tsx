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
    <div className="flex relative bg-[#F5F5F5] text-[#333333] justify-center items-center min-h-screen w-full">
      <div className="min-h-screen w-full flex flex-col">
        <NavBar />
        <div className="flex items-center">
          <HomePage show={setIsCat} />
        </div>
      </div>
      {isCat && (
        <div className="flex flex-col gap-4 sm:gap-6 z-20 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[90vw] max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl px-4 sm:px-8 md:px-12 py-6 sm:py-10 rounded-lg shadow-lg border border-gray-200">
          <p className="text-center text-2xl sm:text-3xl md:text-4xl font-bold">
            Choose your topic
          </p>
          <p className="text-center text-base sm:text-lg md:text-xl text-gray-600">
            Select at least 1 to start solving questions
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 w-full">
            {cat.map((category: any, index: number) => (
              <div
                key={index}
                className={`flex items-center justify-center text-base sm:text-lg md:text-xl lg:text-2xl font-bold border-2 px-3 py-2 sm:px-4 sm:py-3 rounded-lg cursor-pointer transition-colors duration-150 ${activeIndexes.includes(index) ? 'bg-[#FCC822] border-[#FCC822] text-white' : 'bg-[#D1D1D1] border-[#D1D1D1] text-[#333]'}`}
                onClick={() => toggleButton(index)}
              >
                {category.name}
              </div>
            ))}
          </div>
          <button
            className="bg-[#FCC822] text-white px-6 py-2 sm:py-3 rounded-lg text-lg sm:text-xl font-bold mt-2 hover:bg-[#e5b726] transition-colors"
            onClick={handleStart}
          >
            Start Quiz
          </button>
        </div>
      )}
      {isCat && (
        <div className="fixed inset-0 bg-black opacity-40 pointer-events-none z-10" />
      )}
    </div>
  );
}
