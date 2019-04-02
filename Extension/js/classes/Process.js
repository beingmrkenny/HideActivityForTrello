class Process {

	static setupCardTitleProcessing () {
		LinkLinks.toggleAllListCardURLButtons();
		Process.watchListsForNewCards();
		Process.watchListCardTitlesForChange();
	}

	static executeWhenTitleChanges (callback) {
		observe(
			q('title'),
			{ characterData: true, childList: true },
			debounce (callback, 1000)
		);
	}

	static executeWhenBoardIsDoneLoading (callback) {
		var bodyObserver = observe( qid('trello-root'), {childList: true, subtree: true},
			debounce (
				() => {
					callback();
					bodyObserver.disconnect();
				},
				1000
			)
		);
	}

	static watchListsForNewCards() {
		for (let list of qq('.list-cards')) {
			if (ovalue(list, 'dataset', 'trellalaWatched') != 'yes') {
				observe( list, { childList : true },
					debounce ( () => {
						LinkLinks.processCards(qq('.list-card', list));
					}, 50)
				);
				list.dataset.trellalaWatched = 'yes';
			}
		}
	}

	static watchListCardTitlesForChange(cardTitles = qq('.list-card-title')) {
		for (let cardTitle of cardTitles) {
			if (cardTitle && ovalue(cardTitle, 'dataset', 'trellalaWatched') != 'yes') {
				observe(
					cardTitle,
					{ characterData : true, childList : true },
					function (mutations) {
						LinkLinks.toggleListCardURLButtons(mutations[0].target.closest('.list-card'));
					}
				);
				cardTitle.dataset.trellalaWatched = 'yes';
			}
		}
	}

}
