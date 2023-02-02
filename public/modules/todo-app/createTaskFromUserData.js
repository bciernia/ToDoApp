const taskForm = document.querySelector(".new-task-from");

export const createTaskFromUserData = () => {
    const taskName = taskForm.elements["task-name"].value;
    const taskImportance = taskForm.elements["task-importance"].value;
    const isTaskDeadlineAvailable = taskForm.elements["task-deadline-confirm"].checked;
    const date = new Date(document.querySelector('.new-task-datepicker').value);

    return {
        "taskName": taskName,
        "isTaskDeadlineAvailable": isTaskDeadlineAvailable,
        "taskDeadline": date,
        "taskImportance": taskImportance,
        "isTaskFinished": false,
    }
}
