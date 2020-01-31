// Requires jQuery to be loaded.

/* Trivia Game global variables */
var triviaJSON = '{"QuestionAnswers":[{"Question":"What is the PRIMARY purpose of the loyalty program?","Answers":[{"AnswerPosition":"A","RightAnswer":true,"Answer":"Customer Retention"},{"AnswerPosition":"B","RightAnswer":false,"Answer":"Incremental Sales"},{"AnswerPosition":"C","RightAnswer":false,"Answer":"Acquire New Customers"}],"Answer":"Customer Retention","AnswerPosition":"A","AnswerDetail":"","AnswerDisclaimer":""},{"Question":"What is the last day to redeem an offer?","Answers":[{"AnswerPosition":"A","RightAnswer":false,"Answer":"End of day that the offer ends"},{"AnswerPosition":"B","RightAnswer":false,"Answer":"Last business day of the month"},{"AnswerPosition":"C","RightAnswer":true,"Answer":"Next business day after offer ends"}],"Answer":"Next business day after offer ends","AnswerPosition":"C","AnswerDetail":"","AnswerDisclaimer":""},{"Question":"When do rewards expire?","Answers":[{"AnswerPosition":"A","RightAnswer":false,"Answer":"30 days"},{"AnswerPosition":"B","RightAnswer":true,"Answer":"90 days"},{"AnswerPosition":"C","RightAnswer":false,"Answer":"Do Not Expire"}],"Answer":"90 days","AnswerPosition":"B","AnswerDetail":"","AnswerDisclaimer":""},{"Question":"Which of the following ways are offers NOT communicated to your end customers?","Answers":[{"AnswerPosition":"A","RightAnswer":false,"Answer":"Mail offers through flyers"},{"AnswerPosition":"B","RightAnswer":false,"Answer":"Electronic mail campaigns"},{"AnswerPosition":"C","RightAnswer":true,"Answer":"Text offer campaigns"}],"Answer":"Text offer campaigns","AnswerPosition":"C","AnswerDetail":"","AnswerDisclaimer":""},{"Question":"Which of these actions does a customer NOT need to do to earn a reward?","Answers":[{"AnswerPosition":"A","RightAnswer":false,"Answer":"Redeem 3 coupons"},{"AnswerPosition":"B","RightAnswer":true,"Answer":"Spend $30 on TRP purchase"},{"AnswerPosition":"C","RightAnswer":false,"Answer":"Coupons redeemed on different days"}],"Answer":"Spend $30 on TRP purchase","AnswerPosition":"B","AnswerDetail":"","AnswerDisclaimer":""},{"Question":"PromoPort has sell sheets templates in six languages. Which of these is not correct?","Answers":[{"AnswerPosition":"A","RightAnswer":false,"Answer":"Polish"},{"AnswerPosition":"B","RightAnswer":true,"Answer":"Russian"},{"AnswerPosition":"C","RightAnswer":false,"Answer":"Bosnian"}],"Answer":"Russian","AnswerPosition":"B","AnswerDetail":"","AnswerDisclaimer":""},{"Question":"Which of these is a NOT a type of retail signage piece available in PromoPort?","Answers":[{"AnswerPosition":"A","RightAnswer":false,"Answer":"Poster"},{"AnswerPosition":"B","RightAnswer":false,"Answer":"Counter stand inserts"},{"AnswerPosition":"C","RightAnswer":true,"Answer":"FAB sheets"}],"Answer":"FAB sheets","AnswerPosition":"C","AnswerDetail":"","AnswerDisclaimer":""},{"Question":"Which of these points of purchase tools can generate more business by drawing attention from afar?","Answers":[{"AnswerPosition":"A","RightAnswer":true,"Answer":"Poster"},{"AnswerPosition":"B","RightAnswer":false,"Answer":"End cap"},{"AnswerPosition":"C","RightAnswer":false,"Answer":"Shelf talker"}],"Answer":"Poster","AnswerPosition":"A","AnswerDetail":"","AnswerDisclaimer":""},{"Question":"Which marketing display often influences impulse buys?","Answers":[{"AnswerPosition":"A","RightAnswer":false,"Answer":"Postcard"},{"AnswerPosition":"B","RightAnswer":true,"Answer":"Counter stand inserts"},{"AnswerPosition":"C","RightAnswer":false,"Answer":"Posters"}],"Answer":"Counter stand inserts","AnswerPosition":"B","AnswerDetail":"","AnswerDisclaimer":""},{"Question":"Which of these metrics is weighted 2x on the RPM Scorecard?","Answers":[{"AnswerPosition":"A","RightAnswer":true,"Answer":"New member registration"},{"AnswerPosition":"B","RightAnswer":false,"Answer":"Flyer distribution"},{"AnswerPosition":"C","RightAnswer":false,"Answer":"Retail signage"}],"Answer":"New member registration","AnswerPosition":"A","AnswerDetail":"","AnswerDisclaimer":""},{"Question":"Which visual indicator on the new training Home screen provides access to courses associated with your job title?","Answers":[{"AnswerPosition":"A","RightAnswer":false,"Answer":"Challenge"},{"AnswerPosition":"B","RightAnswer":true,"Answer":"Training Track"},{"AnswerPosition":"C","RightAnswer":false,"Answer":"Workbooks"},{"AnswerPosition":"D","RightAnswer":false,"Answer":"Department"}],"Answer":"Training Track","AnswerPosition":"B","AnswerDetail":"","AnswerDisclaimer":""},{"Question":"Which Help resource can you use to learn more about the Dealer Training Website?","Answers":[{"AnswerPosition":"A","RightAnswer":false,"Answer":"Dealer Training Website Tutorial"},{"AnswerPosition":"B","RightAnswer":false,"Answer":"Dealer Training Navigation Guidebook"},{"AnswerPosition":"C","RightAnswer":false,"Answer":"Master Technician Guidebook"},{"AnswerPosition":"D","RightAnswer":true,"Answer":"Both A and B"}],"Answer":"Both A and B","AnswerPosition":"D","AnswerDetail":"","AnswerDisclaimer":""},{"Question":"Where do you click on the training Home screen to manage the Dealer Roster?","Answers":[{"AnswerPosition":"A","RightAnswer":false,"Answer":"Home"},{"AnswerPosition":"B","RightAnswer":false,"Answer":"Your Name"},{"AnswerPosition":"C","RightAnswer":true,"Answer":"Your Dealer Code"},{"AnswerPosition":"D","RightAnswer":false,"Answer":"Bell"}],"Answer":"Your Dealer Code","AnswerPosition":"C","AnswerDetail":"","AnswerDisclaimer":""},{"Question":"The PACCAR Parts Bin Mobile Training App is available for both the iPhone/Android platforms and through the World Wide Web.","Answers":[{"AnswerPosition":"A","RightAnswer":true,"Answer":"True"},{"AnswerPosition":"B","RightAnswer":false,"Answer":"False"}],"Answer":"True","AnswerPosition":"A","AnswerDetail":"","AnswerDisclaimer":""},{"Question":"Training Assessments are available for an unlimited time, after a face-to-face training event.","Answers":[{"AnswerPosition":"A","RightAnswer":false,"Answer":"True"},{"AnswerPosition":"B","RightAnswer":true,"Answer":"False"}],"Answer":"False","AnswerPosition":"B","AnswerDetail":"","AnswerDisclaimer":""},{"Question":"What is the annual count of emails that are sent to Parts and Service and TRP customers?","Answers":[{"AnswerPosition":"A","RightAnswer":false,"Answer":"1,575,000"},{"AnswerPosition":"B","RightAnswer":true,"Answer":"2,285,000"},{"AnswerPosition":"C","RightAnswer":false,"Answer":"500,000"},{"AnswerPosition":"D","RightAnswer":false,"Answer":"250,000"}],"Answer":"2,285,000","AnswerPosition":"B","AnswerDetail":"","AnswerDisclaimer":""},{"Question":"How many monthly visitors are there to the Parts and Service and TRP websites?","Answers":[{"AnswerPosition":"A","RightAnswer":false,"Answer":"100,000"},{"AnswerPosition":"B","RightAnswer":true,"Answer":"800,000+"},{"AnswerPosition":"C","RightAnswer":false,"Answer":"75,000"},{"AnswerPosition":"D","RightAnswer":false,"Answer":"10,000"}],"Answer":"800,000+","AnswerPosition":"B","AnswerDetail":"","AnswerDisclaimer":""},{"Question":"How many parts can be found on TRPParts.com?","Answers":[{"AnswerPosition":"A","RightAnswer":false,"Answer":"75,000"},{"AnswerPosition":"B","RightAnswer":false,"Answer":"45,000"},{"AnswerPosition":"C","RightAnswer":false,"Answer":"10,000"},{"AnswerPosition":"D","RightAnswer":true,"Answer":"109,000+"}],"Answer":"109,000+","AnswerPosition":"D","AnswerDetail":"","AnswerDisclaimer":""},{"Question":"Where can customers go to sign up for the loyalty program?","Answers":[{"AnswerPosition":"A","RightAnswer":false,"Answer":"Parts and Service Website"},{"AnswerPosition":"B","RightAnswer":false,"Answer":"TRPParts.com"},{"AnswerPosition":"C","RightAnswer":false,"Answer":"Local Dealership"},{"AnswerPosition":"D","RightAnswer":true,"Answer":"All the above"}],"Answer":"All the above","AnswerPosition":"D","AnswerDetail":"","AnswerDisclaimer":""}]}';
var triviaObject = JSON.parse(triviaJSON);
var currentQuestion = 0;
var totalQuestions = 3;
var totalTriviaScore = 0;
var nextQuestion = "Next Question";
var lastQuestion = "Finish Your Quiz";

