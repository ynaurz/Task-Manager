import { useState } from "react";

function ActivityForm({ onAddActivity }) {
  const [title, setTitle] = useState("");
  const [activityType, setActivityType] = useState("");
  const [activityDate, setActivityDate] = useState("");
  const [place, setPlace] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedActivityType = activityType.trim();
    const trimmedPlace = place.trim();
    const trimmedComment = comment.trim();

    if (!trimmedTitle || !trimmedActivityType) {
      return;
    }

    try {
      setIsSubmitting(true);

      await onAddActivity({
        title: trimmedTitle,
        activity_type: trimmedActivityType,
        activity_date: activityDate || null,
        place: trimmedPlace || null,
        duration_minutes: durationMinutes ? Number(durationMinutes) : null,
        comment: trimmedComment || null,
      });

      setTitle("");
      setActivityType("");
      setActivityDate("");
      setPlace("");
      setDurationMinutes("");
      setComment("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="activity-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Activity title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        disabled={isSubmitting}
      />

      <input
        type="text"
        placeholder="Activity type (gym, running, etc.)"
        value={activityType}
        onChange={(event) => setActivityType(event.target.value)}
        disabled={isSubmitting}
      />

      <input
        type="date"
        value={activityDate}
        onChange={(event) => setActivityDate(event.target.value)}
        disabled={isSubmitting}
      />

      <input
        type="text"
        placeholder="Place (optional)"
        value={place}
        onChange={(event) => setPlace(event.target.value)}
        disabled={isSubmitting}
      />

      <input
        type="number"
        placeholder="Duration in minutes (optional)"
        value={durationMinutes}
        onChange={(event) => setDurationMinutes(event.target.value)}
        disabled={isSubmitting}
        min="1"
      />

      <textarea
        placeholder="Comment (optional)"
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        disabled={isSubmitting}
        rows={4}
      />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Add activity"}
      </button>
    </form>
  );
}

export default ActivityForm;