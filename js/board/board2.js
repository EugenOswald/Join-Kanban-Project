/**
 * This function shows the first letters of assigned workers names after search a task
 *
 * @param {array} objectOfSearchTask - this is the searched task as object
 */
function showAssingedToWorkersSearch(objectOfSearchTask) {
	let outputContainer = document.getElementById("solo-worker-search");
	outputContainer.innerHTML = "";

	for (let x = 0; x < objectOfSearchTask.assignedTo.length; x++) {
		let assUser = objectOfSearchTask.assignedTo[x];
		let user = getUserAsObject(assUser);
		let searchedTask = [objectOfSearchTask];
		let index = objectOfSearchTask.id;

		if (objectOfSearchTask.assignedTo.length <= 3) {
			try {
				outputContainer.innerHTML += templateAssignedToOfSoloTask(user.name.charAt(0), user.surname.charAt(0), user.color);
			} catch (e) {
				outputContainer.innerHTML += templateAssignedToOfSoloTask(
					loggedUser.name.charAt(0),
					loggedUser.surname.charAt(0),
					loggedUser.color
				);
			}
		} else {
			sliceArrayAndShowPlusMark(outputContainer, index, searchedTask);
		}
	}
}

/**
 * This function checks if the searched task is in the "todo" container
 *
 * @param {object} taskSearch - this is a solo object of tasks
 * @param {number} m - this is the index of available tasks
 */
function searchInToDoContainer(taskSearch, m) {
	if (taskSearch.status == "To do") {
		document.getElementById("category-todo").innerHTML = "";
		document.getElementById("category-todo").innerHTML = templateOfSearchTask(taskSearch, m);
		hideOtherTasks("progress", "feedback", "done");
		showAssingedToWorkersSearch(taskSearch);
	}
}

/**
 * This function checks if the searched task is in the "in progress" container
 *
 * @param {object} taskSearch - this is a solo object of tasks
 * @param {number} m - this is the index of available tasks
 */
function seachInProgressContainer(taskSearch, m) {
	if (taskSearch.status == "In progress") {
		document.getElementById("category-progress").innerHTML = "";
		document.getElementById("category-progress").innerHTML = templateOfSearchTask(taskSearch, m);
		hideOtherTasks("todo", "feedback", "done");
		showAssingedToWorkersSearch(taskSearch);
	}
}

/**
 * This function checks if the searched task is in the "awaiting feedback" container
 *
 * @param {object} taskSearch - this is a solo object of tasks
 * @param {number} m - this is the index of available tasks
 */
function seachInFeedbackContainer(taskSearch, m) {
	if (taskSearch.status == "Awaiting feedback") {
		document.getElementById("category-feedback").innerHTML = "";
		document.getElementById("category-feedback").innerHTML = templateOfSearchTask(taskSearch, m);
		hideOtherTasks("todo", "progress", "done");
		showAssingedToWorkersSearch(taskSearch);
	}
}

/**
 * This function checks if the searched task is in the "done" container
 *
 * @param {object} taskSearch - this is a solo object of tasks
 * @param {number} m - this is the index of available tasks
 */
function searchInDoneContainer(taskSearch, m) {
	if (taskSearch.status == "Done") {
		document.getElementById("category-done").innerHTML = "";
		document.getElementById("category-done").innerHTML = templateOfSearchTask(taskSearch, m);
		hideOtherTasks("todo", "progress", "feedback");
		showAssingedToWorkersSearch(taskSearch);
	}
}

/**
 * This function checks if user delete his value and shows all tasks again
 *
 * @param {string} idOfInputfield - this is the id of the search input field
 */
function checkEmptyField(idOfInputfield) {
	let userSearch = document.getElementById(`${idOfInputfield}`).value.toLowerCase();
	if ((userSearch.length = 0)) {
		// <= 1
		renderBoard();
	}
}

/**
 * If searched task getting find the other tasks are hidden
 *
 * @param {string} statusOne - this is one of the four container where the searched task is not included
 * @param {string} statusTwo - this is one of the four container where the searched task is not included
 * @param {string} statusThree - this is one of the four container where the searched task is not included
 */
