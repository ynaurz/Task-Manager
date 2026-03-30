from pydantic import BaseModel;

class TaskCreate(BaseModel):
    title: str

class TaskUpdate(BaseModel):
    title: str

class Task(BaseModel):

    id: int
    title: str
    status: str