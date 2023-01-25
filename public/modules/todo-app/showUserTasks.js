import {createListRow, createDiv, createBtn, createParagraph} from "../design-system/core.js";
import {deleteTask} from "./deleteTask.js";

const taskList = document.querySelector('.task-list');

export const showUserTasks = (tasks) => {
    taskList.innerText = "";

    tasks.forEach(task => {
        const removeTaskFromList = () => {
            console.log(`${task.name} is deleted, ID: ${task.taskId}`);
            deleteTask(task.taskId);
        }

        const li = createListRow([]);
        const div = createDiv(["task"]);
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

