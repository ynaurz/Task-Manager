from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import Task, TaskCreate, TaskUpdate

app = FastAPI(title = "Task Manager Api")

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

tasks: list[Task] = [
    Task(id = 1, title = "Learn FastAp Basics", status = "todo"),
    Task(id = 2, title = "Connetc frontend to backend", status = "done"),
]

@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}

@app.get("/tasks", response_model = list[Task])
def get_tasks() -> list[Task]:
    return tasks

@app.post("/tasks", response_model = Task)
def create_task(task_data: TaskCreate) -> Task:
    new_task = Task(
        id = max((task.id for task in tasks), default=0) + 1,
        title = task_data.title,
        status = "todo",
    )
    tasks.insert(0, new_task)
    return new_task

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int) -> dict[str, str]:
    for index, task in enumerate(tasks):
        if task.id == task_id:
            tasks.pop(index)
            return {"message": "Task deleted sucessfully"}
    
    raise HTTPException(status_code = 404, detail = "Task not found")

@app.patch("/tasks/{task_id}/toggle", response_model = Task)
def toggle_task_status(task_id: int) -> Task:
    for index, task in enumerate(tasks):
        if task.id == task_id:
            updated_task = Task(
                id = task.id,
                title = task.title,
                status = "done"if task.status == "todo" else "todo",
            )
            tasks[index] = updated_task
            return updated_task
    
    raise HTTPException(status_code = 404, detail = "Task not found")

@app.put("/tasks/{task_id}", response_model = Task)
def update_task(task_id: int, task_data: TaskUpdate) -> Task:
    for index, task in enumerate(tasks):
        if task.id == task_id:
            updated_task = Task(
                id = task.id,
                title = task_data.title,
                status = task.status,
            )
            tasks[index] = updated_task
            return updated_task
    raise HTTPException(status_code = 404, detail = "Task not found")