{
	"manifest_version" : 2,

	"applications": {
		"gecko": {
			"id": "addon@example.com",
			"strict_min_version": "42.0"
		}
	},

	"name": "Hide Activity Details (Plus Other Tweaks) for Trello",
	"description": "Hides all the activity details on Trello cards, leaving comments visible",
	"homepage_url": "http://beingmrkenny.co.uk/web-extensions/hide-activity-trello",
	"author" : "Mark Kenny",

	"version": "3.0",

	"icons": {
		"16": "Icons/192.png",
		"32": "Icons/192.png",
		"48": "Icons/192.png",
		"64": "Icons/192.png",
		"256": "Icons/256.png"
	},

	"permissions" : [
		"storage"
	],

	"browser_action" : {
		"default_title" : "Hide Activity + Other Tweaks for Trello",
		"default_popup" : "options/index.html",
		"default_icon" : "Icons/192.png"
	},

	"content_scripts": [
		{
			"js" : [
				"js/classes/Global.js",
				"js/classes/DataStorage.js",
				"js/classes/Options.js",
				"js/classes/Process.js",
				"js/functions.js",
				"js/init.js"
			],
			"matches": [ "*://trello.com/*" ],
			"run_at": "document_start"
		}
	],

	"options_ui" : {
		"page" : "options/index.html"
	}

}
