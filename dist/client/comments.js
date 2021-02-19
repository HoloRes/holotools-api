"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// Imports
const axios_1 = __importDefault(require("axios"));
const util_1 = require("../util");
class CommentHandler {
    /**
     * @internal
     */
    constructor(settings = {}) {
        var _a;
        this.url = (_a = settings.url) !== null && _a !== void 0 ? _a : 'https://api.holotools.app/v1';
    }
    /**
     * Search comments by a query
     * @param query - Search query
     * @param limit - Number of videos to return
     * @param offset - Number of videos to skip
     * @param channelId - HoloAPI channel id
     */
    search(query, limit = 25, offset = 0, channelId = '') {
        return new Promise((resolve, reject) => {
            axios_1.default.get(`${this.url}/comments/search`, {
                params: {
                    q: query,
                    limit,
                    offset,
                    channel_id: channelId,
                },
            })
                .then((res) => {
                const data = util_1.keysToCamel(res.data);
                const videoData = data.comments.map((video) => {
                    var _a, _b, _c, _d, _e, _f, _g;
                    const commentData = video.comments.map((comment) => ({
                        id: comment.commentKey,
                        message: comment.message,
                    }));
                    const channel = {
                        id: video.channel.id,
                        youtubeId: video.channel.ytChannelId,
                        bilibiliSpaceId: (_a = video.channel.bbSpaceId) !== null && _a !== void 0 ? _a : undefined,
                        name: video.channel.name,
                        description: (_b = video.channel.description) !== null && _b !== void 0 ? _b : undefined,
                        photo: (_c = video.channel.photo) !== null && _c !== void 0 ? _c : undefined,
                        publishedAt: new Date(video.channel.publishedAt),
                        twitter: (_d = video.channel.twitterLink) !== null && _d !== void 0 ? _d : undefined,
                    };
                    return {
                        id: video.id,
                        status: video.status,
                        youtubeId: (_e = video.ytVideoKey) !== null && _e !== void 0 ? _e : undefined,
                        bilibiliSpaceId: (_f = video.bbVideoId) !== null && _f !== void 0 ? _f : undefined,
                        title: video.title,
                        thumbnail: (_g = video.thumbnail) !== null && _g !== void 0 ? _g : undefined,
                        scheduledDate: video.liveSchedule ? new Date(video.liveSchedule) : undefined,
                        startDate: video.liveStart ? new Date(video.liveStart) : undefined,
                        endedDate: video.liveEnd ? new Date(video.liveEnd) : undefined,
                        channel,
                        comments: commentData,
                    };
                });
                resolve({
                    data: videoData,
                    count: data.count,
                    cached: data.cached,
                    query: data.query,
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
}
exports.default = CommentHandler;
module.exports = CommentHandler;
