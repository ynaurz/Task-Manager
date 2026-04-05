import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.notes import router as notes_router
from app.routers.tasks import router as task_router
from app.models import TaskModel, NoteModel
from app.database import Base, engine
from app.routers.activities import router as activities_router
from app.models import TaskModel, NoteModel, ActivityModel

app = FastAPI(title="Task Manager API")

PORT = int(os.getenv("PORT", 8000))

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# @app.on_event("startup")
# def on_startup():
#     Base.metadata.create_all(bind=engine)

@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


app.include_router(task_router)
app.include_router(notes_router)
app.include_router(activities_router)