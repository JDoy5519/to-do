import { allProjects } from ".";
import { allDates } from ".";
import Project from "./project";
import { isToday, isThisWeek } from "date-fns";
import removeParent from "./delete";
import completeTask from "./complete";

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

    viewModal() {
        //fluid creation and append for slightly opaque background
        this.modalElem = document.createElement('div');
        this.modalElem.classList.add('view-modal');
        setTimeout(() => {
            this.modalElem.classList.add('open');
        })

        //create the central modal
        const modalContentElem = document.createElement('div');
        modalContentElem.classList.add('view-content');
        modalContentElem.id = 'viewModal';

        this.modalElem.appendChild(modalContentElem);

        //create and append the title of the modal
        const titleTextElem = document.createElement('h1');
        titleTextElem.classList.add('view-title-text');
        titleTextElem.textContent = this.title;

        modalContentElem.appendChild(titleTextElem);

        //create and append the task description
        const description = document.createElement('div');
        description.classList.add('view-description');

        const descLabel = document.createElement('strong');
        descLabel.classList.add('view-label');
        descLabel.textContent = 'Description: ';

        const descText = document.createElement('span');
        descText.textContent = this.description;

        description.append(descLabel, descText);
        modalContentElem.appendChild(description);

        //create and append the task due date
        let date = this.dueDate;
        if (date) {
        const [year, month, day] = date.split("-");
        date = `${day}/${month}/${year}`;
        }

        const viewDate = document.createElement('div');
        viewDate.classList.add('view-date');

        const dateLabel = document.createElement('strong');
        dateLabel.classList.add('view-label');
        dateLabel.textContent = 'Due Date: ';

        const dateText = document.createElement('span');
        dateText.textContent = date;

        viewDate.append(dateLabel, dateText);
        modalContentElem.appendChild(viewDate);

        //create and append the task priority
        let taskPriority;
        if (this.priority === "!") {
        taskPriority = "Low";
        } else if (this.priority === "!!") {
        taskPriority = "Medium";
        } else {
        taskPriority = "High";
        }

        const viewPriority = document.createElement('div');
        viewPriority.classList.add('view-priority');

        const priorityLabel = document.createElement('strong');
        priorityLabel.classList.add('view-label');
        priorityLabel.textContent = 'Priority: ';

        const priorityText = document.createElement('span');
        priorityText.textContent = taskPriority;

        viewPriority.append(priorityLabel, priorityText);
        modalContentElem.appendChild(viewPriority);

        //create and append the task project
        const project = document.createElement('div');
        project.classList.add('view-project');

        const projectLabel = document.createElement('strong');
        projectLabel.classList.add('view-label');
        projectLabel.textContent = 'Project: ';

        const projectText = document.createElement('span');
        projectText.textContent = this.project;

        project.append(projectLabel, projectText);
        modalContentElem.appendChild(project);


        //create and append the task id
        const identification = document.createElement('div');
        identification.classList.add('view-id');

        const idLabel = document.createElement('strong');
        idLabel.classList.add('view-label');
        idLabel.textContent = 'Unique Task ID: ';

        const idText = document.createElement('span');
        idText.textContent = this.id;

        identification.append(idLabel, idText);
        modalContentElem.appendChild(identification);

        // Create and append close button
        const closeButton = document.createElement('button');
        closeButton.classList.add('view-close-btn');
        closeButton.textContent = 'Close';

        closeButton.addEventListener('click', () => {
            this.modalElem.classList.remove('open');
            setTimeout(() => {
                this.modalElem.remove();
            }, 300); // match CSS transition
        });

        modalContentElem.appendChild(closeButton);

        //append all elements to the DOM
        document.body.appendChild(this.modalElem);
    }

    createCard() {
        const card = document.createElement('div');
        card.className = 'card';
        card.id = this.id;

        const title = document.createElement('h2');
        title.textContent = this.title;
        title.className = 'task-title';

        const dueDate = document.createElement('span');
        let date = this.dueDate
        if (date) {
        const [year, month, day] = date.split("-");
        date = `${day}/${month}/${year}`;
        }
        dueDate.textContent = date;
        dueDate.className = 'task-title';

        const priority = document.createElement('div');
        priority.textContent = this.priority;
        priority.className = 'task-title';

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.id = 'dlt-button'
        deleteButton.addEventListener('click', () => {
            removeParent(deleteButton);
        })

        const completeButton = document.createElement("button");
        completeButton.textContent = "Complete";
        completeButton.id = 'cmplt-button'
        completeButton.addEventListener('click', () => {
            completeTask(completeButton);
        })

        const viewButton = document.createElement('button');
        viewButton.textContent = 'View';
        viewButton.addEventListener('click', () => {
            this.viewModal();
        })


        card.append(title, dueDate, priority, buttonContainer);
        buttonContainer.append(deleteButton, completeButton, viewButton);

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