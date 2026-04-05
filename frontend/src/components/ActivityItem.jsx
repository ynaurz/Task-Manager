import { useState } from "react";

function ActivityItem({ activity, onDeleteActivity, onUpdateActivity }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(activity.title);
  const [editedType, setEditedType] = useState(activity.activity_type);
  const [editedDate, setEditedDate] = useState(activity.activity_date || "");
  const [editedPlace, setEditedPlace] = useState(activity.place || "");
  const [editedDuration, setEditedDuration] = useState(
    activity.duration_minutes || ""
  );
  const [editedComment, setEditedComment] = useState(activity.comment || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    const trimmedTitle = editedTitle.trim();
    const trimmedType = editedType.trim();
    const trimmedPlace = editedPlace.trim();
    const trimmedComment = editedComment.trim();

    if (!trimmedTitle || !trimmedType) {
      return;
    }

    try {
      setIsLoading(true);

      await onUpdateActivity(activity.id, {
        title: trimmedTitle,
        activity_type: trimmedType,
        activity_date: editedDate || null,
        place: trimmedPlace || null,
        duration_minutes: editedDuration ? Number(editedDuration) : null,
        comment: trimmedComment || null,
      });

      setIsEditing(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditedTitle(activity.title);
    setEditedType(activity.activity_type);
    setEditedDate(activity.activity_date || "");
    setEditedPlace(activity.place || "");
    setEditedDuration(activity.duration_minutes || "");
    setEditedComment(activity.comment || "");
    setIsEditing(false);
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await onDeleteActivity(activity.id);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="activity-item">
      <div className="activity-content">
        {isEditing ? (
          <>
            <input
              className="edit-activity-input"
              type="text"
              value={editedTitle}
              onChange={(event) => setEditedTitle(event.target.value)}
              disabled={isLoading}
              placeholder="Activity title"
            />

            <input
              className="edit-activity-input"
              type="text"
              value={editedType}
              onChange={(event) => setEditedType(event.target.value)}
              disabled={isLoading}
              placeholder="Activity type"
            />

            <input
              className="edit-activity-input"
              type="date"
              value={editedDate}
              onChange={(event) => setEditedDate(event.target.value)}
              disabled={isLoading}
            />

            <input
              className="edit-activity-input"
              type="text"
              value={editedPlace}
              onChange={(event) => setEditedPlace(event.target.value)}
              disabled={isLoading}
              placeholder="Place"
            />

            <input
              className="edit-activity-input"
              type="number"
              value={editedDuration}
              onChange={(event) => setEditedDuration(event.target.value)}
              disabled={isLoading}
              placeholder="Duration in minutes"
              min="1"
            />

            <textarea
              className="edit-activity-textarea"
              value={editedComment}
              onChange={(event) => setEditedComment(event.target.value)}
              disabled={isLoading}
              rows={4}
              placeholder="Comment"
            />
          </>
        ) : (
          <>
            <h3>{activity.title}</h3>
            <p className="activity-type">Type: {activity.activity_type}</p>
            {activity.activity_date && <p>Date: {activity.activity_date}</p>}
            {activity.place && <p>Place: {activity.place}</p>}
            {activity.duration_minutes && <p>Duration: {activity.duration_minutes} min</p>}
            {activity.comment && <p>{activity.comment}</p>}
          </>
        )}
      </div>

      <div className="activity-actions">
        {isEditing ? (
          <>
            <button className="save-btn" onClick={handleSave} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </button>
            <button className="cancel-btn" onClick={handleCancel} disabled={isLoading}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className="edit-btn"
              onClick={() => setIsEditing(true)}
              disabled={isLoading}
            >
              Edit
            </button>
            <button
              className="delete-btn"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? "Working..." : "Delete"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ActivityItem;