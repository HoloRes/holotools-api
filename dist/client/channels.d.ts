import { ChannelData, Settings } from '../types';
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
}
export default ChannelHandler;
export = ChannelHandler;
