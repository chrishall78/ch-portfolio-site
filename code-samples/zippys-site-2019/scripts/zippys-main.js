// Requires jQuery to be loaded.
jQuery(function() {

	$('#news-filter').submit(function(){
		var filter = $('#news-filter');
		$.ajax({
			url:filter.attr('action'),
			data:filter.serialize(), // form data
			type:filter.attr('method'), // POST
			beforeSend:function(xhr){
				filter.find('button').text('Processing...'); // changing the button label
			},
			success:function(data){
				filter.find('button').text('Apply filter'); // changing the button label back
				$('#response').html(data); // insert data
			}
		});
		return false;
	});
	$(document).on("click", ".news-pagination-wrapper.ajxed a", function(e) {
		var url = $(this).attr('href');
		var hashes = url.split("?")[1];
		$('#pageNum').val(hashes.split("=")[1]);
		var filter = $('#news-filter');	
		$.ajax({
			url:filter.attr('action'),
			data:filter.serialize(), // form data
			type:filter.attr('method'), // POST
			beforeSend:function(xhr){
				filter.find('button').text('Processing...'); // changing the button label
			},
			success:function(data){
				filter.find('button').text('Apply filter'); // changing the button label back
				$('#response').html(data); // insert data
			}
		});
		return false;
	});

	// Set year for copyright in footer
	jQuery(".copyright-year").text( new Date().getFullYear() );

	// Smooth Scrolling
	applySmoothScrolling();

	// Background image swap for home billboard
	backgroundImageSwap(jQuery(".home-billboard .foreground-layer"), 767);

	/* ---- Mobile Menu & Header ---- */
	mobileMenuOpenEvt = setClickEvent(jQuery(".menu-button"), function ($this, event) {
		if (!jQuery(".navigation-mobile").hasClass("open")) {
			openNavMenu();
		} else {
			closeNavMenu();
		}
	});

	mobileMenuCloseEvt = setClickEvent(jQuery(".navigation-mobile .close"), function ($this, event) {
		closeNavMenu();
	});

	// Submenus - collapse/expand functionality
	collapseSubMenus(jQuery(".navigation-mobile .main-menu > .menu-item-has-children > a"));
	jQuery(window).on("resize", function (event) {
		jQuery(".navigation-mobile .menu-item-has-children:not(.open)").find(".sub-menu-container").height('auto').each(function () {
			jQuery(this).attr('data-height', jQuery(this).height());
		}).height('');
		jQuery(".navigation-mobile .menu-item-has-children.open").find(".sub-menu-container").height('auto').each(function () {
			jQuery(this).attr('data-height', jQuery(this).height());
			jQuery(this).css("height", jQuery(this).height());
		});
	});

	jQuery(window).on("scroll", function(event) {
		if (jQuery(window).width() <= 1024) {
			viewportTop = jQuery(window).scrollTop();
			mobileHeaderHeight = jQuery(".header-mobile").outerHeight();

			if (viewportTop > mobileHeaderHeight) {
				jQuery(".header-mobile .logo").addClass("hidden");
				jQuery(".header-mobile .logo-on-scroll").addClass("visible");
			} else {
				jQuery(".header-mobile .logo").removeClass("hidden");
				jQuery(".header-mobile .logo-on-scroll").removeClass("visible");
			}
		}
	});
	/* ---- End Mobile Menu & Header ---- */

	/* ---- Alert Bar ---- */
	if ( jQuery(".mtsnb").length && !sessionStorage.getItem('alert-bar-closure') ) {
		setDataHeight(jQuery(".mtsnb .mtsnb-container"), jQuery(".mtsnb"), "mtsnb-shown");

		jQuery(".mtsnb").addClass("mtsnb-shown-for-real");

		alertBarCloseEvt = setClickEvent(jQuery(".mtsnb .mtsnb-hide"), function ($this) {
			toggleClass(jQuery(".mtsnb"), "mtsnb-shown");
			toggleClass(jQuery(".mtsnb"), "mtsnb-hidden");

			jQuery(".mtsnb .mtsnb-container").css("height",0); 
			sessionStorage.setItem('alert-bar-closure', 'true')
			setTimeout(function() {
				resizeFixedHeader();
			}, 500);
		});
	} else {
		jQuery(".mtsnb").removeClass("mtsnb-shown").addClass("mtsnb-hidden");
		jQuery("body").css("padding-top","");
		jQuery("header").css("top","");
		jQuery(".mtsnb .mtsnb-container").css("height",0);		
	}

	resizeFixedHeader();
	setTimeout(function() {
		resizeFixedHeader();
	}, 500);
	jQuery(window).on("resize", function(event){
		resizeFixedHeader();
	});
	/* ---- End Alert Bar ---- */

	/* ---- Desktop Search ---- */
	searchOpenEvt = setClickEvent(jQuery(".header-desktop .search"), function($this, event) {
		toggleClass(jQuery(".search-overlay"), "open");
		jQuery(".search-overlay").css("opacity","1");
		jQuery(".search-overlay input[type='text']").focus();
	});
	searchCloseEvt = setClickEvent(jQuery(".search-overlay .close"), function($this, event) {
		jQuery(".search-overlay").css("opacity","0");
		toggleClassWithDelay(jQuery(".search-overlay"), "open", 300);
	});
	/* ---- End Desktop Search ---- */

	/* ---- Homepage Featured Videos Carousel ---- */
	if ($(".feat-video-carousel").length) {
		$(".feat-video-carousel").not(".slick-initialized").slick({
			adaptiveHeight: true,
			arrows: false,
			asNavFor: ".feat-video-carousel-thumbs",
			dots: false,
			infinite: false,
			mobileFirst: true,
			slidesToScroll: 1,
			slidesToShow: 1,
		});
	}

	if ($(".feat-video-carousel-thumbs").length) {
		$(".feat-video-carousel-thumbs").not(".slick-initialized").slick({
			arrows: true,
			asNavFor: ".feat-video-carousel",
			dots: false,
			infinite: false,
			mobileFirst: true,
			focusOnSelect: true,
			slidesToScroll: 1,
			slidesToShow: 2,
			responsive: [{
				breakpoint: 767,
				settings: {
					slidesToShow: 4,
				}
			}],
		});
	}

	$(".video-preview-image").magnificPopup({
		disableOn: 767,
		fixedContentPos: true,
		midClick: true,
		type: "iframe",
		iframe: extendMagnificIframe()
	});
	/* ---- End Homepage Featured Videos Carousel ---- */

	/* ---- Featured Dishes Carousel ---- */
	if ($(".feat-dishes-carousel").length) {
		$(".feat-dishes-carousel").not(".slick-initialized").slick({
			arrows: true,
			adaptiveHeight: true,
			centerMode: true,
			centerPadding: "20px",
			dots: true,
			infinite: false,
			mobileFirst: true,
			slidesToScroll: 1,
			slidesToShow: 1,
			responsive: [{
				breakpoint: 768,
				settings: {
					adaptiveHeight: false,
					centerMode: false,
					slidesToScroll: 1,
					slidesToShow: 2,
					variableWidth: true
				}
			}],
		});
	}
	/* ---- End Featured Dishes Carousel ---- */

	/* ---- Food Categories Carousel ---- */
	if ($(".food-cat-carousel").length) {
		$(".food-cat-carousel").on("init", function(event, slick) {
			currentSlide = $(".food-cat-carousel").find(".current-item").parents(".slick-slide").data("slick-index");
			setTimeout(function(){
				$(".food-cat-carousel").slick('slickGoTo',currentSlide);
			}, 500);
		});

		$(".food-cat-carousel").not(".slick-initialized").slick({
			arrows: true,
			dots: false,
			infinite: true,
			mobileFirst: true,
			slidesToScroll: 1,
			slidesToShow: 2,
			responsive: [{
				breakpoint: 768,
				settings: {
					slidesToScroll: 1,
					slidesToShow: 7,
				},
			},{
				breakpoint: 480,
				settings: {
					slidesToScroll: 4,
					slidesToShow: 4,
				}
			}],
		});
	}
	/* ---- End Food Categories Carousel ---- */

	/* ---- Food Detail Modal ---- */
	$('.open-popup-link').magnificPopup({
		closeMarkup: '<button title="%title%" type="button" class="mfp-close close"></button>',
		disableOn: 0,
		fixedContentPos: true,
		midClick: true,
		type:'inline',
		preloader: true,
		callbacks: {
			elementParse: function(item) {
				currentItem = item.el[0];

				titleVal = $(currentItem).data("title");
				if (titleVal != "" && titleVal != undefined) {
					$("#food-modal h2").html(titleVal);
				}

				descVal = $(currentItem).parents(".food-title").next(".food-desc").html();
				if (descVal != "" && descVal != undefined) {
					$("#food-modal .description").html(descVal);
				}

				caloriesVal = $(currentItem).data("calories");
				if (caloriesVal != "" && caloriesVal != undefined) {
					$("#food-modal .calories").html(caloriesVal);
				}

				linkVal = $(currentItem).data("onosys-link");
 				linkHtml = "<a href=\""+linkVal+"\" class=\"button\"><span class=\"fas fa-shopping-bag\"></span>Order Now</a>";
				if (linkVal != "" && linkVal != undefined) {
					$("#food-modal .onosys-link").html(linkHtml);
				}

				imageVal = $(currentItem).data("image-url");
				if (imageVal != "" && imageVal != undefined) {
					$("#food-modal .bkg-image").attr("style", "background-image: url('"+imageVal+"');");
				}

				restOnlyVal = $(currentItem).data("rest-only");
				restOnlyHtml = "<li><span class=\"fas fa-utensils\"></span> Restaurant Only</li>";
				if (restOnlyVal == 1) {
					$("#food-modal .food-cat-legend ul").append(restOnlyHtml);
				}
			},
			afterClose: function() {
				$("#food-modal h2").html("");
				$("#food-modal .description").html("");
				$("#food-modal .calories").html("");
				$("#food-modal .onosys-link").html("");
				$("#food-modal .bkg-image").attr("style","");
				$("#food-modal .food-cat-legend ul").html("");
			}
		}
	});
	/* ---- End Food Detail Modal ---- */

	/* ---- Locations ---- */
	hoursExpandEvt = setClickEvent(jQuery(".hours-type h3"), function($this, event) {
		toggleClass($this.parent(), "open");
	});

	if ( $("#wpsl-wrap").length ) {
		if ( $(window).width() < 480 ) {
			mobileNearbySearchEvt = setClickEvent(jQuery("#find-nearby"), function($this, event) {
				resultsOffset = $("#wpsl-result-list").offset().top;
				mobileHeader = $(".header-mobile").outerHeight();
				jQuery('html,body').animate({ scrollTop: resultsOffset - mobileHeader }, 1000);
			});
		}
	}
	/* ---- End Locations ---- */

	/* ---- Benefit Fundraising Form ---- */
	if ( $("#sev_more").length ) {
		$('#sev_more').hide();
	}
	if ( $('#less_700').length ) {
		$('#input_1_8').on('change', function() {
			sales_price = 9;
			if (this.value >= 700) {
				$('#sev_more').show();
				$('#less_700').hide();
			} else {
				$('#num_tickets').text(this.value);
				$('#could_make span').text("$"+(this.value*sales_price)*(4/sales_price));
				$('#owed span').text("$"+(this.value*sales_price)*(5/sales_price));
				$('#less_700').show();
				$('#sev_more').hide();
			}
		});
	}
	/* ---- End Benefit Fundraising Form ---- */

	/* ---- Lottie Animations ---- */
	if ( $("#chicken-home").length ) {
		var animationChickenHome = bodymovin.loadAnimation({
			container: document.getElementById('chicken-home'),
			renderer: 'svg',
			loop: false,
			autoplay: false,
			path: '/wp-content/themes/Zippys/animations/chicken-home.json'
		});
	}

	// Play animation when character comes into viewport
	$(window).on("load resize scroll", function(event){
		// if ( $(window).width() > 767 && $("#chicken-home").isInViewport() ) {
		// 	playLottieAnimation(animationChickenHome, "#chicken-home");
		// }

		if ( $(window).width() < 768 ) {
			$(".icon-wrapper").css("display","none");
		} else {
			$(".icon-wrapper").css("display","");
		}
	});

	function playLottieAnimation(animation, id) {
		$(id).addClass("play");
		animation.play();
	}
	/* ---- End Lottie Animations ---- */
});

