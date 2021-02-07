import VideoHandler from './client/videos';
import ChannelHandler from './client/channels';
import { Settings } from './types';
declare class Client {
    /**
     * @private
     * @internal
     */
    private url;
    videos: VideoHandler;
    channels: ChannelHandler;
    constructor(settings?: Settings);
}
export default Client;
export = Client;
