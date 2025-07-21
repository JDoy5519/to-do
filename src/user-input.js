import Task from "./task";
import Project from "./project";
import { differenceInHours, format, isToday, isThisWeek } from "date-fns";
import { allDates } from ".";

//creating a task to push into the array
export default function userInput() {
    let title = document.getElementById("taskLabel").value;
    console.log(title);

    let description = document.getElementById("taskDescription").value;
    console.log(description);

    let date = document.getElementById("taskDueDate").value;

    const low = document.getElementById('priority-0');
    const medium = document.getElementById('priority-1');
    let priority;
    if (low.checked === true) {
        priority = '!';
    } else if (medium.checked === true) {
        priority = '!!';
    } else {
        priority = '!!!';
    }
    console.log(priority);

    let project = document.getElementById('project').value;
    console.log(project);

    const newTask = new Task(title, description, date, priority, project);
    const dashboard = allDates[2];

    newTask.getDate();
    newTask.locateProject(newTask);
    newTask.noDuplicates(dashboard);
    newTask.pushToHome();
}