// Sitewide functions
function setClickEvent(element, passThroughFunction, disableClick) {
	disableClick = typeof disableClick !== 'undefined' ? disableClick : true;
	clickEvent = element.on("click", function (event) {
		if (disableClick) { event.preventDefault(); }
		passThroughFunction(jQuery(this), event);
		jQuery(this).blur();
	});
	return clickEvent;
}

function removeClickEvent(element) {
	element.off("click touchend");
}

function openNavMenu() {
	toggleClass(jQuery(".navigation-mobile"), "open");
	toggleClass(jQuery(".menu-button"), "open");
	$("html, body").css("overflow","hidden");
}

function closeNavMenu() {
	toggleClass(jQuery(".navigation-mobile"), "open");
	toggleClass(jQuery(".menu-button"), "open");
	setTimeout(function () {
		jQuery(".navigation-mobile .sub-menu-container").css("height","");
		jQuery(".navigation-mobile .menu-item-has-children a.menu-open").removeClass("menu-open");
	}, 300);
	$("html, body").css("overflow","");
}

function toggleClass(element, className) {
	element.hasClass(className) ? element.removeClass(className) : element.addClass(className);
}

function toggleClassWithDelay(element, className, delay) {
	if (element.hasClass(className)) {
		element.css("opacity", 0);
		timer = setTimeout(function () {
			element.removeClass(className);
			element.css("opacity", "");
		}, delay);
	} else {
		element.addClass(className);
	}
}

