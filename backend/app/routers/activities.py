from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.activity import ActivityModel
from app.schemas.activity import Activity, ActivityCreate, ActivityUpdate

router = APIRouter(prefix="/activities", tags=["activities"])


@router.get("", response_model=list[Activity])
def get_activities(db: Session = Depends(get_db)):
    activities = db.query(ActivityModel).all()
    return activities


@router.post("", response_model=Activity)
def create_activity(activity_data: ActivityCreate, db: Session = Depends(get_db)):
    new_activity = ActivityModel(
        title=activity_data.title,
        activity_type=activity_data.activity_type,
        activity_date=activity_data.activity_date,
        place=activity_data.place,
        duration_minutes=activity_data.duration_minutes,
        comment=activity_data.comment,
    )

    db.add(new_activity)
    db.commit()
    db.refresh(new_activity)

    return new_activity


@router.delete("/{activity_id}")
def delete_activity(activity_id: int, db: Session = Depends(get_db)):
    activity = db.query(ActivityModel).filter(ActivityModel.id == activity_id).first()

    if not activity:
        raise HTTPException(status_code=404, detail="Activity not found")

    db.delete(activity)
    db.commit()

    return {"message": "Activity deleted"}


@router.put("/{activity_id}", response_model=Activity)
def update_activity(
    activity_id: int,
    activity_data: ActivityUpdate,
    db: Session = Depends(get_db),
):
    activity = db.query(ActivityModel).filter(ActivityModel.id == activity_id).first()

    if not activity:
        raise HTTPException(status_code=404, detail="Activity not found")

    activity.title = activity_data.title
    activity.activity_type = activity_data.activity_type
    activity.activity_date = activity_data.activity_date
    activity.place = activity_data.place
    activity.duration_minutes = activity_data.duration_minutes
    activity.comment = activity_data.comment

    db.commit()
    db.refresh(activity)

    return activity