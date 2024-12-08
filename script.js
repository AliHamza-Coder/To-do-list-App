const tasks = [];
const completedTasks = [];
const taskList = document.querySelector(".task-list");
const totalTasks = document.querySelector(".totalTasks");
const addTaskButton = document.getElementById("add");

// Update total tasks dynamically
function updateTaskCount() {
    totalTasks.innerHTML = `<b>Total Tasks:</b> ${tasks.length}`;
}

// Display tasks dynamically
function displayTasks(filteredTasks) {
    taskList.innerHTML = "";
    filteredTasks.forEach((task, index) => {
        taskList.innerHTML += `
            <div class="task" id="task-${index}">
                <input type="checkbox" class="task-status" ${task.completed ? "checked" : ""} onchange="toggleComplete(${index})">
                <span class="${task.completed ? "completed" : ""}">${task.title}</span>
                <div class="btns">
                    <button class="btn" onclick="editTask(${index})">Edit</button>
                    <button class="btn" onclick="deleteTask(${index})">Delete</button>
                </div>
            </div>`;
    });
}

// Add a task
function addTask() {
    const inputTask = document.getElementById("inputTask").value.trim();
    if (!inputTask) {
        alert("Please enter a task!");
        return;
    }
    tasks.push({ title: inputTask, completed: false });
    document.getElementById("inputTask").value = "";
    displayTasks(tasks);
    updateTaskCount();
}

// Edit a task
function editTask(index) {
  // Prompt the user to edit the task title
  const newTitle = prompt("Edit Task:", tasks[index].title);
  if (newTitle && newTitle.trim() !== "") {
      tasks[index].title = newTitle.trim(); // Update the task title
      displayTasks(tasks); // Re-render tasks
  }
}

// Delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks(tasks);
    updateTaskCount();
}

// Toggle task completion
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    displayTasks(tasks);
}

// Filter tasks
document.getElementById("allTask").addEventListener("click", () => {
    displayTasks(tasks);
    updateTaskCount();
});

document.getElementById("completedTask").addEventListener("click", () => {
    const filtered = tasks.filter((task) => task.completed);
    totalTasks.innerHTML = `<b>Completed Tasks:</b> ${filtered.length}`;
    displayTasks(filtered);
});

document.getElementById("pendingTask").addEventListener("click", () => {
    const filtered = tasks.filter((task) => !task.completed);
    totalTasks.innerHTML = `<b>Pending Tasks:</b> ${filtered.length}`;
    displayTasks(filtered);
});

// Search functionality
function searchTask() {
    const query = document.getElementById("search-input").value.toLowerCase();
    const filtered = tasks.filter((task) =>
        task.title.toLowerCase().includes(query)
    );
    displayTasks(filtered);
}

// Add task on button click or pressing Enter
addTaskButton.addEventListener("click", addTask);
document.getElementById("inputTask").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

















