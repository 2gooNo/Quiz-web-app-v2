export default function Login() {
    return (
        <div className="flex h-screen w-screen text-2xl">
            <div className="flex flex-col items-center justify-center w-1/2 p-32 bg-white">
                <img src="/logo.svg" alt="QuiGrad logo" className="w-100 mb-12" />

                <p className="text-gray-500 mb-10 text-center text-3xl">
                    Welcome back! <br />
                    Please login/signup to your account.
                </p>

                <form className="w-full max-w-lg space-y-8">
                    <div>
                        <label className="text-xl font-semibold">Email address</label>
                        <input
                            type="email"
                            className="mt-3 w-full border-l-8 border-[#FCC822] p-5 text-2xl rounded"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label className="text-xl font-semibold">Password</label>
                        <input
                            type="password"
                            className="mt-3 w-full border-l-8 border-[#FCC822] p-5 text-2xl rounded"
                            placeholder="Enter your password"
                        />
                    </div>

                    <div className="flex justify-between text-lg text-gray-600 mt-4">
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-3 scale-125" />
                            Remember Me
                        </label>
                        <a href="#" className="text-yellow-500">Forgot Password?</a>
                    </div>

                    <div className="flex space-x-6 mt-10">
                        <button
                            type="submit"
                            className="bg-yellow-400 hover:bg-yellow-500 text-white py-4 px-10 rounded shadow text-2xl"
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            className="bg-yellow-400 hover:bg-yellow-500 text-white py-4 px-10 rounded shadow text-2xl"
                        >
                            Signup
                        </button>
                    </div>
                </form>
            </div>

             <div className="flex flex-col items-center w-1/2  bg-[#F3F3F3] place-content-center ">
                <img src="/logo2.svg" className="w-150"/>
            </div>
        </div>
    );
}
