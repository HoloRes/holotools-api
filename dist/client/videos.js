"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// Imports
const axios_1 = __importDefault(require("axios"));
const util_1 = require("../util");
// TODO: Transform responses to more easily usable objects, better errors
class VideoHandler {
    /**
     * @internal
     */
    constructor(settings = {}) {
        this.url = settings.url || 'https://api.holotools.app/v1';
    }
    /**
     * Get currently live channels
     * @param channelID - HoloAPI channel ID or YouTube channel ID.
     * @param maxUpcomingHours - Restrain how far ahead of now to return scheduled streams. Can be used to prevent getting Free Chat rooms.
     * @param lookbackHours - How far back to receive recently-ended streams, maximum is 12 hours.
     * @param hideDescription - Hide the description key in all channel objects, possible bandwidth saving measure.
     * @returns {Promise<Object>}
     */
    getLivestreams(channelID = '', maxUpcomingHours = 48, lookbackHours = 0, hideDescription = true) {
        return new Promise((resolve, reject) => {
            axios_1.default.get(`${this.url}/live`, {
                params: {
                    channel_id: channelID,
                    max_upcoming_hours: maxUpcomingHours,
                    lookback_hours: lookbackHours,
                    hide_description: hideDescription ? 1 : 0,
                },
            }).then((res) => {
                // Using this function so ESLint won't yell at me anymore.
                const data = util_1.keysToCamel(res.data);
                const liveVideoData = data.live.map((ls) => ({
                    id: ls.id,
                    youtubeId: ls.ytVideoKey || undefined,
                    bilibiliId: ls.bbVideoId || undefined,
                    title: ls.title,
                    thumbnail: ls.thumbnail || undefined,
                    scheduledDate: ls.liveSchedule ? new Date(ls.liveSchedule) : undefined,
                    startDate: ls.liveStart ? new Date(ls.liveStart) : undefined,
                    endDate: undefined,
                    viewers: ls.liveViewers || undefined,
                    channel: {
                        id: ls.channel.id,
                        youtubeId: ls.channel.id,
                        bilibiliSpaceId: ls.channel.bbSpaceId || undefined,
                        name: ls.channel.name,
                        description: ls.channel.description || undefined,
                        publishedAt: ls.channel.publishedAt ? new Date(ls.channel.publishedAt) : undefined,
                        twitter: ls.channel.twitterLink || undefined,
                    },
                }));
                const endedVideoData = data.ended.map((ls) => ({
                    id: ls.id,
                    youtubeId: ls.ytVideoKey || undefined,
                    bilibiliId: ls.bbVideoId || undefined,
                    title: ls.title,
                    thumbnail: ls.thumbnail || undefined,
                    scheduledDate: ls.liveSchedule ? new Date(ls.liveSchedule) : undefined,
                    startDate: new Date(ls.liveStart),
                    endDate: new Date(ls.liveEnd),
                    viewers: undefined,
                    channel: {
                        id: ls.channel.id,
                        youtubeId: ls.channel.id,
                        bilibiliSpaceId: ls.channel.bbSpaceId || undefined,
                        name: ls.channel.name,
                        description: ls.channel.description || undefined,
                        publishedAt: ls.channel.publishedAt ? new Date(ls.channel.publishedAt) : undefined,
                        twitter: ls.channel.twitterLink || undefined,
                    },
                }));
                const upcomingVideoData = data.ended.map((ls) => ({
                    id: ls.id,
                    youtubeId: ls.ytVideoKey || undefined,
                    bilibiliId: ls.bbVideoId || undefined,
                    title: ls.title,
                    thumbnail: ls.thumbnail || undefined,
                    scheduledDate: new Date(ls.liveSchedule),
                    startDate: undefined,
                    endDate: undefined,
                    viewers: undefined,
                    channel: {
                        id: ls.channel.id,
                        youtubeId: ls.channel.id,
                        bilibiliSpaceId: ls.channel.bbSpaceId || undefined,
                        name: ls.channel.name,
                        description: ls.channel.description || undefined,
                        publishedAt: ls.channel.publishedAt ? new Date(ls.channel.publishedAt) : undefined,
                        twitter: ls.channel.twitterLink || undefined,
                    },
                }));
                resolve({
                    live: liveVideoData,
                    upcoming: upcomingVideoData,
                    ended: endedVideoData,
                    cached: data.cached,
                });
            }).catch(reject);
        });
    }
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
    get(limit = 25, offset = 0, sort = '', order = '', title = '', startDate = '', endDate = '', status = '', isUploaded = false, isCaptioned = false) {
        return new Promise((resolve, reject) => {
            axios_1.default.get(`${this.url}/videos`, {
                params: {
                    limit,
                    offset,
                    sort,
                    order,
                    title,
                    start_date: startDate instanceof Date ? startDate.toISOString() : startDate,
                    end_date: endDate instanceof Date ? endDate.toISOString() : endDate,
                    status,
                    is_uploaded: isUploaded ? 1 : 0,
                    is_captioned: isCaptioned ? 1 : 0,
                },
            }).then((res) => {
                const data = util_1.keysToCamel(res.data);
                const videoData = data.videos.map((video) => ({
                    id: video.id,
                    youtubeId: video.ytVideoKey,
                    bilibiliId: video.bbVideoId,
                    title: video.title,
                    thumbnail: video.thumbnail || undefined,
                    scheduledDate: video.liveSchedule ? new Date(video.liveSchedule) : undefined,
                    startDate: video.liveStart ? new Date(video.liveStart) : undefined,
                    endedDate: video.liveEnd ? new Date(video.liveEnd) : undefined,
                    channel: {
                        id: video.channel.id,
                        youtubeId: video.channel.ytChannelId,
                        bilibiliSpaceId: video.channel.bbSpaceId || undefined,
                        name: video.channel.name,
                        description: video.channel.description || undefined,
                        photo: video.channel.photo || undefined,
                        publishedAt: new Date(video.channel.publishedAt),
                        twitter: video.channel.twitterLink || undefined,
                    },
                    isUploaded: video.isUploaded === 1,
                    isCaptioned: video.isCaptioned === 1,
                    durationSecs: video.durationSecs,
                }));
                resolve({
                    videos: videoData,
                    total: data.total,
                    count: data.count,
                });
            }).catch(reject);
        });
    }
    getById(id, withComments) {
        return new Promise((resolve, reject) => {
            axios_1.default.get(`${this.url}/videos/${id}`, {
                params: {
                    with_comments: withComments ? 1 : 0,
                },
            }).then((res) => {
                const video = util_1.keysToCamel(res.data);
                const comments = withComments ? video.comments.map((comment) => ({
                    id: comment.commentKey,
                    message: comment.message,
                })) : undefined;
                resolve({
                    id: video.id,
                    youtubeId: video.ytVideoKey || undefined,
                    bilibiliId: video.bbVideoId || undefined,
                    title: video.title,
                    thumbnail: video.thumbnail || undefined,
                    scheduledDate: video.liveSchedule ? new Date(video.liveSchedule) : undefined,
                    startDate: video.liveStart ? new Date(video.liveStart) : undefined,
                    endedDate: video.liveEnd ? new Date(video.liveEnd) : undefined,
                    channel: {
                        id: video.channel.id,
                        youtubeId: video.channel.ytChannelId,
                        bilibiliSpaceId: video.channel.bbSpaceId || undefined,
                        name: video.channel.name,
                        description: video.channel.description || undefined,
                        photo: video.channel.photo || undefined,
                        publishedAt: new Date(video.channel.publishedAt),
                        twitter: video.channel.twitterLink || undefined,
                    },
                    isUploaded: video.isUploaded === 1,
                    isCaptioned: video.isCaptioned === 1,
                    durationSecs: video.durationSecs,
                    comments,
                });
            }).catch(reject);
        });
    }
    getByYoutubeId(id, withComments) {
        return new Promise((resolve, reject) => {
            axios_1.default.get(`${this.url}/videos/youtube/${id}`, {
                params: {
                    with_comments: withComments ? 1 : 0,
                },
            }).then((res) => {
                const video = util_1.keysToCamel(res.data);
                const comments = withComments ? video.comments.map((comment) => ({
                    id: comment.commentKey,
                    message: comment.message,
                })) : undefined;
                resolve({
                    id: video.id,
                    youtubeId: video.ytVideoKey,
                    bilibiliId: undefined,
                    title: video.title,
                    thumbnail: video.thumbnail || undefined,
                    scheduledDate: video.liveSchedule ? new Date(video.liveSchedule) : undefined,
                    startDate: video.liveStart ? new Date(video.liveStart) : undefined,
                    endedDate: video.liveEnd ? new Date(video.liveEnd) : undefined,
                    channel: {
                        id: video.channel.id,
                        youtubeId: video.channel.ytChannelId,
                        bilibiliSpaceId: video.channel.bbSpaceId || undefined,
                        name: video.channel.name,
                        description: video.channel.description || undefined,
                        photo: video.channel.photo || undefined,
                        publishedAt: new Date(video.channel.publishedAt),
                        twitter: video.channel.twitterLink || undefined,
                    },
                    isUploaded: video.isUploaded === 1,
                    isCaptioned: video.isCaptioned === 1,
                    durationSecs: video.durationSecs,
                    comments,
                });
            }).catch(reject);
        });
    }
    getByBilibiliId(id, withComments) {
        return new Promise((resolve, reject) => {
            axios_1.default.get(`${this.url}/videos/bilibili/${id}`, {
                params: {
                    with_comments: withComments ? 1 : 0,
                },
            }).then((res) => {
                const video = util_1.keysToCamel(res.data);
                const comments = withComments ? video.comments.map((comment) => ({
                    id: comment.commentKey,
                    message: comment.message,
                })) : undefined;
                resolve({
                    id: video.id,
                    youtubeId: undefined,
                    bilibiliId: video.bbVideoId,
                    title: video.title,
                    thumbnail: video.thumbnail || undefined,
                    scheduledDate: video.liveSchedule ? new Date(video.liveSchedule) : undefined,
                    startDate: video.liveStart ? new Date(video.liveStart) : undefined,
                    endedDate: video.liveEnd ? new Date(video.liveEnd) : undefined,
                    channel: {
                        id: video.channel.id,
                        youtubeId: video.channel.ytChannelId,
                        bilibiliSpaceId: video.channel.bbSpaceId || undefined,
                        name: video.channel.name,
                        description: video.channel.description || undefined,
                        photo: video.channel.photo || undefined,
                        publishedAt: new Date(video.channel.publishedAt),
                        twitter: video.channel.twitterLink || undefined,
                    },
                    isUploaded: video.isUploaded === 1,
                    isCaptioned: video.isCaptioned === 1,
                    durationSecs: video.durationSecs,
                    comments,
                });
            }).catch(reject);
        });
    }
}
exports.default = VideoHandler;
module.exports = VideoHandler;
