'use strict';

chrome.storage.onChanged.addListener( (changes, namespace) => {

	var atlassianOptionKeys = [
		'options.ClickableURLIcons',
		'options.ClickableAtlassianIcons',
		'options.JiraURLPattern',
		'options.FisheyeURLPattern'
	];

	for (let key in changes) {
		Global.setItem(key, changes[key].newValue);
		if (window.location.pathname.startsWith('/c/')) {
			if (key == 'options.HideActivity' && changes[key].newValue === true) {
				Clickers.clickHideActivity();
			}
			if (key == 'options.HideCompleted' && changes[key].newValue === true) {
				Clickers.clickHideCompleted();
			}
			if (key == 'options.ShowLabelText') {
				Clickers.clickFirstLabel();
			}
			if (atlassianOptionKeys.indexOf(key) > -1) {
				LinkLinks.toggleOpenCardURLButtons();
			}
		}
		if (window.location.pathname.startsWith('/b/')) {
			if (key == 'options.ShowLabelText') {
				Clickers.clickFirstLabel();
			}
			if (atlassianOptionKeys.indexOf(key) > -1) {
				LinkLinks.toggleAllListCardURLButtons();
			}
		}
	}

});

document.addEventListener('DOMContentLoaded', function () {

	DataStorage.initialise(() => {

		Process.executeWhenTitleChanges(() => {
			Clickers.clickFirstLabel(true);
			if (
				Global.getItem('options.ClickableURLIcons') ||
				(
					Global.getItem('options.ClickableAtlassianIcons') &&
					( Global.getItem('options.FisheyeURLPattern') || Global.getItem('options.JiraURLPattern') )
				)
			) {
				Process.setupCardTitleProcessing();
				if (window.location.pathname.startsWith('/c/')) {
					LinkLinks.toggleOpenCardURLButtons();
				}
			}
		});

		if (
			Global.getItem('options.ClickableURLIcons') ||
			(
				Global.getItem('options.ClickableAtlassianIcons') &&
				( Global.getItem('options.FisheyeURLPattern') || Global.getItem('options.JiraURLPattern') )
			)
		) {
			var rootObserver = observe( qid('trello-root'), {childList: true, subtree: true},
				debounce (() => {
					LinkLinks.toggleAllListCardURLButtons();
					rootObserver.disconnect();
				}, 500)
			);
		}

		if (true === Global.getItem('options.FocusTwoFactor') && window.location.pathname == '/login') {
			observe(
				q('.two-factor'),
				{attributes: true, attributeOldValue: true},
				mutations => {
					var mutation = mutations[0];
					if (mutation && mutation.attributeName == 'class' && mutation.oldValue.includes('hidden')) {
						for (let twoFactor of qq('[name="two-factor"]')) {
							if (!twoFactor.classList.contains('hidden')) {
								twoFactor.focus();
							}
						}
					}
				}
			);
		}

		executeWhenElementExists('.window-wrapper').then(windowWrapper => {
			observe( windowWrapper, {childList: true}, () => {
				var checklistObserver = observe( q('.card-detail-window'), {childList: true, subtree: true},
					debounce (
						() => {
							if (true === Global.getItem('options.HideCompleted')) {
								Clickers.clickHideCompleted();
							}
							if (true === Global.getItem('options.HideActivity') && q('.js-hide-details:not(.hide)')) {
								Clickers.clickHideActivity();
							}
							checklistObserver.disconnect();
						},
						500
					)
				);
			});
		});

	});

});
