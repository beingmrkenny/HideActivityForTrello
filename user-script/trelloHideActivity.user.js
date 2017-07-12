// ==UserScript==
// @name Trello — Hide activity entries
// @description Hides all the 'activity' entries on Trello Cards — http://beingmrkenny.co.uk/trello-user-scripts
// @include https://trello.com/*
// @run-at document-start
// @version 1.1
// @author Mark Kenny
// ==/UserScript==

window.addEventListener('load', function(event) {

    var css = `
        .phenom.mod-attachment-type,
        .phenom.mod-other-type {
            display: none;
        }
    `;

	var style = document.createElement('style');
	style.setAttribute('type', 'text/css');
	style.appendChild(document.createTextNode(css));
	document.querySelector('head').appendChild(style);

});
