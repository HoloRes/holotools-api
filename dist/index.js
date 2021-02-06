"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const videos_1 = __importDefault(require("./client/videos"));
class Client {
    constructor(settings = {}) {
        this.url = settings.url || 'https://api.holotools.app/v1';
        this.videos = new videos_1.default(settings);
    }
}
exports.default = Client;
module.exports = Client;