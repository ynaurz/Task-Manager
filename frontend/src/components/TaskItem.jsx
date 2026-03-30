import { useState } from "react";

function TaskItem ({ task, onDeleteTask, onToggleStatus, onUpdatedTask }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);

    const handleSave = async () => {
        const trimmedTitle = editedTitle.trim();

        if(!trimmedTitle) {
            return;
        }

        await onUpdatedTask(task.id, trimmedTitle);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedTitle(task.title);
        setIsEditing(false);
    };

      return (
    <div className={`task-item ${task.status === "done" ? "done" : ""}`}>
      <div className="task-content">
        {isEditing ? (
          <>
            <input
              className="edit-task-input"
              type="text"
              value={editedTitle}
              onChange={(event) => setEditedTitle(event.target.value)}
            />
            <p>Status: {task.status}</p>
          </>
        ) : (
          <>
            <h3>{task.title}</h3>
            <p>Status: {task.status}</p>
          </>
        )}
      </div>

      <div className="task-actions">
        {isEditing ? (
          <>
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
            <button className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button onClick={() => onToggleStatus(task.id)}>
              {task.status === "done" ? "Mark as TODO" : "Mark as Done"}
            </button>
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button
              className="delete-btn"
              onClick={() => onDeleteTask(task.id)}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskItem;