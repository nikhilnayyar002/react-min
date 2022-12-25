# react-min

![version](https://img.shields.io/badge/version-7.1.1-brightgreen)
![supported node version](https://img.shields.io/badge/node-LTS-brightgreen)

- [react-min](#react-min)
  - [Setup](#setup)
    - [Install](#install)
    - [Create files](#create-files)
  - [Commands](#commands)
  - [Optional Features](#optional-features)
    - [typescript](#typescript)
    - [sass](#sass)
    - [Enable or Disable multiple features in single command](#enable-or-disable-multiple-features-in-single-command)
    - [Update all features](#update-all-features)
  - [Updating the setup](#updating-the-setup)
  - [Features](#features)
  - [Commit Guidelines](#commit-guidelines)
    - [Commit types](#commit-types)
  - [Important Links](#important-links)
  - [Important Notes](#important-notes)
  - [devDependencies](#devdependencies)
    - [General](#general)
    - [Typescript Feature](#typescript-feature)
    - [Sass Feature](#sass-feature)

## Setup

### Install

- `git clone `
- `npm ci`

### Create files

- create `src/index.js`.

  ```js
  import { createRoot } from 'react-dom/client';

  function App() {
    return "Hello WORLD";
  }

  createRoot(document.getElementById("root")).render(<App />);
  ```

- create `public/index.html`
  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <title>Document</title>
    </head>
    <body>
      <div id="root"></div>
    </body>
  </html>
  ```
  > Example branch: [react-min-src](https://github.com/nikhilnayyar002/react-min/tree/react-min-src). This repo also has all the [optional features](#optional-features) enabled.

## Commands

| Commands          | Inf                                                 |
| ----------------- | --------------------------------------------------- |
| start             | dev mode.                                           |
| build             | generate build files.                               |
| wm                | run `wm-script.js` script with arguments.           |
| speed-measure-dev | measure speed in dev mode.                          |
| commit            | run **commitizen**. creates standard commit.        |
| release           | run **standard-version**. creates standard release. |
| prettier          | format files in `src` and `public`                  |

## Optional Features

Enable/Disable optional features in the project. The feature setup is already added in the project but to enable/disable them you have to run commands. The commands actually install packages and set private variables in `wm-config.js` to keep track of features.

### typescript

- enable:
  ```
  npm run wm -- enable-feat-typescript
  ```
  Replace `index.js` with `index.tsx` (filename's are defined in `wm-config.js`).
- disable:
  ```
  npm run wm -- disable-feat-typescript
  ```
  Replace `index.tsx` with `index.js` (filename's are defined in `wm-config.js`).

### sass

Adds [sass](https://sass-lang.com/)

- enable:
  ```
  npm run wm -- enable-feat-sass
  ```
- disable:
  ```
  npm run wm -- disable-feat-sass
  ```

### Enable or Disable multiple features in single command

```
npm run wm -- enable-feat-typescript enable-feat-sass
npm run wm -- disable-feat-typescript disable-feat-sass
```

### Update all features

This command update every feature dependencies.

```
npm run wm -- update-feat-all
```

## Updating the setup

You should generally update the setup after every release.

If you have made changes to any root files like `wm-config.js`, `webpack.dev.js` etc. that is you made custom changes. Then run the following command to review changes before overwriting your changes:

```
git fetch && git merge origin/master --no-ff --no-commit
```

Otherwise if you have not changed any of root files:

```
git pull origin master
```

Install the dependencies:

```
npm i
```

If you have installed any [optional features](#optional-features) then run [update](#update-all-features) command as well.

> Also you should avoid pulling `package-lock.json` if your dependencies in `package.json` are not exact as of **react-min/master**. Instead maintain your own `package-lock.json`. Packages differ when you enable [optional features](#optional-features) that may install its own packages or user might install its own custom packages. \
> To remove `package-lock.json` from merge conflict use:
>
> ```
> git checkout head -- package-lock.json
> ```

## Features

- add [env variables](https://create-react-app.dev/docs/adding-custom-environment-variables/) (in use in app only). Example:
  - add `HELLO = WORLD` in file say `.env`
  - Then in `wm-config.js`. Add `"HELLO"` for it to be available in your App.
    ```js
    const wmConfig = {
        ...
        environmentVariablesInApp: ["HELLO"]
    },
    ```
    In your App
    ```js
    console.log(process.env.HELLO);
    ```
    > env variables starting with `REACT_MIN_` are automatically added.
- add svg as component: Append `?react` after file path in import statement in order for this to work.

  ```js
  import MySvg from "@assets/react.svg?react";
  import mySvg from "@assets/react.svg";

  function App() {
    return (
      <>
        <MySvg width="200" height="200" viewBox="0 0 3500 3500" />
        <img src={mySvg} width="200" height="200" />
      </>
    );
  }
  ```

  > Second svg is not imported as component but will be resolved as string by webpack.

- import other files:

  ```js
  import sampleImg from "@assets/sample.jpeg";
  import sampleJson from "@assets/sample.json"; // { "hello" : "world" }
  import helloTxt from "@assets/hello.txt";

  console.log(sampleJson.hello);

  function App() {
    return (
      <>
        <pre>{helloTxt}</pre>
        <img src={sampleImg} width="200" height="200" />
      </>
    );
  }
  ```

- Directly edit webpack config as you like (`wm-*.js`, `webpack.*.js` files)
- edit [standard commit types](#commit-types) in `.czrc` file. This file is used by **commitizen**.
- edit `.versionrc.js` file used by **standard-version**.
- edit babel setup in `wm-config.js` (`browserslist`, `wmConfig.babel`)
- edit eslint (`.eslintrc.js`)
- edit prettier (`.prettierrc.json`)
- update typescript (`tsconfig.json`). add custom modules types in `index.d.ts` file.
- `publicPath` can be changed in `wm-config.js`. `publicPath` is similar to [homepage field in CRA](https://create-react-app.dev/docs/deployment/#building-for-relative-paths).
- `publicPath` can be included in index.html and in code. [See](https://create-react-app.dev/docs/using-the-public-folder/).

  ```
  // index.html
   <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />

  // code
  process.env.PUBLIC_URL
  ```

- typescript is enabled in IDE's and reports type errors when a file is opened. But one can also enable build tools like webpack to report typescript errors. Configeration is in `wm-config.js`:

  ```js
  {
    ...,
    typescriptErrorCheckInDev: false,
    typescriptErrorCheckInProd: true,
  }
  ```

## Commit Guidelines

This repo use [commitizen](https://github.com/commitizen/cz-cli) & [standard-version](https://github.com/conventional-changelog/standard-version) for generating releases, tags & changelogs.

### Commit types

- ✨ Features (minor)(public): when you add functionality in a backwards compatible manner
- ⚡️ Performance (patch)(public): internal performance improvements
- 🛠️ Bug Fixes (patch)(public): when you make backwards compatible bug fixes like internal dependency updates "fix(deps)", important document corrections "fix(docs)" etc
- 📝 Docs (public): project documentation updates. Use "docs(X.X.X)" for doc update related to a version.
- 📝 Important Docs change (patch)(public): same as `Docs` but will also increment the patch.
- ⛏️ Chore (private): Code Styling, Refactor, changes that are categorised as other and does not bring any version update.
- ☑️ Tests (private): add code to test your code

## Important Links

- [Webpack generating duplicate code to save number of requests](https://github.com/webpack/webpack/issues/13768)
- https://blog.logrocket.com/why-you-should-use-package-lock-json/
- [Guide](./guide.md)

## Important Notes

- `process.env` is initialized with custom environment variables only in file `wm-config.js` since it imports `dotenv-flow` which loads variables in `.env.*` files and also add some special variables to `process.env`.

## devDependencies

### General

- Babel
  - [@babel/core](https://github.com/babel/babel)
  - presets
    - [@babel/preset-env](https://github.com/babel/babel/tree/main/packages/babel-preset-env)
    - [@babel/preset-react](https://github.com/babel/babel/tree/main/packages/babel-preset-react)
- Eslint
  - [eslint](https://github.com/eslint/eslint)
  - plugins
    - [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)
    - [eslint-plugin-react-hooks](https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks)
- Other Packages
  - [commitizen](https://github.com/commitizen/cz-cli)
  - [standard-version](https://github.com/conventional-changelog/standard-version)
  - [dotenv-flow](https://github.com/kerimdzhanov/dotenv-flow)
  - [fs-extra](https://github.com/jprichardson/node-fs-extra)
  - [prettier](https://github.com/prettier/prettier)
- Webpack
  - [webpack](https://github.com/webpack/webpack)
  - [webpack-cli](https://github.com/webpack/webpack-cli)
  - [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
  - [webpack-merge](https://github.com/survivejs/webpack-merge)
  - Plugins
    - **important**
      - [@pmmmwh/react-refresh-webpack-plugin](https://github.com/pmmmwh/react-refresh-webpack-plugin)
        - peer
          - [react-refresh](https://github.com/facebook/react/tree/main/packages/react-refresh)
      - [circular-dependency-plugin](https://github.com/aackerman/circular-dependency-plugin)
      - [css-minimizer-webpack-plugin](https://github.com/webpack-contrib/css-minimizer-webpack-plugin)
      - [eslint-webpack-plugin](https://github.com/webpack-contrib/eslint-webpack-plugin)
      - [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)
      - [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)
      - [terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin)
      - [fork-ts-checker-webpack-plugin](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin)
    - **not important**
      - [speed-measure-webpack-plugin](https://github.com/stephencookdev/speed-measure-webpack-plugin)
  - Loaders
    - [babel-loader](https://github.com/babel/babel-loader)
    - [css-loader](https://github.com/webpack-contrib/css-loader)
    - [style-loader](https://github.com/webpack-contrib/style-loader)
    - [@svgr/webpack](https://github.com/gregberge/svgr)
- @types
  - @types/react
  - @types/react-dom

### Typescript Feature

- [typescript](https://github.com/microsoft/TypeScript)
- Babel
  - [@babel/preset-typescript](https://github.com/babel/babel/tree/main/packages/babel-preset-typescript)
- Eslint
  - [@typescript-eslint/parser](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/parser)
  - Plugins
    - [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin)

### Sass Feature

- [sass](https://github.com/sass/dart-sass)
- Webpack
  - Loaders
    - [sass-loader](https://github.com/webpack-contrib/sass-loader)
