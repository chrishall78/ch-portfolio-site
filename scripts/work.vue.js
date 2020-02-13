var workItem = Vue.component('work-item', {
	data: function () {
		return {
		}
	},
	props: ['current-item'],
	template:
		'<div class="col-xs-12 col-sm-6 col-md-4">\n' +
		'<div class="work-card">\n' +
		'<a v-if="currentItem.thumbImageUrl" v-bind:href="currentItem.topImageUrl" class="thumbnail"><img v-bind:src="currentItem.thumbImageUrl" v-bind:alt="currentItem.name + \' Thumbnail\'"></a>\n' +
		'<div class="content">\n' +
		'<p class="date">{{ currentItem.date }}</p>\n' +
		'<h2>{{ currentItem.name }}</h2>\n' +
		'<p class="live-site"><a v-bind:href="currentItem.liveSiteUrl" target="_blank">{{ currentItem.liveSiteText }}</a></p>' +
		'<p class="description" v-html="currentItem.description"></p>\n' +
		'<p class="tags"><strong>Contributions:</strong> ' +
		'<template v-for="tag in currentItem.tags">' +
		'<span>{{ tag }}</span> ' +
		'</template>' +
		'</p>\n' +
		'</div>\n' +
		'</div>\n' +
		'</div>\n'
});

