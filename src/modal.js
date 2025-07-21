import userInput from "./user-input";
import { allProjects } from ".";
import { allDates } from ".";
import taskPage from "./task-page";


export default class Modal {
    constructor({
        titleText,
        labelText,
        descriptionText,
        dueDate,
        importance,
        project,
        submit
    }) {
        this.titleText = titleText;
        this.labelText = labelText;
        this.descriptionText = descriptionText;
        this.dueDate = dueDate;
        this.importance = importance;
        this.project = project;
        this.submit = submit;
    }

    close() {
        this.modalElem.classList.remove('open');
        this.modalElem.remove();
    };

    createAndOpen() {
        //fluid creation and append for slightly opaque background
        this.modalElem = document.createElement('div');
        this.modalElem.classList.add('modal');
        setTimeout(() => {
            this.modalElem.classList.add('open');
        })

        //create the central modal
        const modalContentElem = document.createElement('div');
        modalContentElem.classList.add('content');
        modalContentElem.id = 'modal';

        this.modalElem.appendChild(modalContentElem);

        //create and append the title of the modal
        const titleTextElem = document.createElement('h1');
        titleTextElem.classList.add('titleText');
        titleTextElem.textContent = this.titleText;

        modalContentElem.appendChild(titleTextElem);

        //create and append the input needed to get the task title
        const labelTextElem = document.createElement('input');
        labelTextElem.classList.add('labelText');
        labelTextElem.id = 'taskLabel'
        labelTextElem.type = "text";
        labelTextElem.placeholder = 'Your task'
        const labelLabel = document.createElement("label");
        labelLabel.setAttribute('for', 'taskLabel')
        labelLabel.textContent = this.labelText;

        const labelHolder = document.createElement('div');
        labelHolder.setAttribute('class', 'section-container');
        modalContentElem.appendChild(labelHolder);

        labelHolder.appendChild(labelLabel);
        labelHolder.appendChild(labelTextElem);
        
        //same as above for task description
        const descriptionTextElem = document.createElement('input');
        descriptionTextElem.classList.add('descriptionText');
        descriptionTextElem.id = 'taskDescription'
        descriptionTextElem.type = 'text';
        descriptionTextElem.placeholder = 'Describe your task'
        const descriptionLabel = document.createElement("label");
        descriptionLabel.setAttribute('for', 'taskDescription');
        descriptionLabel.textContent = this.descriptionText;

        const descriptionHolder = document.createElement('div');
        descriptionHolder.setAttribute('class', 'section-container');
        modalContentElem.appendChild(descriptionHolder);

        descriptionHolder.appendChild(descriptionLabel);
        descriptionHolder.appendChild(descriptionTextElem);

        //input type date for dueDate
        const dueDateElem = document.createElement('input');
        dueDateElem.classList.add('dueDate');
        dueDateElem.id = 'taskDueDate';
        dueDateElem.type = "date";
        const dateLabel = document.createElement("label");
        dateLabel.setAttribute('for', 'taskDueDate');
        dateLabel.textContent = this.dueDate;

        const dateHolder = document.createElement('div');
        dateHolder.setAttribute('class', 'section-container');
        modalContentElem.appendChild(dateHolder);

        dateHolder.appendChild(dateLabel);
        dateHolder.appendChild(dueDateElem);

        //radio for importance
        const options = ['Low', 'Medium', 'High'];
        const priorityLabel = document.createElement('div');
        priorityLabel.textContent = 'Priority:'
        const priorityHolder = document.createElement('div');
        priorityHolder.setAttribute('class', 'section-container');
        priorityHolder.id = 'priority';
        modalContentElem.appendChild(priorityHolder);
        priorityHolder.appendChild(priorityLabel);

        options.forEach((level, index) => {
            const label = document.createElement('label');
            label.textContent = level;
            
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'priority';
            radio.value = level.toLowerCase();
            radio.id = `priority-${index}`;

            label.setAttribute('for', radio.id);

            priorityHolder.appendChild(radio);
            priorityHolder.appendChild(label);
        })

        //dropdown to decide what project to allocate to
        const projects = allProjects.map(project => project.title);
        console.log(projects);
        const dataList = document.createElement("datalist");
        dataList.id = 'project-list';
        const input = document.createElement('input');
        const projectHolder = document.createElement('div');
        projectHolder.setAttribute('class', 'section-container');


        projects.forEach(project => {
            let option = document.createElement('option');
            option.value = project;
            dataList.appendChild(option);
        })

        const dataLabel = document.createElement('label');
        dataLabel.textContent = 'Project:'
        dataList.setAttribute('class', 'section-container');
        dataLabel.setAttribute('for', 'project-list');
        input.setAttribute('list', 'project-list');
        input.id = 'project';
        

        modalContentElem.appendChild(projectHolder);
        projectHolder.appendChild(dataLabel);
        projectHolder.appendChild(input);
        projectHolder.appendChild(dataList);



        const buttonHolder = document.createElement('div');
        modalContentElem.appendChild(buttonHolder);
        const submitElem = document.createElement('button');
        submitElem.classList.add('submit');
        submitElem.textContent = this.submit;
        submitElem.id = 'submit';
        const closeElem = document.createElement('button');
        closeElem.classList.add('submit');
        closeElem.textContent = 'Close';
        closeElem.id = 'close';

        closeElem.addEventListener('click', () => {
            this.close();
        } )

        submitElem.addEventListener('click', () => {
            userInput();
            this.close();
        })

        buttonHolder.appendChild(submitElem);
        buttonHolder.appendChild(closeElem);

        document.body.appendChild(this.modalElem);
    }

}