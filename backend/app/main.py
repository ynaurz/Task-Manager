from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import Task, TaskCreate, TaskUpdate
from app.database import SessionLocal
from app.models import TaskModel
import os



app = FastAPI(title="Task Manager Api")

PORT = int(os.getenv("PORT", 8000))

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/tasks", response_model=list[Task])
def get_tasks():
    db = SessionLocal()
    try:
        tasks = db.query(TaskModel).all()
        return tasks
    finally:
        db.close()


@app.post("/tasks", response_model=Task)
def create_task(task_data: TaskCreate):
    db = SessionLocal()
    try:
        new_task = TaskModel(
            title=task_data.title,
            status="todo"
        )

        db.add(new_task)
        db.commit()
        db.refresh(new_task)

        return new_task
    finally:
        db.close()


@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    db = SessionLocal()
    try:
        task = db.query(TaskModel).filter(TaskModel.id == task_id).first()

        if not task:
            raise HTTPException(status_code=404, detail="Task not found")

        db.delete(task)
        db.commit()

        return {"message": "Task deleted"}
    finally:
        db.close()


@app.patch("/tasks/{task_id}/toggle", response_model=Task)
def toggle_task_status(task_id: int):
    db = SessionLocal()
    try:
        task = db.query(TaskModel).filter(TaskModel.id == task_id).first()

        if not task:
            raise HTTPException(status_code=404, detail="Task not found")

        task.status = "done" if task.status == "todo" else "todo"
        db.commit()
        db.refresh(task)

        return task
    finally:
        db.close()


@app.put("/tasks/{task_id}", response_model=Task)
def update_task(task_id: int, task_data: TaskUpdate):
    db = SessionLocal()
    try:
        task = db.query(TaskModel).filter(TaskModel.id == task_id).first()

        if not task:
            raise HTTPException(status_code=404, detail="Task not found")

        task.title = task_data.title
        db.commit()
        db.refresh(task)

        return task
    finally:
        db.close()