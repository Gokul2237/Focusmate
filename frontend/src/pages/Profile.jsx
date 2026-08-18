import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import {
    Mail,
    Star,
    Flame,
    Award
} from "lucide-react";

function Profile() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {

        try {

            const res = await api.get("/profile");

            console.log("Profile Response:", res.data);

            if (res.data) {
                setUser(res.data);
            }

        } catch (error) {

            console.log("Profile Error:", error);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div className="bg-gray-100 min-h-screen">

                <Navbar />

                <div className="ml-64 p-10">

                    <h1 className="text-3xl font-bold">
                        Loading Profile...
                    </h1>

                </div>

            </div>

        );

    }

    if (!user) {

        return (

            <div className="bg-gray-100 min-h-screen">

                <Navbar />

                <div className="ml-64 p-10">

                    <h1 className="text-3xl font-bold text-red-500">
                        Profile Not Found
                    </h1>

                </div>

            </div>

        );

    }

    const level = Math.floor((user.points || 0) / 100) + 1;
    const progress = (user.points || 0) % 100;

    return (

        <div className="bg-gray-100 min-h-screen">

            <Navbar />

            <div className="ml-64 p-8">

                <h1 className="text-4xl font-bold mb-8">
                    👤 My Profile
                </h1>

                <div className="bg-white rounded-3xl shadow-xl p-8">

                    <div className="flex items-center gap-8">

                        <div className="w-28 h-28 rounded-full bg-indigo-600 flex items-center justify-center text-white text-5xl font-bold">

                            {
                                user.name
                                    ? user.name.charAt(0).toUpperCase()
                                    : "U"
                            }

                        </div>

                        <div>

                            <h2 className="text-3xl font-bold">

                                {user.name || "Unknown User"}

                            </h2>

                            <p className="flex items-center gap-2 text-gray-500 mt-2">

                                <Mail size={18} />

                                {user.email || "No Email"}

                            </p>

                            <p className="text-indigo-600 font-semibold mt-3">

                                ⭐ Level {level}

                            </p>

                        </div>

                    </div>

                </div>

                {/* Statistics */}

                <div className="grid md:grid-cols-3 gap-6 mt-8">

                    <div className="bg-white rounded-2xl shadow-lg p-6">

                        <Star
                            size={35}
                            className="text-yellow-500 mb-3"
                        />

                        <h3>Total Points</h3>

                        <h1 className="text-4xl font-bold">

                            {user.points || 0}

                        </h1>

                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6">

                        <Flame
                            size={35}
                            className="text-orange-500 mb-3"
                        />

                        <h3>Current Streak</h3>

                        <h1 className="text-4xl font-bold">

                            {user.streak || 0}

                        </h1>

                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6">

                        <Award
                            size={35}
                            className="text-indigo-600 mb-3"
                        />

                        <h3>Badges Earned</h3>

                        <h1 className="text-4xl font-bold">

                            {(user.badges || []).length}

                        </h1>

                    </div>

                </div>

                {/* Level Progress */}

                <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

                    <h2 className="text-2xl font-bold mb-4">

                        ⭐ Level Progress

                    </h2>

                    <div className="w-full bg-gray-200 rounded-full h-6">

                        <div
                            className="bg-indigo-600 h-6 rounded-full text-white text-center"
                            style={{
                                width: `${progress}%`
                            }}
                        >

                            {progress}%

                        </div>

                    </div>

                    <p className="mt-3">

                        Earn {100 - progress} more points to reach Level {level + 1}

                    </p>

                </div>

                {/* Badges */}

                <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

                    <h2 className="text-2xl font-bold mb-5">

                        🏆 Achievement Badges

                    </h2>

                    {

                        (user.badges || []).length === 0 ?

                            <div className="text-center py-8">

                                <Award
                                    size={60}
                                    className="mx-auto text-gray-300"
                                />

                                <p className="mt-4 text-gray-500">

                                    Complete tasks to unlock badges!

                                </p>

                            </div>

                            :

                            <div className="grid md:grid-cols-3 gap-5">

                                {

                                    (user.badges || []).map((badge, index) => (

                                        <div
                                            key={index}
                                            className="bg-yellow-100 rounded-xl p-5 text-center"
                                        >

                                            <div className="text-5xl">

                                                🏅

                                            </div>

                                            <h3 className="font-bold mt-3">

                                                {badge}

                                            </h3>

                                        </div>

                                    ))

                                }

                            </div>

                    }

                </div>

            </div>

        </div>

    );

}

export default Profile;