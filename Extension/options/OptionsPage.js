class OptionsPage {

	static setValuesOnInputs (results) {
		for (let name in results) {
			let value = results[name],
				id = name,
				input = qid(id);
			if (input) {
				if (name == 'options.JiraURLPattern' || name == 'options.FisheyeURLPattern') {
					input.value = value;
				} else {
					input.checked = value;
				}
			}
		}

		setTimeout(function () {
			var clickableAtlassianIcons = qid('options.ClickableAtlassianIcons');
			if (!clickableAtlassianIcons.checked) {
				q('.atlassian-url-inputs').style.display = 'none';
			}
			clickableAtlassianIcons.addEventListener('change', function () {
				q('.atlassian-url-inputs').style.display = (this.checked) ? 'block' : 'none';
			});
			document.body.classList.remove('preload');
		}, 10);

	}

	static saveOptionsOnChange () {

		for (let button of qq('.options-button')) {
			button.addEventListener('click', function () {
				AtlassianInputDisplay.submit(this.parentNode.querySelector('input'));
			});
		}

		for (let input of qq('.options-input')) {

			if (input.type == 'url') {
				input.addEventListener('keydown', function (event) {
					if (event.key == 'Enter') {
						AtlassianInputDisplay.submit(input);
					}
				});
			}

			input.addEventListener('change', function () {
				let input = this,
					value;
				switch (input.type) {
					case 'radio' :
						value = document.querySelector(`input[name="${input.name}"]:checked`).value;
						break;
					case 'checkbox' :
						value = input.checked;
						break;
					default :
						return;
				}
				OptionsPage.saveOption(input.name, value);
			});
		}
	}

	static saveOption(name, value) {
		chrome.storage.sync.set( { [name] : value } );
		if (name == 'options.ShowLabelText' && !Global.getItem('options.ShowLabelTextChanged')) {
			chrome.storage.sync.set({ 'options.ShowLabelTextChanged' : true });
		}
	}

}
