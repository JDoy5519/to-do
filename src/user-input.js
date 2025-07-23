import Task from "./task";
import Project from "./project";
import { differenceInHours, format, isToday, isThisWeek } from "date-fns";
import { allDates } from ".";
import { allProjects } from ".";
import { saveToLocalStorage } from "./storage";

//creating a task to push into the array
export default function userInput() {
    const title = document.getElementById("taskLabel").value;
    console.log(title);

    const description = document.getElementById("taskDescription").value;
    console.log(description);

    const date = document.getElementById("taskDueDate").value;

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

    const project = document.getElementById('project').value;
    console.log(project);

    const newTask = new Task(title, description, date, priority, project);
    const dashboard = allDates[2];

    newTask.pushToArrays();
    newTask.noDuplicates(dashboard);

    saveToLocalStorage(allProjects, allDates);
}