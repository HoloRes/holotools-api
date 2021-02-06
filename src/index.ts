import VideoHandler from './client/videos';

class Client {
	private url: string;

	public videos: VideoHandler;

	constructor(settings: {
		url?: string
	} = {}) {
		this.url = settings.url || 'https://api.holotools.app/v1';
		this.videos = new VideoHandler(settings);
	}
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export = Client;
export default Client;