var workData = {
	"portfolio": [
		{
			"name": "Kalaeloa Partners",
			"description": "I worked with AMG to build a website for Kalaeloa Partners, an energy company located on Oahu, Hawaii. In addition to the front end build, I integrated the site into Wordpress usng custom fields and custom post types.",
			"date": "Nov 2019",
			"liveSiteUrl": "#",
			"liveSiteText": "Not Launched Yet",
			"thumbImageUrl": "./images/work/Kalaeloa-Thumb.jpg",
			"topImageUrl": "./images/work/Kalaeloa-Top.jpg",
			"tags": ["Front-end dev", "Wordpress integration", "WCAG 2.0 AA compliance"],
			"published": 0
		},
		{
			"name": "Pomaika'i Ballrooms",
			"description": "I worked with AMG to revamp the website for Pomaika'i Ballrooms, a social event space and catering company. The focus of the rebrand was to showcase the event space and food menus, plus make it easier to plan an event.",
			"date": "Oct 2019",
			"liveSiteUrl": "https://www.pomaikaiballrooms.com/",
			"liveSiteText": "pomaikaiballrooms.com",
			"thumbImageUrl": "./images/work/Pomaikai-Thumb.jpg",
			"topImageUrl": "./images/work/Pomaikai-Top.jpg",
			"tags": ["Front-end dev", "Wordpress integration", "Shopify theme", "WCAG 2.0 AA compliance"],
			"published": 1
		},
		{
			"name": "Pualeilani Atrium Shops",
			"description": "I worked with AMG to rebrand Pualeilani Atrium Shops' website, a shopping center located within the Hyatt Regency Waikiki Beach Resort &amp; Spa. The site features a dynamic listing of stores, dining, events, plus an interactive directory map.",
			"date": "Sep 2019",
			"liveSiteUrl": "https://www.pualeilanishops.com/",
			"liveSiteText": "pualeilanishops.com",
			"thumbImageUrl": "./images/work/Pualeilani-Thumb.jpg",
			"topImageUrl": "./images/work/Pualeilani-Top.jpg",
			"tags": ["Front-end dev", "Vue", "WCAG 2.0 AA compliance"],
			"published": 1
		},
		{
			"name": "Zippy's Restaurant",
			"description": "I worked with AMG to redesign the website for Zippy's, an iconic Hawaii restaurant. This was timed with offering new &quot;Order &amp; Pickup&quot; functionality via a 3rd party service.",
			"date": "May 2019",
			"liveSiteUrl": "https://www.zippys.com/",
			"liveSiteText": "zippys.com",
			"thumbImageUrl": "./images/work/Zippys-Thumb.jpg",
			"topImageUrl": "./images/work/Zippys-Top.jpg",
			"tags": ["Front-end dev", "Wordpress integration", "Shopify theme", "WCAG 2.0 AA compliance"],
			"published": 1
		},
		{
			"name": "Servco Corporate",
			"description": "I worked with AMG to update the corporate website for Servco, an automotive retail and distribution company. We built a responsive, accessible site to help them highlight their 100 year anniversary.",
			"date": "Feb 2019",
			"liveSiteUrl": "https://www.servco.com/",
			"liveSiteText": "servco.com",
			"thumbImageUrl": "./images/work/Servco-Thumb.jpg",
			"topImageUrl": "./images/work/Servco-Top.jpg",
			"tags": ["Front-end dev", "Wordpress integration", "Locations map", "WCAG 2.0 AA compliance"],
			"published": 1
		},
		{
			"name": "HTA Partner Opportunities",
			"description": "I worked with AMG to build a web application for HTA, so they can manage opportunities to promote Hawaii as a travel/tourism destination. This public portion of the app is to collect info from people interested in the posted opportunities.",
			"date": "Feb 2019",
			"liveSiteUrl": "https://www.hawaiitourismauthority.org/what-we-do/partner-opportunities/",
			"liveSiteText": "hawaiitourismauthority.org",
			"thumbImageUrl": "./images/work/HTA-Partner-Opportunities-Thumb.jpg",
			"topImageUrl": "./images/work/HTA-Partner-Opportunities-Top.jpg",
			"tags": ["Front-end dev", "WCAG 2.0 AA compliance"],
			"published": 1
		},
		{
			"name": "Kobayashi Group",
			"description": "I worked with AMG to rebrand the Kobayashi Group website. The new site showcases the real estate properties that they have developed, provides a section for news posts, and provides more information about the company and executive team.",
			"date": "Nov 2018",
			"liveSiteUrl": "https://www.kobayashi-group.com/",
			"liveSiteText": "Not Launched Yet",
			"thumbImageUrl": "./images/work/Kobayashi-Thumb.jpg",
			"topImageUrl": "./images/work/Kobayashi-Top.jpg",
			"tags": ["Front-end dev", "WCAG 2.0 AA compliance"],
			"published": 0
		},
		{
			"name": "Halekulani",
			"description": "I worked with AMG on implementing a light redesign of the Halekulani website, featuring a new header/footer, home page, and cultural calendar.",
			"date": "Sep 2018",
			"liveSiteUrl": "https://www.halekulani.com/",
			"liveSiteText": "halekulani.com",
			"thumbImageUrl": "./images/work/Halekulani-Thumb.jpg",
			"topImageUrl": "./images/work/Halekulani-Top.jpg",
			"tags": ["Front-end dev", "Drupal integration", "Shopify theme", "WCAG 2.0 AA compliance"],
			"published": 1
		},
		{
			"name": "Hawaii Tourism Authority",
			"description": "I worked with AMG to make the Hawaii Tourism Authority's website attractive, responsive and accessible. It features an extensive research section, and information on Hawaii programs, cultural and natural resources.",
			"date": "Jun 2018",
			"liveSiteUrl": "https://www.hawaiitourismauthority.org/",
			"liveSiteText": "hawaiitourismauthority.org",
			"thumbImageUrl": "./images/work/HTA-Thumb.jpg",
			"topImageUrl": "./images/work/HTA-Top.jpg",
			"tags": ["Front-end dev", "WCAG 2.0 AA compliance"],
			"published": 1
		},
		{
			"name": "Foodland",
			"description": "I worked with AMG on this rebrand of the Foodland website, and assisted with the integration into their Drupal content management system. ",
			"date": "Sep 2017",
			"liveSiteUrl": "https://www.foodland.com/",
			"liveSiteText": "foodland.com",
			"thumbImageUrl": "./images/work/Foodland-Thumb.jpg",
			"topImageUrl": "./images/work/Foodland-Top.jpg",
			"tags": ["Front-end dev", "Drupal integration"],
			"published": 1
		},
		{
			"name": "Drive Electric Hawaii",
			"description": "I worked with AMG on this website promoting the use of electric vehicles (EV) in Hawaii.",
			"date": "Aug 2017",
			"liveSiteUrl": "https://www.driveelectrichi.com/",
			"liveSiteText": "driveelectrichi.com",
			"thumbImageUrl": "./images/work/Drive-Electric-Hawaii-Thumb.jpg",
			"topImageUrl": "./images/work/Drive-Electric-Hawaii-Top.jpg",
			"tags": ["Front-end dev"],
			"published": 1
		},
		{
			"name": "Aloha Pacific FCU",
			"description": "I worked with AMG to update the website for Aloha Pacific FCU, making it mobile friendly and accessible. I also worked on associated sites for credit unions they later acquired.",
			"date": "Sep 2016",
			"liveSiteUrl": "https://www.alohapacific.com/",
			"liveSiteText": "alohapacific.com",
			"thumbImageUrl": "./images/work/Aloha-Pacific-Thumb.jpg",
			"topImageUrl": "./images/work/Aloha-Pacific-Top.jpg",
			"tags": ["Front-end dev", "WCAG 2.0 AA compliance"],
			"published": 1
		},
		{
			"name": "Anthology Marketing Group",
			"description": "I helped build a new version of the Anthology Marketing Group website which made it easier for the company to showcase its clients, work, and staff members.",
			"date": "Aug 2015",
			"liveSiteUrl": "https://www.anthologygroup.com/",
			"liveSiteText": "anthologygroup.com",
			"thumbImageUrl": "./images/work/Anthology-Group-Thumb.jpg",
			"topImageUrl": "./images/work/Anthology-Group-Top.jpg",
			"tags": ["Front-end dev", "WCAG 2.0 AA compliance"],
			"published": 1
		},
		{
			"name": "FestPro iOS & Android Apps",
			"description": "Starting in 2012, I developed a native iOS app for the film festival, and later a native Android version. These apps synced film and schedule data from the web version through an API. Click thumbnail for more app screens.",
			"date": "2012 - 2016",
			"liveSiteUrl": "#",
			"liveSiteText": "No Longer Available",
			"thumbImageUrl": "./images/work/FestPro-App-Thumb.jpg",
			"topImageUrl": "./images/work/FestPro-App-Top.jpg",
			"tags": ["Design", "iOS App", "Android App", "Objective-C", "Java"],
			"published": 1
		},
		{
			"name": "FestPro Web Application",
			"description": "I built this web app for the Hawaii International Film Festival to manage the film program, schedule, and guest information for their semi-annual events. It also had a user facing version which was designed to match their current website.",
			"date": "2010 - 2016",
			"liveSiteUrl": "#",
			"liveSiteText": "No Longer Available",
			"thumbImageUrl": "./images/work/FestPro-Web-Thumb.jpg",
			"topImageUrl": "./images/work/FestPro-Web-Top.jpg",
			"tags": ["Design", "Front-end dev", "Back-end dev", "PHP", "MySQL", "PDF generation", "API"],
			"published": 1
		},
	],
}

if (document.getElementById("workContainer") != null) {
	var vWorkList = new Vue({
		el: "#workContainer",
		data: workData,
		computed: {
			publishedSites() {
				return this.portfolio.filter(site => {
					return site.published > 0;
				});
			}
		}
	});
}