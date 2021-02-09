"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// Imports
const axios_1 = __importDefault(require("axios"));
const util_1 = require("../util");
class ChannelHandler {
    /**
     * @internal
     */
    constructor(settings = {}) {
        this.url = settings.url || 'https://api.holotools.app/v1';
    }
    /**
     * Returns a list of channels
     * @param limit - The number of channels to return
     * @param offset - The number of channels to skip.
     * @param sort - Column name to sort by.
     * @param order - Sort order.
     * @param name - Channel name search query.
     */
    get(limit = 25, offset = 0, sort = 'id', order = 'asc', name = '') {
        return new Promise((resolve, reject) => {
            axios_1.default.get(`${this.url}/channels`, {
                params: {
                    limit,
                    offset,
                    sort,
                    order,
                    name,
                },
            })
                .then((res) => {
                const data = util_1.keysToCamel(res.data);
                const channelData = data.channels.map((ch) => ({
                    id: ch.id,
                    youtubeId: ch.ytChannelId,
                    bilibiliSpaceId: ch.bbSpaceId || undefined,
                    name: ch.name,
                    description: ch.description || undefined,
                    photo: ch.photo || undefined,
                    publishedAt: new Date(ch.publishedAt),
                    twitter: ch.twitterLink || undefined,
                }));
                resolve({
                    channels: channelData,
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
     * Get a channel by its HoloAPI id
     * @param id - HoloAPI id of the channel.
     */
    getById(id) {
        return new Promise((resolve, reject) => {
            axios_1.default.get(`${this.url}/channels/${id}`)
                .then((res) => {
                const data = util_1.keysToCamel(res.data);
                const channelData = {
                    id: data.id,
                    youtubeId: data.ytChannelId,
                    bilibiliSpaceId: data.bbSpaceId || undefined,
                    name: data.name,
                    description: data.description || undefined,
                    photo: data.photo || undefined,
                    publishedAt: new Date(data.publishedAt),
                    twitter: data.twitterLink || undefined,
                };
                resolve(channelData);
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
     * Get a channel by its YouTube id.
     * @param id - YouTube id of the channel.
     */
    getByYouTubeId(id) {
        return new Promise((resolve, reject) => {
            axios_1.default.get(`${this.url}/channels/youtube/${id}`)
                .then((res) => {
                const data = util_1.keysToCamel(res.data);
                const channelData = {
                    id: data.id,
                    youtubeId: data.ytChannelId,
                    bilibiliSpaceId: data.bbSpaceId || undefined,
                    name: data.name,
                    description: data.description || undefined,
                    photo: data.photo || undefined,
                    publishedAt: new Date(data.publishedAt),
                    twitter: data.twitterLink || undefined,
                };
                resolve(channelData);
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
     * Get a channel by its Bilibili id.
     * @param id - Bilibili id of the channel.
     */
    getByBilibiliId(id) {
        return new Promise((resolve, reject) => {
            axios_1.default.get(`${this.url}/channels/bilibili/${id}`)
                .then((res) => {
                const data = util_1.keysToCamel(res.data);
                const channelData = {
                    id: data.id,
                    youtubeId: data.ytChannelId,
                    bilibiliSpaceId: data.bbSpaceId || undefined,
                    name: data.name,
                    description: data.description || undefined,
                    photo: data.photo || undefined,
                    publishedAt: new Date(data.publishedAt),
                    twitter: data.twitterLink || undefined,
                };
                resolve(channelData);
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
exports.default = ChannelHandler;
module.exports = ChannelHandler;
