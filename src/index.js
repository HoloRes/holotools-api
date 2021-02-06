/**
 * @module holoapi
 */

class Client {
	/**
	 * @param {Object} settings={url: https://api.holotools.app/v1/} The Holotools API url
	 */
	constructor(settings = {}) {
		this.url = settings.url || 'https://api.holotools.app/v1/';
		this.videos = require('./client/videos');
	}
}

module.exports = Client;
