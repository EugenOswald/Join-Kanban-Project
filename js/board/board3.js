/**
 * This function submits also the checkbox when user clicks on the parents container, same the other way (unsubmit)
 *
 * @param {number} idOfCheckbox - this is the index of checkbox by choosing new possible workers
 */
function submitCheckbox(idOfCheckbox) {
	let clickedCheckbox = document.getElementById(`checkbox-${idOfCheckbox}`);

	if (clickedCheckbox.checked == false) {
		clickedCheckbox.checked = true;
		checkIfWorkerIsPushable(idOfCheckbox);
	} else {
		checkIfWorkerIsRemoveable(idOfCheckbox);
		clickedCheckbox.checked = false;
	}
	checkValidatorCheckboxes();
}

/**
 * This function checks if choosen new worker is already in selectedWorkers array and pushs the new worker to array
 *
 * @param {number} id - index of user
 */
function checkIfWorkerIsPushable(id) {
	if (!selectedWorkers.includes(users[id]) && id >= 0) {
		selectedWorkers.push(users[id]);
		selectedWorkersEmail.push(users[id].email);
	}
	if (id == "-1") {
		if (!selectedWorkers.includes(loggedUser)) {
			selectedWorkers.push(loggedUser);
			selectedWorkersEmail.push(loggedUser.email);
		}
	}
	renderWorkerLetterContainerBoard();
}

function renderWorkerLetterContainerBoard() {
	let workerContainerLetterBoard = document.getElementById("workerContainerLetterBoard");
	workerContainerLetterBoard.innerHTML = "";
	for (let index = 0; index < selectedWorkers.length; index++) {
		let [first, last] = selectedWorkers[index].name.split(" ");
		let fL = first.match(/\b(\w)/g).join("");
		if (last == undefined) {
			last = "Undefined";
		}
		let lL = last.match(/\b(\w)/g).join("");

		workerContainerLetterBoard.innerHTML += workerLetterContainerBoardHTML(fL, lL, selectedWorkers[index].color);
	}
}

/**
 * This function checks if choosen new worker is already in selectedWorkers array and splices the selected user from array
 *
 * @param {number} id - index of user
 */
function checkIfWorkerIsRemoveable(id) {
	for (let p = 0; p < selectedWorkers.length; p++) {
		if (selectedWorkers[p] === users[id]) {
			selectedWorkers.splice(p, 1);
			selectedWorkersEmail.splice(p, 1);
		}
		if (selectedWorkers[p] == loggedUser) {
			selectedWorkers.splice(p, 1);
			selectedWorkersEmail.splice(p, 1);
		}
	}
	renderWorkerLetterContainerBoard();
}

/**
 * This function runs the form validation for the checkboxes so atleast one checkbox has to be clicked
 *
 */
function checkValidatorCheckboxes() {
	let checkboxAssignedTo = document.getElementById("checkCheckboxes");
	let checkboxes = document.querySelectorAll('input[type="checkbox"]');
	let checkedOne = Array.prototype.slice.call(checkboxes).some((x) => x.checked);

	if (checkedOne == false) {
		checkboxAssignedTo.required = true;
	}
	if (checkedOne == true) {
		checkboxAssignedTo.required = false;
	}
}

/**
 * This function shows all possible workers in edit task overview, the user whos logged in gets removed from the list and is saved in "You" option
 *
 */
function showAllPossibleWorkers() {
	let outputContainer = document.getElementById("edit-workers");
	for (let o = 0; o < users.length; o++) {
		const singleUserName = users[o].name;
		if (!loggedUser.name.includes(singleUserName)) {
			outputContainer.innerHTML += templateShowAllWorkers(o, singleUserName);
		}
	}
}

/**
 * This function clears the placeholder from the inputfields in edit task overview by clicking and shows the needed information also as placeholder
 *
 * @param {string} inputfield - this string means the id of the inputfield in task overview
 * @param {string} newPlaceholder - this string is the new placeholder by clicking in the inputfield
 * @param {string} oldPlaceholder - this string is the default placeholder by clicking the inputfield again
 */
function clearPlaceholder(inputfield, newPlaceholder, oldPlaceholder) {
	let currentPlaceholder = document.getElementById(`edit-${inputfield}`).placeholder;
	if (currentPlaceholder == oldPlaceholder) {
		document.getElementById(`edit-${inputfield}`).placeholder = `${newPlaceholder}`;
	}
	if (currentPlaceholder == newPlaceholder) {
		document.getElementById(`edit-${inputfield}`).placeholder = `${oldPlaceholder}`;
	}
}

/**
 * This function update the task array after submit the change button in edit task overview
 *
 * @param {number} taskId - index of current task
 * @param {string} title - new task title
 * @param {string} description - new task description
 * @param {date} date - new task date
 * @param {string} prio - new task prio
 */
async function updateTaskArray(taskId, title, description, date, prio) {
	let object = tasks[taskId];
	object["title"] = title;
	object["description"] = description;
	object["dueDate"] = date;
	object["priority"] = prio;
	object["assignedTo"] = selectedWorkersEmail;
	await changeTask(object);
	renderBoard();
	closeEditContainer();
	showAlert("succes-alert");
}

/**
 * This function shows a succes alert after succesfully editing a task and runs the hide alert function after 3 seconds
 *
 */
function showAlert(idOfAlert) {
	document.getElementById("background-alert").classList.remove("d-none");
	document.getElementById(`${idOfAlert}`).classList.remove("d-none");
	setTimeout(function () {
		hideAlert(idOfAlert);
	}, 2000);
}

