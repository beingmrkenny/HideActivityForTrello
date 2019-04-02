class AtlassianInputDisplay {

	static setup () {
		for (let input of qq('.js-check-changed:not([data-original-value])')) {
			var value = input.value;
			if (input.type && (input.type == 'radio' || input.type == 'checkbox')) {
				value = (input.checked) ? "true" : "false";
			}
			input.dataset.originalValue = value;
		}
	}

	static DOMNodesFromHTMLSnippet (htmlSnippet) {
		var parser = new DOMParser(),
			doc = parser.parseFromString(htmlSnippet, 'text/html');
		return doc.body.childNodes;
	}

	static tokeniseURL (url) {
		var returnValue;
		if (url.includes('(key)')) {
			returnValue = url;
		} else if (/^https?:\/\/.*[A-Za-z0-9]+-[0-9]+.*/.test(url)) {
			returnValue = url.replace(/[A-Za-z0-9]+-[0-9]+/, '(key)');
		} else {
			return false;
		}
		return returnValue;
	}

	static submit (input) {
		if (input.validity.valid == true) {
			let tokenisedURL = AtlassianInputDisplay.tokeniseURL(input.value);
			input.dataset.originalValue = tokenisedURL;
			input.value = tokenisedURL;
			OptionsPage.saveOption(input.name, tokenisedURL);
		}
	}

}
