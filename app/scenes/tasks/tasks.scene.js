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
                    <button id="addTaskButton" class="${styles.button}">Add Task</button>
                </div>
                <div class="${styles.taskList} tasks" id="taskList"></div>
            </div>
        </div>
    `;
    const logic = () => {
        const taskNameInput = document.getElementById("taskName");
        const taskPrioritySelect = document.getElementById("taskPriority");
        const taskDeadlineInput = document.getElementById("taskDeadline");
        const addTaskButton = document.getElementById("addTaskButton");
        const taskList = document.getElementById("taskList");

        const apiUrl = "http://localhost:3000/tasks";

        const loadTasks = async () => {
            const response = await fetch(apiUrl);
            const task = await response.json();
            taskList.innerHTML = "";
            task.forEach(task => {
                appendTaskToList(task);
            });
        };

        addTaskButton.addEventListener("click", async() =>{
            const task = {
                name: taskNameInput.value,
                priority: taskPrioritySelect.value,
                deadline: taskDeadlineInput.value
            };

            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify(task)
            });

            if (response.ok) {
                const newTask = await response.json();
                appendTaskToList(newTask);
                clearInputFields();
            }
        });

        const appendTaskToList = (task) => {
            const taskItem = document.createElement("div");
            taskItem.className=styles.taskItem;

            taskItem.innerHTML = `
            <span class="${styles.taskName}">${task.name}</span>
            <span class="${styles.taskPriority}">Priority: ${task.priority}</span>
            <span class="${styles.taskDeadline}">Deadline: ${task.deadline}</span>
            <button class="${styles.markDone}" data-id="${task.id}">Mark as Done</button>
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
            taskList.appendChild(taskItem);
        };

        const clearInputFields = () => {
            taskNameInput.value = "";
            taskPrioritySelect.value = "top";
            taskDeadlineInput.value = "";
        };

        loadTasks();

    }

    return{
        pageContent,
        logic
    }
}