import { useState } from "react";
import { PlusCircle } from "lucide-react";
import api from "../services/api";

function TaskForm({ refreshTasks }) {

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Study");
    const [priority, setPriority] = useState("Medium");
    const [dueDate, setDueDate] = useState("");
    const [recurring, setRecurring] = useState(false);

    const submitHandler = async (e) => {

        e.preventDefault();

        if (!title.trim()) {
            alert("Please enter a task");
            return;
        }

        try {

            await api.post("/tasks", {
                title,
                category,
                priority,
                dueDate,
                recurring
            });

            setTitle("");
            setCategory("Study");
            setPriority("Medium");
            setDueDate("");
            setRecurring(false);

            refreshTasks();

        } catch (error) {

            console.log(error);
            alert("Unable to add task");

        }
    };

    return (

        <form
            onSubmit={submitHandler}
            className="space-y-5"
        >

            {/* Task Title */}

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Task Title
                </label>

                <input
                    type="text"
                    placeholder="Enter Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                />
            </div>

            {/* Category and Priority */}

            <div className="grid md:grid-cols-2 gap-4">

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Category
                    </label>

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option>Study</option>
                        <option>Work</option>
                        <option>Personal</option>
                        <option>Exercise</option>
                        <option>Shopping</option>
                        <option>Others</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Priority
                    </label>

                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                    </select>
                </div>

            </div>

            {/* Due Date and Recurring */}

            <div className="grid md:grid-cols-2 gap-4">

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Due Date
                    </label>

                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Task Type
                    </label>

                    <label className="flex items-center gap-3 border border-gray-300 rounded-xl p-3 h-[50px] cursor-pointer">
                        <input
                            type="checkbox"
                            checked={recurring}
                            onChange={(e) => setRecurring(e.target.checked)}
                            className="w-4 h-4"
                        />

                        <span>
                            Recurring Task
                        </span>
                    </label>
                </div>

            </div>

            {/* Add Task Button */}

            <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl w-full font-semibold transition"
            >
                <PlusCircle size={20} />
                Add Task
            </button>

        </form>

    );
}

export default TaskForm;