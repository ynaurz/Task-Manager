import NoteItem from "./NoteItem";

function NoteList({ notes, onDeleteNote, onUpdateNote }) {
  if (notes.length === 0) {
    return <p className="empty-message">No notes yet.</p>;
  }

  return (
    <div className="note-list">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onDeleteNote={onDeleteNote}
          onUpdateNote={onUpdateNote}
        />
      ))}
    </div>
  );
}

export default NoteList;