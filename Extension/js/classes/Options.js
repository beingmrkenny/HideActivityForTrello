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
			'options.HideCompleted' : false,
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