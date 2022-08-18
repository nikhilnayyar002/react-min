const wmConfig = require("./wm-config");

module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
    worker: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "plugin:react-hooks/recommended"],
  parserOptions: {
    sourceType: "module",
    requireConfigFile: false,
  },
  rules: {
    "no-use-before-define": [
      "error",
      {
        functions: false,
      },
    ],
    "no-unused-vars": "warn",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "no-debugger": "off",
  },
  globals: {
    process: "readonly",
    JSX: "readonly",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  ignorePatterns: ["/**/*.*", "!src/**/*.*"],
  overrides: [
    wmConfig.typescript && {
      files: wmConfig.typescriptExts.map((t) => "src/**/*" + t),
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
      extends: ["plugin:@typescript-eslint/recommended"],
      rules: {
        "no-use-before-define": "off",
        "no-unused-vars": "off",
      },
    },
  ].filter(Boolean),
};
