import logoImg from "./images/logo.png";
import { allProjects } from ".";
import { allDates } from ".";
import Project from "./project";


export default function taskPage() {
  const contentHolder = document.querySelector('#content');
  if (!contentHolder) return;

  const topDiv = document.createElement('div');
  topDiv.className = 'top-div-container';
 
  const logoRow = document.createElement('div');
  logoRow.className = 'top-left-logo';

  const img = document.createElement('img');
  img.src = logoImg;
  img.alt = 'Onda Logo';
  img.className = 'logo-img';

  const title = document.createElement('h1');
  title.className = 'onda-title';
  title.textContent = 'Onda';

  const secondaryTitle = document.createElement('div');
  secondaryTitle.id = 'secondaryTitle';
  secondaryTitle.textContent = 'Dashboard';

  logoRow.appendChild(img);
  logoRow.appendChild(title);
  topDiv.appendChild(logoRow);
  topDiv.appendChild(secondaryTitle);

  const bottomDiv = document.createElement('div');
  bottomDiv.className = 'bottom-div-container';

  //onclick for existing sidebar elements
  function appendDates(project) {
    const found = allDates.find((date) => date.title === project);
    console.log(found.tasks);
    const cardContainer = document.querySelector('#cardHolder');
    cardContainer.innerHTML = '';
    found.tasks.forEach(task => task.createCard());
    const title = document.querySelector('#secondaryTitle');
    title.textContent = `${project}`;
  }

  //creating and appending sections to the sidebar
  const sidebarDiv = document.createElement('div');
  sidebarDiv.className = 'bottom-div';
  sidebarDiv.id = 'sidebar'
  const sidebar = document.createElement('div');
  sidebar.className = 'sidebar-holder';
  const dashboard = document.createElement('div');
  dashboard.textContent = "Dashboard";
  dashboard.addEventListener('click', () => {
      appendDates("Dashboard");
    })
  const today = document.createElement('div');
  today.textContent = "Today";
  today.addEventListener('click', () => {
      appendDates("Today");
    })
  const thisWeek = document.createElement('div');
  thisWeek.textContent = "This Week";
  thisWeek.addEventListener('click', () => {
      appendDates("This Week");
    })

  //newProject behaviour
  const newProject = document.createElement('div');
  newProject.id = 'create'
  newProject.textContent = 'New Project'
  

  //create container to store the form to create a new project
  const formContainer = document.createElement('div');
  formContainer.setAttribute('class', 'form-container');
  formContainer.id = 'formContainer';

  //build the form input to append to the container
  const projectInput = document.createElement('input');
  projectInput.id = 'projectInput'
  projectInput.type = 'text';
  projectInput.placeholder = 'New project name';


  //build the buttons for submit/close and their functionality
  const buttonHolder = document.createElement('div');
  buttonHolder.id = 'buttonHolder';

  const submitButton = document.createElement('button');
  const closeButton = document.createElement('button');

  submitButton.innerText = 'Submit';
  closeButton.innerText = 'Close';

  buttonHolder.append(submitButton, closeButton);
  formContainer.append(projectInput, buttonHolder);

  //function to be reused onclick for newly created projects
  function appendTasks(project) {
    const found = allProjects.find((proj) => proj.title === project);
    console.log(found.tasks);
    const cardContainer = document.querySelector('#cardHolder');
    cardContainer.innerHTML = '';
    found.tasks.forEach(task => task.createCard());
    const title = document.querySelector('#secondaryTitle');
    title.textContent = `${project}`;
  }

  //eventListeners for the buttons to open/close the form
  newProject.addEventListener('click', () => {
    formContainer.classList.add('active');
  })

  closeButton.addEventListener('click', () => {
    formContainer.classList.remove('active');
  })

  submitButton.addEventListener('click', () => {
    let projectUserInput = projectInput.value;
    console.log(projectUserInput);
    const userProject = new Project(projectUserInput);
    console.log(userProject);
    userProject.addToLargeArray(allProjects);
    console.log(allProjects);

    formContainer.classList.remove('active');
    projectInput.value = '';

    let projectListElem = document.createElement('div');
    projectListElem.textContent = projectUserInput;
    projectListElem.addEventListener('click', () => {
      appendTasks(projectUserInput);
    })
    projectListElem.classList.add('project-item');
    projectContainer.append(projectListElem);
  })

  formContainer.append(projectInput, buttonHolder)

  //myCourse behaviour
  const myProjects = document.createElement('div');
  myProjects.id = 'toggle';
  myProjects.textContent = "View Projects +";
  myProjects.addEventListener('click', () => {
    projectContainer.classList.toggle('active');
  })

  document.addEventListener('click', (event) => {
    if(event.target.id != 'toggle') {
      projectContainer.classList.remove('active');
    }
  })

  //create container to store all projects
  const projectContainer = document.createElement('div');
  projectContainer.setAttribute('class', 'project-list');
  const projects = allProjects.map(project => project.title);
  console.log(projects);

  //loop to give all original sidebar content an onclick function  
  projects.forEach(project => {
    let projectListElem = document.createElement('div');
    projectListElem.textContent = `${project}`;
    projectListElem.classList.add('project-item');
    projectListElem.addEventListener('click', () => {
      appendTasks(project);
    })
    projectContainer.append(projectListElem);
  
  });

  

  //append all to sidebar
  sidebarDiv.appendChild(sidebar);
  sidebar.append(dashboard, today, thisWeek, newProject, myProjects, projectContainer);
  sidebar.insertBefore(formContainer, sidebar.children[4]);

  

  //main tasks area
  const mainDiv = document.createElement('div');
  mainDiv.className = 'bottom-div';
  mainDiv.id = 'main';
  const taskHolder = document.createElement('div');
  taskHolder.id = 'tasks';
  const addTask = document.createElement('div');
  addTask.className = 'task'
  addTask.id = 'task';
  addTask.textContent = 'Add a task +'
  const cardHolder = document.createElement('div');
  cardHolder.className = 'card-holder';
  cardHolder.id = 'cardHolder';


  taskHolder.append(addTask, cardHolder);
  mainDiv.appendChild(taskHolder);

  bottomDiv.append(sidebarDiv, mainDiv);
  contentHolder.append(topDiv, bottomDiv);
}