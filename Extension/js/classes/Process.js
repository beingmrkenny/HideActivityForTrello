class Process {

	static clickHideCompleted() {
		var shownCompletedItems = document.querySelectorAll('.js-hide-checked-items:not(.hide)');
		for (let i = shownCompletedItems.length -1; i > -1; i--) {
			shownCompletedItems[i].click();
		}
	}

	static clickHideActivity() {
		var hideDetails = document.querySelector('.js-hide-details:not(.hide)')
		if (hideDetails) {
			hideDetails.click();
		}
	}

}
