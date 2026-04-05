import { useState } from "react";

function NoteItem({ note, onDeleteNote, onUpdateNote }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedCategory, setEditedCategory] = useState(note.category || "");
  const [editedContent, setEditedContent] = useState(note.content);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    const trimmedTitle = editedTitle.trim();
    const trimmedCategory = editedCategory.trim();
    const trimmedContent = editedContent.trim();

    if (!trimmedTitle || !trimmedContent) {
      return;
    }

    try {
      setIsLoading(true);

      await onUpdateNote(note.id, {
        title: trimmedTitle,
        category: trimmedCategory || null,
        content: trimmedContent,
      });

      setIsEditing(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditedTitle(note.title);
    setEditedCategory(note.category || "");
    setEditedContent(note.content);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await onDeleteNote(note.id);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="note-item">
      <div className="note-content">
        {isEditing ? (
          <>
            <input
              className="edit-note-input"
              type="text"
              value={editedTitle}
              onChange={(event) => setEditedTitle(event.target.value)}
              disabled={isLoading}
              placeholder="Note title"
            />

            <input
              className="edit-note-input"
              type="text"
              value={editedCategory}
              onChange={(event) => setEditedCategory(event.target.value)}
              disabled={isLoading}
              placeholder="Category"
            />

            <textarea
              className="edit-note-textarea"
              value={editedContent}
              onChange={(event) => setEditedContent(event.target.value)}
              disabled={isLoading}
              rows={4}
              placeholder="Note content"
            />
          </>
        ) : (
          <>
            <h3>{note.title}</h3>
            {note.category && <p className="note-category">Category: {note.category}</p>}
            <p>{note.content}</p>
          </>
        )}
      </div>

      <div className="note-actions">
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

export default NoteItem;