letter = [];

/**
 * Sorts the user list alphabetically
 */
async function initContacts() {
	await init();
	users.sort((a, b) => a.surname.localeCompare(b.surname));
	renderLettersList();
}

/**
 * Pushes the initial letters into the letter array to display only the needed letters in a HTML then
 */
function renderLettersList() {
	let cCC = document.getElementById("childContactsContainer");
	cCC.innerHTML = "";
	letter = [];
	for (let i = 0; i < users.length; i++) {
		let user = users[i]["surname"];
		let firstSurnameLetter = user.match(/\b(\w)/g).join("");
		if (!letter.includes(firstSurnameLetter)) {
			letter.push(firstSurnameLetter);
			cCC.innerHTML += firstLetterListHTML(firstSurnameLetter);
		}
	}
	renderContacts();
}

/**
 *  Initiates the rendering of the individual contacts
 */
function renderContacts() {
	for (let i = 0; i < users.length; i++) {
		let user = users[i];
		let firstSurnameLetter = user["surname"].match(/\b(\w)/g).join("");
		let firstSurLetterID = document.getElementById(firstSurnameLetter);
		firstSurLetterID.innerHTML += contactHTML(user);
	}
}

/**
 * The contact information is called here
 * @param {string} fullName - Full name of the user
 * @param {string} userColor - color of the user
 * @param {string} userEmail - email of the user
 * @param {string} userPhone - phonenumber of the user
 */
function contactInformation(fullName, userColor, userEmail, userPhone) {
	let cInformation = document.getElementById("contactInformation");
	let contactSite = document.getElementById("contactSite");
	contactSite.style = "display: flex";
	cInformation.innerHTML = "";
	cInformation.innerHTML = contactInformationHTML(fullName, userColor, userEmail, userPhone);
}

/**
 *
 * @param {string} userEmail - email of the user
 */
async function deleteContactUser(userEmail) {
	let tampletContainer = document.getElementById("tampletContainer");
	let contactInformation = document.getElementById("contactInformation");
	let index = getUserIndexForEmail(userEmail);
	await delUser(index);
	tampletContainer.innerHTML = "";
	contactInformation.innerHTML = "";
	initContacts();
}

/**
 * Closes the window
 */
function closeAddContact() {
	let element = document.getElementById("tampletContainer");
	element.classList.add("d-none");
	element.innerHTML = "";
}

/**
 * opens the Add Contact window
 */
function openAddContactContainer() {
	let element = document.getElementById("tampletContainer");
	element.classList.remove("d-none");
	element.innerHTML = "";
	element.innerHTML = addNewContactHTML();
}

/**
 * This function stops Progagation when user click on background
 *
 * @param {event} event - adds default stopProgagation function
 */
function dontClose(event) {
	event.stopPropagation();
}

/**
 * opens the Edit Contact window
 * @param {string} fullName - Full name of the user
 * @param {string} email - email of the user
 * @param {string} phone - phone number of the user
 * @param {string} color - color of the user
 */
function openEditContact(fullName, email, phone, color) {
	let element = document.getElementById("tampletContainer");
	element.classList.remove("d-none");
	element.innerHTML = "";
	element.innerHTML = editContactHTML(fullName, email, phone, color);
}

/**
 * The values are taken and thus a new contact is created
 */
async function createNewContact() {
	let fullname = makeFirstLettersOfFullnameGreat(document.getElementById("newName").value);
	let surname = makeFirstLetterOfSurnameGreat(fullname.slice(fullname.indexOf(" ") + 1, fullname.length));
	let email = document.getElementById("newEmail").value;
	let phone = document.getElementById("newPhone").value;
	let color = colors[generateRandomInteger(colors.length - 1)];
	let object = {
		name: fullname,
		surname: surname,
		picture: "randomprofilepicture.webp",
		email: email,
		phone: phone,
		password: "0000",
		color: color,
	};
	await addUser(object);
	addedNewContact();
}

/**
 * Makes great the first Letters of Username
 * @param {String} fullname e.g. tobias ullrich
 * @returns fullname with great first Letters
 */
function makeFirstLettersOfFullnameGreat(fullname) {
	let surname = fullname.slice(fullname.indexOf(" ") + 1, fullname.length);
	let fullnameGreat =
		fullname.charAt(0).toUpperCase() +
		fullname.slice(1, fullname.indexOf(" ")) +
		" " +
		surname.charAt(0).toUpperCase() +
		surname.slice(1, surname.length);
	return fullnameGreat;
}

/**
 * Makes great the first Letter of Surname
 * @param {String} surname e.g. ullrich
 * @returns surname with great first Letter
 */
function makeFirstLetterOfSurnameGreat(surname) {
	let surnameGreat = surname.charAt(0).toUpperCase() + surname.slice(1, surname.length);
	return surnameGreat;
}

/**
 * The new data is put into an object to be pushed into the array at changeUser
 * @param {string} oldEmail - the old/current email address
 */
async function newEditContact(oldEmail) {
	let tampletContainer = document.getElementById("tampletContainer");
	let contactInformation = document.getElementById("contactInformation");
	let fullname = makeFirstLettersOfFullnameGreat(document.getElementById("editName").value);
	let surname = makeFirstLetterOfSurnameGreat(fullname.slice(fullname.indexOf(" ") + 1, fullname.length));
	let email = document.getElementById("editEmail").value;
	let phone = document.getElementById("editPhone").value;
	let object = {
		name: fullname,
		surname: surname,
		email: email,
		phone: phone,
		oldEmail: oldEmail,
	};
	await changeUser(object);
	tampletContainer.innerHTML = "";
	contactInformation.innerHTML = "";
	initContacts();
}

/**
 * Animation that a contact has been created is called
 */
function addedNewContact() {
	window.scrollTo(0, 0);
	let breite = window.innerWidth;
	let hoehe = window.innerHeight;
	document.getElementById("addedNewContact").style.top = `calc(${hoehe}/2)`;
	document.getElementById("addedNewContact").style.left = `calc(${breite}/2)`;
	let addedToBoard = document.getElementById("addedNewContact");
	let tampletContainer = document.getElementById("tampletContainer");
	addedToBoard.classList.toggle("d-none");
	tampletContainer.classList.toggle("d-none");
	setTimeout(() => {
		initContacts();
		addedToBoard.classList.toggle("d-none");
	}, 1000);
}

/**
 * Closes the window
 */
function closeContactInfos() {
	let contactSite = document.getElementById("contactSite");
	let cInformation = document.getElementById("contactInformation");
	contactSite.style = "display: none";
	cInformation.innerHTML = "";
}
