class LinkLinks {

	static getURLRegex () {
		var patterns = [ '(https?://[^ ]+)' ];
		if (Global.getItem('options.ClickableAtlassianIcons')) {
			if (Global.getItem('options.FisheyeURLPattern')) {
				patterns.push('([a-z\\d]+-\\d+f?)');
			} else if (Global.getItem('options.JiraURLPattern')) {
				patterns.push('([a-z\\d]+-\\d+)');
			}
		}
		return new RegExp(patterns.join('|'), 'ig');
	}

	static createLinkElement (match, ...classNames) {
		var url, title, classSubstring,
			jiraURL = Global.getItem('options.JiraURLPattern'),
			fisheyeURL = Global.getItem('options.FisheyeURLPattern'),
			matchIsURL = /^https?:\/\//.test(match),
			matchIsFisheye = /[a-z\d]+-\d+f/i.test(match),
			matchIsJira = /[a-z\d]+-\d+/i.test(match);
		if (matchIsURL) {
			let jiraRegex = new RegExp(jiraURL.replace(/\//g, '\\/').replace('(key)', '[a-z\\d]+-\\d+'), 'i'),
				fisheyeRegex = new RegExp(fisheyeURL.replace(/\//g, '\\/').replace('(key)', '[a-z\\d]+-\\d+'), 'i');
			url = title = match;
			classSubstring = 'plain';
			if (jiraRegex.test(url)) {
				classSubstring = 'jira';
			}
			if (fisheyeRegex.test(url)) {
				classSubstring = 'fisheye';
			}
		} else if (matchIsFisheye) {
			title = match.toUpperCase().replace(/f$/i, '');
			url = fisheyeURL.replace('(key)', title);
			classSubstring = 'fisheye';
		} else if (matchIsJira) {
			title = match.toUpperCase();
			url = jiraURL.replace('(key)', title);
			classSubstring = 'jira';
		}
		if (url) {
			let link = createElement(`<a target="_blank"
				href="${url}"
				data-title="${title}"
				class="trellala_${classSubstring}"><span>${url}</span></a>`);
			link.classList.add(...classNames);
			return link;
		}
	}

	static processCards (cards) {
		for (let card of cards) {
			if (card.classList.contains('list-card')
				&& !card.classList.contains('placeholder')
				&& !card.getAttribute('style')
			) {
				LinkLinks.toggleListCardURLButtons(card);
				Process.watchListCardTitlesForChange([ q('.list-card-title', card) ]);
			}
		}
	}

	static toggleAllListCardURLButtons () {
		for (let listCard of qq('.list-card')) {
			LinkLinks.toggleListCardURLButtons (listCard);
		}
	}

	static toggleListCardURLButtons (listCard) {
		if (listCard.classList.contains('js-composer')) {
			return;
		}
		for (let link of qq('.trellala_list-card-url-button', listCard)) {
			link.remove();
		}
		listCard.classList.remove('trellala_list-card-url-button-card', 'trellala_atlassian-button-card');
		if (Global.getItem('options.ClickableURLIcons') || Global.getItem('options.ClickableAtlassianIcons')) {
			let cardTitle = ovalue(q('.list-card-title', listCard), 'textContent'),
				cardShortId = ovalue(q('.card-short-id', listCard), 'textContent'),
				linkElements = LinkLinks.getLinkElements(cardTitle.replace(new RegExp('^'+cardShortId), ''));
			if (linkElements.length) {
				for (let linkElement of linkElements) {
					if (linkElement.classList.contains('trellala_jira') || linkElement.classList.contains('trellala_fisheye')) {
						listCard.classList.add('trellala_atlassian-button-card');
					}
					listCard.appendChild(linkElement);
					listCard.classList.add('trellala_list-card-url-button-card');
				}
			}
		}
	}

	static getLinkElements (cardTitle) {
		var re = LinkLinks.getURLRegex(),
			matches = cardTitle.match(re),
			linkElements = [];
		if (matches) {
			for (let match of matches) {
				let linkElement = LinkLinks.createLinkElement(match, 'trellala_list-card-url-button');
				if (linkElement) {
					linkElement.addEventListener('click', function (e) {
						e.stopPropagation();
					});
					linkElements.push(linkElement);
				}
			}
		}
		return linkElements;
	}

	static toggleOpenCardURLButtons () {
		var title = ovalue(q('.js-title-helper'), 'textContent');
		if (title) {
			var sidebar = q('.window-sidebar');
			for (let button of qq('.trellala_sidebar-url-button', sidebar)) {
				button.remove();
			}
			if (Global.getItem('options.ClickableURLIcons')) {
				let re = LinkLinks.getURLRegex(),
					matches = title.match(re);
				if (matches) {
					matches = matches.filter( (value, index, self) => { return self.indexOf(value) === index; });
					if (matches.length) {
						let module = LinkLinks.getWindowModule();
						for (let url of matches) {
							let link = LinkLinks.createLinkElement(url, 'trellala_sidebar-url-button', 'button-link');
							if (!q(`[href="${url}"]`, module)) {
								module.appendChild(link);
							}
						}
					}
				}
			}
		}
	}

	static getWindowModule () {
		var windowModule = q('.trellala-atlassian-link-buttons');
		if (!windowModule) {
			let sidebar = q('.window-sidebar');
			windowModule = createElement('<div class="window-module u-clearfix trellala-atlassian-link-buttons"></div>');
			sidebar.insertBefore(windowModule, sidebar.firstElementChild);
		}
		return windowModule;
	}

}
