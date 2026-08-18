import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Brain, Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import api from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const res = await api.post("/auth/register", {
                name,
                email,
                password
            });

            alert(res.data.message);

            navigate("/");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Registration Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-700 to-blue-700 p-6">

            <div className="w-full max-w-md bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8">

                <div className="flex flex-col items-center">

                    <div className="bg-white p-4 rounded-full shadow-lg">

                        <Brain
                            size={40}
                            className="text-indigo-600"
                        />

                    </div>

                    <h1 className="text-4xl font-bold text-white mt-4">

                        FocusMate

                    </h1>

                    <p className="text-blue-100 mt-2">

                        Create your account

                    </p>

                </div>

                <form
                    onSubmit={handleRegister}
                    className="mt-8 space-y-5"
                >

                    <div>

                        <label className="text-white text-sm">

                            Full Name

                        </label>

                        <div className="relative mt-2">

                            <User
                                className="absolute left-3 top-3 text-gray-400"
                                size={20}
                            />

                            <input

                                type="text"

                                placeholder="Enter your name"

                                value={name}

                                onChange={(e) =>
                                    setName(e.target.value)
                                }

                                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white text-gray-700 outline-none focus:ring-4 focus:ring-blue-300"

                                required

                            />

                        </div>

                    </div>

                    <div>

                        <label className="text-white text-sm">

                            Email

                        </label>

                        <div className="relative mt-2">

                            <Mail
                                className="absolute left-3 top-3 text-gray-400"
                                size={20}
                            />

                            <input

                                type="email"

                                placeholder="Enter your email"

                                value={email}

                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }

                                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white text-gray-700 outline-none focus:ring-4 focus:ring-blue-300"

                                required

                            />

                        </div>

                    </div>

                    <div>

                        <label className="text-white text-sm">

                            Password

                        </label>

                        <div className="relative mt-2">

                            <Lock
                                className="absolute left-3 top-3 text-gray-400"
                                size={20}
                            />

                            <input

                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }

                                placeholder="Create password"

                                value={password}

                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }

                                className="w-full pl-11 pr-12 py-3 rounded-xl bg-white text-gray-700 outline-none focus:ring-4 focus:ring-blue-300"

                                required

                            />

                            <button

                                type="button"

                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }

                                className="absolute right-3 top-3 text-gray-500"

                            >

                                {

                                    showPassword

                                        ?

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

                        className="w-full py-3 rounded-xl bg-white text-indigo-700 font-bold text-lg hover:bg-blue-100 transition-all duration-300"

                    >

                        {

                            loading

                                ?

                                "Creating Account..."

                                :

                                "Register"

                        }

                    </button>

                </form>

                <div className="text-center mt-6">

                    <p className="text-white">

                        Already have an account?

                    </p>

                    <Link

                        to="/"

                        className="text-yellow-300 font-semibold hover:text-yellow-200"

                    >

                        Login Here

                    </Link>

                </div>

            </div>

        </div>

    );

}

export default Register;