"use client";

import { HomePage } from "./_components/homePage";
import { NavBar } from "./_components/navBar";
import { useState } from "react";

export default function Home() {
  const [isCat, setIsCat] = useState(false);
  return (
    <div className="flex relative bg-[#F5F5F5] text-[#333333] justify-center items-center">
      <div className="min-h-screen w-full flex flex-col">
        <NavBar />
        <div className="flex items-center">
          <HomePage show={setIsCat} />
        </div>
      </div>
      {isCat && (
        <div className="absolute bg-black w-160 h-160">some things</div>
      )}
      {isCat && (
        <div className="fixed inset-0 bg-black opacity-40 pointer-events-none z-50" />
      )}
    </div>
  );
}
