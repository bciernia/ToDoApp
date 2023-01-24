const taskForm = document.querySelector(".new-task-from");

export const createTaskFromUserData = () => {
    const taskName = taskForm.elements["task-name"].value;
    const taskDesc = taskForm.elements["task-desc"].value

    return {
        "taskId": 1,
        "taskName": taskName,
        "taskDesc": taskDesc,
    }
}