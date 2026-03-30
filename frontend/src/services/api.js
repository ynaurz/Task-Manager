const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getTasks() {

    const response = await fetch(`${API_BASE_URL}/tasks`);

    if(!response.ok) {
        throw new Error("Failed to fetch tasks");
    }

    return response.json();
}

export async function createTask(title) {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
    });

    if(!response.ok) {
        throw new Error("Failed to create task");
    }

    return response.json();
}

export async function deleteTask(taskId) {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: "DELETE",
    });

    if(!response.ok) {
        throw new Error("Failed to delete task");
    }

    return response.json();
}

export async function toggleTaskStatus(taskId) {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/toggle`, {
        method: "PATCH",
    });

    if(!response.ok) {
        throw new Error("Failed to toggle task status");
    }
    
    return response.json();
}

export async function updateTask(taskId, title) {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
    });

    if(!response.ok) {
        throw new Error("Failed to update task");
    }
    return response.json();
}