# Webpack - Babel Setup

This is near to base setup for any other project.
I only added react dependencies.

## Commit Guidelines

This repo use [commitizen](https://github.com/commitizen/cz-cli) & [standard-version](https://github.com/conventional-changelog/standard-version) for generating releases, tags & changelogs.

## Important Discussions
* [Webpack generating duplicate code to save number of requests](https://github.com/webpack/webpack/issues/13768)

## Packages

- babel
  - core: "@babel/core"
  - general preset: "@babel/preset-env"
  - preset for react: "@babel/preset-react" 
- Eslint
  - core: "eslint"
  - Plugin
    - "eslint-plugin-react"
- Other Packages
  - "commitizen"
  - "cz-conventional-changelog"
  - "standard-version"
  - "cross-env"
  - "dotenv-flow"
- Webpack
  - "webpack"
  - "webpack-cli"
  - "webpack-dev-server"
  - "webpack-merge"
  - Plugins
    - react-refresh
      - core: "@pmmmwh/react-refresh-webpack-plugin"
      - peer: "react-refresh"
    - "circular-dependency-plugin"
    - "clean-terminal-webpack-plugin"
    - "css-minimizer-webpack-plugin"
    - "eslint-webpack-plugin"
    - "event-hooks-webpack-plugin"
    - "html-webpack-plugin"
    - "mini-css-extract-plugin"
    - "terser-webpack-plugin"
    - Temporary use - "speed-measure-webpack-plugin"
  - Loaders
    - "babel-loader"
    - "css-loader"
    - "style-loader"