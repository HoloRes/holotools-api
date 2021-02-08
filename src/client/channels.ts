// Imports
import axios, { AxiosError } from 'axios';

// Types
import {
	ApiChannel, Channel, ChannelData, Settings,
} from '../types';
import { keysToCamel } from '../util';

class ChannelHandler {
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
	 * Returns a list of channels
	 * @param limit - The number of channels to return
	 * @param offset - The number of channels to skip.
	 * @param sort - Column name to sort by.
	 * @param order - Sort order.
	 * @param name - Channel name search query.
	 */
	get(
		limit = 25,
		offset = 0,
		sort = 'id',
		order: 'asc' | 'desc' = 'asc',
		name = '',
	): Promise<ChannelData> {
		return new Promise((resolve, reject) => {
			axios.get(`${this.url}/channels`, {
				params: {
					limit,
					offset,
					sort,
					order,
					name,
				},
			})
				.then((res) => {
					const data = keysToCamel(res.data);

					const channelData: Array<Channel> = data.channels.map((ch: ApiChannel) => ({
						id: ch.id,
						youtubeId: ch.ytChannelId,
						bilibiliSpaceId: ch.bbSpaceId || undefined,
						name: ch.name,
						description: ch.description || undefined,
						photo: ch.photo || undefined,
						publishedAt: new Date(ch.publishedAt),
						twitter: ch.twitterLink || undefined,
					}));

					resolve({
						channels: channelData,
						total: data.total,
						count: data.count,
					});
				}).catch((error: AxiosError) => {
					if (error.response?.status === 400) reject(new Error(error.response.data.message));
					else reject(error);
				});
		});
	}

	/**
	 * Get a channel by its HoloAPI id
	 * @param id - HoloAPI id of the channel.
	 */
	getById(id: number): Promise<Channel> {
		return new Promise((resolve, reject) => {
			axios.get(`${this.url}/channels/${id}`)
				.then((res) => {
					const data = keysToCamel(res.data);

					const channelData: Channel = {
						id: data.id,
						youtubeId: data.ytChannelId,
						bilibiliSpaceId: data.bbSpaceId || undefined,
						name: data.name,
						description: data.description || undefined,
						photo: data.photo || undefined,
						publishedAt: new Date(data.publishedAt),
						twitter: data.twitterLink || undefined,
					};

					resolve(channelData);
				}).catch((error: AxiosError) => {
					if (error.response?.status === 400 || error.response?.status === 404) reject(new Error(error.response.data.message));
					else reject(error);
				});
		});
	}

	/**
	 * Get a channel by its YouTube id.
	 * @param id - YouTube id of the channel.
	 */
	getByYouTubeId(id: string): Promise<Channel> {
		return new Promise((resolve, reject) => {
			axios.get(`${this.url}/channels/youtube/${id}`)
				.then((res) => {
					const data = keysToCamel(res.data);

					const channelData: Channel = {
						id: data.id,
						youtubeId: data.ytChannelId,
						bilibiliSpaceId: data.bbSpaceId || undefined,
						name: data.name,
						description: data.description || undefined,
						photo: data.photo || undefined,
						publishedAt: new Date(data.publishedAt),
						twitter: data.twitterLink || undefined,
					};

					resolve(channelData);
				}).catch((error: AxiosError) => {
					if (error.response?.status === 400 || error.response?.status === 404) reject(new Error(error.response.data.message));
					else reject(error);
				});
		});
	}

	/**
	 * Get a channel by its Bilibili id.
	 * @param id - Bilibili id of the channel.
	 */
	getByBilibiliId(id: string): Promise<Channel> {
		return new Promise((resolve, reject) => {
			axios.get(`${this.url}/channels/bilibili/${id}`)
				.then((res) => {
					const data = keysToCamel(res.data);

					const channelData: Channel = {
						id: data.id,
						youtubeId: data.ytChannelId,
						bilibiliSpaceId: data.bbSpaceId || undefined,
						name: data.name,
						description: data.description || undefined,
						photo: data.photo || undefined,
						publishedAt: new Date(data.publishedAt),
						twitter: data.twitterLink || undefined,
					};

					resolve(channelData);
				}).catch((error: AxiosError) => {
					if (error.response?.status === 400 || error.response?.status === 404) reject(new Error(error.response.data.message));
					else reject(error);
				});
		});
	}
}

export default ChannelHandler;
// @ts-expect-error Redefine error
export = ChannelHandler;
