import styles from "./task.style.css";

export function TraskScene(){
    const pageContent = `
        <div class="${styles.taskcontainer}">
            <div class="${styles.header}">
                <h1>Task Scheduler</h1>
            </div>
            <div class="${styles.container}">
                <div class="${styles.taskInput}">
                    <input type="text" id="taskName" placeholder="Enter task..." class="${styles.input}">
                    <select id="taskPriority" class="${styles.select}">
                        <option value="">Prioridad</option>
                        <option value="top">Top Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="low">Low Priority</option>
                    </select>
                    <input type="date" id="taskDeadline" class="${styles.input}">
                    <button id="taskBtn" class="${styles.button}">Add Task</button>
                </div>
                <div class="${styles.taskList} tasks" id="taskList"></div>
            </div>
        </div>

        <!-- MODAL  -->
        <div id="editTaskModal" class="${styles.modal}">
            <div class="${styles.modalContent}">
                <span id="closeModal" class="${styles.close}">&times;</span>
                <h2>Edit Task</h2>
                <input type="text" id="editTaskName" class="${styles.input}" placeholder="Task Name">
                <select id="editTaskPriority" class="${styles.select}">
                    <option value="top">Top Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                </select>
                <input type="date" id="editTaskDeadline" class="${styles.input}">
                <button id="updateTaskButton" class="${styles.button}">Update Task</button>
            </div>
        </div>
    `;
    const logic = () => {
        const taskNameInput = document.getElementById("taskName");
        const taskPrioritySelect = document.getElementById("taskPriority");
        const taskDeadlineInput = document.getElementById("taskDeadline");
        const taskBtn = document.getElementById("taskBtn");
        const taskList = document.getElementById("taskList");

        const editTaskModal = document.getElementById("editTaskModal");
        const editTaskNameInput = document.getElementById("editTaskName");
        const editTaskPrioritySelect = document.getElementById("editTaskPriority");
        const editTaskDeadlineInput = document.getElementById("editTaskDeadline");
        const updateTaskButton = document.getElementById("updateTaskButton");
        const closeModalButton = document.getElementById("closeModal");
        const userId = localStorage.getItem('userId');

        
        const apiUrl = "http://localhost:3000/tasks";

        let currentTaskId = null;

        const loadTasks = async () => {
            const userId = localStorage.getItem('userId'); // Obtener el userId de localStorage
            const response = await fetch(`${apiUrl}?userId=${userId}`); // Incluir userId como parámetro de consulta
            const tasks = await response.json();
            taskList.innerHTML = "";
            tasks.forEach(task => {
                appendTaskToList(task);
            });
        };

        const appendTaskToList = (task) => {
            const taskItem = document.createElement("div");
            taskItem.className = styles.taskItem;

            taskItem.innerHTML = `
                <span class="${styles.taskName}">${task.name}</span>
                <span class="${styles.taskPriority}">Priority: ${task.priority}</span>
                <span class="${styles.taskDeadline}">Deadline: ${task.deadline}</span>
                <button class="${styles.markDone}" data-id="${task.id}">Mark as Done</button>
                <button class="${styles.editTask}" data-id="${task.id}">Edit</button>
            `;

            taskItem.querySelector(`.${styles.markDone}`).addEventListener("click", async (e) => {
                const taskId = e.target.getAttribute("data-id");
                const response = await fetch(`${apiUrl}/${taskId}`, {
                    method: "DELETE"
                });

                if(response.ok){
                    taskItem.remove();
                }
            });

            taskItem.querySelector(`.${styles.editTask}`).addEventListener("click", () => {
                editTask(task);
            });

            taskList.appendChild(taskItem);
        };

        const editTask = (task) => {
            currentTaskId = task.id;
            editTaskNameInput.value = task.name;
            editTaskPrioritySelect.value = task.priority;
            editTaskDeadlineInput.value = task.deadline;
            editTaskModal.style.display = "block";
        };

        const updateTask = async () => {
            const updatedTask = {
                name: editTaskNameInput.value,
                priority: editTaskPrioritySelect.value,
                deadline: editTaskDeadlineInput.value
            };

            const response = await fetch(`${apiUrl}/${currentTaskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedTask)
            });

            if (response.ok) {
                await loadTasks();
                editTaskModal.style.display = "none";
                clearModalFields();
            }
        };

        const clearInputFields = () => {
            taskNameInput.value = "";
            taskPrioritySelect.value = "";
            taskDeadlineInput.value = "";
        };

        const clearModalFields = () => {
            editTaskNameInput.value = "";
            editTaskPrioritySelect.value = "";
            editTaskDeadlineInput.value = "";
        };

        taskBtn.addEventListener("click", async() => {
            const task = {
                userId: userId,
                name: taskNameInput.value,
                priority: taskPrioritySelect.value,
                deadline: taskDeadlineInput.value
            };

            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(task)
            });

            if (response.ok) {
                const newTask = await response.json();
                appendTaskToList(newTask);
                clearInputFields();
            }
        });

        updateTaskButton.addEventListener("click", updateTask);

        closeModalButton.addEventListener("click", () => {
            editTaskModal.style.display = "none";
            clearModalFields();
        });

        window.addEventListener("click", (event) => {
            if (event.target == editTaskModal) {
                editTaskModal.style.display = "none";
                clearModalFields();
            }
        });

        loadTasks();
    }

    return {
        pageContent,
        logic
    }
}
