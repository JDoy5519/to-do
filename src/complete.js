import { allProjects } from ".";
import { allDates } from ".";
import Project from "./project";

export default function completeTask(x) {
    const thisTask = x.parentElement.parentElement;
    thisTask.classList.add('complete');
}