"use client";
import axios from "axios";
import { HomePage } from "./_components/homePage";
import { NavBar } from "./_components/navBar";
import { useEffect, useState } from "react";

export default function Home() {
  const [isCat, setIsCat] = useState(false);
  const [cat, setCat] = useState([]);
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
          {
            cat.map((category:any) => (
              <div
                key={category.id}
                className="flex 
                 text-4xl font-bold
                 border-2 border-[#D1D1D1] bg-[#D1D1D1] 
                 px-5 py-1"
                onClick={() => {setIsCat(false)}}
              >
                {category.name}
              </div>
            ))
          }
          </div>
        </div>
      )}
      {isCat && (
        <div className="fixed inset-0 bg-black opacity-40 pointer-events-none z-1" />
      )}
    </div>
  );
}
