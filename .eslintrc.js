module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true,
        "worker": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "sourceType": "module",
        "requireConfigFile": false
    },
    "rules": {
        "no-use-before-define": [
            "error",
            {
                "functions": false
            }
        ],
        "no-unused-vars": "warn",
        // suppress errors for missing 'import React' in files
        "react/react-in-jsx-scope": "off",
    },
    "globals": {
        "process": "readonly"
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    }
}