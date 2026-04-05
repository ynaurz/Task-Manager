from datetime import datetime, date
from pydantic import BaseModel


class TaskCreate(BaseModel):
    title: str
    due_date: date | None = None


class TaskUpdate(BaseModel):
    title: str
    due_date: date | None = None


class Task(BaseModel):
    id: int
    title: str
    status: str
    due_date: date | None = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True