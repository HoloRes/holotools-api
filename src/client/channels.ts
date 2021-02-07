// Imports
import axios from 'axios';

// Types
import { ChannelData, Settings } from '../types';
import { keysToCamel } from '../util';
// TODO: Transform responses to more easily usable objects, better errors

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
		sort = '',
		order: '' | 'asc' | 'desc' = '',
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
					resolve(keysToCamel(res.data));
				}).catch(reject);
		});
	}
}

export default ChannelHandler;
// @ts-expect-error Redefine error
export = ChannelHandler;
