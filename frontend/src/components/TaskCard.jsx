import api from "../services/api";
import {
    CheckCircle,
    Trash2,
    Calendar,
    Repeat
} from "lucide-react";

function TaskCard({ task, refresh }) {

    const completeTask = async () => {

        try {

            await api.put(

                `/tasks/${task._id}`,

                {
                    completed: true
                }

            );

            refresh();

        } catch (error) {

            console.log(error);

        }

    };

    const deleteTask = async () => {

        try {

            await api.delete(
                `/tasks/${task._id}`
            );

            refresh();

        } catch (error) {

            console.log(error);

        }

    };

    const priorityColor = () => {

        switch (task.priority) {

            case "High":
                return "bg-red-100 text-red-600";

            case "Medium":
                return "bg-yellow-100 text-yellow-700";

            default:
                return "bg-green-100 text-green-700";

        }

    };

    return (

        <div className="bg-white border rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 mb-5">

            <div className="flex justify-between items-center">

                <h2 className="text-xl font-bold">

                    {task.title}

                </h2>

                <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${priorityColor()}`}
                >
                    {task.priority}
                </span>

            </div>

            <div className="mt-4 space-y-2">

                <p>

                    📂 <b>Category:</b>

                    {" "}

                    {task.category || "General"}

                </p>

                <p>

                    {

                        task.completed ?

                            "✅ Completed"

                            :

                            "⏳ Pending"

                    }

                </p>

                {

                    task.dueDate &&

                    <p className="flex items-center gap-2">

                        <Calendar size={16} />

                        {new Date(task.dueDate).toLocaleDateString()}

                    </p>

                }

                {

                    task.recurring &&

                    <p className="flex items-center gap-2 text-indigo-600">

                        <Repeat size={16} />

                        Recurring Task

                    </p>

                }

            </div>

            <div className="flex gap-3 mt-5">

                {

                    !task.completed &&

                    <button

                        onClick={completeTask}

                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl transition"

                    >

                        <CheckCircle size={18} />

                        Complete

                    </button>

                }

                <button

                    onClick={deleteTask}

                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"

                >

                    <Trash2 size={18} />

                    Delete

                </button>

            </div>

        </div>

    );

}

export default TaskCard;