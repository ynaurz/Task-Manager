import ActivityItem from "./ActivityItem";

function ActivityList({ activities, onDeleteActivity, onUpdateActivity }) {
  if (activities.length === 0) {
    return <p className="empty-message">No activities yet.</p>;
  }

  return (
    <div className="activity-list">
      {activities.map((activity) => (
        <ActivityItem
          key={activity.id}
          activity={activity}
          onDeleteActivity={onDeleteActivity}
          onUpdateActivity={onUpdateActivity}
        />
      ))}
    </div>
  );
}

export default ActivityList;