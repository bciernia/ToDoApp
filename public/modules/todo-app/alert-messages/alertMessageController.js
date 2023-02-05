import {createParagraph} from "../../core/domManager.js";

export const clearAlerts = (section) => {
   const alerts = section.getElementsByClassName('error-message');

   Array.from(alerts).forEach(alert => section.removeChild(alert));
}

export const createAlertMessage = (text, additionalClasses) => {
   const alert = createParagraph(text, additionalClasses);

   return alert;
}