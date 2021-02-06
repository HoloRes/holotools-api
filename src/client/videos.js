// Imports
const axios = require('axios');

/**
 * Get currently live channels
 * @param {string} [channelID=null] HoloAPI channel ID or YouTube channel ID.
 * @param {number} [maxUpcomingHours=48] Restrain how far ahead of now to return scheduled streams. Can be used to prevent getting Free Chat rooms.
 * @param {number} [lookbackHours=0] How far back to receive recently-ended streams, maximum is 12 hours.
 * @param {boolean} [hideDescription=true] Hide the description key in all channel objects, possible bandwidth saving measure.
 * @returns {Promise<Object>}
 */
exports.getLive = (
	channelID,
	maxUpcomingHours,
	lookbackHours,
	hideDescription = true,
) => new Promise((resolve, reject) => {
	resolve({ test: 1 });
});

/**
 * Returns a list of videos and streams.
 * @param {number} [limit] The number of videos to return
 * @param {number} [offset] The number of videos to skip.
 * @param {string} [sort] Column name to sort by.
 * @param {string} [order]
 * @param [title]
 * @param [startDate]
 * @param [endDate]
 * @param [status]
 * @param [isUploaded]
 * @param [isCaptioned]
 * @returns {Promise<Object>}
 */
exports.get = (
	limit,
	offset,
	sort,
	order,
	title,
	startDate,
	endDate,
	status,
	isUploaded,
	isCaptioned,
) => new Promise((resolve, reject) => {
});
