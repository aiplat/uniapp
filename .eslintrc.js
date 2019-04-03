module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module'
    },
    env: {
        browser: true
    },
    extends: ['plugin:vue/essential', 'airbnb-base'],
    plugins: [
        'vue'
    ],
    globals: {
        'ga': true,
        'cordova': true,
        'uni': true,
        '__statics': true
    },
    'rules': {
        'no-param-reassign': 0,
        'import/first': 0,
        'import/named': 2,
        'import/namespace': 2,
        'import/extensions': 0,
        'import/no-unresolved': 0,
        'import/no-extraneous-dependencies': 0,
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
        "no-plusplus": 0,
        "linebreak-style": 0,
        "max-len": ['error', 2000],
        "no-alert": 0,
        "eol-last": 0,
        "object-shorthand": 0,
        "no-bitwise": 0,
        "no-mixed-operators": 0,
        "vue/no-parsing-error": [2, {"x-invalid-end-tag": false}],
        "no-nested-ternary": 1,
        "func-names": 0,
        "consistent-return": 0,
        "array-callback-return": 0,
        "vue/script-indent": ["error", 2, {"baseIndent": 1}],
        "global-require": 0,
        "quote-props": [0, "always"],
        "no-tabs": "off"
    },
    "overrides": [
        {
            'files': ['*.vue', '*.js'],
            'rules': {
                'indent': 'off'
            }
        }
    ]
};
