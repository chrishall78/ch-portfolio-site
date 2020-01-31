// Requires jQuery
$(document).ready(function($) {
	/* ---- Mobile Menu ---- */
	$(".mobile-menu-button").on("click", function(event) {
		event.preventDefault();
		if ($("ul.menu.left").css("opacity") == 0) {
			$("ul.menu.left").css("top","95px").css("opacity", 1);
		} else {
			$("ul.menu.left").css("opacity", 0);
			window.setTimeout(function() {
				$("ul.menu.left").css("top","-260px");
			}, 1000);
		}
	});
	$(window).on("resize", function(event){
		if ($(window).width() > 640) { $("ul.menu.left").css("top","").css("opacity", ""); }
	});
	// Closes navigation menu with a tap anywhere outside of it.
	$("html").on("click", function(event) {
		if ($(window).width() <= 640) {
			if ($("ul.menu.left").css("opacity") != 0) {
				$("ul.menu.left").css("opacity", 0);
				window.setTimeout(function() {
					$("ul.menu.left").css("top","-260px");
				}, 600);
			}
		}
	});

	// Prevents previous code from applying to the navigation menu itself.
	$(".mobile-button-wrapper, .mobile-menu-button").on("click", function(event) {
		event.stopPropagation();
	});
	/* ---- End Mobile Menu ---- */

	/* ---- Booking Widget ---- */
    $(".pdpromocode").focus(function() {
        var fieldID = $(this).attr("id");
        if((fieldID == "rate_code") && ($("#prince_exec_id").val() != "")){
        	$(".pdpromocode").css("border", "1px solid red");
        	alert("Only one of the marked fields can be entered at a time. Please select one and enter your code.");
        	$("#prince_exec_id").val("");
        }else if((fieldID == "prince_exec_id") && ($("#rate_code").val() != "")){
        	$(".pdpromocode").css("border", "1px solid red");
        	alert("Only one of the marked fields can be entered at a time. Please select one and enter your code.");
        	$("#rate_code").val("");
        }

    });

	//home booking console property mssg & special rates filter
	var hapunaRates = '<option value="">Select</option><option value="HDL1">Best Available Rates</option><option value="RANDB">Room &amp; Breakfast</option><option value="randcar">Room &amp; Car</option><option value="CORP">Corporate Rate</option>';
	var waikikiRates = '<option value="">Select</option><option value="HDL1">Best Available Rates</option><option value="RANDB">Room &amp; Breakfast</option><option value="randcar">Room &amp; Car</option><option value="CORP">Corporate Rate</option><option value="GOV">Govâ€™t/Military Rate</option>';

	$('#reservations-console .submit').click(function(){
		var arrival_date = $('#arrival').val(); //03/10/2015
		var temp = arrival_date.split("/");
		arrival_date =  temp[2] + "-" +  temp[0] + "-" + temp[1];
			
		var departure_date = $('#departure').val();
		var temp = departure_date.split("/");
		departure_date =  temp[2] + "-" +  temp[0] + "-" + temp[1];
		
		$('#arrival_date').val(arrival_date);
		$('#departure_date').val(departure_date);
		
		$('#rooms').val($('#pdrooms').val());
		$('#children_reztrip').val($('#children').val());
		$('#adults_reztrip').val($('#adults').val());
	});		

	$("select#propertyCode").change(function() {
		$('#reservations-console input[name="isSearch"]').remove();
		if ($("select option:selected").hasClass('maunakbh')) {
			$('#reservations-console').attr("action","https://www.marriott.com/reservation/availabilitySearch.mi");
			$('#reservations-console').attr('method','post');
			$('#reservations-console').addClass("track-crossdomain");
			$('#reservations-console').prepend('<input type="hidden" value="false" name="isSearch"/>');
			$('div.mauna-mssg').show();
			$('div.hapuna-mssg').hide();
			$('div.waikiki-mssg').hide();
		}
		else if ($("select option:selected").hasClass('hapunabph')) {
			$('#reservations-console').removeClass("track-crossdomain").attr("action","https://princeresortshawaii-hapuna-beach-prince-hotel.reztrip.com/search");
			$('#reservations-console').attr('method','get');
			$('div.mauna-mssg').hide();
			$('div.hapuna-mssg').show();
			$('div.waikiki-mssg').hide();
		}
		else if ($("select option:selected").hasClass('hphwaikiki')) {
			$('#reservations-console').removeClass("track-crossdomain").attr("action","https://princeresortshawaii-hawaii-prince-hotel-waikiki.reztrip.com/search");
			$('#reservations-console').attr('method','get');
			$('div.mauna-mssg').hide();
			$('div.hapuna-mssg').hide();
			$('div.waikiki-mssg').show();
		} else {
			$('#reservations-console').removeClass("track-crossdomain").attr("action","https://www.marriott.com/reservation/availabilitySearch.mi");
			$('#reservations-console').attr('method','post');
			$('div.mauna-mssg').hide();
			$('div.hapuna-mssg').hide();
			$('div.waikiki-mssg').hide();
		}
	});
	
	$('#reservations-console').submit(function(){
		var prefId = $("#rate_code").val();
		var execId = $("#prince_exec_id").val();
		if (prefId != '') {
			$("#pdpromocode_hidden").val(prefId);
		}
		if (execId != '') {
			$("#pdpromocode_hidden").val(execId);
		}
		if ( $("#propertyCode").val() == 0) {
			alert("Please select a hotel.");
			return false;
		} else {
			return true;
		}
	});

	// Set number of months to display on mobile & desktop/tablet
	if ($(window).width() > 640) {
		$("#departure").datepicker({
			onSelect: function () {
				var datein = $('#arrival').datepicker('getDate');
				var dateout = $('#departure').datepicker('getDate');
				var date2 = $('#arrival').datepicker('getDate', '+1d');
				date2.setDate(date2.getDate() + 1);
				if (dateout <= datein) {
					alert("Departure date must come after arrival date.")
					var date2 = $('#arrival').datepicker('getDate', '+1d');
					date2.setDate(date2.getDate() + 1);
					$("#departure").datepicker("setDate", date2);
				}
			},
			dateFormat: 'mm/dd/yy',
			showOn: 'focus',
			minDate: 0
		});
		$("#arrival").datepicker({
			onSelect: function () {
				var datein = $('#arrival').datepicker('getDate');
				var dateout = $('#departure').datepicker('getDate');
				var date2 = $('#arrival').datepicker('getDate', '+1d');
				if (date2 !== null) {
					date2.setDate(date2.getDate() + 1);
					if (datein >= dateout) {
						$("#departure").datepicker("setDate", date2);
					}
				}
			},
			dateFormat: 'mm/dd/yy',
			showOn: 'focus',
			minDate: 0
		});
		$("#departure").datepicker("option", { numberOfMonths: 2 });
		$("#arrival").datepicker("option", { numberOfMonths: 2 });		
	} else {
		// $("#departure").datepicker("option", { numberOfMonths: 1 });
		// $("#arrival").datepicker("option", { numberOfMonths: 1 });
	}

	// Initialize form and validation
	$('form').initializeForm();
	$('.validate').formValidate();

	// Hide form fields except for hotel selection on mobile
	if ($(window).width() <= 640) {
		$(".js-form-fields").css({"opacity": 0, "display": "none"});
		//$("#reservations-console button[type=submit]").off(".mobile").on("click.mobile touchend.mobile", showBookingWidget);
	}
	$(window).on("resize", function(event){
		if ($(window).width() > 640) {
			$(".js-form-fields").css({"opacity": 1, "display": "inline-block"});
			//$("#reservations-console button[type=submit]").off(".mobile");
		} else {
			$(".js-form-fields").css({"opacity": 0, "display": "none"});
			// $("#reservations-console button[type=submit]").off(".mobile").on("click.mobile touchend.mobile", showBookingWidget);
		}
	});

	/* ---- End Booking Widget ---- */

	/* ---- Smooth scroll for internal links ----  */
	if ( window.location.hash ) {
		var target = $(window.location.hash);
		target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		if (target.length) {
			var fixedHeader = $(".sticky-nav").height();
			$('html,body').animate({ scrollTop: (target.offset().top - fixedHeader) }, 1000);
			return false;
		}
	}
});

function adjustColumns(col1, col2) {
	col1.css("height","");
	col2.css("height","");
	var col1Height = col1.height();
	var col2Height = col2.height();
	if (col1Height > col2Height) {
		col2.css("height", col1Height+"px");
	} else {
		col1.css("height", col2Height+"px");
	}
}

function showBookingWidget(event) {
	event.preventDefault();
	$(".js-form-fields").animate({ opacity: 1, height: "toggle" });
	$("#reservations-console button[type=submit]").off(".mobile");
}
