import {createListRow, createDiv, createBtnWithImg, createParagraph, createInput} from "../design-system/core.js";
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

export const showUserTasks = async (tasks) => {
    taskList.innerText = "";

    showHeaderText(tasks.length);

    tasks.sort((taskA, taskB) => (taskA.taskImportance > taskB.taskImportance) ? 1 : -1)
        .forEach(task => {
            const div = createDiv(["task"]);
            const p = createParagraph(task.taskName, ["task-name-display" ]);
            const li = createListRow([]);
            const input = createInput(task.taskName, []);
            const date = createParagraph(`Deadline: ${task.taskDeadline}`, []);

            date.classList.add("tooltip");

            /*
            * Buttons methods
            * */
            const editChosenTask = () => {
                input.value = task.taskName;
                div.insertBefore(input, div.firstChild);
                div.removeChild(p);
                div.removeChild(btnCheckTask);
                div.removeChild(btnEdit);
                div.appendChild(btnAcceptEditedTask);
                div.appendChild(btnRevertEditedTask);
            }
            const acceptEditedTask = () => {
                task.taskName = input.value;

                div.insertBefore(p, div.firstChild);
                div.removeChild(input);
                div.removeChild(btnAcceptEditedTask);
                div.removeChild(btnRevertEditedTask);
                div.appendChild(btnEdit);
                div.appendChild(btnCheckTask);

                task.taskName === "" ? deleteTask(task.taskId) : putTask(task);
            }
            const revertChanges = () => {
                div.insertBefore(p, div.firstChild);
                div.removeChild(input);
                div.removeChild(btnAcceptEditedTask);
                div.removeChild(btnRevertEditedTask);
                div.appendChild(btnEdit);
                div.appendChild(btnCheckTask);
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
            const showTaskDeadline = () => {
                date.classList.toggle("tooltip-shown");
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

            btnDeadLine.appendChild(date);

            task.isTaskFinished ? div.classList.add(`task-importance-background-color-4-finished`)
                : div.classList.add(`task-importance-background-color-${task.taskImportance}`);

            div.appendChild(p);

            if(task.isTaskDeadlineAvailable) div.appendChild(btnDeadLine);

            if (task.isTaskFinished) {
                p.classList.add("task-is-finished");
                btnDeadLine.style.display='none';
                div.appendChild(btnActivateTask);
                div.appendChild(btnRemove);
            } else {
                p.classList.remove("task-is-finished");
                btnDeadLine.style.display='block';
                div.appendChild(btnEdit);
                div.appendChild(btnCheckTask);
            }

            li.appendChild(div);
            taskList.appendChild(li);
        })

}

