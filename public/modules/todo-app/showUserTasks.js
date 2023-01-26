import {createListRow, createDiv, createBtn, createParagraph} from "../design-system/core.js";
import {deleteTask} from "./deleteTask.js";
import {renderTasks} from "./getTasks.js";

const taskList = document.querySelector('.task-list');

export const showUserTasks = (tasks) => {
    taskList.innerText = "";

    tasks.sort((taskA, taskB) => (taskA.taskImportance > taskB.taskImportance) ? 1 : -1)
        .forEach(task => {
            const removeTaskFromList = () => {
                console.log(`${task.name} is deleted, ID: ${task.taskId}`);
                deleteTask(task.taskId);
            }

            const li = createListRow([]);
            const div = createDiv(["task", `task-importance-background-color-${task.taskImportance}`]);
            const p = createParagraph(task.taskName, []);
            const btnEdit = createBtn('E', ["btn", "btn-edit-task"]);
            const btnRemove = createBtn('X', ["btn", "btn-remove-task"],
                removeTaskFromList);

            div.appendChild(btnEdit);
            div.appendChild(p);
            div.appendChild(btnRemove);

            li.appendChild(div);

            taskList.appendChild(li);
        })
}

