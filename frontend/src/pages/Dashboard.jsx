import { useEffect, useState } from "react";
import api from "../services/api";

import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import Pomodoro from "../components/Pomodoro";

import {
    CheckCircle,
    ClipboardList,
    Clock,
    Trophy
} from "lucide-react";

function Dashboard() {

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {

        try {

            const res = await api.get("/tasks");

            setTasks(res.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    const completedTasks =
        tasks.filter(task => task.completed).length;

    const pendingTasks =
        tasks.length - completedTasks;

    return (

        <div className="bg-gray-100 min-h-screen">

            <Navbar />

            <div className="ml-64 p-8">

                {/* Header */}

                <div className="mb-8">

                    <h1 className="text-4xl font-bold">

                        👋 Welcome to FocusMate

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Stay focused. Complete tasks. Build habits.

                    </p>

                </div>

                {/* Statistics */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

                    <div className="bg-white rounded-2xl shadow-lg p-6">

                        <ClipboardList
                            className="text-indigo-600 mb-3"
                            size={32}
                        />

                        <h2 className="text-gray-500">

                            Total Tasks

                        </h2>

                        <h1 className="text-3xl font-bold">

                            {tasks.length}

                        </h1>

                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6">

                        <CheckCircle
                            className="text-green-600 mb-3"
                            size={32}
                        />

                        <h2 className="text-gray-500">

                            Completed

                        </h2>

                        <h1 className="text-3xl font-bold">

                            {completedTasks}

                        </h1>

                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6">

                        <Clock
                            className="text-orange-500 mb-3"
                            size={32}
                        />

                        <h2 className="text-gray-500">

                            Pending

                        </h2>

                        <h1 className="text-3xl font-bold">

                            {pendingTasks}

                        </h1>

                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6">

                        <Trophy
                            className="text-yellow-500 mb-3"
                            size={32}
                        />

                        <h2 className="text-gray-500">

                            Productivity

                        </h2>

                        <h1 className="text-3xl font-bold">

                            {

                                tasks.length === 0

                                    ?

                                    "0%"

                                    :

                                    Math.round(

                                        completedTasks /
                                        tasks.length * 100

                                    ) + "%"

                            }

                        </h1>

                    </div>

                </div>

                {/* Main Grid */}

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Left */}

                    <div className="lg:col-span-2">

                        <div className="bg-white rounded-2xl shadow-lg p-6">

                            <h2 className="text-2xl font-bold mb-5">

                                ➕ Add New Task

                            </h2>

                            <TaskForm refreshTasks={fetchTasks} />

                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

                            <h2 className="text-2xl font-bold mb-5">

                                📋 My Tasks

                            </h2>

                            {

                                loading ?

                                    <p>

                                        Loading...

                                    </p>

                                    :

                                    tasks.length === 0 ?

                                        <p>

                                            No Tasks Available

                                        </p>

                                        :

                                        tasks.map(task => (

                                            <TaskCard

                                                key={task._id}

                                                task={task}

                                                refresh={fetchTasks}

                                            />

                                        ))

                            }

                        </div>

                    </div>

                    {/* Right */}

                    <div>

                        <div className="bg-white rounded-2xl shadow-lg p-6">

                            <Pomodoro />

                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">

                            <h2 className="text-xl font-bold mb-4">

                                🎯 Daily Motivation

                            </h2>

                            <p className="text-gray-600">

                                Small progress every day leads to big success.

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;