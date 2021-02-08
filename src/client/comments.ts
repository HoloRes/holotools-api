// Imports
import axios, { AxiosError } from 'axios';

// Types
import {
	ApiVideoWithComments, Channel, Comment, CommentData, Settings, VideoWithComments,
} from '../types';
import { keysToCamel } from '../util';

class CommentHandler {
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
	 * Search comments by a query
	 * @param query - Search query
	 * @param limit - Number of videos to return
	 * @param offset - Number of videos to skip
	 * @param channelId - HoloAPI channel id
	 */
	search(query: string, limit = 25, offset = 0, channelId: number | '' = ''): Promise<CommentData> {
		return new Promise((resolve, reject) => {
			axios.get(`${this.url}/comments/search`, {
				params: {
					q: query,
					limit,
					offset,
					channel_id: channelId,
				},
			})
				.then((res) => {
					const data = keysToCamel(res.data);

					const videoData: Array<VideoWithComments> = data.comments.map((video: ApiVideoWithComments) => {
						const commentData: Array<Comment> = video.comments.map((comment) => ({
							id: comment.commentKey,
							message: comment.message,
						}));

						const channel: Channel = {
							id: video.channel.id,
							youtubeId: video.channel.ytChannelId,
							bilibiliSpaceId: video.channel.bbSpaceId || undefined,
							name: video.channel.name,
							description: video.channel.description || undefined,
							photo: video.channel.photo || undefined,
							publishedAt: new Date(video.channel.publishedAt),
							twitter: video.channel.twitterLink || undefined,
						};

						return {
							id: video.id,
							status: video.status,
							youtubeId: video.ytVideoKey || undefined,
							bilibiliSpaceId: video.bbVideoId || undefined,
							title: video.title,
							thumbnail: video.thumbnail || undefined,
							scheduledDate: video.liveSchedule ? new Date(video.liveSchedule) : undefined,
							startDate: video.liveStart ? new Date(video.liveStart) : undefined,
							endedDate: video.liveEnd ? new Date(video.liveEnd) : undefined,
							channel,
							comments: commentData,
						};
					});

					resolve({
						data: videoData,
						count: data.count,
						cached: data.cached,
						query: data.query,
					});
				}).catch((error: AxiosError) => {
					if (error.response?.status === 400) reject(new Error(error.response.data.message));
					else reject(error);
				});
		});
	}
}

export default CommentHandler;
// @ts-expect-error Redefine error
export = CommentHandler;
