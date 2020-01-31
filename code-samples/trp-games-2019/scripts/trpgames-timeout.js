$(function() {
	// 5 minute timeout (300 seconds)
	var timeoutValue = 300000;

	// Redirect back to intro screen
	var awayCallback = function() {
		window.location = "index.html";
	};

	var idle = new Idle({
		onHidden: null,
		onVisible: null,
		onAway: awayCallback,
		onAwayBack: null,
		awayTimeout: timeoutValue
	}).start();
});