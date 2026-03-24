import { useMemo, useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { getTasks,createTask,deleteTask,toggleTaskStatus } from "./services/api";


function App() {
  
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async() => {
    const loadedTasks = await getTasks();
    setTasks(loadedTasks);
  };
  
  const addTask = async (title) => {
    const newTask = await createTask(title);
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };



  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleToggleStatus = async (taskId) => {
    const updatedTask = await toggleTaskStatus(taskId);

    setTasks((prevTasks) => prevTasks.map((task) => task.id === taskId ? updatedTask : task));
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

  const TotalTasks = tasks.length;
  const doneTasks = tasks.filter((task) => task.status === "done").length;
  const todoTasks = tasks.filter((task) => task.status === "todo").length;



  return (
    <div className="app">
      <div className="container">
        <h1>Task Manager</h1>
        <p className="subtitle">My first full-stack practice project</p>

        <TaskForm onAddTask={addTask} />
        <div className = "task-summary">
          <span>Total: {TotalTasks}</span>
          <span>Todo: {todoTasks}</span>
          <span>Done: {doneTasks}</span>
        </div>
        <div className = "filter-buttons">
          <button className = {filter === "all" ? "active-filter" : ""} onClick = {() => setFilter("all")}>All</button>
          <button className = {filter === "todo" ? "active-filter" : ""} onClick = {() => setFilter("todo")}>TODO</button>
          <button className = {filter === "done" ? "active-filter" : ""} onClick = {() => setFilter("done")}>Done</button>
        </div>
        <TaskList
          tasks={filteredTasks}
          onDeleteTask={handleDeleteTask}
          onToggleStatus={handleToggleStatus}
        />
      </div>
    </div>
  );
}

export default App;