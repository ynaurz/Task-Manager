from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.note import NoteModel
from app.schemas.note import Note, NoteCreate, NoteUpdate

router = APIRouter(prefix = "/notes", tags = ["notes"])

@router.get("", response_model = list[Note])
def get_notes(db: Session = Depends(get_db)):
    notes = db.query(NoteModel).all()
    return notes


@router.post("", response_model = Note)
def create_note(note_data: NoteCreate, db: Session = Depends(get_db)):
    new_note = NoteModel(
        title = note_data.title,
        content = note_data.content,
        category = note_data.category,
    )

    db.add(new_note)
    db.commit()
    db.refresh(new_note)

    return new_note


@router.delete("/{note_id}")
def delete_note(note_id: int, db: Session = Depends(get_db)):
    note = db.query(NoteModel).filter(NoteModel.id == note_id).first()

    if not note:
        raise HTTPException(status_code = 404, detail = "Note not found")
    
    db.delete(note)
    db.commit()

    return {"message": "Note deleted"}

@router.put("/{note_id}", response_model = Note)
def update_note(note_id: int, note_data: NoteUpdate, db: Session = Depends(get_db)):
    note = db.query(NoteModel).filter(NoteModel.id == note_id).first()

    if not note:
        raise HTTPException(status_code = 404, detail = "Note not found")
    
    note.title = note_data.title
    note.content = note_data.content
    note.category = note_data.category

    db.commit()
    db.refresh(note)

    return note