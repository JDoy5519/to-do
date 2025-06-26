export default class Task {
    constructor(title, description, dueDate, priority, project) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
    }

    addToProject(projectArray) {
        projectArray.push(this);
        return projectArray;
        //here the project array will be project.toDo
    }
 }