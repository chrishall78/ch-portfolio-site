$(function() {
	//Global variables

	// TRACKING JS START
	/*if ( DOMAIN_TRACKING ) {
		var trackDomains = DOMAIN_TRACKING.split(',');
		for (var i=trackDomains.length-1;i>=0;i--) {
			$('a[href*="'+trackDomains[i]+'"], form[action*="'+trackDomains[i]+'"]').addClass('track-crossdomain');
		}
	}
	if ( FILETYPE_TRACKING ) {
		var trackFiles = FILETYPE_TRACKING.split(',');
		for (var i=trackFiles.length-1;i>=0;i--) {
			var a = $('a[href$="'+trackFiles[i]+'"]');
			a.addClass('track').attr('name','download:'+a.attr('href'));
		}
	}

	// Tracking email links / set email as the name
	$('a[href^="mailto:"]').each(function(){
		$(this).attr('name',$(this).attr('href')).addClass('track');
	});

	$('body').delegate("a.track, a.track-crossdomain", "click", function(e){
		var tag = '';
		if ( this.name ) { tag = '/'+this.name.replace(/:/g,'/'); }
		if (tag) { _gaq.push(['_trackEvent','link','click', tag]); }
		if ( $(this).hasClass('track-crossdomain') ) {
			e.preventDefault();
			var lh = this.href
			if ($(this).attr('target') == '_blank') {
				_gaq.push(function () {
					var pageTracker = _gat._getTrackerByName();
					var l = pageTracker._getLinkerUrl(lh);
					window.open(l, '');
				});
			} else {
				_gaq.push(function () {
					var pageTracker = _gat._getTrackerByName();
					var l = pageTracker._getLinkerUrl(lh);
					window.location = l;
				});
			}
		}
	});

	$('body').delegate("form.track, form.track-crossdomain", "submit", function(e){
		var tag = '';
		if ( this.name ) { tag = '/'+this.name.replace(/:/g,'/'); }
		var a = $(this).attr('action');
		if (tag) { _gaq.push(['_trackEvent','form', 'submit', tag]); }
		if ( $(this).hasClass('track-crossdomain') ) {
			$(this).attr({action:a+'?'+$(this).serialize(), method:'post'});
			_gaq.push(['_linkByPost',this]);
		}
	});*/
	// TRACKING JS END

});

