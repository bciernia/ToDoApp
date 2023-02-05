const countAllTasks = (tasks) => {
    const countedTasks = {
        "Overdue": 0,
        "High": 0,
        "Medium": 0,
        "Low": 0,
        "Finished": 0,
    }

    tasks.forEach(task => {
        switch (task.currentTaskImportance){
            case "0-date-exceeded":
                countedTasks.Overdue++;
                break;

            case "1-high":
                countedTasks.High++;
                break;

            case "2-medium":
                countedTasks.Medium++;
                break;

            case "3-low":
                countedTasks.Low++;
                break;

            case "4-finished":
                countedTasks.Finished++;
                break;

        }
    });

    return countedTasks;
}

module.exports = {
    countAllTasks,
}