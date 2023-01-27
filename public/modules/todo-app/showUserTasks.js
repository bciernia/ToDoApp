import {createListRow, createDiv, createBtnWithImg, createParagraph} from "../design-system/core.js";
import {deleteTask} from "./deleteTask.js";
import {putTask} from "./putTask.js";

const taskList = document.querySelector('.current-task-list');

const showHeaderText = (arrayLength) => {
    if (arrayLength === 0) {
        document.querySelector('.main-container-info').innerText = "Hooray! You don't have any tasks to do!";
        document.querySelector('.no-tasks-gif').style.display = 'block';
    } else {
        document.querySelector('.main-container-info').innerText = "Your tasks";
        document.querySelector('.no-tasks-gif').style.display = 'none';
    }

}

export const showUserTasks = (tasks) => {
    taskList.innerText = "";

    showHeaderText(tasks.length);

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
                putTask(task);
            }

            const removeTask = () => {
                deleteTask(task.taskId);
            }

            const li = createListRow([]);
            const div = createDiv(["task"]);
            const p = createParagraph(task.taskName, []);
            const btnEdit = createBtnWithImg('images/edit.png', ["btn", "btn-edit-task"],
                editChosenTask);
            const btnActivateTask = createBtnWithImg('images/refresh.png', ["btn", "btn-edit-task"],
                activateTask);
            const btnRemove = createBtnWithImg('images/trash.png', ["btn", "btn-remove-task"],
                removeTask);
            const btnCheckTask = createBtnWithImg('images/check.png', ["btn", "btn-remove-task"],
                checkTask);

            task.isTaskFinished ? div.classList.add(`task-importance-background-color-4-finished`)
                : div.classList.add(`task-importance-background-color-${task.taskImportance}`);

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

