let jsonFromServer = {};
let jsonFromServerTWO = {};
let BASE_SERVER_URL;

const backend = {
	setItem: function (key, item) {
		jsonFromServer[key] = item;
		return saveJSONToServer();
	},
	getItem: function (key) {
		if (!jsonFromServer[key]) {
			return null;
		}
		return jsonFromServer[key];
	},
	deleteItem: function (key) {
		delete jsonFromServer[key];
		return saveJSONToServer();
	},
};

/** INSERT FOR SECOND JSON-FILE */
const backendTWO = {
	setItem: function (key, item) {
		jsonFromServerTWO[key] = item;
		return saveJSONToServerTWO();
	},
	getItem: function (key) {
		if (!jsonFromServerTWO[key]) {
			return null;
		}
		return jsonFromServerTWO[key];
	},
	deleteItem: function (key) {
		delete jsonFromServerTWO[key];
		return saveJSONToServerTWO();
	},
};
/** INSERT FOR SECOND JSON-FILE */

window.onload = async function () {
	downloadFromServer();
	downloadFromServerTWO(); /** INSERT FOR SECOND JSON-FILE */
};

async function downloadFromServer() {
	let result = await loadJSONFromServer();
	jsonFromServer = JSON.parse(result);
	//console.log('Users Loaded', result);
}

/** INSERT FOR SECOND JSON-FILE */
async function downloadFromServerTWO() {
	let result = await loadJSONFromServerTWO();
	jsonFromServerTWO = JSON.parse(result);
	//console.log('Tasks Loaded', result);
}
/** INSERT FOR SECOND JSON-FILE */

function setURL(url) {
	BASE_SERVER_URL = url;
}

/**
 * Loads a JSON or JSON Array to the Server
 * payload {JSON | Array} - The payload you want to store
 */
async function loadJSONFromServer() {
	let response = await fetch(BASE_SERVER_URL + "/nocors.php?json=database&noache=" + new Date().getTime());
	return await response.text();
}

/** INSERT FOR SECOND JSON-FILE */
async function loadJSONFromServerTWO() {
	let response = await fetch(BASE_SERVER_URL + "/nocorstwo.php?json=databasetwo&noache=" + new Date().getTime());
	return await response.text();
}
/** INSERT FOR SECOND JSON-FILE */

function loadJSONFromServerOld() {
	return new Promise(function (resolve, reject) {
		let xhttp = new XMLHttpRequest();
		let proxy = determineProxySettings();
		let serverURL = proxy + BASE_SERVER_URL + "/nocors.php?json=database&noache=" + new Date().getTime();

		xhttp.open("GET", serverURL);

		xhttp.onreadystatechange = function (oEvent) {
			if (xhttp.readyState === 4) {
				if (xhttp.status >= 200 && xhttp.status <= 399) {
					resolve(xhttp.responseText);
				} else {
					reject(xhttp.statusText);
				}
			}
		};

		xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhttp.send();
	});
}

/**
 * Saves a JSON or JSON Array to the Server
 */
function saveJSONToServer() {
	return new Promise(function (resolve, reject) {
		let xhttp = new XMLHttpRequest();
		let proxy = determineProxySettings();
		let serverURL = proxy + BASE_SERVER_URL + "/save_json.php";
		xhttp.open("POST", serverURL);

		xhttp.onreadystatechange = function (oEvent) {
			if (xhttp.readyState === 4) {
				if (xhttp.status >= 200 && xhttp.status <= 399) {
					resolve(xhttp.responseText);
				} else {
					reject(xhttp.statusText);
				}
			}
		};

		xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhttp.send(JSON.stringify(jsonFromServer));
	});
}

/** INSERT FOR SECOND JSON-FILE */
/**
 * Saves a JSON or JSON Array to the Server
 */
function saveJSONToServerTWO() {
	return new Promise(function (resolve, reject) {
		let xhttp = new XMLHttpRequest();
		let proxy = determineProxySettings();
		let serverURL = proxy + BASE_SERVER_URL + "/save_jsontwo.php";
		xhttp.open("POST", serverURL);

		xhttp.onreadystatechange = function (oEvent) {
			if (xhttp.readyState === 4) {
				if (xhttp.status >= 200 && xhttp.status <= 399) {
					resolve(xhttp.responseText);
				} else {
					reject(xhttp.statusText);
				}
			}
		};

		xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhttp.send(JSON.stringify(jsonFromServerTWO));
	});
}
/** INSERT FOR SECOND JSON-FILE */

function determineProxySettings() {
	return "";

	if (window.location.href.indexOf(".developerakademie.com") > -1) {
		return "";
	} else {
		return "https://cors-anywhere.herokuapp.com/";
	}
}
