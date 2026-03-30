import TaskItem from "./TaskItem"

function TaskList({tasks, onDeleteTask, onToggleStatus, onUpdatedTask}) {
    if (tasks.length === 0) {
        return <p className = "empty-message">No tasks yet.</p>;
    }

    return (
        <div className = "task-list">
            {tasks.map((task) => (
                <TaskItem 
                key = {task.id}
                task = {task}
                onDeleteTask = {onDeleteTask}
                onToggleStatus = {onToggleStatus}
                onUpdatedTask={onUpdatedTask}
                />
            ))}
        </div>
    );
}

export default TaskList;