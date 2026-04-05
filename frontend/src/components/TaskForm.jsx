import { useState } from "react";

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    try {
      setIsSubmitting(true);

      await onAddTask({
        title: trimmedTitle,
        due_date: dueDate || null,
      });

      setTitle("");
      setDueDate("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="task-form task-form-column" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a new task..."
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        disabled={isSubmitting}
      />

      <input
        type="date"
        value={dueDate}
        onChange={(event) => setDueDate(event.target.value)}
        disabled={isSubmitting}
      />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Add task"}
      </button>
    </form>
  );
}

export default TaskForm;