/**
 * This function hide the succes alert
 *
 */
function hideAlert(idOfAlert) {
	document.getElementById(`${idOfAlert}`).classList.add("d-none");
	document.getElementById("background-alert").classList.add("d-none");
}

/**
 * Here is it possible to add an task in the board.html
 *
 */
function addTaskBoard() {
	let addTaskContainer = document.getElementById("main-add-task-container");
	removeDisplayNoneMainContainer(addTaskContainer);
}

/**
 * This function close the add task container
 *
 */
function closeAddTaskContainer() {
	let addTaskContainer = document.getElementById("main-add-task-container");
	addDisplayNoneMainContainer(addTaskContainer);
}

/**
 * This function makes the background of container blue
 *
 * @param {id} container - id of container which is going to be blue
 */
function makeContainerBlue(container) {
	container.style.background = "#29ABE2";
}

/**
 * This function removes the backgroundcolor blue of container
 *
 * @param {id} container - id of container which backgroundcolor should be removed
 */
function removeContainerColorBlue(container) {
	container.style.background = "#2a3647";
}

/**
 * This function changes the color of image to white
 *
 * @param {id} image - this is the id of image which is going the get a new color to white
 */
function makeImgWhite(image) {
	image.style.filter = "filter: brightness(0) invert(1)";
}

/**
 * This function set image color to default
 *
 * @param {id} image - this is the id of image which get default color again
 */
function makeImageColorDefault(image) {
	image.style.filter = "filter: brightness(0) invert(1)";
}

/**
 * This function adds opacity to background when clicked task is open in bigger window
 *
 */
function addOpacityToMainBackground() {
	document.getElementById("main-board-container").style.opacity = "0.6";
}

/**
 * This function makes the background unclickable when clicked task is open in bigger window
 *
 */
function backgroundIsUnclickable() {
	document.getElementById("main-board-container").style.pointerEvents = "none";
}

/**
 * This function sets the background opacity to default wehen user close the bigger window pop up by clicking on an task
 *
 */
function setOpacityBackgroundToNormal() {
	document.getElementById("main-board-container").style.opacity = "1.0";
}

/**
 * This function makes the background clickable again wehen user close the bigger window pop up by clicking on an task
 *
 */
function removeUnclickableBackground() {
	document.getElementById("main-board-container").style.pointerEvents = "all";
}

/**
 * This function removes the CSS style "display:none" when user click on task
 *
 * @param {string} bigBoxContainer - this is the bigger window pop up when user clicks on task
 */
function removeDisplayNoneMainContainer(bigBoxContainer) {
	bigBoxContainer.classList.remove("d-none");
}

/**
 * This function adds the CSS style "display:flex" when user close the bigger window pop up
 *
 * @param {string} bigBoxContainer - this is the bigger window pop up when user clicks on task
 */
function addDisplayNoneMainContainer(bigBoxContainer) {
	bigBoxContainer.classList.add("d-none");
}

/**
 * This function stops Progagation when user click on background
 *
 * @param {event} event - adds default stopProgagation function
 */
function doNotClose(event) {
	event.stopPropagation();
}

/**
 * This function deletes a task by clicking on the basket button and updates the task array
 *
 * @param {number} idOfCurrentTask - index of clicked task
 */
async function deleteCurrentTask(idOfCurrentTask) {
	for (let i = 0; i < tasks.length; i++) {
		if (tasks[i].id === idOfCurrentTask) {
			closeSoloTaskBigBox(idOfCurrentTask);
			tasks.splice(i, 1);
			showAlert("delete-alert");
			await backendTWO.setItem("tasks", JSON.stringify(tasks));
			counterDeletedTasks++;
			somethingGotDeleted = true;
			minusTasksId();
			await filterTasks();
			await renderBoard();
		}
	}
}
function minusTasksId() {
	for (let index = 0; index < tasks.length; index++) {
		let id = tasks[index].id;
		id -= 1;
		tasks[index].id = id;
	}
}

/**
 * This function highlights the new clicked status Container
 *
 * @param {number} indexOfContainer - index of clicked container whats going to be highlighted
 */
function highlightStatusContainer(indexOfContainer) {
	let container = document.getElementById(`newStatus${indexOfContainer}`);
	container.classList.toggle("new-status-highlight");
}

/**
 * This function removes the highlight of an container when the user clicks on other container
 *
 * @param {number} otherStatusOne - first container whichs loses the style highlight
 * @param {number} otherStatusTwo - second container whichs loses the style highlight
 * @param {number} otherStatusThree - third container whichs loses the style highlight
 */
function hideHiglightStatusContainer(otherStatusOne, otherStatusTwo, otherStatusThree) {
	let otherContainerOne = document.getElementById(`newStatus${otherStatusOne}`);
	let otherContainerTwo = document.getElementById(`newStatus${otherStatusTwo}`);
	let otherContainerThree = document.getElementById(`newStatus${otherStatusThree}`);
	otherContainerOne.classList.remove("new-status-highlight");
	otherContainerTwo.classList.remove("new-status-highlight");
	otherContainerThree.classList.remove("new-status-highlight");
}

/**
 * This function change the status of an task
 *
 * @param {number} idOfCurrentTask - id of the task which is becoming a new status
 * @param {string} newStautsOfTask - this is the new status of the task
 */
function editStatusOfTask(idOfCurrentTask, newStatusOfTask) {
	editNewStatus = newStatusOfTask;
	tasks[idOfCurrentTask].status = newStatusOfTask;
}
