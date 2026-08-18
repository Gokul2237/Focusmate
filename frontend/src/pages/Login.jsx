import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Brain } from "lucide-react";
import api from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const loginUser = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const response = await api.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            navigate("/dashboard");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Login Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-6">

            <div className="w-full max-w-md bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/30">

                <div className="flex flex-col items-center mb-8">

                    <div className="bg-white p-4 rounded-full shadow-lg">

                        <Brain
                            size={40}
                            className="text-indigo-600"
                        />

                    </div>

                    <h1 className="text-4xl font-bold text-white mt-4">

                        FocusMate

                    </h1>

                    <p className="text-blue-100 mt-2 text-center">

                        ADHD Friendly Productivity Assistant

                    </p>

                </div>

                <form
                    onSubmit={loginUser}
                    className="space-y-5"
                >

                    <div>

                        <label className="text-white text-sm">

                            Email

                        </label>

                        <input

                            type="email"

                            placeholder="Enter your email"

                            value={email}

                            onChange={(e) =>
                                setEmail(e.target.value)
                            }

                            className="w-full mt-2 px-4 py-3 rounded-xl bg-white text-gray-700 outline-none focus:ring-4 focus:ring-blue-300"

                            required

                        />

                    </div>

                    <div>

                        <label className="text-white text-sm">

                            Password

                        </label>

                        <div className="relative mt-2">

                            <input

                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }

                                placeholder="Enter password"

                                value={password}

                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }

                                className="w-full px-4 py-3 rounded-xl bg-white text-gray-700 outline-none focus:ring-4 focus:ring-blue-300"

                                required

                            />

                            <button

                                type="button"

                                className="absolute right-4 top-3 text-gray-500"

                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }

                            >

                                {showPassword ?

                                    <EyeOff size={20} />

                                    :

                                    <Eye size={20} />

                                }

                            </button>

                        </div>

                    </div>

                    <button

                        type="submit"

                        disabled={loading}

                        className="w-full py-3 rounded-xl bg-white text-indigo-700 font-bold text-lg hover:bg-blue-100 transition duration-300"

                    >

                        {

                            loading

                                ?

                                "Logging In..."

                                :

                                "Login"

                        }

                    </button>

                </form>

                <div className="text-center mt-6">

                    <p className="text-white">

                        Don't have an account?

                    </p>

                    <Link

                        to="/register"

                        className="text-yellow-300 font-semibold hover:text-yellow-200"

                    >

                        Create Account

                    </Link>

                </div>

            </div>

        </div>

    );

}

export default Login;