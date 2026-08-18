import {
    LayoutDashboard,
    BarChart3,
    User,
    Bell,
    LogOut,
    Brain
} from "lucide-react";

import {
    Link,
    useNavigate,
    useLocation
} from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {

        localStorage.removeItem("token");

        navigate("/");

    };

    const linkClass = (path) =>

        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
            location.pathname === path
                ? "bg-indigo-600 text-white shadow-lg"
                : "text-gray-700 hover:bg-indigo-100"
        }`;

    return (

        <div className="w-64 min-h-screen bg-white shadow-xl fixed left-0 top-0">

            <div className="p-6 border-b">

                <div className="flex items-center gap-3">

                    <Brain
                        size={36}
                        className="text-indigo-600"
                    />

                    <div>

                        <h1 className="font-bold text-2xl">

                            FocusMate

                        </h1>

                        <p className="text-sm text-gray-500">

                            Stay Focused

                        </p>

                    </div>

                </div>

            </div>

            <div className="p-4 space-y-3">

                <Link
                    to="/dashboard"
                    className={linkClass("/dashboard")}
                >
                    <LayoutDashboard size={20} />
                    Dashboard
                </Link>

                <Link
                    to="/analytics"
                    className={linkClass("/analytics")}
                >
                    <BarChart3 size={20} />
                    Analytics
                </Link>

                <Link
                    to="/profile"
                    className={linkClass("/profile")}
                >
                    <User size={20} />
                    Profile
                </Link>

                <Link
                    to="/notifications"
                    className={linkClass("/notifications")}
                >
                    <Bell size={20} />
                    Notifications
                </Link>

            </div>

            <div className="absolute bottom-6 left-4 right-4">

                <button
                    onClick={logout}
                    className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl"
                >

                    <LogOut size={18} />

                    Logout

                </button>

            </div>

        </div>

    );

}

export default Navbar;