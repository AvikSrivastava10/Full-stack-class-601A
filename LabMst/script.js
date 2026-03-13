let tasks = [];
let filter = 'all';

function addTask() {
    const name = document.getElementById('taskName').value.trim();
    const priority = document.getElementById('priority').value;
    if (!name) return;
    tasks.push({ name, priority, completed: false });
    document.getElementById('taskName').value = '';
    renderTasks();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function setFilter(f) {
    filter = f;
    renderTasks();
}

function renderTasks() {
    const list = document.getElementById('taskList');
    list.innerHTML = '';
    let filteredTasks = tasks;
    if (filter === 'completed') {
        filteredTasks = tasks.filter(t => t.completed);
    } else if (filter === 'notCompleted') {
        filteredTasks = tasks.filter(t => !t.completed);
    }
    filteredTasks.forEach((task, idx) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        const priorityClass = 'priority-' + task.priority.toLowerCase();
        li.innerHTML = `<span class="${priorityClass}">${task.name} (${task.priority})</span>
            <div class="task-actions">
                <button onclick="toggleComplete(${idx})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="deleteTask(${idx})">Delete</button>
            </div>`;
        list.appendChild(li);
    });
}

renderTasks();
