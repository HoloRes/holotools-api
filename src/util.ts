const toCamel = (s: string) => s.replace(/([-_][a-z])/ig, ($1) => $1.toUpperCase()
	.replace('-', '')
	.replace('_', ''));

const isArray = (a: unknown): boolean => Array.isArray(a);

const isObject = (o: unknown): boolean => o === Object(o) && !isArray(o) && typeof o !== 'function';

/**
 * @see {@link https://matthiashager.com/converting-snake-case-to-camel-case-object-keys-with-javascript}
 */
export function keysToCamel(o: any): any {
	if (isObject(o)) {
		const n = {};

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		Object.keys(o)
			.forEach((k: string) => {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				n[toCamel(k)] = keysToCamel(o[k]);
			});

		return n;
	} if (isArray(o)) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return o.map((i: unknown) => keysToCamel(i));
	}

	return o;
}
