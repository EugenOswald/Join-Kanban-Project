/**
 * Array with Names of all months
 */
const monthNames = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

/**
 * Variables for calculation
 */
let tasksinBoard = 0;
let tasksinProgress = 0;
let tasksawaitingFeedback = 0;
let tasksUrgent = 0;
let nextDeadlineofUrgentTasks = 0;
let nextUrgentTaskDate;
let taskstoDo = 0;
let tasksDone = 0;

/**
 * Loads tasks from the database into the tasks-array, when summary.html gets opened
 * Collects infos to fill summary.html
 * Fills summary.html with infos
 * Greets user
 */
async function renderSummary() {
	await init();

	collectAndFillSummarywithInfos();
	fillSummarywithInfos();
	greetUser();
	centerGreetings();
	showGreetings();
}

/**
 * Centers greetings in the middle of summary.html; waits 1 second, because height & width have to be calculated
 */
function centerGreetings() {
	setTimeout(function () {
		let breite = document.getElementById("summary-container-for-mobile").clientWidth;
		let hoehe = document.getElementById("summary-container-for-mobile").clientHeight;
		document.getElementById("summary-container-for-mobile").style.top = `calc(50vh - (${hoehe}px / 2))`;
		document.getElementById("summary-container-for-mobile").style.left = `calc(50vw - (${breite}px / 2))`;
	}, 1000);
}

/**
 * Shows greetings after they were centered; we wait for 2 seconds to make them the foreground
 */
function showGreetings() {
	if (innerWidth < 901) {
		document.getElementById("summary-welcome").classList.add("d-none");
		document.getElementById("mobile-tool-title").innerHTML = "Kanban Project Management Tool";
		document.getElementById("summary-container-for-mobile").classList.add("mobile-greeting");

		setTimeout(function () {
			document.getElementById("summary-container-for-mobile").style.zIndex = -1;
		}, 2000);
	} else {
		document.getElementById("summary-container-for-mobile").classList.add("d-none"); //Hides Mobile-Greetings in Desktop-Version
	}
}

/**
 * Writes the greetText & username into summary.html
 */
function greetUser() {
	let greetText = sayGoodmorningEveningorNight();
	document.getElementById("greettime").innerHTML = `${greetText}`;
	document.getElementById("greettime-mobile").innerHTML = `${greetText}`;

	let actUserArray = [];
	actUserArray = getArray("arrayOfactUser"); //Get User-Object from local Storage
	document.getElementById("actuser").innerHTML = actUserArray["name"];
	document.getElementById("actuser-mobile").innerHTML = actUserArray["name"];
}

/**
 * Generates a greetText according to the day-time
 * @returns greetText for the user
 */
function sayGoodmorningEveningorNight() {
	let currentdate = new Date();
	let currenthour = currentdate.getHours();

	if (currenthour < 5) {
		text = "Good night,";
	} else if (currenthour < 11) {
		text = "Good morning,";
	} else if (currenthour < 13) {
		text = "Lunchtime,";
	} else if (currenthour < 17) {
		text = "Good afternoon,";
	} else if (currenthour < 23) {
		text = "Good evening,";
	} else {
		text = "Good night,";
	}

	return text;
}

/**
 * Collects & calculates Information to fill summary.html
 */
function collectAndFillSummarywithInfos() {
	for (i = 0; i < tasks.length; i++) {
		if (tasks[i]["status"] == "In progress") {
			tasksinProgress++;
		}
		if (tasks[i]["status"] == "Awaiting feedback") {
			tasksawaitingFeedback++;
		}
		if (tasks[i]["priority"] == "Urgent") {
			tasksUrgent++;
			if (transformDate(tasks[i]["dueDate"]) > nextDeadlineofUrgentTasks) {
				nextDeadlineofUrgentTasks = transformDate(tasks[i]["dueDate"]);
			}
		}
		if (tasks[i]["status"] == "To do") {
			taskstoDo++;
		}
		if (tasks[i]["status"] == "Done") {
			tasksDone++;
		}
	}
	tasksinBoard = tasks.length;
	nextUrgentTaskDate = transformDate2(nextDeadlineofUrgentTasks);
}

/**
 * Fills the HTML-Elements of summary.html with calculated values
 */
