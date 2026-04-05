import { useState } from "react";

function NoteForm({ onAddNote }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();
    const trimmedCategory = category.trim();

    if (!trimmedTitle || !trimmedContent) {
      return;
    }

    try {
      setIsSubmitting(true);

      await onAddNote({
        title: trimmedTitle,
        content: trimmedContent,
        category: trimmedCategory || null,
      });

      setTitle("");
      setContent("");
      setCategory("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Note title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        disabled={isSubmitting}
      />

      <input
        type="text"
        placeholder="Category (optional)"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        disabled={isSubmitting}
      />

      <textarea
        placeholder="Write your note..."
        value={content}
        onChange={(event) => setContent(event.target.value)}
        disabled={isSubmitting}
        rows={4}
      />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Add note"}
      </button>
    </form>
  );
}

export default NoteForm;