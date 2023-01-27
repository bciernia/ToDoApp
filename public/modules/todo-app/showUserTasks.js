import {createListRow, createDiv, createBtn, createParagraph} from "../design-system/core.js";
import {deleteTask} from "./deleteTask.js";
import {putTask} from "./putTask.js";

const taskList = document.querySelector('.current-task-list');

export const showUserTasks = (tasks) => {
    taskList.innerText = "";

    tasks.sort((taskA, taskB) => (taskA.taskImportance > taskB.taskImportance) ? 1 : -1)
        .forEach(task => {
            const editChosenTask = () => {
                console.log("Edytujemy" + task.taskName);
                //TODO patch current element
            }

            const activateTask = () => {
                task.isTaskFinished = false;
                putTask(task);
            }

            const checkTask = () => {
                task.isTaskFinished = true;
                task.taskImportance = '4-finished';
                putTask(task);
            }

            const removeTask = () => {
                deleteTask(task.taskId);
            }

            const li = createListRow([]);
            const div = createDiv(["task", `task-importance-background-color-${task.taskImportance}`]);
            const p = createParagraph(task.taskName, []);
            const btnEdit = createBtn('images/edit.png', ["btn", "btn-edit-task"],
                editChosenTask);
            const btnActivateTask = createBtn('images/refresh.png', ["btn", "btn-edit-task"],
                activateTask);
            const btnRemove = createBtn('images/trash.png', ["btn", "btn-remove-task"],
                removeTask);
            const btnCheckTask = createBtn('images/check.png', ["btn", "btn-remove-task"],
                checkTask);

            div.appendChild(p);

            if (task.isTaskFinished) {
                p.classList.add("task-is-finished");
                div.appendChild(btnActivateTask);
                div.appendChild(btnRemove);
            } else {
                p.classList.remove("task-is-finished");
                div.appendChild(btnEdit);
                div.appendChild(btnCheckTask);
            }

            li.appendChild(div);

            taskList.appendChild(li);
        })
}

