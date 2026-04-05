from datetime import datetime, date
from pydantic import BaseModel


class ActivityCreate(BaseModel):
    title: str
    activity_type: str
    activity_date: date | None = None
    place: str | None = None
    duration_minutes: int | None = None
    comment: str | None = None


class ActivityUpdate(BaseModel):
    title: str
    activity_type: str
    activity_date: date | None = None
    place: str | None = None
    duration_minutes: int | None = None
    comment: str | None = None


class Activity(BaseModel):
    id: int
    title: str
    activity_type: str
    activity_date: date | None = None
    place: str | None = None
    duration_minutes: int | None = None
    comment: str | None = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True