/* Memory Match Game global variables */
var mmJSON = '{"PartImages":[{"partNumber":"RE024J","partImage":"RE024J.jpg"},{"partNumber":"TRPWINDS","partImage":"TRPWINDS.jpg"},{"partNumber":"DB154B","partImage":"DB154B.jpg"},{"partNumber":"TRP_BATTERY_BD31_Dual","partImage":"TRP_BATTERY_BD31_Dual.jpg"},{"partNumber":"TRP_V_BELT_17591BLT","partImage":"TRP_V_BELT_17591BLT.jpg"},{"partNumber":"PAC280_1_2","partImage":"PAC280_1_2.jpg"},{"partNumber":"CF19500C","partImage":"CF19500C.jpg"},{"partNumber":"CL108825-82","partImage":"CL108825-82.jpg"},{"partNumber":"W01-358-9082","partImage":"W01-358-9082.jpg"},{"partNumber":"AW2458MN","partImage":"AW2458MN.jpg"}]}';
var mmGameTimer;
var memoryGameStarted = false;
var memoryGameTimeLimit = 60;
var totalGameCards = 20;

/* Executes after DOM is ready */
$(document).ready(function () {
	/* Trivia Game */
	shuffleTriviaQuestions();
	loadQuestion(currentQuestion);
	$(".trivia-game-container").on("click", "#restartTrivia, .replay .button", function(event){
		event.preventDefault();
		currentQuestion = 0;
		totalTriviaScore = 0;
		shuffleTriviaQuestions();
		hideTemplate($(".results-template"));
		hideTemplate($(".question-template"));
		hideTemplate($(".answer-template"));
		$(".progress-line").removeClass("step1 step2 step3");
		$(".progress-bar li").removeClass("completed current-step");
		$(".progress-bar li:nth-child(1)").addClass("current-step");
		setTimeout(function(){
			loadQuestion(currentQuestion);
		}, 500);
	});

	/* Memory Match Game */
	updateTimer(memoryGameTimeLimit);
	loadMMCards(mmJSON);
	$("#startMemory").on("click", function(event){
		event.preventDefault();
		if (memoryGameStarted) {
			resetMemoryGame();
		} else {
			startMemoryGame();
		}
	});
});

