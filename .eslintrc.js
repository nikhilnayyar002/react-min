const typescript = require('./wm-config').typescript

module.exports = {
    "root": true,
    ...(typescript ? { "parser": "@typescript-eslint/parser" } : {}),
    "plugins": [
        typescript && "@typescript-eslint"
    ].filter(Boolean),
    "env": {
        "browser": true,
        "es2021": true,
        "node": true,
        "worker": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended"
    ],
    "extends": [
        "eslint:recommended",
        typescript && "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended"
    ].filter(Boolean),
    "parserOptions": {
        "sourceType": "module",
        "requireConfigFile": false
    },
    "rules": {
        ...(typescript ? {
            "@typescript-eslint/no-use-before-define": [
                "error",
                {
                    "functions": false
                }
            ]
        } : {
            "no-use-before-define": [
                "error",
                {
                    "functions": false
                }
            ],
            "no-unused-vars": "warn",
        }),
        "react/react-in-jsx-scope": "off"
    },
    "globals": {
        "process": "readonly"
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    },
    "ignorePatterns": [
        "/**/*.*",
        "!src/**/*.*"
    ]
}