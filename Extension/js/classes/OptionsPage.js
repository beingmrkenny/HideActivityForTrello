class OptionsPage {

	static setValuesOnInputs (results) {
		for (let name in results) {
			let input, value = results[name], id = name;
			if (typeof value != 'boolean') {
				id = name;
				value = true;
			}
			input = qid(id);
			if (input) {
				input.checked = value;
			}
		}
		setTimeout(function () {
			document.body.classList.remove('preload');
		}, 10);
	}

	static saveOptionsOnChange () {
		for (let optionInput of qq('.options-input')) {
			optionInput.addEventListener('change', function () {
				let input = this,
					name = input.name,
					value;
				switch (input.type) {
					case 'radio' :
						value = document.querySelector(`input[name="${input.name}"]:checked`).value;
						break;
					case 'checkbox' :
						value = input.checked;
						break;
					default :
						value = input.value;
				}
				chrome.storage.sync.set( { [name] : value } );
				if (name == 'options.ShowLabelText' && !Global.getItem('options.ShowLabelTextChanged')) {
					chrome.storage.sync.set({ 'options.ShowLabelTextChanged' : true });
				}
			});
		}
	}

}
