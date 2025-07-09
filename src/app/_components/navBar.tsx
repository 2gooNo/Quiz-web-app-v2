"use client";
import { useState, useEffect } from "react";
export function NavBar() {
  const [isloggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  function handleSignOut() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      // window.location.href = '/login'; // Redirect to login page
    }
  }
  function handleLogin() {
    window.location.href = '/login';
  }
  return (
    <div className="w-full border-b-2 border-gray-200">
      <div className="flex w-auto flex-row items-center justify-between h-16 sm:h-20 md:h-24 px-4 sm:px-8 md:px-8 max-w-screen-xl mx-auto">
        <img className="h-8 sm:h-10 md:h-12 w-auto" src="/logo.svg" alt="Logo" />
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 lg:gap-10 items-center">
          <button className="opacity-40 text-sm lg:text-base hover:opacity-60 transition-opacity">How It Works?</button>
          <button className="opacity-40 text-sm lg:text-base hover:opacity-60 transition-opacity">Features</button>
          <button className="opacity-40 text-sm lg:text-base hover:opacity-60 transition-opacity">About Us</button>
          {!isloggedIn ? (<button onClick={handleLogin} className="border-[#FCC822] border-2 px-3 py-1 lg:px-5 lg:py-1 text-[#FCC822] text-sm lg:text-base hover:bg-[#FCC822] hover:text-white transition-colors">Login</button> )
          : (
            <div className="flex items-center">
              {/* <img className="h-6 w-6 rounded-full mr-2" src="/userIcon.svg" alt="Profile" /> */}
              <button onClick={handleSignOut} className="border-[#FCC822] border-2 px-3 py-1 lg:px-5 lg:py-1 text-[#FCC822] text-sm lg:text-base hover:bg-[#FCC822] hover:text-white transition-colors">Sign Out</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}