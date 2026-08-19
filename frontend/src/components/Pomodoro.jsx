import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Timer } from "lucide-react";

function Pomodoro() {

    const INITIAL_TIME = 25 * 60;

    const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
    const [isRunning, setIsRunning] = useState(false);
    const [sessions, setSessions] = useState(0);

    useEffect(() => {

        let interval = null;

        if (isRunning && timeLeft > 0) {

            interval = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);

        }

        if (timeLeft === 0) {

            clearInterval(interval);

            setIsRunning(false);

            setSessions(prev => prev + 1);

            alert("🎉 Pomodoro Session Completed!");

        }

        return () => clearInterval(interval);

    }, [isRunning, timeLeft]);

    const formatTime = () => {

        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    };

    const resetTimer = () => {

        setTimeLeft(INITIAL_TIME);
        setIsRunning(false);

    };

    const progress =
        ((INITIAL_TIME - timeLeft) / INITIAL_TIME) * 100;

    return (

        <div>

            {/* Header */}

            <div className="flex items-center gap-2 mb-5">

                <Timer
                    className="text-indigo-600"
                    size={28}
                />

                <h2 className="text-2xl font-bold">
                    Focus Timer
                </h2>

            </div>

            {/* Timer Box */}

            <div className="bg-indigo-50 rounded-2xl p-6 text-center">

                {/* Timer Circle */}

                <div className="relative w-44 h-44 mx-auto rounded-full border-8 border-indigo-200 flex items-center justify-center bg-white overflow-hidden">

                    <div
                        className="absolute left-0 bottom-0 w-full bg-indigo-500 transition-all duration-500"
                        style={{
                            height: `${progress}%`,
                            opacity: 0.15
                        }}
                    />

                    <h1 className="text-5xl font-bold relative z-10">
                        {formatTime()}
                    </h1>

                </div>

                {/* Timer Buttons */}

                <div className="flex flex-wrap justify-center gap-3 mt-6">

                    <button
                        onClick={() => setIsRunning(true)}
                        className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 rounded-xl font-semibold transition"
                    >
                        <Play size={17} />
                        Start
                    </button>

                    <button
                        onClick={() => setIsRunning(false)}
                        className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2.5 rounded-xl font-semibold transition"
                    >
                        <Pause size={17} />
                        Pause
                    </button>

                    <button
                        onClick={resetTimer}
                        className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2.5 rounded-xl font-semibold transition"
                    >
                        <RotateCcw size={17} />
                        Reset
                    </button>

                </div>

            </div>

            {/* Completed Sessions */}

            <div className="mt-6 bg-indigo-50 rounded-xl p-4 text-center">

                <h3 className="font-semibold text-lg">
                    🍅 Completed Focus Sessions
                </h3>

                <p className="text-3xl font-bold text-indigo-600 mt-2">
                    {sessions}
                </p>

            </div>

        </div>

    );
}

export default Pomodoro;