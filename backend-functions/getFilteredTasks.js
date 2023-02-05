const getFilteredTasks = (tasks, filter) => {

    switch (filter){
        case "all-tasks":
            return tasks;

        case "4-finished":
            return tasks.filter(task => task.isTaskFinished === true);

        default:
            return tasks.filter(task => task.currentTaskImportance === filter && task.isTaskFinished === false);
    }
}

module.exports = {
    getFilteredTasks,
}