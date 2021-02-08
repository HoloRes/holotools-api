import VideoHandler from './client/videos';
import ChannelHandler from './client/channels';
import CommentHandler from './client/comments';
import { Settings } from './types';
declare class Client {
    /**
     * @private
     * @internal
     */
    private url;
    videos: VideoHandler;
    channels: ChannelHandler;
    comments: CommentHandler;
    constructor(settings?: Settings);
}
export default Client;
export = Client;
