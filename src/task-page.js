import logoImg from "./images/logo.png";
import { allProjects } from ".";
import { allDates } from ".";

export default function taskPage() {
  const contentHolder = document.querySelector('#content');
  if (!contentHolder) return;

  const topDiv = document.createElement('div');
  topDiv.className = 'top-div-container';

  const bottomDiv = document.createElement('div');
  bottomDiv.className = 'bottom-div-container';

  const logoDiv = document.createElement('div');
  logoDiv.className = 'top-div';
  logoDiv.id = 'logo'

  const img = document.createElement('img');
  img.src = logoImg;
  img.alt = 'Logo';
  img.className = 'logo-img';

  logoDiv.appendChild(img);

  const titleDiv = document.createElement('div');
  titleDiv.className = 'top-div';
  titleDiv.innerHTML = `
    <h1>The Caddy</h1>
    <h3>Your digital task assistant</h3>
    <h2>My Scorecard</h2>
  `;

  //creating and appending sections to the sidebar
  const sidebarDiv = document.createElement('div');
  sidebarDiv.className = 'bottom-div';
  sidebarDiv.id = 'sidebar'
  const sidebar = document.createElement('div');
  sidebar.className = 'sidebar-holder';
  const myScorecard = document.createElement('div');
  myScorecard.textContent = "My Scorecard";
  const roundToday = document.createElement('div');
  roundToday.textContent = "Today's Round";
  const roundWeek = document.createElement('div');
  roundWeek.textContent = "This Week's Round";

  //newCourse behaviour
  const newCourse = document.createElement('div');
  newCourse.id = 'create'
  newCourse.textContent = 'Create a Course'
  newCourse.addEventListener('click', () => {
    formContainer.classList.toggle('active');
  })

  document.addEventListener('click', (event) => {
    if(event.target.id != 'create') {
      formContainer.classList.remove('active');
    }
  })

  //create container to store the form to create a new project
  const formContainer = document.createElement('div');
  formContainer.setAttribute('class', 'form-container');

  newCourse.append(formContainer);

  //build the form input to append to the container
  const projectInput = document.createElement('input');
  projectInput.id = 'projectInput'
  projectInput.type = 'text';
  projectInput.placeholder = 'Name your project'
  const inputLabel = document.createElement("label");
  inputLabel.setAttribute('for', 'projectInput');
  inputLabel.textContent = 'New project:';

  //build the buttons for submit/close and their functionality
  


  formContainer.append(inputLabel, projectInput)

  //myCourse behaviour
  const myCourse = document.createElement('div');
  myCourse.id = 'toggle';
  myCourse.textContent = "My Courses +";
  myCourse.addEventListener('click', () => {
    projectContainer.classList.toggle('active');
  })

  document.addEventListener('click', (event) => {
    if(event.target.id != 'toggle') {
      projectContainer.classList.remove('active');
    }
  })

  //append all to sidebar
  sidebarDiv.appendChild(sidebar);
  sidebar.append(myScorecard, roundToday, roundWeek, newCourse, myCourse);

  //create container to store all projects
  const projectContainer = document.createElement('div');
  projectContainer.setAttribute('class', 'project-list');
  const projects = allProjects.map(project => project.title);
  console.log(projects);

  //create button to bring up a different modal to create a new project
  const newProject = document.createElement('div');
  newProject.textContent = 'Add a new project +';
  projectContainer.append(newProject);
  projectContainer.addEventListener('click', () => {
    const newDiv = document.createElement('div');
    newDiv.id = ''
    newProject.append(newDiv);
  })
  

  projects.forEach(project => {
    let projectListElem = document.createElement('div');
    projectListElem.textContent = `${project}`;
    projectContainer.append(projectListElem);
    sidebar.append(projectContainer);
  });

  


  const mainDiv = document.createElement('div');
  mainDiv.className = 'bottom-div';
  mainDiv.id = 'main';
  const taskHolder = document.createElement('div');
  taskHolder.id = 'tasks';
  const addTask = document.createElement('div');
  addTask.className = 'task'
  addTask.id = 'task';
  addTask.textContent = 'Tee up a task +'
  const cardHolder = document.createElement('div');
  cardHolder.className = 'card-holder';
  cardHolder.id = 'cardHolder';


  topDiv.appendChild(logoDiv);
  topDiv.appendChild(titleDiv);
  bottomDiv.appendChild(sidebarDiv);
  bottomDiv.appendChild(mainDiv);
  mainDiv.appendChild(taskHolder);
  taskHolder.appendChild(addTask);
  taskHolder.appendChild(cardHolder);

  contentHolder.appendChild(topDiv);
  contentHolder.appendChild(bottomDiv);
}