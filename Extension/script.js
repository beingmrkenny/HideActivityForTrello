'use strict';

document.addEventListener('DOMContentLoaded', function () {
    watchForViewCard();
    if (window.location.pathname.startsWith('/c/')) {
		keepTrying(
			clickHideDetails,
			function () {
				var target = document.querySelector('.js-hide-details');
				return (target && !target.classList.contains('hide'));
			}
		);
	}
});

function watchForViewCard() {
    observe({
        targets : document.querySelector('.window-wrapper'),
        options  : {childList: true, subtree: false},
        callback : clickHideDetails
    });
}

function clickHideDetails() {
    var hideDetails = document.querySelector('.js-hide-details');
    if (hideDetails && !hideDetails.classList.contains('hide')) {
        hideDetails.click();
    }
}

function keepTrying(callback, checker, limit, interval) {

	interval = (isNaN(interval) ? 500 : interval);
	limit = (isNaN(limit) ? 5 : --limit);

	if (checker()) {
		callback();
	} else if (limit > 0) {
		window.setTimeout(function () {
			keepTrying(callback, checker, limit, interval);
		}, interval);
	}

}

function observe(params) {

    var observer = new MutationObserver(function (node) { params.callback(node, observer); });

    if (!params.targets && params.target) {
        params.targets = params.target;
    }

    if (params.targets instanceof NodeList || Array.isArray(params.targets)) {

        for (var i = params.targets.length - 1; i > -1; i--) {
            observer.observe(params.targets[i], params.options);
        }

    } else if (params.targets instanceof HTMLElement) {

        observer.observe(params.targets, params.options);

    }

}
