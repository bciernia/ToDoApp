import {postData} from "../design-system/postData.js";
import {showUserTasks} from "./showUserTasks.js";

export const sendTaskToDb = (task) => {
    if(task.taskName === "") return;

    postData('http://localhost:3000/task/addTask', task, showUserTasks);
}