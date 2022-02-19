module.exports = {
	'env': {
		'es2021': true,
		'node': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended'
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	'plugins': [
		'@typescript-eslint'
	],
	'rules': {
		"indent": [
			"error",
			2
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"single"
		],
		"semi": [
			"error",
			"always"
		],
		"object-curly-spacing": ["error", "always"],
		"object-curly-newline": ["error", { "minProperties": 2 }],
		"array-bracket-spacing": "error",
		"array-bracket-newline": ["error", { "minItems": 2 }],
		"arrow-spacing": "error",
		"block-spacing": "error",
		"comma-dangle": ["error", "always-multiline"],
		"comma-spacing": ["error", { "before": false, "after": true }],
		"comma-style": ["error", "last"],
		"complexity": ["error", 10],
		"eqeqeq": ["error"],
		"func-style": ["error", "declaration", { "allowArrowFunctions": true }],
		"key-spacing": "error",
		"max-depth": ["error", 3],
		"max-len": ["error", { "code": 120, "ignoreStrings": true }],
		"multiline-ternary": "error",
		"no-else-return": "error",
		"no-nested-ternary": "error",
		"object-property-newline": "error",
		"sort-imports": "error",
		"newline-per-chained-call": ["error", { "ignoreChainWithDepth": 3 }]
	}
};
