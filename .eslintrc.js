module.exports = {
	env: {
		browser: false,
		node: true,
		commonjs: true,
		es2021: true,
	},
	parser: '@typescript-eslint/parser',
	plugins: [
		'@typescript-eslint',
	],
	extends: [
		'airbnb-base',
		'plugin:@typescript-eslint/recommended',
	],
	parserOptions: {
		ecmaVersion: 12,
	},
	rules: {
		indent: [2, 'tab'],
		'no-tabs': 0,
		'max-len': 0, // Due to the long descriptions of params
		'global-require': 0,
		'import/prefer-default-export': 0,
		'import/extensions': 0,
		'import/no-unresolved': 0,
	},
};
