import { allProjects } from ".";
import { allDates } from ".";
import Project from "./project";
import { isToday, isThisWeek } from "date-fns";

export default class Task {
    constructor(title, description, dueDate, priority, project) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
        this.id = crypto.randomUUID();
    }

    locateProject() {
        const found = allProjects.find((proj) => proj.title === this.project);
        if (found) {
            found.tasks.push(this);
        } else {
            alert("This is not a project!");
        }
        
    };

    pushToHome() {
        const dashboard = allDates[2];
        dashboard.tasks.push(this);
    }

    createCard() {
        const card = document.createElement('div');
        card.className = 'card';

        const title = document.createElement('h2');
        title.textContent = this.title;

        const dueDate = document.createElement('span');
        let date = this.dueDate
        if (date) {
        const [year, month, day] = date.split("-");
        date = `${day}/${month}/${year}`;
        }
        dueDate.textContent = date;

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

    getDate() {
        //convert argument to date
        const date = new Date(this.dueDate);
        console.log(date);
    
        //logic to decide whether it is today 
        // or this week
        const today = isToday(date);
        const thisWeek = isThisWeek(date);
    
        //logic for actions based 
        // upon these boolean statements
        if (today === true) {
            allDates[0].tasks.push(this);
            console.log(allDates[0]);
        } else if (thisWeek === true) {
            allDates[1].tasks.push(this);
            console.log(allDates[1]);
        } else {
            console.log("This is way in the future!")
        }
    }

    noDuplicates(project) {

    function getIdArray(project) {
        const emptyArr = [];
        project.tasks.forEach(task => {
            emptyArr.push(task.id);
        });;
    
        console.log(emptyArr);
        return emptyArr;
    }

    const arr = getIdArray(project);
    const found = arr.find((task) => task.id === this.id);

    if (found) {
    console.log("This card already exists!");
    } else {
    this.createCard();
    }
    }
    
 }