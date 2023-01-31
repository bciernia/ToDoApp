import {showUserTasks} from "./showUserTasks.js";
import {postJSONData} from "../core/fetchJSON.js";

export const sendTaskToDb = async (task) => {
    if(task.taskName === "") return;

    const tasks = await postJSONData({url: `http://localhost:3000/task/addTask`, body: task});

    showUserTasks(tasks);
}