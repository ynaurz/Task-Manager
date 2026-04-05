const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function handleResponse(response, errorMessage) {
  if (!response.ok) {
    throw new Error(errorMessage);
  }

  return response.json();
}

export async function getTasks() {
  const response = await fetch(`${API_BASE_URL}/tasks`);
  return handleResponse(response, "Failed to fetch tasks");
}

export async function createTask(taskData) {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  return handleResponse(response, "Failed to create task");
}

export async function deleteTask(taskId) {
  const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
    method: "DELETE",
  });

  return handleResponse(response, "Failed to delete task");
}

export async function toggleTaskStatus(taskId) {
  const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/toggle`, {
    method: "PATCH",
  });

  return handleResponse(response, "Failed to toggle task status");
}

export async function updateTask(taskId, taskData) {
  const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  return handleResponse(response, "Failed to update task");
}

export async function getNotes() {
  const response = await fetch(`${API_BASE_URL}/notes`);
  return handleResponse(response, "Failed to fetch notes");
}

export async function createNote(noteData) {
  const response = await fetch(`${API_BASE_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(noteData),
  });

  return handleResponse(response, "Failed to create note");
}

export async function deleteNote(noteId) {
  const response = await fetch(`${API_BASE_URL}/notes/${noteId}`, {
    method: "DELETE",
  });

  return handleResponse(response, "Failed to delete note");
}

export async function getActivities() {
  const response = await fetch(`${API_BASE_URL}/activities`);
  return handleResponse(response, "Failed to fetch activities");
}

export async function createActivity(activityData) {
  const response = await fetch(`${API_BASE_URL}/activities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(activityData),
  });

  return handleResponse(response, "Failed to create activity");
}

export async function deleteActivity(activityId) {
  const response = await fetch(`${API_BASE_URL}/activities/${activityId}`, {
    method: "DELETE",
  });

  return handleResponse(response, "Failed to delete activity");
}

export async function updateNote(noteId, noteData) {
  const response = await fetch(`${API_BASE_URL}/notes/${noteId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(noteData),
  });

  return handleResponse(response, "Failed to update note");
}

export async function updateActivity(activityId, activityData) {
  const response = await fetch(`${API_BASE_URL}/activities/${activityId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(activityData),
  });

  return handleResponse(response, "Failed to update activity");
}