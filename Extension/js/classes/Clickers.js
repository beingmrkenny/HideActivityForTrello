class Clickers {

	static clickHideCompleted () {
		var shownCompletedItems = document.querySelectorAll('.js-hide-checked-items:not(.hide)');
		for (let i = shownCompletedItems.length -1; i > -1; i--) {
			shownCompletedItems[i].click();
		}
	}

	static clickHideActivity () {
		var hideDetails = document.querySelector('.js-hide-details:not(.hide)')
		if (hideDetails) {
			hideDetails.click();
		}
	}

	static clickFirstLabel (checkChanged = false) {
		if (
			checkChanged == false
			|| (checkChanged == true && true === Global.getItem('options.ShowLabelTextChanged'))
		) {
			let labelsShouldBeDisplayed = Global.getItem('options.ShowLabelText'),
				labelsAreDisplayed = (null !== document.querySelector('.body-card-label-text-on, .body-card-label-text'));
			if (labelsAreDisplayed !== labelsShouldBeDisplayed) {
				let firstLabel = q('.card-label.mod-card-front');
				if (firstLabel) {
					firstLabel.click();
				}
			}
		}
	}

}