function hideOtherTasks(statusOne, statusTwo, statusThree) {
	document.getElementById(`category-${statusOne}`).innerHTML = "";
	document.getElementById(`category-${statusTwo}`).innerHTML = "";
	document.getElementById(`category-${statusThree}`).innerHTML = "";
}

/**
 * This function allowed the user to drag an element to other container
 *
 * @param {number} id - this is the id of current dragged element
 */
function startDragging(id) {
	currentDraggingElement = id;
	if (somethingGotDeleted) {
		currentDraggingElement = id;
		somethingGotDeleted = false;
	} else {
		currentDraggingElement = id;
	}
}



/**
 * This function allowed the user to drop the dragged element in current space
 *
 * @param {event} ev - this event allows user to drop element in current space
 */
function allowDrop(ev) {
	ev.preventDefault();
}

/**
 * This function saves the new status of task in task array when user use drag and drop
 *
 * @param {string} newStatus - this string is the status which is gonna be the new status of task
 */
function moveTo(newStatus) {
	tasks[currentDraggingElement].status = newStatus;
	changeTaskAttribute(currentDraggingElement, "status", newStatus);
	filterTasks();
	renderBoard();
}

/**
 * This function starts a rotation animation when user wants to drag a task
 *
 * @param {string} status - this string means which current status the dragged element has
 * @param {number} index - this is the index of tasks which is going to be dragged
 */
function dragHighlight(status, index) {
	document.getElementById(`${status}-task${index}`).classList.add("rotation");
}

/**
 * When the user starts to drag a task this function showing possible drop-places by removing CSS style "display:none"
 *
 * @param {string} otherStatusOne - this is one of three possible drop places
 * @param {string} otherStatusTwo - this is one of three possible drop places
 * @param {string} otherStatusThree - this is one of three possible drop places
 */
function showEmptyPlaces(otherStatusOne, otherStatusTwo, otherStatusThree) {
	document.getElementById(`empty-space-${otherStatusOne}`).classList.remove("d-none");
	document.getElementById(`empty-space-${otherStatusTwo}`).classList.remove("d-none");
	document.getElementById(`empty-space-${otherStatusThree}`).classList.remove("d-none");
}

/**
 * When user drops a task in other status-container the possible empty places are hidden again
 *
 * @param {string} otherStatusOne - this is one of three possible drop places which is getting the style "display: none" again
 * @param {string} otherStatusTwo - this is one of three possible drop places which is getting the style "display: none" again
 * @param {string} otherStatusThree - this is one of three possible drop places which is getting the style "display: none" again
 */
function hideEmptyPlaces(otherStatusOne, otherStatusTwo, otherStatusThree) {
	document.getElementById(`empty-space-${otherStatusOne}`).classList.add("d-none");
	document.getElementById(`empty-space-${otherStatusTwo}`).classList.add("d-none");
	document.getElementById(`empty-space-${otherStatusThree}`).classList.add("d-none");
}

/**
 * In this function the user have the opportunity to edit the clicked task and run the HTML Template
 *
 * @param {number} idOfCurrentTask - this is the index of clicked task
 */
function editCurrentTask(idOfCurrentTask) {
	if (somethingGotDeleted && idOfCurrentTask > 0) {
		idOfCurrentTask--;
	}
	let currentTask = tasks[idOfCurrentTask];

	let bigBoxContainer = document.getElementById("big-box-solo-task");
	bigBoxContainer.innerHTML = "";
	bigBoxContainer.innerHTML = templateEditCurrentTask(currentTask, idOfCurrentTask);

	fillContainerwithData(currentTask);
}

/**
 * All attributes of the currently viewed task get selected
 * @param {object} currentTask - object that contains all attributes of the currently viewed task
 */
function fillContainerwithData(currentTask) {
	selectTitleDescriptionDate(currentTask);
	selectUsersAssignedToThisTask(currentTask);
	selectPriority(currentTask);
	selectStatus(currentTask);
}

/**
 * title & description & date of the currently viewed task gets selected
 * @param {object} currentTask - object that contains all attributes of the currently viewed task
 */
function selectTitleDescriptionDate(currentTask) {
	document.getElementById("edit-title").value = currentTask.title;
	document.getElementById("edit-description").value = currentTask.description;
	document.getElementById("edit-date").value = transformDateIntoEnglishFormat(currentTask.dueDate);
}

