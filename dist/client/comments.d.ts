import { CommentData, Settings } from '../types';
declare class CommentHandler {
    /**
     * @private
     * @internal
     */
    private url;
    /**
     * @internal
     */
    constructor(settings?: Settings);
    /**
     * Search comments by a query
     * @param query - Search query
     * @param limit - Number of videos to return
     * @param offset - Number of videos to skip
     * @param channelId - HoloAPI channel id
     */
    search(query: string, limit?: number, offset?: number, channelId?: number | ''): Promise<CommentData>;
}
export default CommentHandler;
export = CommentHandler;