function setDataHeight(element, parentElement, className, defaultOpen) {
	defaultOpen = typeof defaultOpen !== 'undefined' ? defaultOpen : false;
	var openHeight, collapsedHeight;
	element.each(function () {
		collapsedHeight = jQuery(this).outerHeight();
		jQuery(this).data("collapsedHeight", collapsedHeight);
	});
	element.height("auto").css("max-height","999em").each(function () {
		openHeight = jQuery(this).outerHeight();
		jQuery(this).data("openHeight", openHeight);
		jQuery(this).css("max-height", "");
		if (!defaultOpen) {
			parentElement.hasClass(className) ? jQuery(this).css("height", openHeight) : jQuery(this).css("height", "");
		} else {
			parentElement.hasClass(className) ? jQuery(this).css("height", "") : jQuery(this).css("height", openHeight);
		}
	});
}

function setHeight(element, parentElement, className, defaultOpen) {
	defaultOpen = typeof defaultOpen !== 'undefined' ? defaultOpen : false;
	var openHeight, collapsedHeight;
	element.each(function () {
		openHeight = jQuery(this).data("openHeight");
		collapsedHeight = jQuery(this).data("collapsedHeight");
		if (defaultOpen) {
			parentElement.hasClass(className) ? jQuery(this).css("height", collapsedHeight) : jQuery(this).css("height", openHeight);
		} else {
			parentElement.hasClass(className) ? jQuery(this).css("height", openHeight) : jQuery(this).css("height", collapsedHeight);
		}
	});
}

