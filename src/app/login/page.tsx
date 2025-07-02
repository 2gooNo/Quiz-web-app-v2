export default function Login() {
    return (
        <div className="flex h-screen w-screen ">
            <div className="flex flex-col items-center w-1/2 p-50 bg-white">
                <img src="/logo.svg" alt="QuiGrad logo" className="w-100 mb-10" />
                <p className="text-gray-500 mb-8 text-center">
                    Welcome back! <br/>
                    Please login/signup to your account.
                </p>
                <form className="w-full max-w-sm space-y-4">
                    <div>
                        <label className="text-sm font-medium">Email address</label>
                        <input
                            type="email"
                            className="mt- w-full border rounded p-2"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Password</label>
                         <input
                            type="password"
                            className="mt-1 w-full border rounded p-2"
                            placeholder="Enter your password"
                        />
                    </div>
                </form>
                <div className="flex justify-between w-sm text-sm text-gray-500 mt-3">
                    <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Remember Me
                    </label>
                    <a href="#" className="text-yellow-500">Forgot Password?</a>
                </div>
            </div>
            <div>
                hahh
            </div>
        </div>
    );
}
