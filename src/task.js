import { allProjects } from ".";
import { allDates } from ".";
import Project from "./project";

export default class Task {
    constructor(title, description, dueDate, priority, project) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
    }

    locateProject(project) {
        const found = allProjects.find((element) => element = project.title);
        console.log(found);
        found.tasks.push(this);
    };
 }