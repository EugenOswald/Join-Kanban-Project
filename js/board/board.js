let importantTasks = [];
let soloTasksTodo = [];
let soloTasksProgress = [];
let soloTasksFeedback = [];
let soloTasksDone = [];
let currentDraggingElement;
let editNewPrio;
let editNewStatus;
let assignedPeople = [];
let selectedWorkers = [];
let selectedWorkersEmail = [];
let loggedUser = getArray("arrayOfactUser");
somethingGotDeleted = false;
let counterDeletedTasks = 0;

/**
 * Loads all Tasks und Users from Backendserver and checks if Board is renderable
 *
 */
async function loadInit() {
	await init();
	await checkIfBoardIsRenderable();
}

/**
 * If something is included in Taskarray the renderfunction starts
 *
 */
async function checkIfBoardIsRenderable() {
	if (tasks.length > 0) {
		await filterTasks();
		await renderBoard();
	}
}

/**
 * Render all Tasks by Status
 *
 */
async function renderBoard() {
	renderToDo();
	renderProgress();
	renderFeedback();
	renderDone();
}

/**
 * Render tasks with status todo in todo-container
 *
 */
function renderToDo() {
	let todoOutput = document.getElementById("category-todo");
	let todos = tasks.filter((status) => status.status == "To do");
	todoOutput.innerHTML = "";
	for (let i = 0; i < todos.length; i++) {
		const taskTodo = todos[i];
		todoOutput.innerHTML += templateOfNewTaskToDo(taskTodo, i);
		renderAssignedNamesOfTask(i, "todo", soloTasksTodo);
	}
}

/**
 * Render tasks with status in progress in progress-container
 *
 */
function renderProgress() {
	let inProgressOutput = document.getElementById("category-progress");
	let progress = tasks.filter((status) => status.status == "In progress");
	inProgressOutput.innerHTML = "";

	for (let j = 0; j < progress.length; j++) {
		const taskProgress = progress[j];
		inProgressOutput.innerHTML += templateOfTaskInProgress(taskProgress, j);
		renderAssignedNamesOfTask(j, "progress", soloTasksProgress);
	}
}

/**
 * Render tasks with status awaiting feedback in feedback-container
 *
 */
function renderFeedback() {
	let feedbackOutput = document.getElementById("category-feedback");
	let feedback = tasks.filter((status) => status.status == "Awaiting feedback");
	feedbackOutput.innerHTML = "";

	for (let k = 0; k < feedback.length; k++) {
		const taskFeedback = feedback[k];
		feedbackOutput.innerHTML += templateOfTaskFeedback(taskFeedback, k);
		renderAssignedNamesOfTask(k, "feedback", soloTasksFeedback);
	}
}

/**
 * Render tasks with status done in done-container
 *
 */
function renderDone() {
	let doneOutput = document.getElementById("category-done");
	let doneTasks = tasks.filter((status) => status.status == "Done");
	doneOutput.innerHTML = "";

	for (let l = 0; l < doneTasks.length; l++) {
		const taskDone = doneTasks[l];
		doneOutput.innerHTML += templateOfTaskDone(taskDone, l);
		renderAssignedNamesOfTask(l, "done", soloTasksDone);
	}
}

/**
 * This function render the peoples who work on this task
 *
 * @param {Number} index - this is the index of current task
 * @param {string} status - status means in which current status the task is
 * @param {array} soloStatusArray  - in this array are all tasks filtered by there status
 */
function renderAssignedNamesOfTask(index, status, soloStatusArray) {
	let renderOutputContainer = document.getElementById(`solo-worker-${status}${index}`);
	renderOutputContainer.innerHTML = "";
	if (typeof soloStatusArray[index] !== "undefined") {
		for (let x = 0; x < soloStatusArray[index].assignedTo.length; x++) {
			let assUser = soloStatusArray[index].assignedTo[x];
			let user = getUserAsObject(assUser);
			if (soloStatusArray[index].assignedTo.length <= 3) {
				try {
					renderOutputContainer.innerHTML += templateAssignedToOfSoloTask(
						user.name.charAt(0),
						user.surname.charAt(0),
						user.color
					);
				} catch (e) {
					renderOutputContainer.innerHTML += templateAssignedToOfSoloTask(
						loggedUser.name.charAt(0),
						loggedUser.surname.charAt(0),
						loggedUser.color
					);
				}
			} else {
				sliceArrayAndShowPlusMark(renderOutputContainer, index, soloStatusArray);
			}
		}
	}
}

/**
 * This function runs when an task have more than 3 workers and shows an plus sign
 *
 * @param {string} outputContainer - this is the container where all workers get rendered in
 * @param {number} index - this is the index of task
 * @param {array} soloStatusArray -  this is an filtered array which means in which status the task is
 */
