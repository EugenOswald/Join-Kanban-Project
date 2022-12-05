/**
 * Array which contains colors for users
 */
let colors = ["#8aa4ff", "#ff0000", "#2ad300", "#ff8a00", "#e200be", "#0038ff"];

/**
 * Object used if someone logs in as guest
 */
let guest = {
	name: "Guest",
	surname: "Guest",
	picture: "randomprofilepicture.webp",
	email: "Guest@nowhere.de",
	phone: "",
	password: "none123",
	color: "#4e963d",
};

/**
 * Makes arrow black if mobile-version
 * @param {string} arrowelement ID of the arrow-element
 * @param {string} containerforwidth ID of container with 100vw (to check if mobile-version is active)
 */
function setArrow(arrowelement, containerforwidth) {
	let breite = document.getElementById(`${containerforwidth}`).clientWidth;

	if (breite < 927) {
		// Mobile
		document.getElementById(`${arrowelement}`).src = `img/black-arrow.png`;
	} // Desktop
	else {
		document.getElementById(`${arrowelement}`).src = `img/backarrow-icon.png`;
	}
}

/**
 * Logo-Animation in desktop-version OR mobile-version
 */
function loginAnimation() {
	let breite = document.getElementById("center-container").clientWidth;
	let hoehe = document.getElementById("center-container").clientHeight;
	if (breite < 927 || hoehe < 601) {
		// Mobile (NestHub = Mobile)
		document.getElementById("animatedlogo").classList.add("animate-logo-mobile");
		document.getElementById("animatedlogo-mobile").classList.add("animate-logo");
		document.getElementById("mobilelogo").classList.add("animate-mobile");
		document.getElementById("whiteBackground").classList.add("d-none"); //Hide white Background for Mobile-View
	} // Desktop
	else {
		document.getElementById("whiteBackground").classList.add("animate-background");
		document.getElementById("animatedlogo").classList.add("animate-logo");
		document.getElementById("animatedlogo-mobile").classList.add("animate-logo");
		document.getElementById("mobilelogo").classList.add("d-none"); //Hide black Background for Desktop-View
	}
}

/**
 * Plays animation if you reseted your password and redirects you to login2.html
 */
function resetPwAnimation() {
	document.getElementById("reset-info").classList.add("animate-resetPw");
	document.getElementById("resetpw-box").classList.remove("d-none");

	setTimeout(function () {
		document.getElementById("reset-info").classList.remove("animate-resetPw");
		document.getElementById("resetpw-box").classList.add("d-none");
		showLoginForm2(); //Directs to login2.html (without animation)
	}, 1000);
}

/**
 * Animates a message for the user
 * @param {string} message Message-variable with the text that will be displayed
 */
function animateMessage(message) {
	document.getElementById("alert-text").innerHTML = message;
	document.getElementById("alert-info").classList.add("animate-Wrong");
	document.getElementById("alert-box").classList.remove("d-none");

	setTimeout(function () {
		//Lets the message disappear after 1 second
		document.getElementById("alert-info").classList.remove("animate-Wrong");
		document.getElementById("alert-box").classList.add("d-none");
	}, 1000);
}

/**
 * Directs to index.html (with animation) to login
 */
function showLoginForm() {
	window.location.href = "index.html";
}

/**
 * Directs to index2.html (without animation) to login
 */
function showLoginForm2() {
	window.location.href = "index2.html";
}

/**
 * Directs to signup.html to register at JOIN
 */
function showSignUpForm() {
	window.location.href = "signup.html";
}

/**
 * Directs to sendemail.html to request an email to reset your password
 */
function showPasswordForgottenForm() {
	window.location.href = "sendemail.html";
}

/**
 * Directs to setpassword.html to reset your password
 */
function showResetPasswordForm() {
	let emailtochangepw = document.getElementById("forgotpassword-email").value;
	window.location.href = `setpassword.html?msg=${emailtochangepw}`;
}

/**
 * Lets you login as Guest and redirects you to summary.html
 */