(function($) {
	$.fn.initializeForm = function(options) {
		var defaults = {
			calText: 'Click to select a date',
			dateFormat: 'mm/dd/yyyy'
		},
		opts = $.extend(defaults, options),
		focusIsSupported = (function(){
		    // Create an anchor + some styles including ':focus'.
		    // Focus the anchor, test if style was applied,
		    // if it was then we know ':focus' is supported.

		    var ud = 't' + +new Date(),
		    anchor = $('<a id="' + ud + '" href="#"/>').css({top:'-999px',position:'absolute'}).appendTo('body'),
		    style = $('<style>#'+ud+'{font-size:10px;}#'+ud+':focus{font-size:1px !important;}</style>').appendTo('head'),
		    supported = anchor.focus().css('fontSize') !== '10px';
		    anchor.add(style).remove();
		return supported;

		})();

		return this.each(function() {
			var form = $(this);

			if ( !focusIsSupported ) {
				$(".textfield")
					.focus(function() { $(this).css({backgroundColor: "#fdfcfa"}); })
					.blur(function() { $(this).css({backgroundColor: "#ffffff"}); });
				$('.required', form).each(function() {
					$(this).prev().addClass('ie-icon-required');
				});
			}

			$(".date-picker", form).each(function() {
				$(this).datepicker({
					beforeShow: setDatePicker,
					buttonImage: "/images/icon-cal.gif",
					buttonImageOnly: true ,
					buttonText: opts.calText,
					duration: "fast",
					gotoCurrent: true,
					hideIfNoPrevNext: true,
					numberOfMonths: 2,
					showAnim: "blind",
					showOn: "both"
				});

				if($(this).val()==opts.dateFormat) {
					$(this).val('');
				}
				else {
					if($(this).hasClass('date-end')&&$(this).hasClass('update-blocks'))
						getRange(this);
				}
			});

			$('form').submit(function() {
				if ($("#propertyCode").val() != "KOAAK") {
					$.datepicker._clearDate('.date-begin');
					$.datepicker._clearDate('.date-end');
				}
			});

			// hide all "other" fields
			$("ul.checkboxgroup input.other", form).not(':radio, :checkbox').hide();
			$("ul.checkboxgroup input:not(:text)", form).click(function() {
				$('.other', $(this).parents('ul')).siblings().removeClass('required').filter(':text').hide();
				if($(this).is(':checked')) {
					$('.validation-error', $(this).parents('ul')).removeError(form);
					if($(this).hasClass('other'))
						$(this).siblings().addClass('required').show();
				}
			});

			$("div.select-other", form).hide();
			// if "Other" is selected, then show it's "other" field
			$("select.select-other", form).change( function () {
				var el = $(this).parent().next()
				if($(this).val() == "--") {
					el.show().children('label, input').addClass("required");
				} else {
					el.hide().children().removeClass("required").find("input").val("");
					$('.validation-error', el).removeError(form);
				}
			});

		});
	};

	$.fn.formValidate = function(options) {
		var defaults = {
			errorStart: 'A valid ',
			errorEnd: ' is required.'
		},
		opts = $.extend(defaults, options);
		return this.each(function() {
			var form = $(this);
			$('.submit', form).click(function() {
				var _errors = '';
				//Removes validation errors from previous submit
				$('.validation-error', form).removeError(form);

				$('.required', form).each(function() {
					var valid = true;

					if($(this).is(':input')) {
						var o = $.trim($(this).val());

						if($(this).hasClass('email')) {
							// if it's an email address make sure the email is valid using both regular expressions
							valid = /^[a-z0-9_+.-]+\@(?:[a-z0-9-]+\.)+[a-z0-9]{2,4}$/i.test(o);
							if($(this).hasClass('confirm-email')&&valid) {
								var prev = $.trim($(this).parents('.field').prev().children('.email').val());
								if(o!=prev)
									valid=!valid;
							}
						} else if (o.replace(/(?:^\s+)|(?:\s+$)/g,'').length < 1) {
							// if not an email address take out funky characters and see if its still blank
							valid = !valid;
						}
					} else if($(this).is('ul')) {
						valid = false;

						$(':radio, :checkbox', this).each(function() {
							if($(this).is(':checked'))
								valid = true;
						});
					}

					if(!valid) {
						if(form.hasClass('inline')) {
							$(this).parents('.field').children('label').addClass('validation-error');
						} else {
							var warn = $('<img />').attr('src', '/images/icon-warning.gif').addClass('validation-error');

							if( $(this).is('ul') )
								$('li:first', this).append(warn);
							else
								$(this).parent().append(warn);
						}

						if(_errors == '')
							_errors = $(this).attr("id");
					}
				});
				if(_errors.length) {
					var lbl = $('#'+_errors).parents('.field').find('label:eq(0)');
					//alert(lbl.attr('title').length?lbl.attr('title'):opts.errorStart + lbl.html().replace(/[*:]/g, '') + opts.errorEnd)
					if ($('#'+_errors).is('ul'))
						$('#'+_errors, form).find('label:eq(0)').focus();
					else
						$('#'+_errors, form).focus();
					return false;
				}

				// date translations
				var startDate = $("#arrival").val();
                var endDate = $("#departure").val();
                var mdy = startDate.split('/');
                var endMdy = endDate.split('/');
                var start = new Date(mdy[2], mdy[0]-1, mdy[1]);
                var end = new Date(endMdy[2], endMdy[0]-1, endMdy[1]);

				if($("#propertyCode").val() == "ITOMK" && form.attr('id')=='reservations-console'){
					//$(form).attr({"action":"/mauna-kea-beach-hotel/check-availability.php"});
	                var diff = (end-start)/(1000*60*60*24);
					$("#numberOfNights").val(diff);
					$("#numberOfRooms").val($("#pdrooms").val());
					$("#numberOfAdults").val($("#adults").val());
					$("#numberOfChildren").val($("#children").val());
					$("#arrivalDate").val($("#arrival").val());
				} else if($("#propertyCode").val() == "H09284" && form.attr('id')=='reservations-console'){
					//$(form).attr("action","https://www.reservations-page.com/C00535/H09284/be.ashx");
					$("#pdcheckinyyyymmdd").val(mdy[2]+mdy[0]+mdy[1]);
					$("#pdcheckoutyyyymmdd").val(endMdy[2]+endMdy[0]+endMdy[1]);
				} else if ($("#propertyCode").val() == "KOAAK" && form.attr('id')=='reservations-console'){
					$('#fromDate').val($("#arrival").val());
					$('#toDate').val($("#departure").val());
					$("#numberOfGuests").val($("#adults").val());
					$("#numberOfRooms").val($("#pdrooms").val());
				} else {
					$("#pdcheckinyyyymmdd").val(mdy[2]+mdy[0]+mdy[1]);
					$("#pdcheckoutyyyymmdd").val(endMdy[2]+endMdy[0]+endMdy[1]);
				}
			});
		});
	};

	$.fn.expand = function(options) {
		var defaults = {
			openText: 'View Details',
			closeText: 'Hide Details',
			longClass: '.package-long'
		},
		opts = $.extend(defaults, options);
		return this.each(function() {
			var obj = $(this);
			var tog = $('<div />').addClass('toggle');
			var control = $('<a />').attr('href', '#')
							.addClass('toggler')
							.html(opts.openText)
							.appendTo(tog)
							.toggle(function() { $(opts.longClass, obj).slideDown('slow'); $(this).html(opts.closeText).addClass('open'); },
									function() { $(opts.longClass, obj).slideUp('slow'); $(this).html(opts.openText).removeClass('open'); });

			$(opts.longClass, obj).after(tog).hide();
		});
	};

	$.fn.removeError = function(form) {
		return this.each(function() {
			if(form.hasClass('inline'))
				$(this).removeClass('validation-error');
			else
				$(this).remove();
		});
	};

	$.fn.ajaxCalendar = function(options) {
		var overlay = $('<div />').attr('id','overlay').css({width:$('#calendar-wrapper').width(),height:$('#calendar-wrapper').height(),opacity:0.5});
		overlay.prependTo('#calendar-wrapper');
		$(this).eventPreview();
		$(this).initializeSharing();
		return this.each(function() {
			$('#calendar-wrapper a').live('click',function(event) {
				event.preventDefault();
				overlay.fadeIn('fast');
				url = this.href.split('?');
				$.get('/direct/events-calendar-ajax.php?' + url[1], { op: 'cal' },function(data) {
					$('#calendar-wrapper').html(data).prepend(overlay);
					overlay.css({height:$('#calendar-wrapper').height()});
				});
				$.get('/direct/events-calendar-ajax.php?' + url[1], { op: 'list' },function(data) {
					$('#events-wrapper').html(data);
					overlay.fadeOut('fast');
				});
			});
		});
	};

	$.fn.eventPreview = function(options) {
		var defaults = {
			hideDetails : 'Hide Details',
			viewDetails : 'View Details'
		},
		opts = $.extend(defaults, options);
		return this.each(function() {
			$('.view-details').live('click',function(event) {
				event.preventDefault();
				$('.share-panel').hide();
				if ($(this).parent().hasClass('active')) {
					var testnode = $(this).find('*').contents().filter(function() { return this.nodeType == 3 });
					testnode.length ? testnode.after(opts.viewDetails).remove() : $(this).html(opts.viewDetails);
					$(this).parent().removeClass('active').parent().find('.event-description').slideUp('slow', function() {
						$(this).html('');
					});
				}
				else {
					var el = $(this);
					var temp = this.rel.split(':');
					$.get('/direct/events-calendar-ajax.php', { permalink: temp[0], rssfeed: temp[1], lang: LANG, op: 'details' },function(data) {
					var testnode = el.find('*').contents().filter(function() { return this.nodeType == 3 });
					testnode.length ? testnode.after(opts.hideDetails).remove() : el.html(opts.hideDetails);
					el.parent().addClass('active').parents('.event').find('.event-description').hide().html(data).slideDown('slow');
					if (AJAX_SHARE.indexOf('events')>=0) {
							gapi.plusone.go();
							twttr.widgets.load();
							FB.XFBML.parse();
							shareTrack();
						}
					});
				}
			});
		});
	};

	$.fn.postPreview = function(options) {
		var defaults = {
			hideDetails : 'Hide Full Post',
			viewDetails : 'View Full Post'
		},
		opts = $.extend(defaults, options);
		return this.each(function( counter, context ) {

			$('.post-icon', this).click(function(e) {
			    e.preventDefault();
			    $('.post-details a', context).trigger('click')
			});

			$('a.posting-details', this).toggle(function(event) {
				event.preventDefault();
				$('.share-panel').hide();
				var el = $(this);
				$.get('/direct/scrapbook-details.php', { event_id: this.id.substr(3), channel: this.rel, lang: LANG },function(data) {
					var testnode = el.find('*').contents().filter(function() { return this.nodeType == 3 });
					testnode.length ? testnode.after(opts.hideDetails).remove() : el.html(opts.hideDetails);
					el.parent().addClass('active').parents('.post').find('.post-description').hide().html(data).slideDown('slow');
					if (AJAX_SHARE.indexOf('scrapbook')>=0) {
						gapi.plusone.go();
						twttr.widgets.load();
						FB.XFBML.parse();
						shareTrack();
					}
				});
			},function(event) {
				event.preventDefault();
				$('.share-panel').hide();
				var testnode = $(this).find('*').contents().filter(function() { return this.nodeType == 3 });
				testnode.length ? testnode.after(opts.viewDetails).remove() : $(this).html(opts.viewDetails);
				$(this).parent().removeClass('active').parents('.post').find('.post-description').slideUp('slow', function() {
					$(this).html('');
				});
			});
		});
	};


	$.fn.packagePreview = function(options) {
		var defaults = {
			hideDetails : 'Hide Details',
			viewDetails : 'View Details'
		},
		opts = $.extend(defaults, options);
		return this.each(function() {
			$('a.package-details', this).toggle(function(event) {
				event.preventDefault();
				var el = $(this);
				$.get('/direct/package-details.php', { package_id: this.id.substr(3), channel: this.rel, lang: LANG },function(data) {
					var testnode = el.find('*').contents().filter(function() { return this.nodeType == 3 });
					testnode.length ? testnode.after(opts.hideDetails).remove() : el.html(opts.hideDetails);
					el.parent().addClass('active').parents('.package-wrapper').find('.package-long').hide().html(data).slideDown('slow');
					if (AJAX_SHARE.indexOf('packages')>=0) {
						gapi.plusone.go();
						twttr.widgets.load();
						FB.XFBML.parse();
						shareTrack();
					}
					$('.slim-share').show();
				});
			},function(event) {
				event.preventDefault();
				var testnode = $(this).find('*').contents().filter(function() { return this.nodeType == 3 });
				testnode.length ? testnode.after(opts.viewDetails).remove() : $(this).html(opts.viewDetails);
				$(this).parent().removeClass('active').parent().find('.package-long').slideUp('slow', function() {
					$(this).html('');
				});
				$('.slim-share').hide();
			});
		});
	};


	$.fn.initializeSharing = function() {
		return this.each(function() {
			$('.share-link').live('click',function(event) {
				event.preventDefault();
				$('.share-panel').hide();
				$(this).parents('.rss-item').find('.share-panel').css('display','inline');
			});
			$('.share-close').live('click',function(event){
				event.preventDefault();
				$(this).parents('.rss-item').find('.share-panel').slideUp('fast');
			});
		});
	};

	$.fn.initializeFollowing = function() {
		return this.each(function() {
			$('.follow-link').click(function(event) {
				event.preventDefault();
				$('.follow-panel').hide();
				$(this).siblings('.follow-panel').css('display','inline');
			});
			$('.follow-close').click(function(event){
				event.preventDefault();
				$(this).parent('.follow-panel').slideUp('fast');
			});
		});
	};

	//If the URL has a hash (anchor) bit, scroll to that.
	if ( window.location.hash ) {
		//$.scrollTo(window.location.hash);
	}

})(jQuery);

