import logoImg from "./images/logo.png";

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
  `;

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
  const myCourse = document.createElement('div');
  myCourse.textContent = "My Courses +";
  sidebarDiv.appendChild(sidebar);
  sidebar.append(myScorecard, roundToday, roundWeek, myCourse);


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