import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend
} from "recharts";

import {
    ClipboardList,
    CheckCircle,
    Clock,
    Trophy
} from "lucide-react";

function Analytics() {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {

        try {

            const res = await api.get("/tasks");

            setTasks(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    const completed =
        tasks.filter(t => t.completed).length;

    const pending =
        tasks.filter(t => !t.completed).length;

    const completionRate =
        tasks.length === 0
            ? 0
            : Math.round((completed / tasks.length) * 100);

    const pieData = [

        {
            name: "Completed",
            value: completed
        },

        {
            name: "Pending",
            value: pending
        }

    ];

    const COLORS = [
        "#22c55e",
        "#ef4444"
    ];

    const barData = [

        {
            name: "Tasks",
            Completed: completed,
            Pending: pending
        }

    ];

    return (

        <div className="bg-gray-100 min-h-screen">

            <Navbar />

            <div className="ml-64 p-8">

                <h1 className="text-4xl font-bold mb-8">

                    📊 Analytics Dashboard

                </h1>

                {/* Top Cards */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    <div className="bg-white rounded-2xl shadow-lg p-6">

                        <ClipboardList
                            size={35}
                            className="text-indigo-600 mb-3"
                        />

                        <h3 className="text-gray-500">

                            Total Tasks

                        </h3>

                        <h1 className="text-4xl font-bold">

                            {tasks.length}

                        </h1>

                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6">

                        <CheckCircle
                            size={35}
                            className="text-green-600 mb-3"
                        />

                        <h3 className="text-gray-500">

                            Completed

                        </h3>

                        <h1 className="text-4xl font-bold">

                            {completed}

                        </h1>

                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6">

                        <Clock
                            size={35}
                            className="text-orange-500 mb-3"
                        />

                        <h3 className="text-gray-500">

                            Pending

                        </h3>

                        <h1 className="text-4xl font-bold">

                            {pending}

                        </h1>

                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6">

                        <Trophy
                            size={35}
                            className="text-yellow-500 mb-3"
                        />

                        <h3 className="text-gray-500">

                            Productivity

                        </h3>

                        <h1 className="text-4xl font-bold">

                            {completionRate}%

                        </h1>

                    </div>

                </div>

                {/* Charts */}

                <div className="grid lg:grid-cols-2 gap-8 mt-10">

                    <div className="bg-white rounded-2xl shadow-lg p-6">

                        <h2 className="text-2xl font-bold mb-5">

                            Task Distribution

                        </h2>

                        <ResponsiveContainer
                            width="100%"
                            height={300}
                        >

                            <PieChart>

                                <Pie

                                    data={pieData}

                                    dataKey="value"

                                    outerRadius={100}

                                    label

                                >

                                    {

                                        pieData.map(
                                            (entry, index) => (

                                                <Cell

                                                    key={index}

                                                    fill={COLORS[index]}

                                                />

                                            )

                                        )

                                    }

                                </Pie>

                                <Tooltip />

                            </PieChart>

                        </ResponsiveContainer>

                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6">

                        <h2 className="text-2xl font-bold mb-5">

                            Task Overview

                        </h2>

                        <ResponsiveContainer
                            width="100%"
                            height={300}
                        >

                            <BarChart
                                data={barData}
                            >

                                <CartesianGrid strokeDasharray="3 3" />

                                <XAxis dataKey="name" />

                                <YAxis />

                                <Tooltip />

                                <Legend />

                                <Bar
                                    dataKey="Completed"
                                    fill="#22c55e"
                                />

                                <Bar
                                    dataKey="Pending"
                                    fill="#ef4444"
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                </div>

                {/* Motivation */}

                <div className="bg-white rounded-2xl shadow-lg p-6 mt-10">

                    <h2 className="text-2xl font-bold mb-3">

                        🎯 Productivity Insight

                    </h2>

                    <p className="text-lg text-gray-600">

                        {

                            completionRate >= 80

                                ? "🔥 Amazing! You're maintaining excellent productivity."

                                : completionRate >= 50

                                ? "👍 Great progress! Keep completing your daily tasks."

                                : "💡 Try completing a few more tasks to improve your productivity."

                        }

                    </p>

                </div>

            </div>

        </div>

    );

}

export default Analytics;