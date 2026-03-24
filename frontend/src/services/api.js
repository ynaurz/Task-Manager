import mockTasks from "../data/mockTasks";

let tasks = [...mockTasks];

export function getTasks(){
    return Promise.resolve([...tasks]);
}

export function createTask(title) {
    const newTask = {
        id: Date.now(),
        title,
        status: "todo",
    };

    tasks = [newTask, ...tasks];
    return Promise.resolve(newTask);
}

export function deleteTask(taskId) {
    tasks = tasks.filter((task) => task.id !== taskId);
    return Promise.resolve();
}

export function toggleTaskStatus(taskId) {
    tasks = tasks.map((task) => task.id === taskId ? {...task, status: task.status === "done" ? "todo" : "done",} : task);

    const updatedTask = tasks.find((task) => task.id === taskId);
    return Promise.resolve(updatedTask);
}