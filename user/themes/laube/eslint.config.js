const globals = require( 'globals' );

module.exports = [{
    files: [ 'assets/js/**/*.js' ],
    languageOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        globals: {
            ...globals.browser,
        },
    },
    rules: {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        'no-unused-vars': [
            1,
            { 'vars': 'all', 'args': 'after-used' }
        ]
    }
}];
