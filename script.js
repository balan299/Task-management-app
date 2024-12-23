const taskList = document.getElementById("task-list");
const taskInput = document.getElementById("task-name");

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function addTask() {
    const taskName = taskInput.value.trim();
    if (taskName === "") {
        alert("Please enter a task.");
        return;
    }

    const task = {
        name: taskName,
        category: 'all', // Default category
        completed: false
    };

    tasks.push(task);
    updateTaskList();
    taskInput.value = "";
}

function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    updateTaskList();
}

function filterTasks(category) {
    const filteredTasks = category === 'all' ? tasks : tasks.filter(task => task.category === category);
    renderTaskList(filteredTasks);
}

function updateTaskList() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTaskList(tasks);
}

function renderTaskList(taskArray) {
    taskList.innerHTML = "";
    taskArray.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.toggle('completed', task.completed);

        li.innerHTML = `
            <span>${task.name}</span>
            <div class="task-actions">
                <button onclick="toggleTaskCompletion(${index})">
                    ${task.completed ? "Undo" : "Complete"}
                </button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// Initial render of task list
renderTaskList(tasks);
