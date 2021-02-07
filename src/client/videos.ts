// Imports
import axios from 'axios';

// Types
import {
	LivestreamData,
	Video,
	VideoData,
	YoutubeVideo,
	BilibiliVideo,
	Settings,
	LiveLivestream,
	UpcomingLivestream,
	EndedLivestream,
	ApiEndedLivestream,
	ApiLiveLivestream,
	ApiUpcomingLivestream,
	ApiVideo,
	ApiVideoWithComments,
	Comment,
	ApiBilibiliVideoWithComments,
	ApiYoutubeWithComments,
} from '../types';
import { keysToCamel } from '../util';

// TODO: Transform responses to more easily usable objects, better errors

class VideoHandler {
	/**
	 * @private
	 * @internal
	 */
	private url: string

	/**
	 * @internal
	 */
	constructor(settings: Settings = {}) {
		this.url = settings.url || 'https://api.holotools.app/v1';
	}

	/**
	 * Get currently live channels
	 * @param channelID - HoloAPI channel ID or YouTube channel ID.
	 * @param maxUpcomingHours - Restrain how far ahead of now to return scheduled streams. Can be used to prevent getting Free Chat rooms.
	 * @param lookbackHours - How far back to receive recently-ended streams, maximum is 12 hours.
	 * @param hideDescription - Hide the description key in all channel objects, possible bandwidth saving measure.
	 * @returns {Promise<Object>}
	 */
	getLivestreams(
		channelID = '',
		maxUpcomingHours = 48,
		lookbackHours = 0,
		hideDescription = true,
	): Promise<LivestreamData> {
		return new Promise((resolve, reject) => {
			axios.get(`${this.url}/live`, {
				params: {
					channel_id: channelID,
					max_upcoming_hours: maxUpcomingHours,
					lookback_hours: lookbackHours,
					hide_description: hideDescription ? 1 : 0,
				},
			}).then((res) => {
				// Using this function so ESLint won't yell at me anymore.
				const data = keysToCamel(res.data);
				const liveVideoData: Array<LiveLivestream> = data.live.map((ls: ApiLiveLivestream) => ({
					id: ls.id,
					youtubeId: ls.ytVideoKey || undefined,
					bilibiliId: ls.bbVideoId || undefined,
					title: ls.title,
					thumbnail: ls.thumbnail || undefined,
					scheduledDate: ls.liveSchedule ? new Date(ls.liveSchedule) : undefined,
					startDate: ls.liveStart ? new Date(ls.liveStart) : undefined,
					endDate: undefined,
					viewers: ls.liveViewers || undefined,
					channel: {
						id: ls.channel.id,
						youtubeId: ls.channel.id,
						bilibiliSpaceId: ls.channel.bbSpaceId || undefined,
						name: ls.channel.name,
						description: ls.channel.description || undefined,
						publishedAt: ls.channel.publishedAt ? new Date(ls.channel.publishedAt) : undefined,
						twitter: ls.channel.twitterLink || undefined,
					},
				}));

				const endedVideoData: Array<EndedLivestream> = data.ended.map((ls: ApiEndedLivestream) => ({
					id: ls.id,
					youtubeId: ls.ytVideoKey || undefined,
					bilibiliId: ls.bbVideoId || undefined,
					title: ls.title,
					thumbnail: ls.thumbnail || undefined,
					scheduledDate: ls.liveSchedule ? new Date(ls.liveSchedule) : undefined,
					startDate: new Date(ls.liveStart),
					endDate: new Date(ls.liveEnd),
					viewers: undefined,
					channel: {
						id: ls.channel.id,
						youtubeId: ls.channel.id,
						bilibiliSpaceId: ls.channel.bbSpaceId || undefined,
						name: ls.channel.name,
						description: ls.channel.description || undefined,
						publishedAt: ls.channel.publishedAt ? new Date(ls.channel.publishedAt) : undefined,
						twitter: ls.channel.twitterLink || undefined,
					},
				}));

				const upcomingVideoData: Array<UpcomingLivestream> = data.ended.map((ls: ApiUpcomingLivestream) => ({
					id: ls.id,
					youtubeId: ls.ytVideoKey || undefined,
					bilibiliId: ls.bbVideoId || undefined,
					title: ls.title,
					thumbnail: ls.thumbnail || undefined,
					scheduledDate: new Date(ls.liveSchedule),
					startDate: undefined,
					endDate: undefined,
					viewers: undefined,
					channel: {
						id: ls.channel.id,
						youtubeId: ls.channel.id,
						bilibiliSpaceId: ls.channel.bbSpaceId || undefined,
						name: ls.channel.name,
						description: ls.channel.description || undefined,
						publishedAt: ls.channel.publishedAt ? new Date(ls.channel.publishedAt) : undefined,
						twitter: ls.channel.twitterLink || undefined,
					},
				}));

				resolve({
					live: liveVideoData,
					upcoming: upcomingVideoData,
					ended: endedVideoData,
					cached: data.cached,
				});
			}).catch(reject);
		});
	}

