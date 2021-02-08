import { Channel, ChannelData, Settings } from '../types';
declare class ChannelHandler {
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
     * Returns a list of channels
     * @param limit - The number of channels to return
     * @param offset - The number of channels to skip.
     * @param sort - Column name to sort by.
     * @param order - Sort order.
     * @param name - Channel name search query.
     */
    get(limit?: number, offset?: number, sort?: string, order?: '' | 'asc' | 'desc', name?: string): Promise<ChannelData>;
    /**
     * Get a channel by its HoloAPI id
     * @param id - HoloAPI id of the channel.
     */
    getById(id: number): Promise<Channel>;
    /**
     * Get a channel by its YouTube id.
     * @param id - YouTube id of the channel.
     */
    getByYouTubeId(id: string): Promise<Channel>;
    /**
     * Get a channel by its Bilibili id.
     * @param id - Bilibili id of the channel.
     */
    getByBilibiliId(id: string): Promise<Channel>;
}
export default ChannelHandler;
export = ChannelHandler;
