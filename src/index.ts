import VideoHandler from './client/videos';
import ChannelHandler from './client/channels';
import CommentHandler from './client/comments';
import { Settings } from './types';

class Client {
	/**
	 * @private
	 * @internal
	 */
	private url: string;

	public videos: VideoHandler;

	public channels: ChannelHandler;

	public comments: CommentHandler;

	constructor(settings: Settings = {}) {
		this.url = settings.url || 'https://api.holotools.app/v1';
		this.videos = new VideoHandler(settings);
		this.channels = new ChannelHandler(settings);
		this.comments = new CommentHandler(settings);
	}
}

export default Client;
// @ts-expect-error Redefine error
export = Client;
