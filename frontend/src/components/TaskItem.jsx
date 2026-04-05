import { useState } from "react";

function TaskItem({ task, onDeleteTask, onToggleStatus, onUpdatedTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDueDate, setEditedDueDate] = useState(task.due_date || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    const trimmedTitle = editedTitle.trim();

    if (!trimmedTitle) {
      return;
    }

    try {
      setIsLoading(true);
      await onUpdatedTask(task.id, {
        title: trimmedTitle,
        due_date: editedDueDate || null,
      });
      setIsEditing(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditedTitle(task.title);
    setEditedDueDate(task.due_date || "");
    setIsEditing(false);
  };

  const handleToggle = async () => {
    try {
      setIsLoading(true);
      await onToggleStatus(task.id);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await onDeleteTask(task.id);
    } finally {
      setIsLoading(false);
    }
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
              disabled={isLoading}
            />

            <input
              className="edit-task-input"
              type="date"
              value={editedDueDate}
              onChange={(event) => setEditedDueDate(event.target.value)}
              disabled={isLoading}
            />

            <p>Status: {task.status}</p>
          </>
        ) : (
          <>
            <h3>{task.title}</h3>
            <p>Status: {task.status}</p>
            {task.due_date && <p>Date: {task.due_date}</p>}
          </>
        )}
      </div>

      <div className="task-actions">
        {isEditing ? (
          <>
            <button className="save-btn" onClick={handleSave} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </button>
            <button className="cancel-btn" onClick={handleCancel} disabled={isLoading}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button className = "toggle-btn" onClick={handleToggle} disabled={isLoading}>
              {task.status === "done" ? "Mark as TODO" : "Mark as Done"}
            </button>
            <button
              className="edit-btn"
              onClick={() => setIsEditing(true)}
              disabled={isLoading}
            >
              Edit
            </button>
            <button
              className="delete-btn"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? "Working..." : "Delete"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskItem;