import { LivestreamData, Video, VideoData, YoutubeVideo, BilibiliVideo, Settings } from '../types';
declare class VideoHandler {
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
     * Get currently live channels
     * @param channelID - HoloAPI channel ID or YouTube channel ID.
     * @param maxUpcomingHours - Restrain how far ahead of now to return scheduled streams. Can be used to prevent getting Free Chat rooms.
     * @param lookbackHours - How far back to receive recently-ended streams, maximum is 12 hours.
     * @param hideDescription - Hide the description key in all channel objects, possible bandwidth saving measure.
     * @returns {Promise<Object>}
     */
    getLivestreams(channelID?: string, maxUpcomingHours?: number, lookbackHours?: number, hideDescription?: boolean): Promise<LivestreamData>;
    /**
     * Returns a list of videos and streams.
     * @param limit - The number of videos to return
     * @param offset - The number of videos to skip.
     * @param sort - Column name to sort by.
     * @param order - Sort order.
     * @param title - Video title search query.
     * @param startDate - Cut off all videos before this date
     * @param endDate - Cut off all videos after this date
     * @param status - Status of video to fetch.
     * @param isUploaded - Return only videos if true, otherwise will also return streams
     * @param isCaptioned - Set to true to only get videos with captions
     */
    get(limit?: number, offset?: number, sort?: string, order?: '' | 'asc' | 'desc', title?: string, startDate?: Date | string, endDate?: Date | string, status?: '' | 'new' | 'live' | 'upcoming' | 'past' | 'missing', isUploaded?: boolean, isCaptioned?: boolean): Promise<VideoData>;
    getById(id: string, withComments: boolean): Promise<Video>;
    getByYoutubeId(id: string, withComments: boolean): Promise<YoutubeVideo>;
    getByBilibiliId(id: string, withComments: boolean): Promise<BilibiliVideo>;
}
export default VideoHandler;
export = VideoHandler;
