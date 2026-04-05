from sqlalchemy import Column, Integer, String, Text, DateTime, func, Date
from app.database import Base


class ActivityModel(Base):
    __tablename__ = "activities"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    activity_type = Column(String, nullable=False)
    activity_date = Column(Date, nullable=True)
    place = Column(String, nullable=True)
    duration_minutes = Column(Integer, nullable=True)
    comment = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)