function sliceArrayAndShowPlusMark(outputContainer, index, taskArray) {
	let array = taskArray;
	let amountAssignedWorker = array[index].assignedTo.length - 3;
	let shortArrayWorkers = array[index].assignedTo.slice(0, 3);
	outputContainer.innerHTML = "";

	for (let x = 0; x < shortArrayWorkers.length; x++) {
		let assUser = shortArrayWorkers[x];
		let user = getUserAsObject(assUser);
		try {
			outputContainer.innerHTML += templateAssignedToOfSoloTask(user.name.charAt(0), user.surname.charAt(0), user.color);
		} catch (e) {
			outputContainer.innerHTML += templateAssignedToOfSoloTask(
				loggedUser.name.charAt(0),
				loggedUser.surname.charAt(0),
				loggedUser.color
			);
		}
	}

	outputContainer.innerHTML += showPlusSign(amountAssignedWorker);
}

/**
 * This function filter all tasks by there status and put them in an seperate array
 *
 */
async function filterTasks() {
	importantTasks = tasks.filter((priority) => priority.priority == "Urgent"); // All important Tasks
	soloTasksTodo = tasks.filter((status) => status.status == "To do"); // All tasks todo
	soloTasksProgress = tasks.filter((status) => status.status == "In progress"); // All tasks in progress
	soloTasksFeedback = tasks.filter((status) => status.status == "Awaiting feedback"); // All tasks feedback
	soloTasksDone = tasks.filter((status) => status.status == "Done"); // All tasks done
}

/**
 * This function open the clicked task in a bigger window
 *
 * @param {number} indexOfSoloTask - this in the index of clicked task
 * @param {string} statusTask - this string means in which status the clicked task is
 * @param {hex} categorycolor - this is the color-hex-code of headline-background-color on bigger window
 */
function openCurrentTaskBigBox(indexOfSoloTask, statusTask, categorycolor) {
	let bigBoxContainer = document.getElementById("main-bigbox-solo-task-container");
	bigBoxContainer.innerHTML = "";
	addOpacityToMainBackground();
	backgroundIsUnclickable();
	removeDisplayNoneMainContainer(bigBoxContainer);
	checkStatusOfTask(statusTask, bigBoxContainer, indexOfSoloTask);
	checkPriorityBackgroundColor();
	checkHeadlineColorBigBox(categorycolor);
}

/**
 * This function checks which status the clicked task is and opens the clicked task in bigger window and runs the HTML Template
 *
 * @param {string} statusTask - this string means in which status the task is
 * @param {id} bigBoxContainer - this is the main container where the bigger window pops up
 * @param {number} indexOfSoloTask - this is the index of clicked task
 */
function checkStatusOfTask(statusTask, bigBoxContainer, indexOfSoloTask) {
	if (statusTask == "to do") {
		bigBoxContainer.innerHTML = templateBigBoxSoloTask(soloTasksTodo, indexOfSoloTask);
	} else {
		if (statusTask == "in progress") {
			bigBoxContainer.innerHTML = templateBigBoxSoloTask(soloTasksProgress, indexOfSoloTask);
		} else {
			if (statusTask == "awaiting feedback") {
				bigBoxContainer.innerHTML = templateBigBoxSoloTask(soloTasksFeedback, indexOfSoloTask);
			} else {
				if (statusTask == "done") {
					bigBoxContainer.innerHTML = templateBigBoxSoloTask(soloTasksDone, indexOfSoloTask);
				}
			}
		}
	}
}

/**
 * This function render the people who works on the clicked task in bigger window
 *
 * @param {number} indexOfTask - this is the index of clicked task
 * @param {string} statusOfTask - this string means in which status the clicked task is
 */
function showCurrentWorkersBigBox(indexOfTask, statusOfTask) {
	if (statusOfTask == "todo") {
		renderCurrentWorkersBigBox(indexOfTask, soloTasksTodo);
	}
	if (statusOfTask == "progress") {
		renderCurrentWorkersBigBox(indexOfTask, soloTasksProgress);
	}
	if (statusOfTask == "feedback") {
		renderCurrentWorkersBigBox(indexOfTask, soloTasksFeedback);
	}
	if (statusOfTask == "done") {
		renderCurrentWorkersBigBox(indexOfTask, soloTasksDone);
	}
}

/**
 * This function renders the people who works on the clicked task in bigger window and runs the HTML Template
 *
 * @param {number} indexOfTask - this is the index of clicked task
 * @param {array} statusTasksArray - this is a filtered array by taskstatus
 */
function renderCurrentWorkersBigBox(indexOfTask, statusTasksArray) {
	let currentTaskWorkers = document.getElementById(`current-workers`);
	currentTaskWorkers.innerHTML = "";
	for (let x = 0; x < statusTasksArray[indexOfTask].assignedTo.length; x++) {
		let assUser = statusTasksArray[indexOfTask].assignedTo[x];
		let user = getUserAsObject(assUser);
		try {
			currentTaskWorkers.innerHTML += templateCurrentWorkersOfTasksBigBox(user.name, user.surname, user.name, user.color);
		} catch (e) {
			currentTaskWorkers.innerHTML += templateCurrentWorkersOfTasksBigBox(
				loggedUser.name,
				loggedUser.surname,
				loggedUser.name,
				loggedUser.color
			);
		}
	}
}

/**
 * This function add the hex color code from task array (categorycolor) to the headline background when user opens the clicked task in bigger window
 *
 * @param {hex} categorycolor
 */
