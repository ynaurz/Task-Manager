function TaskItem ({task, onDeleteTask, onToggleStatus}) {
    return (
        <div className = {`task-item ${task.status === "done" ? "done" : ""}`}>
            <div className = "task-content">
                <h3>{task.title}</h3>
                <p>Status: {task.status}</p>
            </div>

            <div className = "task-actions">
                <button onClick = {() => onToggleStatus(task.id)}>
                    {task.status === "done" ? "Mark as TODO" : "Mark as Done"}
                </button>
                <button className = "delete-btn" onClick = {() => onDeleteTask(task.id)}>
                    Delete
                </button>
            </div>
        </div>
    );
}

export default TaskItem;