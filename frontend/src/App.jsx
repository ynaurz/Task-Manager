import { useMemo, useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import {
  getTasks,
  createTask,
  deleteTask,
  toggleTaskStatus,
  updateTask,
  getNotes,
  createNote,
  deleteNote,
  updateNote,
  getActivities,
  createActivity,
  deleteActivity,
  updateActivity,
} from "./services/api";

function App() {
  const [activeTab, setActiveTab] = useState("tasks");

  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [activities, setActivities] = useState([]);

  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (activeTab === "tasks") {
      loadTasks();
    }

    if (activeTab === "notes") {
      loadNotes();
    }

    if (activeTab === "activities") {
      loadActivities();
    }
  }, [activeTab]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");
      const loadedTasks = await getTasks();
      setTasks(loadedTasks);
    } catch (err) {
      setError(err.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const loadNotes = async () => {
    try {
      setLoading(true);
      setError("");
      const loadedNotes = await getNotes();
      setNotes(loadedNotes);
    } catch (err) {
      setError(err.message || "Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  const loadActivities = async () => {
    try {
      setLoading(true);
      setError("");
      const loadedActivities = await getActivities();
      setActivities(loadedActivities);
    } catch (err) {
      setError(err.message || "Failed to load activities");
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    try {
      setError("");
      const newTask = await createTask(taskData);
      setTasks((prevTasks) => [newTask, ...prevTasks]);
    } catch (err) {
      setError(err.message || "Failed to create task");
      throw err;
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      setError("");
      await deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (err) {
      setError(err.message || "Failed to delete task");
      throw err;
    }
  };

  const handleToggleStatus = async (taskId) => {
    try {
      setError("");
      const updatedTask = await toggleTaskStatus(taskId);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
      );
    } catch (err) {
      setError(err.message || "Failed to toggle task status");
      throw err;
    }
  };

  const handleUpdatedTask = async (taskId, updatedData) => {
    try {
      setError("");
      const updatedTask = await updateTask(taskId, updatedData);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
      );
    } catch (err) {
      setError(err.message || "Failed to update task");
      throw err;
    }
  };

  const handleAddNote = async (noteData) => {
    try {
      setError("");
      const newNote = await createNote(noteData);
      setNotes((prevNotes) => [newNote, ...prevNotes]);
    } catch (err) {
      setError(err.message || "Failed to create note");
      throw err;
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      setError("");
      await deleteNote(noteId);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    } catch (err) {
      setError(err.message || "Failed to delete note");
      throw err;
    }
  };

  const handleUpdateNote = async (noteId, updatedData) => {
    try {
      setError("");
      const updatedNote = await updateNote(noteId, updatedData);

      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === noteId ? updatedNote : note))
      );
    } catch (err) {
      setError(err.message || "Failed to update note");
      throw err;
    }
  };

  const handleAddActivity = async (activityData) => {
    try {
      setError("");
      const newActivity = await createActivity(activityData);
      setActivities((prevActivities) => [newActivity, ...prevActivities]);
    } catch (err) {
      setError(err.message || "Failed to create activity");
      throw err;
    }
  };

  const handleDeleteActivity = async (activityId) => {
    try {
      setError("");
      await deleteActivity(activityId);
      setActivities((prevActivities) =>
        prevActivities.filter((activity) => activity.id !== activityId)
      );
    } catch (err) {
      setError(err.message || "Failed to delete activity");
      throw err;
    }
  };

  const handleUpdateActivity = async (activityId, updatedData) => {
    try {
      setError("");
      const updatedActivity = await updateActivity(activityId, updatedData);

      setActivities((prevActivities) =>
        prevActivities.map((activity) =>
          activity.id === activityId ? updatedActivity : activity
        )
      );
    } catch (err) {
      setError(err.message || "Failed to update activity");
      throw err;
    }
  };

  const filteredTasks = useMemo(() => {
    if (filter === "todo") {
      return tasks.filter((task) => task.status === "todo");
    }

    if (filter === "done") {
      return tasks.filter((task) => task.status === "done");
    }

    return tasks;
  }, [tasks, filter]);

  const totalTasks = tasks.length;
  const doneTasks = tasks.filter((task) => task.status === "done").length;
  const todoTasks = tasks.filter((task) => task.status === "todo").length;

  return (
    <div className="app">
      <div className="container">
        <h1>Task Manager</h1>
        <p className="subtitle">My first full-stack practice project</p>

        <div className="section-tabs">
          <button
            className={activeTab === "tasks" ? "active-tab" : ""}
            onClick={() => setActiveTab("tasks")}
          >
            Tasks
          </button>
          <button
            className={activeTab === "notes" ? "active-tab" : ""}
            onClick={() => setActiveTab("notes")}
          >
            Notes
          </button>
          <button
            className={activeTab === "activities" ? "active-tab" : ""}
            onClick={() => setActiveTab("activities")}
          >
            Activities
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}
        {loading && <p className="info-message">Loading...</p>}

        {!loading && activeTab === "tasks" && (
          <>
            <TaskForm onAddTask={addTask} />

            <div className="task-summary">
              <span>Total: {totalTasks}</span>
              <span>Todo: {todoTasks}</span>
              <span>Done: {doneTasks}</span>
            </div>

            <div className="filter-buttons">
              <button
                className={filter === "all" ? "active-filter" : ""}
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button
                className={filter === "todo" ? "active-filter" : ""}
                onClick={() => setFilter("todo")}
              >
                TODO
              </button>
              <button
                className={filter === "done" ? "active-filter" : ""}
                onClick={() => setFilter("done")}
              >
                Done
              </button>
            </div>

            <TaskList
              tasks={filteredTasks}
              onDeleteTask={handleDeleteTask}
              onToggleStatus={handleToggleStatus}
              onUpdatedTask={handleUpdatedTask}
            />
          </>
        )}

        {!loading && activeTab === "notes" && (
          <>
            <NoteForm onAddNote={handleAddNote} />
            <NoteList notes={notes} onDeleteNote={handleDeleteNote} onUpdateNote={handleUpdateNote}/>
          </>
        )}

        {!loading && activeTab === "activities" && (
          <>
            <ActivityForm onAddActivity={handleAddActivity} />
            <ActivityList
              activities={activities}
              onDeleteActivity={handleDeleteActivity}
              onUpdateActivity={handleUpdateActivity}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;