function checkHeadlineColorBigBox(categorycolor) {
	let bigBoxHeadlineContainer = document.getElementById("big-box-task-headline");
	bigBoxHeadlineContainer.style = `background:${categorycolor}`;
}

/**
 * This function runs when user clicked a task to open in bigger window and checks in which prio the task is and add the suitable color to the background of prio container
 *
 */
function checkPriorityBackgroundColor() {
	let prioBackgroundColor = document.getElementById("priority-big-box-color");

	if (prioBackgroundColor.innerHTML == "Urgent") {
		prioBackgroundColor.style.background = "#ff5520";
	}
	if (prioBackgroundColor.innerHTML == "Low") {
		prioBackgroundColor.style.background = "#7ae229";
	}
	if (prioBackgroundColor.innerHTML == "Medium") {
		prioBackgroundColor.style.background = "#ffc85f";
	}
}

/**
 * This function close the bigger window pop up when the user open it
 *
 */
function closeSoloTaskBigBox() {
	let bigBoxContainer = document.getElementById("main-bigbox-solo-task-container");
	addDisplayNoneMainContainer(bigBoxContainer);
	setOpacityBackgroundToNormal();
	removeUnclickableBackground();
}

/**
 * This function open the searched task in bigger window and adds some CSS to background
 *
 * @param {number} indexOfSoloTask - this is the index of searched task
 * @param {string} statusTask - this string means in which status the searched task is
 * @param {hex} categorycolor - this is the hex-color-code for the headline-background-color of search task
 */
function openCurrentTaskBigBoxOnSearch(indexOfSoloTask, statusTask, categorycolor) {
	let bigBoxContainer = document.getElementById("main-bigbox-solo-task-container");
	bigBoxContainer.innerHTML = "";
	addOpacityToMainBackground();
	backgroundIsUnclickable();
	removeDisplayNoneMainContainer(bigBoxContainer);
	checkStatusOfTaskOnSearch(bigBoxContainer, indexOfSoloTask);
	checkPriorityBackgroundColor();
	checkHeadlineColorBigBox(categorycolor);
	renderCurrentWorkersBigBoxSearch(indexOfSoloTask);
}

/**
 * This function renders the current workers of task after clicked on a task to open the bigger window
 *
 * @param {number} indexOfTask - this is the index of clicked task
 */
function renderCurrentWorkersBigBoxSearch(indexOfTask) {
	let currentTaskWorkers = document.getElementById(`current-workers`);
	currentTaskWorkers.innerHTML = "";
	for (let x = 0; x < tasks[indexOfTask].assignedTo.length; x++) {
		let assUser = tasks[indexOfTask].assignedTo[x];
		let user = getUserAsObject(assUser);
		try {
			currentTaskWorkers.innerHTML += templateCurrentWorkersOfTasksBigBox(user.name, user.surname, user.name, user.color);
		} catch (e) {
			currentTaskWorkers.innerHTML += templateCurrentWorkersOfTasksBigBox(
				loggedUser.name,
				loggedUser.surname,
				loggedUser.name,
				loggedUser.color
			);
		}
	}
}

/**
 * This function opnes the clicked Task in a bigger pop op window and runs the template function
 *
 * @param {id} bigBoxContainer  - this is the container where the search task can be open in bigger window
 * @param {number} indexOfSoloTask - this is the index of searched task
 */
function checkStatusOfTaskOnSearch(bigBoxContainer, indexOfSoloTask) {
	bigBoxContainer.innerHTML = templateBigBoxSoloTask(tasks, indexOfSoloTask);
}

/**
 * This function gets the user value of the inputfield and iterate the task array after that the function "checkTermsOfSearch" runs
 *
 * @param {string} idOfInputfield - This is the id of the search - inputfield
 */
function searchTask(idOfInputfield) {
	let userSearch = document.getElementById(`${idOfInputfield}`).value.toLowerCase();

	if (!userSearch.length == 0) {
		for (let m = 0; m < tasks.length; m++) {
			const taskSearch = tasks[m];
			checkTermsOfSearch(userSearch, m, taskSearch);
		}
	} else {
		renderBoard();
	}
}

/**
 * This function runs the searchTask Function by pressing the Enter button
 *
 * @param {id} idOfSearchContainer - this is the search-container that getting clicked when user press enter
 */
function enterEventSearchTask(idOfSearchContainer) {
	if (event.key === "Enter") {
		document.getElementById(`${idOfSearchContainer}`).click();
	}
}

/**
 * This function checks if the user search value is including in tasks title and searchs in every status container
 *
 * @param {string} userSearch - this is the uservalue of search inputfield
 * @param {number} m - this is the index of available tasks
 * @param {object} taskSearch - this is a solo object of tasks
 */
function checkTermsOfSearch(userSearch, m, taskSearch) {
	if (taskSearch.title.toLowerCase().includes(userSearch)) {
		searchInToDoContainer(taskSearch, m);
		seachInProgressContainer(taskSearch, m);
		seachInFeedbackContainer(taskSearch, m);
		searchInDoneContainer(taskSearch, m);
	}
}