function setDatePicker(input) {
	if(($(input).hasClass('date-begin')||$(input).hasClass('date-end'))&&$(input).hasClass('update-blocks')){
		return {
			minDate: ( setDates(input, 1) ),
			maxDate: ( setDates(input, 0) ),
			onClose: function() { getRange(input); }
		};
	} else if(($(input).hasClass('date-begin')||$(input).hasClass('date-end'))&&$(input).hasClass('netbooker')){
		return {
			minDate: ( setDates(input, 1) ),
			maxDate: ( setDates(input, 0) ),
			onSelect: function() { splitDates(input); }
		};
	} else if($(input).hasClass('date-begin')||$(input).hasClass('date-end')) {
		return {
			minDate: ( setDates(input, 1) ),
			maxDate: ( setDates(input, 0) )
		};
	}
}

function setDates(input, minDate) {
	if( ($(input).hasClass('date-begin') && !$('.date-end', $(input).parent().next()).length) ||
		($(input).hasClass('date-end') && !$('.date-begin', $(input).parent().prev()).length) ) {
		return minDate ? new Date() : null;
	} else if( $(input).hasClass('date-begin') ) {
		return minDate ? new Date() : ($('.date-end', $(input).parent().next()).datepicker("getDate") ? new Date($('.date-end', $(input).parent().next()).datepicker("getDate").getTime() - 1000*60*60*24) : null);
	} else if( $(input).hasClass('date-end') ) {
		return minDate ? ($('.date-begin', $(input).parent().prev()).datepicker("getDate") ? new Date($('.date-begin', $(input).parent().prev()).datepicker("getDate").getTime() + 1000*60*60*24) : '+1d' ) : null;
	}
}

