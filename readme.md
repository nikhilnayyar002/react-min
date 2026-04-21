
- [1. Introduction](#1-introduction)
  - [1.1. Branches](#11-branches)
  - [1.2. Files](#12-files)
  - [1.3. packages](#13-packages)
    - [1.3.1. devDependencies](#131-devdependencies)
  - [1.4. Concept related to commits](#14-concept-related-to-commits)
    - [1.4.1. commitlint](#141-commitlint)
    - [1.4.2. commitizen](#142-commitizen)
    - [1.4.3. release-please](#143-release-please)
  - [1.5. Bundling concepts](#15-bundling-concepts)
- [2. Setup](#2-setup)
- [3. Commands](#3-commands)
- [4. Updating packages](#4-updating-packages)
- [5. Merging new changes](#5-merging-new-changes)
- [6. Usefull commands](#6-usefull-commands)
- [7. Included Features](#7-included-features)
- [8. Important Links](#8-important-links)

# 1. Introduction

## 1.1. Branches

- **master** : Use this branch for generic code
- **react** : Use this branch to start with react.

The codes below have been written for master branch. If you want to use **react** branch for example then replace **master** branch in any code below with **react**.

## 1.2. Files

- webpack configs
  ```
  webpack.*.ts
  ```
- eslint
  ```
  eslint.config.js
  ```
- commit configs
  ```
  commitlint.config.ts // used by commitlint
  ```
- typescript
  ```
  tsconfig.json
  declarations.d.ts // declarations
  ```
- my shared configs & scripts
  ```
  my-config.js
  my-script.ts
  ```
- directories
  ```
  public // contains index.html template & files that will be copied to build
  src // source code folder of entry file to start bundling from
  ```
- github workflows
  ```
  .github/workflows/commitlint.yml
  .github/workflows/release-please.yml
  ```
- release-please configs
  ```
  .release-please-manifest.json
  release-please-config.json
  ```
- others
  ```
  .env
  .gitignore
  helper.ts // shared code as helper functions and utils
  ```

## 1.3. packages

### 1.3.1. devDependencies
```
babel-
"@babel/core"
"@babel/preset-env"
"@babel/preset-typescript"

commitlint -
"@commitlint/cli"
"@commitlint/config-conventional"

eslint & eslint plugins -
"eslint"
"@eslint/js"
"@stylistic/eslint-plugin"
"typescript-eslint"

webpack plugins -
"circular-dependency-plugin"
"css-minimizer-webpack-plugin" // compress css
"eslint-webpack-plugin"
"fork-ts-checker-webpack-plugin"
"html-webpack-plugin"
"mini-css-extract-plugin" // extract css into files
"terser-webpack-plugin"

webpack loaders -
"babel-loader"
"css-loader" // only loads css files
"style-loader" // injects css loaded into dom at runtime 

types -
"@commitlint/types"
"@types/fs-extra"
"@types/node"

helper modules -
"ansi-escapes" // used to clear console (helper.ts)
"chalk" // used to add colors (my-script.ts)
"dotenv-flow" // load env files (my-config.js)
"fs-extra" // do bulk file operations (my-script.ts)
"ts-node" // help node parse typescript files (https://webpack.js.org/guides/typescript/#ways-to-use-typescript-in-webpackconfigts)
"webpack-merge" // merge webpack configs

commit hooks -
"husky"

typescript -
"typescript"

webpack -
"webpack" // core bundler
"webpack-cli" // webpack CLI (https://webpack.js.org/guides/installation/#local-installation)
"webpack-dev-server"
```

## 1.4. Concept related to commits

### 1.4.1. commitlint
```
commitlint -  setup commitlint and husky
    https://commitlint.js.org/guides/getting-started.html

commitlint.config.ts - 
    https://github.com/conventional-changelog/commitlint/tree/master/docs/reference
    https://github.com/conventional-changelog/commitlint/blob/master/docs/reference/configuration.md#typescript-configuration
```
### 1.4.2. commitizen
```
commitizen - install globally - npm install commitizen -g
    https://github.com/commitizen/cz-cli

install adapter globally - npm install @commitlint/cz-commitlint inquirer@9 -g
    https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/cz-commitlint

cz-commitlint adapter uses prompt config from commitlint.config.ts
```

### 1.4.3. release-please
```
release-please was intially setup in this repo as
    release-please bootstrap --token=TOKEN  --repo-url=nikhilnayyar002/react-min --initial-version=7.3.0 --release-type=node

release-please docs - 
    https://github.com/googleapis/release-please/blob/main/docs/design.md
    https://github.com/googleapis/release-please/blob/main/docs/cli.md
    https://github.com/googleapis/release-please/blob/main/docs/customizing.md#pull-requests

    config -
        https://github.com/googleapis/release-please/blob/main/docs/manifest-releaser.md
        "changelog-sections" in config determine the commit prefix types
          https://github.com/googleapis/release-please/blob/main/docs/manifest-releaser.md?plain=1#L186
          https://github.com/googleapis/release-please/blob/main/schemas/config.json#L31

release-please action
    https://github.com/googleapis/release-please-action
```

## 1.5. Bundling concepts
```
[static NM] tiny-spring -> main
[static NM] react -> main
[static NM] react-dom -> main
[static src] app3 -> main
[static NM] tiny-spring -> app3
[static NM] react -> app3
[dynamic] app -> main
[dynamic] app2 -> main
    -   if size of all static NM imports < 20Kb
            then main chunk will contain all static NM imports
        else 
            new chunk say X will be generated to include all the static NM imports
            other static import code (not from NM) will be included in in main chunk
    -   any async chunks that includes any of the NM modules present in chunk X or chunk main 
            will reuse it from X or main and will not any create duplicate chunks
    -   if size of app3 when included in main exceeds certain size
            webpack will give warning
    

[dynamic] app -> main
[dynamic] app2 -> main
[static NM] tiny-spring -> app
[static NM] react -> app
[static NM] tiny-spring -> app2
[static NM] react-dom -> app2
    -   app will be generated as async chunk say X1
        app2 will be generated as async chunk say X2
    -   if size of static NM imports < 20Kb
            then async chunk X will contain all static NM imports
        else
            new chunk say Y will be generated to include all the static NM imports
            other static import code (not from NM) will be included in chunk X
    -   X1 has tiny-spring & react NM's
        tiny-spring & react are generated in an async chunk say Y1
            react.production.js is included inside as internal dependency
        X2 has tiny-spring & react-dom
        tiny-spring already present in Y1 is reused
        react-dom is generated in an async chunk say Y2
            react.production.js is included inside as internal dependency
            webpack duplicated it (its also present in Y1) bcz app2 havent imported react

[static NM] tiny-spring -> app
[static NM] react -> app
[static NM] tiny-spring -> app2
[static NM] react -> app2
[static NM] react-dom -> app2
    -   X1 has tiny-spring & react NM's
        tiny-spring & react are generated in an async chunk say Y1
            react.production.js is included inside as internal dependency
        X2 has tiny-spring, react & react-dom
        tiny-spring & react already present in Y1 is reused
        react-dom is generated in an async chunk say Y2
            react.production.js & react-jsx-runtime.production.js internal dependencies
            is reused from Y1 and are not duplicated 

move react, react-dom and their dependencies into cachegroup named react (for all chunk types)
    -   X1 has tiny-spring
        tiny-spring  < 20Kb so tiny-spring is included in X1.
        X2 has tiny-spring
        tiny-spring  < 20Kb so tiny-spring is included in X1.
    -   react, react-dom and their dependencies 
        combined togther into one chunk named react
        can be inported & reused in all chunk types(intial and async)


css follows same rules. To include css in cacheGroups see https://webpack.js.org/plugins/mini-css-extract-plugin
```

# 2. Setup
```bash
fork the repo

npm install

git checkout -b release
git push origin release
git branch --set-upstream-to=origin/release

on github set default branch to release

create TOKEN https://github.com/settings/tokens
add this token as env secret  https://github.com/lonelybud/react-min/settings/secrets/actions
    name it release_please
    value TOKEN

npm i release-please -g
release-please bootstrap --token=TOKEN --repo-url=username/react-min --initial-version=1.0.0 --release-type=node --target-branch=release
pr will be open, squash and merge it
git pull
git tag -a v1.0.0 -m "" 
git push origin v1.0.0

update .github/workflows/release-please.yml
on:
  push:
    branches:
      - release <---- this

delete CHANGELOG.md

commit with message "feat: add release please action"
git push
pr will be open after some time, squash and merge it

git pull
```

```json
// .vscode/settings.json
{
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": "explicit"
    }
}
```

install vscode extensions -
- https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

install [commitizen & adapter](#132-commitizen)

# 3. Commands

| Commands          | Inf                                                 |
| ----------------- | --------------------------------------------------- |
| start             | dev mode.                                           |
| build             | generate build files.                               |
| lintfix           | fix the code with eslint                            |
| commit            | run **commitizen**. creates standard commit.        |

# 4. Updating packages
```bash
i will be using these cmds to check/update for packages

npm outdated

i will not use npm update command since i am using exact dependencies. I might be manually updating the packages
```

# 5. Merging new changes
```bash
git config --global rerere.enabled true
git checkout release
git pull
git fetch upstream master
```

- squash merge way (recommended)
  ```bash 
  git merge --squash --no-commit upstream/master

  git log -1 upstream/master --oneline 
    08cf02d (upstream/master) chore(master): release 8.0.1 (#13)

    copy commit hash 08cf02d

  resolve merge conflicts

  git commit -m "chore(08cf02d): squash master"
  git push
  ```
- rebase way
  ```bash
  git rebase upstream/master

  resolve conflicts one by one on replayed commits

  restoring git tags- rebase will not move the tags. tags remain intact to original commits
  in order to move the last tag (it is required by release-please to create next release)
  know the last tag say it was v1.1.0

    search for commit
    git log --grep="chore(release): release 1.1.0"
    will log -> commit f07c1821d2aea1d5118becefa9ce98f883199fc8 (HEAD -> release)

    tag it -
    git tag -f v1.1.0 f07c182
    git push origin -f v1.1.0 

  // force push the release branch
  git push --force
  ```

> Note:
> 
> sometimes package-Lock.json can have severe conflicts if you have added say more packages
> if you cant solve the commits manually bcz its too severe then during squash merge/rebase, remove package-Lock.json from merge conflict
> ```
> git rm package-lock.json // removes file from merge conflict, delete it and add to staging
> git restore --staged package-lock.json // move from staging to working diectory
> 
> then fix package.json in merge conflict if any
> npm i // will genarate new package-Lock.json
> git add package-lock.json
> ```

# 6. Usefull commands
```bash
```

# 7. Included Features
- read .env file for adding environment variables
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

# 8. Important Links

- [Webpack generating duplicate code to save number of requests](https://github.com/webpack/webpack/issues/13768)