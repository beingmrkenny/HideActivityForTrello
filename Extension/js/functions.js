function qid(id) {
	return document.getElementById(id);
}

function q(query, context = document) {
	return context.querySelector(query);
}

function qq(query, context = document) {
	return context.querySelectorAll(query);
}

function observe(targets, passedOptions, callback) {

	var options = {},
		availableOptions = {
			childList: false,
			attributes: false,
			characterData: false,
			subtree: false,
			attributeOldValue: false,
			characterDataOldValue: false
		};

	if (targets && targets instanceof HTMLElement) {
		targets = [targets];
	}

	for (let key in passedOptions) {
		if (!availableOptions.hasOwnProperty(key)) {
			console.log(`${key} is not a valid MutationObserver option`);
		} else if (typeof passedOptions[key] !== 'boolean') {
			console.log(`The value for '${key}' provided to observe()'s options must be boolean`);
		} else {
			options[key] = passedOptions[key];
		}
	}

	var observer = new MutationObserver(function (nodes) {
		if (nodes.length == 1) {
			nodes = nodes[0];
		}
		callback(nodes, observer);
	});

	if (targets) {
		for (let target of targets) {
			if (target instanceof HTMLElement) {
				observer.observe(target, options);
			}
		}
	}

	return observer;

}

async function checkElement (selector) {
	while (q(selector) === null) {
		await new Promise(resolve => requestAnimationFrame(resolve))
	}
	return q(selector);
};

function debounce(handlerFunction, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) handlerFunction.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) handlerFunction.apply(context, args);
	};
};