function splitDates(input) {
	var start = $(input).hasClass('date-end')?$('.date-begin', $(input).parent().prev()).datepicker("getDate"):$(input).datepicker("getDate");
	var end = $(input).hasClass('date-end')?$(input).datepicker("getDate"):$('.date-end', $(input).parent().next()).datepicker("getDate");

	if($(input).hasClass('date-begin')) {
		$('#arriveMonth').val( $.datepicker.formatDate('mm', $(input).datepicker("getDate")) );
		$('#arriveDay').val( $.datepicker.formatDate('dd', $(input).datepicker("getDate")) );
		$('#arriveYear').val( $.datepicker.formatDate('yy', $(input).datepicker("getDate")) );
	}
	if($(input).hasClass('date-end')) {
		$('#departMonth').val( $.datepicker.formatDate('mm', $(input).datepicker("getDate")) );
		$('#departDay').val( $.datepicker.formatDate('dd', $(input).datepicker("getDate")) );
		$('#departYear').val( $.datepicker.formatDate('yy', $(input).datepicker("getDate")) );
	}

	if(start&&end) {
		var one_day=1000*60*60*24;
		var days = Math.ceil((end.getTime()-start.getTime())/(one_day))
		$('#numberOfNights').val(days);
	}
}

function getRange(el) {
	var form = $(el).parents('form');
	var start = $(el).hasClass('date-end')?$('.date-begin', $(el).parent().prev()).datepicker("getDate"):$(el).datepicker("getDate");
	var end = $(el).hasClass('date-end')?$(el).datepicker("getDate"):$('.date-end', $(el).parent().next()).datepicker("getDate");

	if(start&&end) {
		var one_day=1000*60*60*24;
		var days = Math.ceil((end.getTime()-start.getTime())/(one_day))
		$('#room-requirements').show();
		createBlock(start, days, form);
		createMeeting(start, days, form);
	}
}

