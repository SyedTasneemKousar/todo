const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
tasks.forEach(task => addTaskToDOM(task));

// Add task on Enter
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && taskInput.value.trim() !== '') {
        const newTask = { text: taskInput.value.trim(), completed: false };
        tasks.push(newTask);
        saveTasks();
        addTaskToDOM(newTask);
        taskInput.value = '';
    }
});

function addTaskToDOM(task) {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = task.text;
    if (task.completed) li.classList.add('completed');

    // Toggle completed on click
    span.addEventListener('click', () => {
        li.classList.toggle('completed');
        task.completed = !task.completed;
        saveTasks();
    });

    // Edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-btn');
    editBtn.addEventListener('click', () => {
        const updatedText = prompt('Edit task:', task.text);
        if (updatedText && updatedText.trim() !== '') {
            task.text = updatedText.trim();
            span.textContent = task.text;
            saveTasks();
        }
    });

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
        const index = tasks.indexOf(task);
        if (index > -1) tasks.splice(index, 1);
        li.remove();
        saveTasks();
    });

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