function loginAsGuest() {
	document.getElementById("login-email").value = ``; //Empty login-input-field to prevent tryLogin() from being executed
	document.getElementById("login-password").value = ``; //Empty login-input-field to prevent tryLogin() from being executed
	setArray("arrayOfactUser", guest); //Save Guest-User-Object in local Storage
	window.location.href = "summary.html";
}

/**
 * Trys to Login; email & password have to be existing and correct
 */
function tryLogin() {
	let email = document.getElementById("login-email").value;
	let password = document.getElementById("login-password").value;

	if (checkifEMailexists(email) && checkifPasswordMatches(email, password)) {
		let actuser = getUserAsObject(email); //Gets all user data for the specific email in one object
		setArray("arrayOfactUser", actuser); //Save User-Object in local Storage
		window.location.href = "summary.html"; //Password & Email correct
	} else if (!checkifEMailexists(email)) {
		animateMessage("E-Mail not found!");
	} //Email incorrect
	else {
		animateMessage("Wrong Password!");
	} //Password incorrect
}

/**
 * Trys to Signup with data from the signup-form; if email is already registered signup will not work
 */
async function trySignup() {
	let email = document.getElementById("signup-email").value;
	let object = createSignupData(email);

	if (checkifEMailexists(email)) {
		animateMessage("E-Mail already exists!"); //Email already in Database
	} else {
		await addUser(object); //Signed up successfully
		showLoginForm2();
	}
}

/**
 * Creates & returns an object with signupdata of the user
 * @param {string} email email which wants to signup
 * @returns
 */
function createSignupData(email) {
	let fullname = document.getElementById("signup-name").value;
	let name = fullname.slice(0, fullname.indexOf(" "));
	let surname = fullname.slice(fullname.indexOf(" ") + 1, fullname.length);
	let password = document.getElementById("signup-password").value;
	let color = colors[generateRandomInteger(colors.length - 1)];

	let object = {
		name: name,
		surname: surname,
		picture: "randomprofilepicture.webp",
		email: email,
		phone: "",
		password: password,
		color: color,
	};
	return object;
}

/**
 * Trys to send Email, if password was forgotten by the user; email has to exist in database
 */
function tryToSendEmail() {
	let email = document.getElementById("forgotpassword-email").value;

	if (checkifEMailexists(email)) {
	} //Email sent
	else {
		animateMessage("E-Mail not found!"); //Email not sent
		event.preventDefault(); //<- "action" eines Formulars wird immer nach "onsubmit" ausgeführt
	} //<- Über die Funktion die bei "onsubmit" ausgeführt wird, kann man action stoppen
	//<- event.preventDefault(); stoppt eine weitere Verarbeitung des Formulars und damit auch die Ausführung von "action"
}

/**
 * Try to reset password with the link from the email
 */
function resetPassword() {
	const urlParams = new URLSearchParams(window.location.search);
	let email = urlParams.get("msg");

	let pw1 = document.getElementById("reset-pw").value;
	let pw2 = document.getElementById("reset-pw2").value;

	tryToResetPassword(email, pw1, pw2);
}

/**
 * Try to reset password with the link from the email; email has to exist and passwords have to be equal!
 * @param {string} email Email for which the password can be reseted
 * @param {string} pw1 New Password
 * @param {string} pw2 New Password (confirmation of first Password entered)
 */
async function tryToResetPassword(email, pw1, pw2) {
	if (!email || !checkifEMailexists(email)) {
		//Check if qry contained in URL OR Check if Email exists
		animateMessage("E-Mail not found!");
	} else if (pw1 == pw2) {
		//Check if Pws are equal
		await setPasswordForUser(email, pw1);
		resetPwAnimation();
	} else {
		animateMessage("Unequal Passwords!");
	}
}

/**
 * Generates & returns a random Integer between 0 and maximum
 * @param {number} maximum Variable that defines the upper Border for the returned Integer
 * @returns a random Integer between 0 and maximum
 */
function generateRandomInteger(maximum) {
	let colorindexfound = false;
	let colorindex;
	let index = Math.random() * (maximum + 1);

	for (let i = 0; i < maximum + 1; i++) {
		if (index < i + 1 && !colorindexfound) {
			colorindex = i;
			colorindexfound = true;
		}
	}
	return colorindex;
}
