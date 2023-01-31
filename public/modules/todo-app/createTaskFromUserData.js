const taskForm = document.querySelector(".new-task-from");

const setCorrectDate = () => {
    const date = new Date(document.querySelector('.new-task-datepicker').value);

    if(date >= Date.now()){
        return date.toLocaleDateString();
    }
    return new Date(Date.now()).toLocaleDateString();
}

export const createTaskFromUserData = () => {
    const taskName = taskForm.elements["task-name"].value;
    const taskImportance = taskForm.elements["task-importance"].value;
    const isTaskDeadlineAvailable = taskForm.elements["task-deadline-confirm"].checked;

    return {
        "taskName": taskName,
        "isTaskDeadlineAvailable": isTaskDeadlineAvailable,
        "taskDeadline": setCorrectDate(),
        "taskImportance": taskImportance,
        "isTaskFinished": false,
    }
}
