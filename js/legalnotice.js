/**
 * Directs you back to summary.html OR summary2.html
 */
function backtoSummary() {
	if (innerWidth < 901) {
		window.location.href = "summary2.html";
	} // For Mobile
	else {
		window.location.href = "summary.html";
	} // Not Mobile
}
