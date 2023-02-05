import {showUserTasks} from "./showUserTasks.js";
import {deleteJSONData} from "../core/fetchJSON.js";

export const deleteTask = async (taskId) => {
    const [tasks, countedTasks] = await deleteJSONData({url: `http://localhost:3000/task/${taskId}`});

    showUserTasks(tasks, countedTasks);
}