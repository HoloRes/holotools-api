"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.CommentHandler = exports.ChannelHandler = exports.VideoHandler = exports.Client = void 0;
const videos_1 = __importDefault(require("./client/videos"));
const channels_1 = __importDefault(require("./client/channels"));
const comments_1 = __importDefault(require("./client/comments"));
class Client {
    constructor(settings = {}) {
        this.url = settings.url || 'https://api.holotools.app/v1';
        this.videos = new videos_1.default(settings);
        this.channels = new channels_1.default(settings);
        this.comments = new comments_1.default(settings);
    }
}
module.exports = Client;