function createBlock(date, days, form) {
	$("#block-details", form).remove();
	var tbody = $('<tbody />').attr('id', 'block-details');

	for(var i=0; i<=days; i++) {
		var newDate = $.datepicker.formatDate('D, m/d', new Date(date.getFullYear(), date.getMonth(), date.getDate()+i) );

		tbody.append('<tr>\n\
					<th scope="row">' + newDate + '</th>\n\
					<td><input type="text" class="textfield single" maxlength="5" value="0" id="single_rooms_day_' + (i+1) + '" name="room_block[day_' + (i+1) + '][single]" /></td>\n\
					<td><input type="text" class="textfield dbl" maxlength="5" value="0" id="dbl_rooms_day_' + (i+1) + '" name="room_block[day_' + (i+1) + '][dbl]" /></td>\n\
					<td><input type="text" class="textfield suite" maxlength="5" value="0" id="suite_rooms_day_' + (i+1) + '" name="room_block[day_' + (i+1) + '][suite]" /></td>\n\
					<td><input type="text" class="textfield readonly day-total" readonly="readonly" value="0" id="day_' + (i+1) + '_total" name="room_block[day_' + (i+1) + '][total]" /></td>\n\
					</tr>');
	}
	//Add the totals row
	tbody.append('<tr><th scope="row">Room Total</th>\n\
		<td><input type="text" class="textfield readonly" readonly="readonly" value="0" id="single_rooms_total" name="room_block[single][total]" /></td>\n\
		<td><input type="text" class="textfield readonly" readonly="readonly" value="0" id="dbl_rooms_total" name="room_block[dbl][total]" /></td>\n\
		<td><input type="text" class="textfield readonly" readonly="readonly" value="0" id="suite_rooms_total" name="room_block[suite][total]" /></td>\n\
		<td><input type="text" class="textfield readonly" readonly="readonly" value="0" id="total_rooms" name="total_rooms" /></td>\n\
		</tr>');

	//add tbody to existing table
	$("#block-requirements", form).append(tbody);
	$('td input:not(.readonly)', tbody)
	    .focus(function() {
		if ( $(this).val().length ) {
		    $(this).data('num', $(this).val() )
		}
		$(this).val('');
	    })
	    .blur(function() {
		var num = $(this).data('num')
		if( $(this).val()=='') {
		    if ( !num ) {
			$(this).val(0);
		    } else {
			$(this).val( num )
		    }
		}
	    })
	    .change(function() { calcTotal(this); });
}

