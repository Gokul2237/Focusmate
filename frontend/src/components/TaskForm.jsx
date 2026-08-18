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

            <input

                type="text"

                placeholder="Enter Task Title"

                value={title}

                onChange={(e) =>
                    setTitle(e.target.value)
                }

                className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500"

                required

            />

            <div className="grid md:grid-cols-2 gap-4">

                <select

                    value={category}

                    onChange={(e) =>
                        setCategory(e.target.value)
                    }

                    className="border rounded-xl p-3"

                >

                    <option>Study</option>
                    <option>Work</option>
                    <option>Personal</option>
                    <option>Exercise</option>
                    <option>Shopping</option>
                    <option>Others</option>

                </select>

                <select

                    value={priority}

                    onChange={(e) =>
                        setPriority(e.target.value)
                    }

                    className="border rounded-xl p-3"

                >

                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>

                </select>

            </div>

            <div className="grid md:grid-cols-2 gap-4">

                <input

                    type="date"

                    value={dueDate}

                    onChange={(e) =>
                        setDueDate(e.target.value)
                    }

                    className="border rounded-xl p-3"

                />

                <label className="flex items-center gap-3 border rounded-xl p-3">

                    <input

                        type="checkbox"

                        checked={recurring}

                        onChange={(e) =>
                            setRecurring(e.target.checked)
                        }

                    />

                    Recurring Task

                </label>

            </div>

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