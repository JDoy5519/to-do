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

    locateProject() {
        const found = allProjects.find((proj) => proj.title === this.project);
        if (found) {
            found.tasks.push(this);
        } else {
            console.log("Hi!")
        }
        
    };

    createCard() {
        const card = document.createElement('div');
        card.className = 'card';

        const title = document.createElement('h2');
        title.textContent = this.title;

        const dueDate = document.createElement('span');
        dueDate.textContent = this.dueDate;

        const priority = document.createElement('div');
        priority.textContent = this.priority;

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        const completeButton = document.createElement("button");
        completeButton.textContent = "Complete";

        card.append(title, dueDate, priority, buttonContainer);
        buttonContainer.append(deleteButton, completeButton);

        const cardHolder = document.getElementById('cardHolder');
        cardHolder.appendChild(card);
    }
 }