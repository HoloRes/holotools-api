// Imports
import axios from 'axios';

class VideoHandler {
	private url: string;

	constructor(settings: {
		url?: string
	} = {}) {
		this.url = settings.url || 'https://api.holotools.app/v1';
	}

	/**
	 * Get currently live channels
	 * @param channelID HoloAPI channel ID or YouTube channel ID.
	 * @param maxUpcomingHours Restrain how far ahead of now to return scheduled streams. Can be used to prevent getting Free Chat rooms.
	 * @param lookbackHours How far back to receive recently-ended streams, maximum is 12 hours.
	 * @param hideDescription Hide the description key in all channel objects, possible bandwidth saving measure.
	 * @returns {Promise<Object>}
	 */
	getLive(
		channelID = '',
		maxUpcomingHours = 48,
		lookbackHours = 0,
		hideDescription = true,
	) {
		return new Promise((resolve, reject) => {
			axios.get(`${this.url}/live`, {
				params: {
					channel_id: channelID,
					max_upcoming_hours: maxUpcomingHours,
					lookback_hours: lookbackHours,
					hide_description: hideDescription ? 1 : 0,
				},
			})
				.then((res) => {
					resolve(res.data);
				}).catch(reject);
		});
	}

	/**
	 * Returns a list of videos and streams.
	 * @param [limit] The number of videos to return
	 * @param [offset] The number of videos to skip.
	 * @param [sort] Column name to sort by.
	 * @param [order] Sort order.
	 * @param [title] Video title search query.
	 * @param [startDate] Cut off all videos before this date
	 * @param [endDate] Cut off all videos after this date
	 * @param [status] Status of video to fetch.
	 * @param [isUploaded] Return only videos if true, otherwise will also return streams
	 * @param [isCaptioned] Set to true to only get videos with captions
	 * @returns {Promise<Object>}
	 */
	get(
		limit = 25,
		offset = 0,
		sort = '',
		order: '' | 'asc' | 'desc' = '',
		title = '',
		startDate: Date | string = '',
		endDate: Date | string = '',
		status: '' | 'new' | 'live' | 'upcoming' | 'past' | 'missing' = '',
		isUploaded = false,
		isCaptioned = false,
	) {
		return new Promise((resolve, reject) => {
			axios.get(`${this.url}/videos`, {
				params: {
					limit,
					offset,
					sort,
					order,
					title,
					start_date: startDate instanceof Date ? startDate.toISOString() : startDate,
					end_date: endDate instanceof Date ? endDate.toISOString() : endDate,
					status,
					is_uploaded: isUploaded ? 1 : 0,
					is_captioned: isCaptioned ? 1 : 0,
				},
			})
				.then((res) => {
					resolve(res.data);
				}).catch(reject);
		});
	}
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export = VideoHandler;
export default VideoHandler;
