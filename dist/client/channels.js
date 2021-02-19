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
        var _a;
        this.url = (_a = settings.url) !== null && _a !== void 0 ? _a : 'https://api.holotools.app/v1';
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
                const channelData = data.channels.map((ch) => {
                    var _a, _b, _c, _d;
                    return ({
                        id: ch.id,
                        youtubeId: ch.ytChannelId,
                        bilibiliSpaceId: (_a = ch.bbSpaceId) !== null && _a !== void 0 ? _a : undefined,
                        name: ch.name,
                        description: (_b = ch.description) !== null && _b !== void 0 ? _b : undefined,
                        photo: (_c = ch.photo) !== null && _c !== void 0 ? _c : undefined,
                        publishedAt: new Date(ch.publishedAt),
                        twitter: (_d = ch.twitterLink) !== null && _d !== void 0 ? _d : undefined,
                    });
                });
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
                var _a, _b, _c, _d;
                const data = util_1.keysToCamel(res.data);
                const channelData = {
                    id: data.id,
                    youtubeId: data.ytChannelId,
                    bilibiliSpaceId: (_a = data.bbSpaceId) !== null && _a !== void 0 ? _a : undefined,
                    name: data.name,
                    description: (_b = data.description) !== null && _b !== void 0 ? _b : undefined,
                    photo: (_c = data.photo) !== null && _c !== void 0 ? _c : undefined,
                    publishedAt: new Date(data.publishedAt),
                    twitter: (_d = data.twitterLink) !== null && _d !== void 0 ? _d : undefined,
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
                var _a, _b, _c, _d;
                const data = util_1.keysToCamel(res.data);
                const channelData = {
                    id: data.id,
                    youtubeId: data.ytChannelId,
                    bilibiliSpaceId: (_a = data.bbSpaceId) !== null && _a !== void 0 ? _a : undefined,
                    name: data.name,
                    description: (_b = data.description) !== null && _b !== void 0 ? _b : undefined,
                    photo: (_c = data.photo) !== null && _c !== void 0 ? _c : undefined,
                    publishedAt: new Date(data.publishedAt),
                    twitter: (_d = data.twitterLink) !== null && _d !== void 0 ? _d : undefined,
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
                var _a, _b, _c, _d;
                const data = util_1.keysToCamel(res.data);
                const channelData = {
                    id: data.id,
                    youtubeId: data.ytChannelId,
                    bilibiliSpaceId: (_a = data.bbSpaceId) !== null && _a !== void 0 ? _a : undefined,
                    name: data.name,
                    description: (_b = data.description) !== null && _b !== void 0 ? _b : undefined,
                    photo: (_c = data.photo) !== null && _c !== void 0 ? _c : undefined,
                    publishedAt: new Date(data.publishedAt),
                    twitter: (_d = data.twitterLink) !== null && _d !== void 0 ? _d : undefined,
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
