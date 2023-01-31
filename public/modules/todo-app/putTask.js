import {putJSONData} from "../core/fetchJSON.js";
import {showUserTasks} from "./showUserTasks.js";

export const putTask = async (task) => {
    const tasks =
        await putJSONData({url: `http://localhost:3000/task/${task.taskId}`, body: task})

    showUserTasks(tasks);
}