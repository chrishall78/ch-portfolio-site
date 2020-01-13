// Set year for copyright in footer
var vueCopyright = new Vue({
	el: ".copyright-year",
	data: {
		copyright: new Date().getFullYear()
	}
});

var vueIntro = new Vue({
	el: "#intro",
	data: {
		introBackground: [
			{ photoUrl: "./images/intro/mohammad-ali-berenji-unsplash.jpg", creditText: "Photo by Mohammad Ali Berenji on Unsplash", creditUrl: "https://unsplash.com/@mberenji" },
			{ photoUrl: "./images/intro/jules-d-unsplash.jpg", creditText: "Photo by Jules D. on Unsplash", creditUrl: "https://unsplash.com/@varietou" },
			{ photoUrl: "./images/intro/eriks-abzinovs-unsplash.jpg", creditText: "Photo by Eriks Abzinovs on Unsplash", creditUrl: "https://unsplash.com/@pixworthmedia" },
			{ photoUrl: "./images/intro/pawel-czerwinski-unsplash.jpg", creditText: "Photo by Paweł Czerwiński on Unsplash", creditUrl: "https://unsplash.com/@pawel_czerwinski" },
		],
	},
	computed: {
		selectedBackground: function() {
			return Math.floor(Math.random() * this.introBackground.length);
		},
		introPhotoUrl: function() {
			return { backgroundImage: "url('" + this.introBackground[this.selectedBackground].photoUrl + "')" };
		},
		introCaptionText: function() {
			return this.introBackground[this.selectedBackground].creditText;
		},
		introCaptionUrl: function() {
			return this.introBackground[this.selectedBackground].creditUrl;
		},
	}
});

$(document).ready(function() {
	$(".work-card .thumbnail").magnificPopup({type:'image'});
});

/* ---- Mobile Menu Open/Close ---- */
var mobileMenuButton = document.getElementById("mobileMenuButton");
var mobileMenu = document.querySelector(".header-mainnav");
if (mobileMenu != null && mobileMenuButton != null) {
	toggleClass(mobileMenuButton, mobileMenu, "open");
	mobileMenuButton.addEventListener("click", function (event) {
		if (mobileMenu.classList.contains("open")) {
			document.html.style.overflow = "hidden";
			document.body.style.overflow = "hidden";
		} else {
			document.html.style.overflow = "";
			document.body.style.overflow = "";
		}
	});
}

/* ---- Back to Top ---- */
var windowHeight = window.innerHeight;
var backToTop = document.querySelector(".back-to-top")
window.addEventListener("resize", function (event) {
	windowHeight = window.innerHeight;
});
window.addEventListener("scroll", function (event) {
	var scrollHeight = window.scrollY;
	if (scrollHeight >= (windowHeight * 0.9)) {
		backToTop.classList.add("visible");
		backToTop.classList.remove("hidden");
	} else {
		backToTop.classList.remove("visible");
		backToTop.classList.add("hidden");
	}
});

/* ---- Smooth Scrolling ---- */
document.querySelectorAll('a[href*="#"]:not([href="#"])').forEach(function (element, key, parent) {
	element.addEventListener("click", function (event) {
		var headerHeight;
		if (window.outerWidth > 1024) {
			headerHeight = document.querySelector(".header-mainnav").offsetHeight;
		} else {
			headerHeight = document.querySelector(".header-mobile").offsetHeight;
		}
		var target = document.querySelector(this.hash);
		if (target != null) {
			event.preventDefault();
			window.scroll({ top: target.offsetTop - headerHeight, left: 0, behavior: 'smooth' });
			return false;
		}
	});
})

// Sitewide functions

/* Toggles a CSS class (className) on a button and the specified container  */
function toggleClass(button, container, className) {
	button.addEventListener("click", function (event) {
		if (this.classList.contains(className)) {
			this.setAttribute("aria-expanded", "false");
			this.classList.remove(className);
			container.classList.remove(className);
		} else {
			this.setAttribute("aria-expanded", "true");
			this.classList.add(className);
			container.classList.add(className);
		}
	});
}