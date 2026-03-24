import { useState } from "react";

function TaskForm({onAddTask}) {
    const [title, setTitle] = useState("");

    const handleSumbit = (event) => {
        event.preventDefault();

        const trimmedTitle = title.trim();

        if(!trimmedTitle){
            return;
        }

        onAddTask(trimmedTitle);
        setTitle("");
    };

    return (
        <form className = "task-form" onSubmit = {handleSumbit}>
            <input type = "text" placeholder = "Enter a new task..."
            value = {title}
            onChange = {(event) => setTitle(event.target.value)}/>
            <button type = "submit">Add task</button>
        </form>
    );
}

export default TaskForm;