class Global {

	static getItem(key) {
		return JSON.parse(sessionStorage.getItem(key));
	}

	static setItem(key, value) {
		sessionStorage.setItem(key, JSON.stringify(value));
	}

	static removeItem (key) {
		sessionStorage.removeItem(key);
	}

}