/* Trivia Game functions */
function shuffleTriviaQuestions() {
	shuffleArray(triviaObject.QuestionAnswers);
}

function loadQuestion(number) {
	$("#Question").html($("#questionTemplate").tmpl(triviaObject.QuestionAnswers[number]));
	$("#Question .answer-choices .button").on("click", function(event){
		event.preventDefault();
		rightAnswer = $(this).data("rightanswer");
		if (rightAnswer == true) { totalTriviaScore++; }
		hideTemplate($(".question-template"));
		advanceProgressBar(number, number+1);
		setTimeout(function(){
			loadAnswer(currentQuestion);
		}, 500);
	});
	$(".question-template").addClass("visible");
	$(".progress-container").addClass("visible");
}

function loadAnswer(number) {
	var currentQuestionNumber = number;
	nextQuestionText = nextQuestion;
	if (currentQuestionNumber == (totalQuestions-1)) { nextQuestionText = lastQuestion; }
	$("#Answer").html($("#answerTemplate").tmpl(triviaObject.QuestionAnswers[number]));
	$("#Answer").append('<p class="next"><a href="#" class="button">'+nextQuestionText+'</a></p>');
	$("#Answer .button").on("click", function(event){
		event.preventDefault();
		currentQuestion++;
		hideTemplate($(".answer-template"));
		if (currentQuestionNumber == (totalQuestions-1)) {
			$(".progress-container").removeClass("visible");
			setTimeout(function(){
				loadResults();
			}, 500);
		} else {
			advanceProgressBar(currentQuestionNumber+1, currentQuestionNumber+1);
			setTimeout(function(){
				loadQuestion(currentQuestion);
			}, 500);
		}
	});
	$(".answer-template").addClass("visible");
}

