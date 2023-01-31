import {createListRow, createDiv, createBtnWithImg, createParagraph, createInput} from "../core/domManager.js";
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
        .forEach(arrayItem => {
            const task = createDiv(["task"]);
            const taskName = createParagraph(arrayItem.taskName, ["task-name-display"]);
            const tasksListRow = createListRow();
            const editTaskNameInput = createInput(arrayItem.taskName);
            const taskDeadline = createParagraph(`Deadline: ${arrayItem.taskDeadline}`);

            taskDeadline.classList.add("tooltip");

            /*
            * Button methods
            * */
            const editChosenTask = () => {
                editTaskNameInput.value = arrayItem.taskName;
                task.insertBefore(editTaskNameInput, task.firstChild);
                task.removeChild(taskName);
                task.removeChild(btnCheckTask);
                task.removeChild(btnEdit);
                task.appendChild(btnAcceptEditedTask);
                task.appendChild(btnRevertEditedTask);
            }
            const acceptEditedTask = () => {
                arrayItem.taskName = editTaskNameInput.value;

                task.insertBefore(taskName, task.firstChild);
                task.removeChild(editTaskNameInput);
                task.removeChild(btnAcceptEditedTask);
                task.removeChild(btnRevertEditedTask);
                task.appendChild(btnEdit);
                task.appendChild(btnCheckTask);

                arrayItem.taskName === "" ? deleteTask(arrayItem.taskId) : putTask(arrayItem);
            }
            const revertChanges = () => {
                task.insertBefore(taskName, task.firstChild);
                task.removeChild(editTaskNameInput);
                task.removeChild(btnAcceptEditedTask);
                task.removeChild(btnRevertEditedTask);
                task.appendChild(btnEdit);
                task.appendChild(btnCheckTask);
            }
            const activateTask = () => {
                arrayItem.isTaskFinished = false;
                putTask(arrayItem);
            }
            const checkTask = () => {
                arrayItem.isTaskFinished = true;
                putTask(arrayItem);
            }
            const removeTask = () => {
                deleteTask(arrayItem.taskId);
            }
            const showTaskDeadline = () => {
                taskDeadline.classList.toggle("tooltip-shown");
            }

            const btnEdit = createBtnWithImg('images/edit.png', ["btn", "btn-edit-task"],
                editChosenTask);
            const btnActivateTask = createBtnWithImg('images/refresh.png', ["btn", "btn-edit-task"],
                activateTask);
            const btnRemove = createBtnWithImg('images/trash.png', ["btn", "btn-remove-task"],
                removeTask);
            const btnCheckTask = createBtnWithImg('images/check.png', ["btn", "btn-remove-task"],
                checkTask);
            const btnAcceptEditedTask = createBtnWithImg('images/check.png', ["btn", "btn-edit-task"],
                acceptEditedTask);
            const btnRevertEditedTask = createBtnWithImg('images/close.png', ["btn", "btn-remove-task"],
                revertChanges)
            const btnDeadLine = createBtnWithImg('images/calendar.png', ["btn", "btn-deadline-task"],
                showTaskDeadline);

            btnDeadLine.appendChild(taskDeadline);

            arrayItem.isTaskFinished ? task.classList.add(`task-importance-background-color-4-finished`)
                : task.classList.add(`task-importance-background-color-${arrayItem.taskImportance}`);

            task.appendChild(taskName);

            if (arrayItem.isTaskDeadlineAvailable) task.appendChild(btnDeadLine);

            if (arrayItem.isTaskFinished) {
                taskName.classList.add("task-is-finished");
                btnDeadLine.style.display = 'none';
                task.appendChild(btnActivateTask);
                task.appendChild(btnRemove);
            } else {
                taskName.classList.remove("task-is-finished");
                btnDeadLine.style.display = 'block';
                task.appendChild(btnEdit);
                task.appendChild(btnCheckTask);
            }

            tasksListRow.appendChild(task);
            taskList.appendChild(tasksListRow);
        })
}
