import Navbar from "../components/Navbar";
import {
    Bell,
    Clock,
    Flame,
    CheckCircle,
    AlertTriangle
} from "lucide-react";

function Notifications() {

    const notifications = [

        {
            title: "Complete Study DBMS",
            message: "Your high priority DBMS task is still pending.",
            time: "Today",
            icon: <AlertTriangle className="text-red-500" size={28} />,
            color: "bg-red-50 border-red-300"
        },

        {
            title: "Keep Your Streak Alive",
            message: "Complete one task today to maintain your streak.",
            time: "Today",
            icon: <Flame className="text-orange-500" size={28} />,
            color: "bg-orange-50 border-orange-300"
        },

        {
            title: "Pomodoro Completed",
            message: "Great job! You completed a 25-minute focus session.",
            time: "1 hour ago",
            icon: <CheckCircle className="text-green-500" size={28} />,
            color: "bg-green-50 border-green-300"
        },

        {
            title: "Upcoming Reminder",
            message: "Review your tasks for tomorrow and plan ahead.",
            time: "Tomorrow",
            icon: <Clock className="text-blue-500" size={28} />,
            color: "bg-blue-50 border-blue-300"
        }

    ];

    return (

        <div className="bg-gray-100 min-h-screen">

            <Navbar />

            <div className="ml-64 p-8">

                <div className="flex items-center gap-3 mb-8">

                    <Bell
                        size={40}
                        className="text-indigo-600"
                    />

                    <h1 className="text-4xl font-bold">

                        Notifications

                    </h1>

                </div>

                <div className="space-y-5">

                    {

                        notifications.map((item, index) => (

                            <div

                                key={index}

                                className={`rounded-2xl shadow-lg border p-6 transition hover:scale-[1.02] ${item.color}`}

                            >

                                <div className="flex justify-between items-center">

                                    <div className="flex items-center gap-4">

                                        {item.icon}

                                        <div>

                                            <h2 className="text-xl font-bold">

                                                {item.title}

                                            </h2>

                                            <p className="text-gray-600 mt-1">

                                                {item.message}

                                            </p>

                                        </div>

                                    </div>

                                    <span className="text-gray-500 text-sm">

                                        {item.time}

                                    </span>

                                </div>

                            </div>

                        ))

                    }

                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 mt-10">

                    <h2 className="text-2xl font-bold mb-3">

                        💡 Focus Tip

                    </h2>

                    <p className="text-gray-600">

                        Complete your high-priority tasks first, then move to medium and low-priority tasks. Using the Pomodoro timer consistently can improve focus and reduce procrastination.

                    </p>

                </div>

            </div>

        </div>

    );

}

export default Notifications;