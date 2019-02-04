'use strict';

chrome.storage.onChanged.addListener( (changes, namespace) => {

	for (let key in changes) {

		Global.setItem(key, changes[key].newValue);

		if (window.location.pathname.startsWith('/c/')) {
			if (key == 'options.HideActivity' && changes[key].newValue === true) {
				Process.clickHideActivity();
			}
			if (key == 'options.HideCompleted' && changes[key].newValue === true) {
				Process.clickHideCompleted();
			}
		}

	}

});

document.addEventListener('DOMContentLoaded', function () {

	DataStorage.initialise(() => {

		if (window.location.pathname == '/login' && true === Global.getItem('options.FocusTwoFactor')) {
			observe(
				q('.two-factor'),
				{attributes : true, attributeOldValue: true},
				(mutations, observer) => {
					if (mutations.attributeName == 'class' && mutations.oldValue.includes('hidden')) {
						for (let twoFactor of qq('[name="two-factor"]')) {
							if (!twoFactor.classList.contains('hidden')) {
								twoFactor.focus();
							}
						}
					}
				}
			);
		}

		// Observe window-wrapper when it exists
		checkElement('.window-wrapper').then(windowWrapper => {
			observe( windowWrapper, {childList: true}, () => {

				var checklistObserver = observe( q('.card-detail-window'), {childList: true, subtree: true},
					debounce (() => {
						if (true === Global.getItem('options.HideCompleted')) {
							Process.clickHideCompleted();
						}
						if (true === Global.getItem('options.HideActivity') && q('.js-hide-details:not(.hide)')) {
							Process.clickHideActivity();
						}
						checklistObserver.disconnect();
					},
					500
				));

			});
		});

	});

});
