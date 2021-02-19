"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// Imports
const axios_1 = __importDefault(require("axios"));
const util_1 = require("../util");
class VideoHandler {
    /**
     * @internal
     */
    constructor(settings = {}) {
        var _a;
        this.url = (_a = settings.url) !== null && _a !== void 0 ? _a : 'https://api.holotools.app/v1';
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
                const liveVideoData = data.live.map((ls) => {
                    var _a, _b, _c, _d, _e, _f, _g;
                    return ({
                        id: ls.id,
                        youtubeId: (_a = ls.ytVideoKey) !== null && _a !== void 0 ? _a : undefined,
                        bilibiliId: (_b = ls.bbVideoId) !== null && _b !== void 0 ? _b : undefined,
                        title: ls.title,
                        thumbnail: (_c = ls.thumbnail) !== null && _c !== void 0 ? _c : undefined,
                        scheduledDate: ls.liveSchedule ? new Date(ls.liveSchedule) : undefined,
                        startDate: ls.liveStart ? new Date(ls.liveStart) : undefined,
                        endDate: undefined,
                        viewers: (_d = ls.liveViewers) !== null && _d !== void 0 ? _d : undefined,
                        channel: {
                            id: ls.channel.id,
                            youtubeId: ls.channel.ytChannelId,
                            bilibiliSpaceId: (_e = ls.channel.bbSpaceId) !== null && _e !== void 0 ? _e : undefined,
                            name: ls.channel.name,
                            description: (_f = ls.channel.description) !== null && _f !== void 0 ? _f : undefined,
                            publishedAt: ls.channel.publishedAt ? new Date(ls.channel.publishedAt) : undefined,
                            twitter: (_g = ls.channel.twitterLink) !== null && _g !== void 0 ? _g : undefined,
                        },
                    });
                });
                const endedVideoData = data.ended.map((ls) => {
                    var _a, _b, _c, _d, _e, _f;
                    return ({
                        id: ls.id,
                        youtubeId: (_a = ls.ytVideoKey) !== null && _a !== void 0 ? _a : undefined,
                        bilibiliId: (_b = ls.bbVideoId) !== null && _b !== void 0 ? _b : undefined,
                        title: ls.title,
                        thumbnail: (_c = ls.thumbnail) !== null && _c !== void 0 ? _c : undefined,
                        scheduledDate: ls.liveSchedule ? new Date(ls.liveSchedule) : undefined,
                        startDate: new Date(ls.liveStart),
                        endDate: new Date(ls.liveEnd),
                        viewers: undefined,
                        channel: {
                            id: ls.channel.id,
                            youtubeId: ls.channel.ytChannelId,
                            bilibiliSpaceId: (_d = ls.channel.bbSpaceId) !== null && _d !== void 0 ? _d : undefined,
                            name: ls.channel.name,
                            description: (_e = ls.channel.description) !== null && _e !== void 0 ? _e : undefined,
                            publishedAt: ls.channel.publishedAt ? new Date(ls.channel.publishedAt) : undefined,
                            twitter: (_f = ls.channel.twitterLink) !== null && _f !== void 0 ? _f : undefined,
                        },
                    });
                });
                const upcomingVideoData = data.upcoming.map((ls) => {
                    var _a, _b, _c, _d, _e, _f;
                    return ({
                        id: ls.id,
                        youtubeId: (_a = ls.ytVideoKey) !== null && _a !== void 0 ? _a : undefined,
                        bilibiliId: (_b = ls.bbVideoId) !== null && _b !== void 0 ? _b : undefined,
                        title: ls.title,
                        thumbnail: (_c = ls.thumbnail) !== null && _c !== void 0 ? _c : undefined,
                        scheduledDate: new Date(ls.liveSchedule),
                        startDate: undefined,
                        endDate: undefined,
                        viewers: undefined,
                        channel: {
                            id: ls.channel.id,
                            youtubeId: ls.channel.ytChannelId,
                            bilibiliSpaceId: (_d = ls.channel.bbSpaceId) !== null && _d !== void 0 ? _d : undefined,
                            name: ls.channel.name,
                            description: (_e = ls.channel.description) !== null && _e !== void 0 ? _e : undefined,
                            publishedAt: ls.channel.publishedAt ? new Date(ls.channel.publishedAt) : undefined,
                            twitter: (_f = ls.channel.twitterLink) !== null && _f !== void 0 ? _f : undefined,
                        },
                    });
                });
                resolve({
                    live: liveVideoData,
                    upcoming: upcomingVideoData,
                    ended: endedVideoData,
                    cached: data.cached,
                });
            }).catch((error) => {
                var _a;
                if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 400)
                    reject(new Error(error.response.data.message));
                else
                    reject(error);
            });
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
    get(limit = 25, offset = 0, sort = 'published_at', order = 'desc', title = '', startDate = '', endDate = '', status = '', isUploaded = false, isCaptioned = false) {
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
                const videoData = data.videos.map((video) => {
                    var _a, _b, _c, _d, _e;
                    return ({
                        id: video.id,
                        youtubeId: video.ytVideoKey,
                        bilibiliId: video.bbVideoId,
                        title: video.title,
                        thumbnail: (_a = video.thumbnail) !== null && _a !== void 0 ? _a : undefined,
                        publishedAt: video.publishedAt ? new Date(video.publishedAt) : undefined,
                        scheduledDate: video.liveSchedule ? new Date(video.liveSchedule) : undefined,
                        startDate: video.liveStart ? new Date(video.liveStart) : undefined,
                        endDate: video.liveEnd ? new Date(video.liveEnd) : undefined,
                        channel: {
                            id: video.channel.id,
                            youtubeId: video.channel.ytChannelId,
                            bilibiliSpaceId: (_b = video.channel.bbSpaceId) !== null && _b !== void 0 ? _b : undefined,
                            name: video.channel.name,
                            description: (_c = video.channel.description) !== null && _c !== void 0 ? _c : undefined,
                            photo: (_d = video.channel.photo) !== null && _d !== void 0 ? _d : undefined,
                            publishedAt: new Date(video.channel.publishedAt),
                            twitter: (_e = video.channel.twitterLink) !== null && _e !== void 0 ? _e : undefined,
                        },
                        isUploaded: video.isUploaded === 1,
                        isCaptioned: video.isCaptioned === 1,
                        durationSecs: video.durationSecs,
                    });
                });
                resolve({
                    videos: videoData,
                    total: data.total,
                    count: data.count,
                });
            }).catch((error) => {
                var _a;
                if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 400)
                    reject(new Error(error.response.data.message));
                else
                    reject(error);
            });
        });
    }
    /**
     * Get a video by its HoloAPI id
     * @param id - HoloAPI record ID of the video.
     * @param withComments - Set to true to include comments in the response.
     */
    getById(id, withComments) {
        return new Promise((resolve, reject) => {
            axios_1.default.get(`${this.url}/videos/${id}`, {
                params: {
                    with_comments: withComments ? 1 : 0,
                },
            }).then((res) => {
                var _a, _b, _c, _d, _e, _f, _g;
                const video = util_1.keysToCamel(res.data);
                const comments = withComments ? video.comments.map((comment) => ({
                    id: comment.commentKey,
                    message: comment.message,
                })) : undefined;
                resolve({
                    id: video.id,
                    youtubeId: (_a = video.ytVideoKey) !== null && _a !== void 0 ? _a : undefined,
                    bilibiliId: (_b = video.bbVideoId) !== null && _b !== void 0 ? _b : undefined,
                    status: video.status,
                    title: video.title,
                    thumbnail: (_c = video.thumbnail) !== null && _c !== void 0 ? _c : undefined,
                    scheduledDate: video.liveSchedule ? new Date(video.liveSchedule) : undefined,
                    startDate: video.liveStart ? new Date(video.liveStart) : undefined,
                    endDate: video.liveEnd ? new Date(video.liveEnd) : undefined,
                    channel: {
                        id: video.channel.id,
                        youtubeId: video.channel.ytChannelId,
                        bilibiliSpaceId: (_d = video.channel.bbSpaceId) !== null && _d !== void 0 ? _d : undefined,
                        name: video.channel.name,
                        description: (_e = video.channel.description) !== null && _e !== void 0 ? _e : undefined,
                        photo: (_f = video.channel.photo) !== null && _f !== void 0 ? _f : undefined,
                        publishedAt: new Date(video.channel.publishedAt),
                        twitter: (_g = video.channel.twitterLink) !== null && _g !== void 0 ? _g : undefined,
                    },
                    isUploaded: video.isUploaded === 1,
                    isCaptioned: video.isCaptioned === 1,
                    durationSecs: video.durationSecs,
                    comments,
                });
            }).catch((error) => {
                var _a, _b;
                if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 400 || ((_b = error.response) === null || _b === void 0 ? void 0 : _b.status) === 404)
                    reject(new Error(error.response.data.message));
                else
                    reject(error);
            });
        });
    }
    /**
     * Get a video by its YouTube id
     * @param id - YouTube ID of the video.
     * @param withComments - Set to true to include comments in the response.
     */
    getByYoutubeId(id, withComments) {
        return new Promise((resolve, reject) => {
            axios_1.default.get(`${this.url}/videos/youtube/${id}`, {
                params: {
                    with_comments: withComments ? 1 : 0,
                },
            }).then((res) => {
                var _a, _b, _c, _d, _e;
                const video = util_1.keysToCamel(res.data);
                const comments = withComments ? video.comments.map((comment) => ({
                    id: comment.commentKey,
                    message: comment.message,
                })) : undefined;
                resolve({
                    id: video.id,
                    status: video.status,
                    youtubeId: video.ytVideoKey,
                    bilibiliId: undefined,
                    title: video.title,
                    thumbnail: (_a = video.thumbnail) !== null && _a !== void 0 ? _a : undefined,
                    scheduledDate: video.liveSchedule ? new Date(video.liveSchedule) : undefined,
                    startDate: video.liveStart ? new Date(video.liveStart) : undefined,
                    endDate: video.liveEnd ? new Date(video.liveEnd) : undefined,
                    channel: {
                        id: video.channel.id,
                        youtubeId: video.channel.ytChannelId,
                        bilibiliSpaceId: (_b = video.channel.bbSpaceId) !== null && _b !== void 0 ? _b : undefined,
                        name: video.channel.name,
                        description: (_c = video.channel.description) !== null && _c !== void 0 ? _c : undefined,
                        photo: (_d = video.channel.photo) !== null && _d !== void 0 ? _d : undefined,
                        publishedAt: new Date(video.channel.publishedAt),
                        twitter: (_e = video.channel.twitterLink) !== null && _e !== void 0 ? _e : undefined,
                    },
                    isUploaded: video.isUploaded === 1,
                    isCaptioned: video.isCaptioned === 1,
                    durationSecs: video.durationSecs,
                    comments,
                });
            }).catch((error) => {
                var _a, _b;
                if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 400 || ((_b = error.response) === null || _b === void 0 ? void 0 : _b.status) === 404)
                    reject(new Error(error.response.data.message));
                else
                    reject(error);
            });
        });
    }
    /**
     * Get a video by its bilibli id
     * @param id - bilibili ID of the video.
     */
    getByBilibiliId(id) {
        return new Promise((resolve, reject) => {
            axios_1.default.get(`${this.url}/videos/bilibili/${id}`).then((res) => {
                var _a, _b, _c, _d, _e;
                const video = util_1.keysToCamel(res.data);
                resolve({
                    id: video.id,
                    status: video.status,
                    youtubeId: undefined,
                    bilibiliId: video.bbVideoId,
                    title: video.title,
                    thumbnail: (_a = video.thumbnail) !== null && _a !== void 0 ? _a : undefined,
                    scheduledDate: video.liveSchedule ? new Date(video.liveSchedule) : undefined,
                    startDate: video.liveStart ? new Date(video.liveStart) : undefined,
                    endDate: video.liveEnd ? new Date(video.liveEnd) : undefined,
                    channel: {
                        id: video.channel.id,
                        youtubeId: video.channel.ytChannelId,
                        bilibiliSpaceId: (_b = video.channel.bbSpaceId) !== null && _b !== void 0 ? _b : undefined,
                        name: video.channel.name,
                        description: (_c = video.channel.description) !== null && _c !== void 0 ? _c : undefined,
                        photo: (_d = video.channel.photo) !== null && _d !== void 0 ? _d : undefined,
                        publishedAt: new Date(video.channel.publishedAt),
                        twitter: (_e = video.channel.twitterLink) !== null && _e !== void 0 ? _e : undefined,
                    },
                    isUploaded: video.isUploaded === 1,
                    isCaptioned: video.isCaptioned === 1,
                    durationSecs: video.durationSecs,
                });
            }).catch((error) => {
                var _a, _b;
                if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 400 || ((_b = error.response) === null || _b === void 0 ? void 0 : _b.status) === 404)
                    reject(new Error(error.response.data.message));
                else
                    reject(error);
            });
        });
    }
}
exports.default = VideoHandler;
module.exports = VideoHandler;
