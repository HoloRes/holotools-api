"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// Imports
const axios_1 = __importDefault(require("axios"));
const util_1 = require("../util");
// TODO: Transform responses to more easily usable objects, better errors
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
    get(limit = 25, offset = 0, sort = '', order = '', name = '') {
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
                resolve(util_1.keysToCamel(res.data));
            }).catch(reject);
        });
    }
}
exports.default = ChannelHandler;
module.exports = ChannelHandler;
