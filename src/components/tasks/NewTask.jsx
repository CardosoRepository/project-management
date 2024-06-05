import { useState } from "react";

export function NewTask({ onAdd }) {
    const [enteredTask, SetEnteredTask] = useState("");

    function handleChange(event) {
        SetEnteredTask(event.target.value);
    }

    function handleClick() {
        if (enteredTask.trim() === "") {
            return;
        }
        onAdd(enteredTask);
        SetEnteredTask("");
    }

    return (
        <div className="flex items-center gap-4">
            <input
                className="w-64 px-2 py-1 rounded-sm bg-stone-200"
                type="text"
                onChange={handleChange}
                value={enteredTask}
            />
            <button
                className="text-stone-700 hover:text-stone-950"
                onClick={handleClick}
            >
                Add Task
            </button>
        </div>
    );
}
