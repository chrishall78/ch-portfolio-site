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
			"name": "Zippy's Restaurant",
			"description": "I worked with the team at Anthology to rebrand the website for Zippy's, an iconic Hawaii restaurant. This was timed with offering new &quot;Order &amp; Pickup&quot; functionality via a 3rd party service.",
			"date": "05/2019",
			"liveSiteUrl": "https://www.zippys.com/",
			"liveSiteText": "zippys.com",
			"thumbImageUrl": "./images/work/Zippys-Thumb.jpg",
			"topImageUrl": "./images/work/Zippys-Top.jpg",
			"tags": ["Front-end dev", "Wordpress integration", "Shopify theme", "WCAG 2.0 AA compliance"]
		},
		{
			"name": "Servco Corporate",
			"description": "I worked with the team at Anthology to update the corporate website for Servco. We built a responsive, accessible site to help them highlight their 100 year anniversary.",
			"date": "02/2019",
			"liveSiteUrl": "https://www.servco.com/",
			"liveSiteText": "servco.com",
			"thumbImageUrl": "./images/work/Servco-Thumb.jpg",
			"topImageUrl": "./images/work/Servco-Top.jpg",
			"tags": ["Front-end dev", "Wordpress integration", "Locations map", "WCAG 2.0 AA compliance"]
		},
		{
			"name": "HTA Partner Opportunities",
			"description": "I worked with the team at Anthology to to build a web application for HTA, so they can manage opportunities to promote Hawaii as a travel/tourism destination. This public portion of the app is to collect info from people interested in the posted opportunities.",
			"date": "02/2019",
			"liveSiteUrl": "https://www.hawaiitourismauthority.org//what-we-do/partner-opportunities/",
			"liveSiteText": "hawaiitourismauthority.org",
			"thumbImageUrl": "./images/work/HTA-Partner-Opportunities-Thumb.jpg",
			"topImageUrl": "./images/work/HTA-Partner-Opportunities-Top.jpg",
			"tags": ["Front-end dev", "WCAG 2.0 AA compliance"]
		},
		{
			"name": "Hawaii Tourism Authority",
			"description": "I worked with the team at Anthology to make the Hawaii Tourism Authority's website attractive, responsive and accessible. It features an extensive research section, and information on Hawaii programs, cultural and natural resources.",
			"date": "06/2018",
			"liveSiteUrl": "https://www.hawaiitourismauthority.org/",
			"liveSiteText": "hawaiitourismauthority.org",
			"thumbImageUrl": "./images/work/HTA-Thumb.jpg",
			"topImageUrl": "./images/work/HTA-Top.jpg",
			"tags": ["Front-end dev", "WCAG 2.0 AA compliance"]
		},
		{
			"name": "Foodland",
			"description": "",
			"date": "09/2017",
			"liveSiteUrl": "https://www.foodland.com/",
			"liveSiteText": "foodland.com",
			"thumbImageUrl": "./images/work/Foodland-Thumb.jpg",
			"topImageUrl": "./images/work/Foodland-Top.jpg",
			"tags": ["Front-end dev", "Drupal integration"]
		},
		{
			"name": "Drive Electric Hawaii",
			"description": "",
			"date": "08/2017",
			"liveSiteUrl": "https://www.driveelectrichi.com/",
			"liveSiteText": "driveelectrichi.com",
			"thumbImageUrl": "./images/work/Drive-Electric-Hawaii-Thumb.jpg",
			"topImageUrl": "./images/work/Drive-Electric-Hawaii-Top.jpg",
			"tags": ["Front-end dev"]
		},
		{
			"name": "Aloha Pacific FCU",
			"description": "",
			"date": "09/2016",
			"liveSiteUrl": "https://www.alohapacific.com/",
			"liveSiteText": "alohapacific.com",
			"thumbImageUrl": "./images/work/Aloha-Pacific-Thumb.jpg",
			"topImageUrl": "./images/work/Aloha-Pacific-Top.jpg",
			"tags": ["Front-end dev", "WCAG 2.0 AA compliance"]
		},
		{
			"name": "Anthology Marketing Group",
			"description": "",
			"date": "08/2015",
			"liveSiteUrl": "https://www.anthologygroup.com/",
			"liveSiteText": "anthologygroup.com",
			"thumbImageUrl": "./images/work/Anthology-Group-Thumb.jpg",
			"topImageUrl": "./images/work/Anthology-Group-Top.jpg",
			"tags": ["Front-end dev", "WCAG 2.0 AA compliance"]
		},
	],
}

if (document.getElementById("workContainer") != null) {
	var vWorkList = new Vue({
		el: "#workContainer",
		data: workData,
	});
}