function collapseSubMenus(element) {
	element.on("click touchend", function (event) {
		event.preventDefault();
		var link = jQuery(this);
		var submenu = jQuery(this).next(".sub-menu-container");
		if (link.hasClass("menu-open")) {
			link.removeClass("menu-open");
			submenu.height('');
		} else {
			link.addClass("menu-open");
			submenu.height(submenu.attr('data-height'));
		}
	}).next(".sub-menu-container").height('auto').each(function () {
		jQuery(this).attr('data-height', jQuery(this).height());
	}).height('');
}

function resizeFixedHeader() {
	if ( jQuery(".mtsnb").hasClass("mtsnb-shown") ) {
		setDataHeight(jQuery(".mtsnb .mtsnb-container"), jQuery(".mtsnb"), "mtsnb-shown");
		setHeight(jQuery(".mtsnb .mtsnb-container"), jQuery(".mtsnb"), "mtsnb-shown");
	}

	var alertBarHeight = jQuery(".mtsnb").outerHeight();
	if ( !jQuery(".mtsnb").hasClass("mtsnb-shown") ) {
		var alertBarHeight = 0;
	}
	var headerBkgHeight = jQuery("header").outerHeight();

	jQuery("header").css("top",alertBarHeight+"px");
	jQuery("div[role='main']").css("padding-top",headerBkgHeight);

	if (jQuery("body").hasClass("admin-bar")) {
		jQuery("html").css("margin-top","0 !important");
	}
}