function fillSummarywithInfos() {
	document.getElementById("numberTasksBoard").innerHTML = `${tasksinBoard}`;
	document.getElementById("numberTasksinProgress").innerHTML = `${tasksinProgress}`;
	document.getElementById("numberTasksawaitingFeedback").innerHTML = `${tasksawaitingFeedback}`;
	document.getElementById("numberTasksUrgent").innerHTML = `${tasksUrgent}`;
	document.getElementById("urgentdate").innerHTML = `${nextUrgentTaskDate}`;
	document.getElementById("numberTasksTodo").innerHTML = `${taskstoDo}`;
	document.getElementById("numberTasksDone").innerHTML = `${tasksDone}`;
}

/**
 * Receives a date-variable and converts it into a string with the format "August 5, 2022"
 * @param {date} datetotransform The received date-variable
 * @returns
 */
function transformDate2(datetotransform) {
	if (datetotransform != 0) {
		let datum = datetotransform;
		let tag = datum.getDate(datetotransform);
		let monat = datum.getMonth(datetotransform);
		let jahr = datum.getFullYear(datetotransform);
		let wishedformat = monthNames[Number(monat)] + " " + Number(tag) + ", " + jahr;
		return wishedformat;
	}
}

/**
 * Receives a string-variable in the format "30-10-2010" and converts it into a date-variable
 * @param {string} datetotransform The received string-variable
 * @returns date-variable datumZusGesetzt
 */
function transformDate(datetotransform) {
	let datum = datetotransform; //let datum = tasks[i]['dueDate'];
	let ersterstrich = datum.indexOf("-");
	let zweiterstrich = datum.lastIndexOf("-");
	let tag = datum.slice(0, ersterstrich);
	let monat = datum.slice(ersterstrich + 1, zweiterstrich) - 1;
	let jahr = datum.slice(zweiterstrich + 1, datum.length);
	let datumZusGesetzt = new Date(jahr, monat, tag);
	return datumZusGesetzt;
}

/**
 * Receives a string-variable in the format "30-10-2010" and converts it into string "2010-10-30"
 * @param {string} datetotransform The received string-variable
 * @returns string-variable datumZusGesetzt
 */
function transformDateIntoEnglishFormat(datetotransform) {
	let datum = datetotransform;
	let ersterstrich = datum.indexOf("-");
	let zweiterstrich = datum.lastIndexOf("-");
	let tag = datum.slice(0, ersterstrich);
	if (tag.length == 1) {
		tag = "0" + tag;
	}
	let monat = datum.slice(ersterstrich + 1, zweiterstrich);
	if (monat.length == 1) {
		monat = "0" + monat;
	}
	let jahr = datum.slice(zweiterstrich + 1, datum.length);
	let datumZusGesetzt = jahr + "-" + monat + "-" + tag;
	return datumZusGesetzt;
}

/**
 * Receives a string-variable in the format "2010-10-30" and converts it into string "30-10-2010"
 * @param {string} datetotransform The received string-variable
 * @returns string-variable datumZusGesetzt
 */
function transformDateIntoGermanFormat(datetotransform) {
	let datum = datetotransform; //let datum = tasks[i]['dueDate'];
	let ersterstrich = datum.indexOf("-");
	let zweiterstrich = datum.lastIndexOf("-");

	let jahr = datum.slice(0, ersterstrich);

	let monat = datum.slice(ersterstrich + 1, zweiterstrich);
	if (monat.length == 1) {
		monat = "0" + monat;
	}

	let tag = datum.slice(zweiterstrich + 1, datum.length);
	if (tag.length == 1) {
		tag = "0" + tag;
	}

	let datumZusGesetzt = tag + "-" + monat + "-" + jahr;
	return datumZusGesetzt;
}

/**
 * Directs you to board.html
 */
function showBoard() {
	window.location.href = "board.html";
}

/**
 * Inverts Font-color & Background-Color of a specific element plus its img on hover
 * @param {string} idOfElementToChange ID of the element
 * @param {string} idOfPicture ID of the img
 */
function addBackground(idOfElementToChange, idOfPicture) {
	document.getElementById(idOfElementToChange).style = "background-color: #FFFFFF;";
	document.getElementById(`${idOfPicture}`).style = "filter: invert(100%);";
}

/**
 * Inverts Font-color & Background-Color of a specific element plus its img on hover
 * @param {string} idOfElementToChange ID of the element
 * @param {string} idOfPicture ID of the img
 */
function removeBackground(idOfElementToChange, idOfPicture) {
	document.getElementById(idOfElementToChange).style = "background-color: #091931;";
	document.getElementById(`${idOfPicture}`).style = "filter: invert(0%);";
}