/**
 * All users of the currently viewed task get selected
 * @param {object} currentTask - object that contains all attributes of the currently viewed task
 */
function selectUsersAssignedToThisTask(currentTask) {
	showCompleteContainer();
	setTimeout(function () {
		for (i = 0; i < currentTask.assignedTo.length; i++) {
			for (j = 0; j < users.length; j++) {
				if (currentTask.assignedTo[i] == users[j].email) {
					submitCheckbox(j);
				}
			}
		}
	}, 200);
	document.getElementById("wrkcont").click();
}

/**
 * Priority of the currently viewed task gets selected
 * @param {object} currentTask - object that contains all attributes of the currently viewed task
 */
function selectPriority(currentTask) {
	if (currentTask.priority == "Urgent") {
		document.getElementById("prio-urgent-container").click();
	}
	if (currentTask.priority == "Medium") {
		document.getElementById("prio-medium-container").click();
	}
	if (currentTask.priority == "Low") {
		document.getElementById("prio-low-container").click();
	}
}

/**
 * Status of the currently viewed task gets selected
 * @param {object} currentTask - object that contains all attributes of the currently viewed task
 */
function selectStatus(currentTask) {
	if (currentTask.status == "To do") {
		document.getElementById("newStatus1").click();
	}
	if (currentTask.status == "In progress") {
		document.getElementById("newStatus2").click();
	}
	if (currentTask.status == "Awaiting feedback") {
		document.getElementById("newStatus3").click();
	}
	if (currentTask.status == "Done") {
		document.getElementById("newStatus4").click();
	}
}

/**
 * This function runs when user hover on edit task button and changes the color of edit container
 *
 * @param {number} indexOfSoloTask - index of current clicked task
 */
function changeEditContainerColors(indexOfSoloTask) {
	let editContainer = document.getElementById(`edit-button${indexOfSoloTask}`);
	let editPencil = document.getElementById(`edit-pencil${indexOfSoloTask}`);

	makeContainerBlue(editContainer);
	makeImgWhite(editPencil);
}

/**
 * This function runs when user leave hover on edit task button so color changes are going default again
 *
 * @param {number} indexOfSoloTask - index of current clicked task
 */
function RemoveEditContainerColors(indexOfSoloTask) {
	let editContainer = document.getElementById(`edit-button${indexOfSoloTask}`);
	let editPencil = document.getElementById(`edit-pencil${indexOfSoloTask}`);

	removeContainerColorBlue(editContainer);
	makeImageColorDefault(editPencil);
}

/**
 * This function runs when user hover on delete task button and changes the color of edit container
 *
 * @param {number} indexOfSoloTask - index of current clicked task
 */
function changeDeleteContainerColors(indexOfSoloTask) {
	let deleteContainer = document.getElementById(`delete-button${indexOfSoloTask}`);
	let deleteBasket = document.getElementById(`delete-basket${indexOfSoloTask}`);

	makeContainerBlue(deleteContainer);
	makeImgWhite(deleteBasket);
}

/**
 * This function runs when user leave hover on delete task button so color changes are going default again
 *
 * @param {number} indexOfSoloTask - index of current clicked task
 */
function RemoveDeleteContainerColors(indexOfSoloTask) {
	let deleteContainer = document.getElementById(`delete-button${indexOfSoloTask}`);
	let deleteBasket = document.getElementById(`delete-basket${indexOfSoloTask}`);

	removeContainerColorBlue(deleteContainer);
	makeImageColorDefault(deleteBasket);
}

/**
 * This function close the edit container by adding CSS style "display:none"
 *
 *
 */
function closeEditContainer() {
	document.getElementById("main-edit-container").classList.add("d-none");
	closeSoloTaskBigBox();
}

/**
 * This function checks which new prio the task gonna get and runs the additional function. After that the variable editNewPrio changes to the new prio.
 *
 * @param {string} newPrio - this string is the new prio of task after edit a task
 */
function changePrioTo(newPrio) {
	if (newPrio == "Urgent") {
		changePrioToUrgent();
	}
	if (newPrio == "Medium") {
		changePrioToMedium();
	}
	if (newPrio == "Low") {
		changePrioToLow();
	}
}

/**
 * If the new prio is urgent the urgent container gets highlighted by color and the other prio containers get style to default
 *
 */
