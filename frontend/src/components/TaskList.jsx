import TaskItem from "./TaskItem"

function TaskList({tasks, onDeleteTask, onToggleStatus}) {
    if (tasks.length === 0) {
        return <p className = "empty-message">Not tasks yet.</p>;
    }

    return (
        <div className = "task-list">
            {tasks.map((task) => (
                <TaskItem 
                key = {task.id}
                task = {task}
                onDeleteTask = {onDeleteTask}
                onToggleStatus = {onToggleStatus}
                />
            ))}
        </div>
    );
}

export default TaskList;