function createMeeting(date, days, form) {
	$("#meeting-details", form).remove();
	var tbody = $('<tbody />').attr('id', 'meeting-details');

	// For Each Number of Days that need information a row is created for each
	for(var i=0; i<=days; i++) {
		var newDate = $.datepicker.formatDate('D, m/d', new Date(date.getFullYear(), date.getMonth(), date.getDate()+i) );

		// Create a row with a cell for the day, room type and breakout room info
		tbody.append('<tr>\n\
			<th scope="row">' + newDate + '</th>\n\
			<td><select name="meeting_requirements[day_' + (i+1) + '][room_setup]">\n\
				<option value="Classroom" name="meeting_requirements[day_' + (i+1) + '][room_setup]">Classroom</option>\n\
				<option value="Boardroom" name="meeting_requirements[day_' + (i+1) + '][room_setup]">Boardroom</option>\n\
				<option value="Theater" name="meeting_requirements[day_' + (i+1) + '][room_setup]">Theater</option>\n\
				<option value="U-Shaped" name="meeting_requirements[day_' + (i+1) + '][room_setup]">U-Shaped</option>\n\
				<option value="Hollow Sq." name="meeting_requirements[day_' + (i+1) + '][room_setup]">Hollow Sq.</option>\n\
				<option value="Rounds" name="meeting_requirements[day_' + (i+1) + '][room_setup]">Rounds</option>\n\
				<option value="Reception" name="meeting_requirements[day_' + (i+1) + '][room_setup]">Reception</option>\n\
				</select></td>\n\
			<td><input type="text" class="textfield" maxlength="5" id="breakout_rooms_day_' + (i+1) + '" name="meeting_requirements[day_'+(i+1)+'][breakout_rooms]" /></td>\n\
			<td><input type="text" class="textfield" maxlength="5" id="breakout_people_day_' + (i+1) + '" name="meeting_requirements[day_'+(i+1)+'][breakout_people]" /></td>\n\
			<td><select name="meeting_requirements[day_' + (i+1) + '][breakout_setup]">\n\
				<option value="Classroom" name="meeting_requirements[day_' + (i+1) + '][breakout_setup]">Classroom</option>\n\
				<option value="Boardroom" name="meeting_requirements[day_' + (i+1) + '][breakout_setup]">Boardroom</option>\n\
				<option value="Theater" name="meeting_requirements[day_' + (i+1) + '][breakout_setup]">Theater</option>\n\
				<option value="U-Shaped" name="meeting_requirements[day_' + (i+1) + '][breakout_setup]">U-Shaped</option>\n\
				<option value="Hollow Sq." name="meeting_requirements[day_' + (i+1) + '][breakout_setup]">Hollow Sq.</option>\n\
				<option value="Rounds" name="meeting_requirements[day_' + (i+1) + '][breakout_setup]">Rounds</option>\n\
				<option value="Reception" name="meeting_requirements[day_' + (i+1) + '][breakout_setup]">Reception</option>\n\
				</select></td>\n\
			</tr>');
	}
	//add tbody to existing table
	$("#meeting-requirements", form).append(tbody);
}

