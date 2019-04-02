class Options extends DataStorage {

	static fillBlanksWithDefaults (results) {
		var defaults = Options.defaults('options');
		for (let key of Object.keys(defaults)) {
			if (results.hasOwnProperty(key) === false) {
				results[key] = defaults[key];
				chrome.storage.sync.set({ [key] : defaults[key] });
			}
		}
		return results;
	}

	static defaults (prefix = false) {
		var defaults = {
			'options.HideActivity': true,
			'options.ClickableURLIcons': false,
			'options.ClickableAtlassianIcons': false,
			'options.JiraURLPattern': '',
			'options.FisheyeURLPattern': '',
			'options.HideCompleted' : false,
			'options.ShowLabelText' : false,
			'options.ShowLabelTextChanged' : false,
			'options.FocusTwoFactor' : false,
			'version' : 1
		}
		if (prefix) {
			for (let propName of Object.keys(defaults)) {
				if (!propName.startsWith(prefix)) {
					delete defaults[propName];
				}
			}
		}
		return defaults;
	}

}
