#Database model will be added later

from sqlalchemy import Column, Integer, String
from app.database import Base

class TaskModel(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key = True, index = True)
    title = Column(String, nullable = False)
    status = Column(String, default = "todo")