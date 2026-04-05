from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from app.schemas.task import Task, TaskCreate, TaskUpdate
from app.database import get_db
from app.models.task import TaskModel

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.get("", response_model=list[Task])
def get_tasks(db: Session = Depends(get_db)):
    tasks = db.query(TaskModel).all()
    return tasks


@router.post("", response_model=Task)
def create_task(task_data: TaskCreate, db: Session = Depends(get_db)):
    new_task = TaskModel(
        title=task_data.title,
        due_date=task_data.due_date,
        status="todo",
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return new_task


@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(TaskModel).filter(TaskModel.id == task_id).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(task)
    db.commit()

    return {"message": "Task deleted"}


@router.patch("/{task_id}/toggle", response_model=Task)
def toggle_task_status(task_id: int, db: Session = Depends(get_db)):
    task = db.query(TaskModel).filter(TaskModel.id == task_id).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    task.status = "done" if task.status == "todo" else "todo"
    db.commit()
    db.refresh(task)

    return task


@router.put("/{task_id}", response_model=Task)
def update_task(task_id: int, task_data: TaskUpdate, db: Session = Depends(get_db)):
    task = db.query(TaskModel).filter(TaskModel.id == task_id).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    task.title = task_data.title
    task.due_date = task_data.due_date
    db.commit()
    db.refresh(task)

    return task