function changePrioToUrgent() {
	editNewPrio = "Urgent";
	removeRequiredValidation();
	highlightClickedPrioContainer("urgent");
	removePossibleClickedPrioBefore("medium", "low");
	removeImgFilter("medium");
	removeImgFilter("low");
}

/**
 * If the new prio is medium the medium container gets highlighted by color and the other prio containers get style to default
 *
 */
function changePrioToMedium() {
	editNewPrio = "Medium";
	removeRequiredValidation();
	highlightClickedPrioContainer("medium");
	removePossibleClickedPrioBefore("urgent", "low");
	removeImgFilter("urgent");
	removeImgFilter("low");
}

/**
 * If the new prio is low the low container gets highlighted by color and the other prio containers get style to default
 *
 */
function changePrioToLow() {
	editNewPrio = "Low";
	removeRequiredValidation();
	highlightClickedPrioContainer("low");
	removePossibleClickedPrioBefore("urgent", "medium");
	removeImgFilter("urgent");
	removeImgFilter("medium");
}

/**
 * This function removes the required attribut when user choose one prio
 *
 */
function removeRequiredValidation() {
	if (editNewPrio.length > 0) {
		document.getElementById("change-prio-urgent").required = false;
		document.getElementById("change-prio-medium").required = false;
		document.getElementById("change-prio-low").required = false;
	}
}

/**
 * this function sets the form validation of piro buttons to default after submit changes
 *
 */
async function setRequiredToDefault() {
	document.getElementById("change-prio-urgent").required = true;
	document.getElementById("change-prio-medium").required = true;
	document.getElementById("change-prio-low").required = true;
}

/**
 * This function removes highlighted possible clicked prios before and set them style to default
 *
 * @param {string} otherPrioOne - one of two possible clicked prio before
 * @param {string} otherPrioTwo - one of two possible clicked prio before
 */
function removePossibleClickedPrioBefore(otherPrioOne, otherPrioTwo) {
	document.getElementById(`prio-${otherPrioOne}-container`).classList.remove(`${otherPrioOne}-prio`);
	document.getElementById(`prio-${otherPrioTwo}-container`).classList.remove(`${otherPrioTwo}-prio`);
}

/**
 * This function removes the highlight of an prio image when user choose other prio
 *
 * @param {string} imgPrio - this string means which prio the img have
 */
function removeImgFilter(imgPrio) {
	document.getElementById(`${imgPrio}-img`).style.filter = "";
}

/**
 * This function highlight the clicked prio container with new CSS styles
 *
 * @param {string} prio - this string means which new prio the task get
 */
function highlightClickedPrioContainer(prio) {
	document.getElementById(`prio-${prio}-container`).classList.add(`${prio}-prio`);
	document.getElementById(`prio-${prio}`);
	document.getElementById(`${prio}-img`).style.filter = "brightness(0) invert(1)";
}

/**
 * In edit task overview the user can open the complete container of possible workers of task (select contacs to assign)
 *
 */
function showCompleteContainer() {
	document.getElementById("edit-assignedTo-subcontainer").classList.toggle("edit-assign-full-size");
	document.getElementById("edit-assignedTo-subcontainer").classList.toggle("edit-assign-colum");
	document.getElementById("edit-workers").classList.toggle("d-none");
	document.getElementById("dropdown-img").classList.toggle("edit-assign-img-rotate");
}

/**
 * This function reads the value of new properties of task and updates the task array by running the updateTaskArray funktion
 *
 * @param {number} idOfCurrentTask - index of current clicked task
 */
async function submitChanges(idOfCurrentTask) {
	let newTitle = document.getElementById("edit-title").value;
	let newDescription = document.getElementById("edit-description").value;
	let newDate = document.getElementById("edit-date").value; // Wird falschherum dargestellt d.h. 2022-09-03
	let newPrio = editNewPrio;
	await updateTaskArray(idOfCurrentTask, newTitle, newDescription, transformDateIntoGermanFormat(newDate), newPrio);
	await setRequiredToDefault();
	await resetAllArraysAndParameters();
	loadInit();
}

/**
 * This function resets all used arrays and parameters to default
 *
 */
async function resetAllArraysAndParameters() {
	editNewPrio = "";
	selectedWorkers = [];
	selectedWorkersEmail = [];
}