function calcTotal(field) {

	var row = $(field).parents('tr'),
	    tbody = $(field).parents('tbody'),
	    rTotal=sTotal=dTotal=suite=total=0;

	$('input:not(.readonly)', row).each(function() {
		rTotal += parseInt($(this).val(), 10);
	});
	$('.day-total', row).val(rTotal);

	if($(field).hasClass('single')) {
		$('input.single', tbody).each(function() {
			sTotal += parseInt($(this).val(), 10);
		});
		$('#single_rooms_total',tbody).val(sTotal);
	}
	if($(field).hasClass('dbl')) {
		$('input.dbl', tbody).each(function() {
			dTotal += parseInt($(this).val(), 10);
		});
		$('#dbl_rooms_total',tbody).val(dTotal);
	}
	if($(field).hasClass('suite')) {
		$('input.suite', tbody).each(function() {
			dTotal += parseInt($(this).val(), 10);
		});
		$('#suite_rooms_total',tbody).val(dTotal);
	}

	$('.day-total', tbody).each(function() {
		total += parseInt($(this).val(), 10);
	});
	$('#total_rooms', tbody).val(total);
}

function openPreview(urlrequest) {
	window.open(urlrequest, 'myWindow', 'width=750,height=520,left=100,top=100,toolbar=No,location=No,scrollbars=No,status=No,resizable=No,fullscreen=No');
	document.getElementById('flashCallBox').value = urlrequest;
}
function extractParamFromUri(uri, paramName) {
  if (!uri) {
    return;
  }
  var uri = uri.split('#')[0];  // Remove anchor.
  var parts = uri.split('?');  // Check for query params.
  if (parts.length == 1) {
    return;
  }
  var query = decodeURI(parts[1]);

  // Find url param.
  paramName += '=';
  var params = query.split('&');
  for (var i = 0, param; param = params[i]; ++i) {
    if (param.indexOf(paramName) === 0) {
      return unescape(param.split('=')[1]);
    }
  }
}