function loadResults() {
	var finalScore = { "finalScore" : totalTriviaScore, "totalQuestions": totalQuestions };
	$("#Results").html($("#resultsTemplate").tmpl(finalScore));
	$(".results-template").addClass("visible");
	playCompletedGame();
}

function hideTemplate($template) {
	$template.removeClass("visible");
	setTimeout(function(){
		$template.html("");
	}, 500);
}

function advanceProgressBar(qnumber, anumber) {
	$(".progress-line").removeClass("step1 step2 step3");
	$(".progress-bar li").removeClass("completed current-step");

	$(".progress-bar li:nth-child("+(qnumber+1)+")").addClass("current-step");
	$(".progress-line").addClass("step"+anumber);
	while (anumber >= 1) {
		$(".progress-bar li:nth-child("+anumber+")").addClass("completed");
		anumber--;
	}
}

/* Memory Match Game functions */
function startMemoryGame() {
	var currentTimeLimit = memoryGameTimeLimit;
	memoryGameStarted = true;
	mmGameTimer = setInterval(function(){
		currentTimeLimit--;
		updateTimer(currentTimeLimit);
		if (currentTimeLimit == 0) { endMemoryGame(); }
	}, 1000);
	activateCards();
	updateStartButtonText("Reset Game");
}

function endMemoryGame() {
	clearInterval(mmGameTimer);
	deactivateCards();
	updateScore();
	updateStartButtonText("Play Again");
	playCompletedGame();
}

function resetMemoryGame() {
	memoryGameStarted = false;
	clearInterval(mmGameTimer);
	deactivateCards();
	updateTimer(memoryGameTimeLimit);
	updateStartButtonText("Start Game");
	$(".match-game-grid .card").removeClass("matched flipped");
	$("#timer").removeClass("score");
	$("#timer-desc").html("seconds left");

	// Populate cards with random placements to start a new game
	setTimeout(function(){
		loadMMCards(mmJSON);
	}, 600);
}

function loadMMCards(mmJSON) {
	obj = JSON.parse(mmJSON);
	obj.PartImages = obj.PartImages.concat(obj.PartImages);
	shuffleArray(obj.PartImages);
	$("#matchGameGrid .row").html($("#partGridTemplate").tmpl(obj));
}

function activateCards() {
	var clickCount = 0;
	var matchData1, matchData2 = "";
	var matchElement1, matchElement2;
	$(".match-game-grid .card").on("click", function(event) {
		if ( $(this).hasClass("matched") ) { return; }
		if ( !$(this).hasClass("flipped") ) {
			$(this).addClass("flipped");
		} else {
			// prevent a match by tapping on the same card twice
			return;
		}
		clickCount++;
		partNumber = $(this).data("partnum");

		if ( (clickCount % 2) == 0) {
			matchData2 = partNumber;
			matchElement2 = $(this);
				if (matchData2 === matchData1) {
					setTimeout(function(){
						$("[data-partnum='"+partNumber+"']").addClass("matched");
						playMatchEffect();
						if ( $(".match-game-grid .card.matched").length == totalGameCards) {
							endMemoryGame();
						}
					}, 501);
				} else {
					setTimeout(function(){
						$(".match-game-grid .card:not(.matched)").removeClass("flipped");
					}, 501);
				}
		} else {
			matchData1 = partNumber;
			matchElement1 = $(this);
		}
	});
}

function deactivateCards() {
	$(".match-game-grid .card").off("click");
}

function updateTimer(seconds) {
	$("#timer").text(seconds);
}

function updateStartButtonText(text) {
	$("#startMemory").text(text);
}

function updateScore() {
	var totalScore = 0;
	$(".match-game-grid .card").each(function(){
		if ( $(this).hasClass("matched") ) { totalScore++; }
	});
	$("#timer").addClass("score").html(totalScore+"/"+totalGameCards);
	$("#timer-desc").html("TRP<sup>&reg;</sup> items matched!");
}

function playMatchEffect() {
	var audio = new Audio("./audio/dustyroom_multimedia_correct_complete_bonus.mp3");
	audio.play();
}

function playCompletedGame() {
	var audio = new Audio("./audio/zapsplat_multimedia_alert_synth_bright_end_complete_11635.mp3");
	audio.play();	
}

/* Randomize array element order in-place. Using Durstenfeld shuffle algorithm. */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}