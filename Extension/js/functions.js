function qid(id) {
	return document.getElementById(id);
}

function q(query, context = document) {
	return context.querySelector(query);
}

function qq(query, context = document) {
	return context.querySelectorAll(query);
}

function ovalue(obj) {
	var base = obj;
	if (typeof base == 'object' && base !== null) {
		for (var i=1, x=arguments.length; i<x; i++) {
			if (typeof base[arguments[i]] == 'object' && base[arguments[i]] !== null) {
				base = base[arguments[i]];
			} else {
				base = base[arguments[i--]];
				break;
			}
		}
	}
	return base;
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

async function executeWhenElementExists (selector) {
	while (q(selector) === null) {
		await new Promise(resolve => requestAnimationFrame(resolve))
	}
	return q(selector);
}

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
}

function createElement(string) {
	if (typeof (string) != 'string') {
		throw 'String must be passed to createElement';
	}
	string = string.trim();
	var container = document.createElement('div')
	container.innerHTML = string;
	return container.firstElementChild;
}
