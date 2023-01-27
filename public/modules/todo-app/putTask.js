import {putData} from "../design-system/putData.js";
import {showUserTasks} from "./showUserTasks.js";

export const putTask = (task) => {
    putData(`http://localhost:3000/task/${task.taskId}`, task, showUserTasks);
}