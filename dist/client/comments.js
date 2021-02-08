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
        this.url = settings.url || 'https://api.holotools.app/v1';
    }
    /**
     * Search comments by a query
     * @param query - Search query
     * @param limit - Number of videos to return
     * @param offset - Number of videos to skip
     * @param channelId - HoloAPI channel id
     */
    search(query, limit = 25, offset = 0, channelId) {
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
                const videoData = data.data.map((video) => {
                    const commentData = video.comments.map((comment) => ({
                        id: comment.commentKey,
                        message: comment.message,
                    }));
                    const channel = {
                        id: video.channel.id,
                        youtubeId: video.channel.ytChannelId,
                        bilibiliSpaceId: video.channel.bbSpaceId || undefined,
                        name: video.channel.name,
                        description: video.channel.description || undefined,
                        photo: video.channel.photo || undefined,
                        publishedAt: new Date(video.channel.publishedAt),
                        twitter: video.channel.twitterLink || undefined,
                    };
                    return {
                        id: video.id,
                        youtubeId: video.ytVideoKey || undefined,
                        bilibiliSpaceId: video.bbVideoId || undefined,
                        title: video.title,
                        thumbnail: video.thumbnail || undefined,
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
