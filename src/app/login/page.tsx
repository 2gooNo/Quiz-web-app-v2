"use client";
import axios from 'axios';
import { useEffect, useState } from 'react';
export default function Login() {
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    async function handleLogin() {
        try {
            const response = await axios.post('http://localhost:8000/login', {
                email: data.email,
                password: data.password
            });
            console.log("Login successful:", response.data);
            localStorage.setItem("token", response.data.token);
        } catch (error) {
            console.error("Error during login:", error);
        }
    }
    return(
        <div className="flex min-h-screen w-full flex-col lg:flex-row">
            {/* Form Section */}
            <div className="flex-1 flex flex-col p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 items-center justify-center gap-6 sm:gap-8 md:gap-10 max-w-none lg:max-w-[50%]">
                <img className="h-auto w-32 sm:w-40 md:w-48 lg:w-56 xl:w-80" src="/logo.svg" alt="Logo"/>
                
                <div className="flex flex-col items-center text-center">
                    <p className="text-lg sm:text-xl font-medium text-gray-600">Welcome!</p>
                    <p className="text-lg sm:text-xl font-medium text-gray-600">Please signup.</p>
                </div>
                
                <div className="flex flex-col w-full max-w-sm sm:max-w-md md:max-w-lg">
                    {/* <div className="border-b border-t border-r border-l-4 border-b-[#C1BBBB] border-t-[#C1BBBB] border-r-[#C1BBBB] border-l-[#FCC822] pl-3 pt-2 pb-2 w-full">
                        <p className="text-sm text-gray-500 mb-1">Username</p>
                        <input
                            value={data?.userName}
                            onChange={(e) =>
                            setData((prev) => ({ ...prev, userName: e.target.value }))
                        }
                            type="text"
                            className="border-none outline-none focus:outline-none focus:ring-0 focus:border-none w-full text-base text-yellow-500 bg-transparent"
                        />
                    </div> */}
                    <div className="border-b border-r border-l-4 border-b-[#C1BBBB] border-r-[#C1BBBB] border-l-[#FCC822] pl-3 pt-2 pb-2 w-full">
                        <p className="text-sm text-gray-500 mb-1">Email address</p>
                        <input
                            value={data?.email}
                            onChange={(e) =>
                            setData((prev) => ({ ...prev, email: e.target.value }))
                        }
                            type="email"
                            className="text-base text-yellow-500 border-none outline-none focus:outline-none focus:ring-0 focus:border-none w-full bg-transparent"
                        />
                    </div>
                    <div className="border-b border-r border-l-4 border-b-[#C1BBBB] border-r-[#C1BBBB] border-l-[#FCC822] pl-3 pt-2 pb-2 w-full">
                        <p className="text-sm text-gray-500 mb-1">Password</p>
                        <input
                            value={data?.password}
                            onChange={(e) =>
                            setData((prev) => ({ ...prev, password: e.target.value }))
                        }
                            type="password"
                            className="text-base text-yellow-500 border-none outline-none focus:outline-none focus:ring-0 focus:border-none w-full bg-transparent"
                        />
                    </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center  w-full max-w-sm sm:max-w-md md:max-w-lg gap-4 sm:gap-0">
                    <a className="text-gray-600">Dont have an account?</a>
                    &nbsp;
                    <button className="text-sm sm:text-base text-yellow-500 hover:underline">SignUp</button>
                </div>
                
                <button onClick={handleLogin} className="w-full max-w-xs sm:max-w-sm h-12 sm:h-14 bg-[#FFCD2E] text-white text-base sm:text-lg font-semibold rounded hover:bg-[#E5B726] transition-colors">
                    Login
                </button>
            </div>
            
            {/* Image Section */}
            <div className="hidden lg:flex flex-1 bg-[#F5F5F5] items-center justify-center p-8">
                <img className="h-auto w-full max-w-md xl:max-w-lg" src="/graduate.svg" alt="Graduate illustration"/>
            </div>
        </div>
    )
}