function applySmoothScrolling() {
	jQuery('a[href*="#"]:not([href="#"])').off("click touchend");
	jQuery('a[href*="#"]:not([href="#"])').on("click touchend", function(event) {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = jQuery(this.hash);
			target = target.length ? target : jQuery('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				jQuery('html,body').animate({ scrollTop: target.offset().top - 100 }, 1000);
				return false;
			}
		}
	});
}

$.fn.isInViewport = function() {
	var elementTop = jQuery(this).offset().top;
	var elementBottom = elementTop + jQuery(this).outerHeight();
	var viewportTop = jQuery(window).scrollTop();
	var viewportBottom = viewportTop + jQuery(window).height();
	return elementBottom > viewportTop && elementTop < viewportBottom;
};

function getYoutubeId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return 'error';
    }
}

function backgroundImageSwap(header, breakpoint) {
	if ( header.length && header.data("bkg-desktop") ) {
		var desktopImage = "url('"+header.data("bkg-desktop")+"')";
		var mobileImage = "url('"+header.data("bkg-mobile")+"')";
		if ( jQuery(window).width() > breakpoint ) {
			header.css("background-image",desktopImage);
		} else {
			header.css("background-image",mobileImage);
		}
		jQuery(window).on("resize", function() {
			if ( jQuery(window).width() > breakpoint ) {
				header.css("background-image",desktopImage);
			} else {
				header.css("background-image",mobileImage);
			}
		});
	}	
}

// Magnific Popup youtu.be / Vimeo support: https://stackoverflow.com/a/48696208
function extendMagnificIframe() {
	var $start = 0;
	var $iframe = {
		patterns: {
			youtube: {
				index: 'youtu', 
				id: function(url) {
					var m = url.match( /^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/ );
					if ( !m || !m[1] ) { return null; }

					if(url.indexOf('t=') != - 1) {
						var $split = url.split('t=');
						var hms = $split[1].replace('h',':').replace('m',':').replace('s','');
						var a = hms.split(':');

						if (a.length == 1) {
							$start = a[0]; 
						} else if (a.length == 2) {
							$start = (+a[0]) * 60 + (+a[1]);
						} else if (a.length == 3) {
							$start = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
						}
					}

					var suffix = '?autoplay=1&rel=0';
					if( $start > 0 ) {
						suffix = '?start=' + $start + '&autoplay=1&rel=0';
					}
					return m[1] + suffix;
				},
				src: 'https://www.youtube.com/embed/%id%'
			},
			vimeo: {
				index: 'vimeo.com/', 
				id: function(url) {
					var m = url.match(/(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/);
					if ( !m || !m[5] ) return null;
					return m[5];
				},
				src: 'https://player.vimeo.com/video/%id%?autoplay=1'
			}
		}
	};
	return $iframe;
}
