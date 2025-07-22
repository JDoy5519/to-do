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
        const titleLabel = document.createElement('label');
        titleLabel.classList.add('view-label');
        titleLabel.textContent = 'Title:';
        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.value = this.title;
        titleInput.style.width = '100%';

        modalContentElem.append(titleLabel, titleInput);

        //create and append the task description
        const descLabel = document.createElement('label');
        descLabel.classList.add('view-label');
        descLabel.textContent = 'Description:';
        const descInput = document.createElement('textarea');
        descInput.value = this.description;
        descInput.rows = 2;
        descInput.style.width = '100%';

        modalContentElem.append(descLabel, descInput);

        //create and append the task due date
        const dateLabel = document.createElement('label');
        dateLabel.classList.add('view-label');
        dateLabel.textContent = 'Due Date:';
        const dateInput = document.createElement('input');
        dateInput.type = 'date';
        dateInput.value = this.dueDate;
        dateInput.style.width = '100%';

        modalContentElem.append(dateLabel, dateInput);

        //create and append the task priority
        const priorityLabel = document.createElement('label');
        priorityLabel.classList.add('view-label');
        priorityLabel.textContent = 'Priority:';
        const priorityInput = document.createElement('select');
        priorityInput.style.width = '100%';
        ['!', '!!', '!!!'].forEach(val => {
            const opt = document.createElement('option');
            opt.value = val;
            opt.textContent = val === '!' ? 'Low' : val === '!!' ? 'Medium' : 'High';
            if (this.priority === val) opt.selected = true;
            priorityInput.appendChild(opt);
        });

        modalContentElem.append(priorityLabel, priorityInput);

        //create and append the task project
        const projectLabel = document.createElement('label');
        projectLabel.classList.add('view-label');
        projectLabel.textContent = 'Project:';

        const projectSelect = document.createElement('select');
        projectSelect.style.width = '100%';
        projectSelect.classList.add('project-select');

        // Populate dropdown from allProjects
        allProjects.forEach(project => {
            const option = document.createElement('option');
            option.value = project.title;
            option.textContent = project.title;
            if (project.title === this.project) {
                option.selected = true; 
            }
            projectSelect.appendChild(option);
        });

        modalContentElem.append(projectLabel, projectSelect);



        //create and append the task id
        const idDisplay = document.createElement('div');
        idDisplay.classList.add('view-id');
        idDisplay.style.marginTop = '1rem';
        const idLabel = document.createElement('strong');
        idLabel.classList.add('view-label');
        idLabel.textContent = 'Unique Task ID: ';
        const idText = document.createElement('span');
        idText.textContent = this.id;
        idDisplay.append(idLabel, idText);
        modalContentElem.appendChild(idDisplay);

        //create button container
        const buttonWrap = document.createElement('div');
        buttonWrap.style.display = 'flex';
        buttonWrap.style.justifyContent = 'flex-end';
        buttonWrap.style.gap = '1rem';
        buttonWrap.style.marginTop = '2rem';

        //create save button
        const saveButton = document.createElement('button');
        saveButton.classList.add('view-save-btn');
        saveButton.textContent = 'Save';
        saveButton.addEventListener('click', () => {
            const oldProjectTitle = this.project; 

            this.title = titleInput.value.trim();
            this.description = descInput.value.trim();
            this.dueDate = dateInput.value;
            this.priority = priorityInput.value;
            this.project = projectSelect.value;

            
            if (this.project !== oldProjectTitle) {
                const oldProject = allProjects.find(p => p.title === oldProjectTitle);
                const newProject = allProjects.find(p => p.title === this.project);

                if (oldProject && newProject) {
                    oldProject.tasks = oldProject.tasks.filter(task => task.id !== this.id);
                    newProject.tasks.push(this);
                }
            }

            const existingCard = document.getElementById(this.id);
            if (existingCard) {
                existingCard.remove(); 
                this.createCard();     
            }
            
            this.modalElem.classList.remove('open');
            setTimeout(() => {
                this.modalElem.remove();
            }, 300);
        });

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

        buttonWrap.append(closeButton, saveButton);
        modalContentElem.appendChild(buttonWrap);

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