	/**
	 * Returns a list of videos and streams.
	 * @param limit - The number of videos to return
	 * @param offset - The number of videos to skip.
	 * @param sort - Column name to sort by.
	 * @param order - Sort order.
	 * @param title - Video title search query.
	 * @param startDate - Cut off all videos before this date
	 * @param endDate - Cut off all videos after this date
	 * @param status - Status of video to fetch.
	 * @param isUploaded - Return only videos if true, otherwise will also return streams
	 * @param isCaptioned - Set to true to only get videos with captions
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
	): Promise<VideoData> {
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
			}).then((res) => {
				const data = keysToCamel(res.data);

				const videoData: Array<Video> = data.videos.map((video: ApiVideo) => ({
					id: video.id,
					youtubeId: video.ytVideoKey,
					bilibiliId: video.bbVideoId,
					title: video.title,
					thumbnail: video.thumbnail || undefined,
					scheduledDate: video.liveSchedule ? new Date(video.liveSchedule) : undefined,
					startDate: video.liveStart ? new Date(video.liveStart) : undefined,
					endedDate: video.liveEnd ? new Date(video.liveEnd) : undefined,
					channel: {
						id: video.channel.id,
						youtubeId: video.channel.ytChannelId,
						bilibiliSpaceId: video.channel.bbSpaceId || undefined,
						name: video.channel.name,
						description: video.channel.description || undefined,
						photo: video.channel.photo || undefined,
						publishedAt: new Date(video.channel.publishedAt),
						twitter: video.channel.twitterLink || undefined,
					},
					isUploaded: video.isUploaded === 1,
					isCaptioned: video.isCaptioned === 1,
					durationSecs: video.durationSecs,
				}));

				resolve({
					videos: videoData,
					total: data.total,
					count: data.count,
				});
			}).catch(reject);
		});
	}

	getById(id: string, withComments: boolean): Promise<Video> {
		return new Promise((resolve, reject) => {
			axios.get(`${this.url}/videos/${id}`, {
				params: {
					with_comments: withComments ? 1 : 0,
				},
			}).then((res) => {
				const video: ApiVideoWithComments = keysToCamel(res.data);

				const comments: Array<Comment>|undefined = withComments ? video.comments.map((comment) => ({
					id: comment.commentKey,
					message: comment.message,
				})) : undefined;

				resolve({
					id: video.id,
					youtubeId: video.ytVideoKey || undefined,
					bilibiliId: video.bbVideoId || undefined,
					title: video.title,
					thumbnail: video.thumbnail || undefined,
					scheduledDate: video.liveSchedule ? new Date(video.liveSchedule) : undefined,
					startDate: video.liveStart ? new Date(video.liveStart) : undefined,
					endedDate: video.liveEnd ? new Date(video.liveEnd) : undefined,
					channel: {
						id: video.channel.id,
						youtubeId: video.channel.ytChannelId,
						bilibiliSpaceId: video.channel.bbSpaceId || undefined,
						name: video.channel.name,
						description: video.channel.description || undefined,
						photo: video.channel.photo || undefined,
						publishedAt: new Date(video.channel.publishedAt),
						twitter: video.channel.twitterLink || undefined,
					},
					isUploaded: video.isUploaded === 1,
					isCaptioned: video.isCaptioned === 1,
					durationSecs: video.durationSecs,
					comments,
				});
			}).catch(reject);
		});
	}

	getByYoutubeId(id: string, withComments: boolean): Promise<YoutubeVideo> {
		return new Promise((resolve, reject) => {
			axios.get(`${this.url}/videos/youtube/${id}`, {
				params: {
					with_comments: withComments ? 1 : 0,
				},
			}).then((res) => {
				const video: ApiYoutubeWithComments = keysToCamel(res.data);

				const comments: Array<Comment>|undefined = withComments ? video.comments.map((comment) => ({
					id: comment.commentKey,
					message: comment.message,
				})) : undefined;

				resolve({
					id: video.id,
					youtubeId: video.ytVideoKey,
					bilibiliId: undefined,
					title: video.title,
					thumbnail: video.thumbnail || undefined,
					scheduledDate: video.liveSchedule ? new Date(video.liveSchedule) : undefined,
					startDate: video.liveStart ? new Date(video.liveStart) : undefined,
					endedDate: video.liveEnd ? new Date(video.liveEnd) : undefined,
					channel: {
						id: video.channel.id,
						youtubeId: video.channel.ytChannelId,
						bilibiliSpaceId: video.channel.bbSpaceId || undefined,
						name: video.channel.name,
						description: video.channel.description || undefined,
						photo: video.channel.photo || undefined,
						publishedAt: new Date(video.channel.publishedAt),
						twitter: video.channel.twitterLink || undefined,
					},
					isUploaded: video.isUploaded === 1,
					isCaptioned: video.isCaptioned === 1,
					durationSecs: video.durationSecs,
					comments,
				});
			}).catch(reject);
		});
	}

	getByBilibiliId(id: string, withComments: boolean): Promise<BilibiliVideo> {
		return new Promise((resolve, reject) => {
			axios.get(`${this.url}/videos/bilibili/${id}`, {
				params: {
					with_comments: withComments ? 1 : 0,
				},
			}).then((res) => {
				const video: ApiBilibiliVideoWithComments = keysToCamel(res.data);

				const comments: Array<Comment>|undefined = withComments ? video.comments.map((comment) => ({
					id: comment.commentKey,
					message: comment.message,
				})) : undefined;

				resolve({
					id: video.id,
					youtubeId: undefined,
					bilibiliId: video.bbVideoId,
					title: video.title,
					thumbnail: video.thumbnail || undefined,
					scheduledDate: video.liveSchedule ? new Date(video.liveSchedule) : undefined,
					startDate: video.liveStart ? new Date(video.liveStart) : undefined,
					endedDate: video.liveEnd ? new Date(video.liveEnd) : undefined,
					channel: {
						id: video.channel.id,
						youtubeId: video.channel.ytChannelId,
						bilibiliSpaceId: video.channel.bbSpaceId || undefined,
						name: video.channel.name,
						description: video.channel.description || undefined,
						photo: video.channel.photo || undefined,
						publishedAt: new Date(video.channel.publishedAt),
						twitter: video.channel.twitterLink || undefined,
					},
					isUploaded: video.isUploaded === 1,
					isCaptioned: video.isCaptioned === 1,
					durationSecs: video.durationSecs,
					comments,
				});
			}).catch(reject);
		});
	}
}

export default VideoHandler;
// @ts-expect-error Redefine error
export = VideoHandler;
