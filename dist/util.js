"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keysToCamel = void 0;
const toCamel = (s) => s.replace(/([-_][a-z])/ig, ($1) => $1.toUpperCase()
    .replace('-', '')
    .replace('_', ''));
const isArray = (a) => Array.isArray(a);
const isObject = (o) => o === Object(o) && !isArray(o) && typeof o !== 'function';
/**
 * @see {@link https://matthiashager.com/converting-snake-case-to-camel-case-object-keys-with-javascript}
 */
function keysToCamel(o) {
    if (isObject(o)) {
        const n = {};
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        Object.keys(o)
            .forEach((k) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            n[toCamel(k)] = keysToCamel(o[k]);
        });
        return n;
    }
    if (isArray(o)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return o.map((i) => keysToCamel(i));
    }
    return o;
}
exports.keysToCamel = keysToCamel;
