const getFilteredTasksByState = (tasks, filter) => {

    switch (filter){
        case "all-tasks":
            return tasks;

        case "0-exceeded":
            return tasks.filter(task => task.isTaskOverdue && !task.isTaskFinished);

        case "4-finished":
            return tasks.filter(task => task.isTaskFinished);

        default:
            return tasks.filter(task => task.currentTaskImportance === filter && !task.isTaskFinished);
    }
}

const getTasksIncludesFilter = (tasks, filter) => {
    return tasks.filter(task => task.taskName.toLowerCase().includes(filter));
}

const getTasksStartedWithFilter = (tasks, filter) => {
    return tasks.filter(task => task.taskName.toLowerCase().startsWith(filter));
}

const getFilteredTasksByName = (tasks, filter, isFilterIncludesChecked) => {

    if(isFilterIncludesChecked === 'true'){
      return getTasksIncludesFilter(tasks, filter);
    }

    return getTasksStartedWithFilter(tasks, filter);
}


module.exports = {
    getFilteredTasksByState,
    getFilteredTasksByName,
}