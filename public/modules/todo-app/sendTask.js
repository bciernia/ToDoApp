import {postItem} from "../design-system/postItem.js";

export const sendTaskToDb = (task) => {
    postItem('http://localhost:3000/sendTask', task);
}