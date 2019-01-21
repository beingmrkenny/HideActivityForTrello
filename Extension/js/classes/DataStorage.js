class DataStorage {

	static initialise (callback = null) {
		chrome.storage.sync.get(null, results => {
			results = DataStorage.removeObsolete(results);
			results = Options.fillBlanksWithDefaults(results);
			for (let propName in results) {
				Global.setItem(propName, results[propName]);
			}
			if (typeof callback == 'function') {
				callback(results);
			}
		});

		chrome.storage.onChanged.addListener( (changes, namespace) => {
			for (let key in changes) {
				var value = changes[key].newValue;
				if (typeof value == 'undefined') {
					Global.removeItem(key);
				} else {
					Global.setItem(key, value);
				}
			}
		});

	}

	static _keyNameAllowed (keyName) {
		return (Object.keys(Options.defaults()).indexOf(keyName) > -1);
	}

	static removeObsolete (results) {
		for (let propName in results) {
			if (DataStorage._keyNameAllowed(propName) === false) {
				delete results[propName];
				chrome.storage.sync.remove(propName);
			}
		}
		return results;
	}

}
