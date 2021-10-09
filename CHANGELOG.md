# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [4.0.1](https://github.com/nikhilnayyar002/react-min/compare/v4.0.0...v4.0.1) (2021-10-09)


### 🛠️ Bug Fixes

* **deps:** update ([75d3472](https://github.com/nikhilnayyar002/react-min/commit/75d347287540c82226f66be2c05211251a60535f)), ([6933c10](https://github.com/nikhilnayyar002/react-min/commit/6933c104bf5f27a77a9dc2dedee672cf7665582d)), ([65d5d29](https://github.com/nikhilnayyar002/react-min/commit/65d5d298aac137395e25d47a02597d199da7bdfa))

## [4.0.0](https://github.com/nikhilnayyar002/react-min/compare/v3.0.0...v4.0.0) (2021-10-03)


### ⚠ BREAKING CHANGES

* .eslintrc -> .eslintrc.js, entryFilenameJs & entryFilenameTs options added in
wm-config.js

### ✨ Features

* **env-var:** auto add REACT_MIN_* vars ([eaf546c](https://github.com/nikhilnayyar002/react-min/commit/eaf546c2da3dcc983a80de39e592caac1f6b86b7))
* **sourcemaps:** config style sourcemaps ([9604338](https://github.com/nikhilnayyar002/react-min/commit/9604338185146ffaf183fbf8652b80eec03d48dc))
* **typescript:** add typesript support ([2d5e753](https://github.com/nikhilnayyar002/react-min/commit/2d5e7539ad5f6710a49420597bdc5411dc71b969))
* **typings:** add index.d.ts for custom types ([45f87a7](https://github.com/nikhilnayyar002/react-min/commit/45f87a7f98c2cb566b9c7fa15748cdc0b45e527c))
* **wm-script:** on/off/update extra features ([8166f46](https://github.com/nikhilnayyar002/react-min/commit/8166f46b7cb898361aa1736e6e1010cb8c69ce10)), pass multiple args ([79cf827](https://github.com/nikhilnayyar002/react-min/commit/79cf82742a5dd4c7e6f3e65e5a78a29950efcf25))


### 🛠️ Bug Fixes

* **.czrc:** change boolean strings to boolean ([051b62f](https://github.com/nikhilnayyar002/react-min/commit/051b62f5cd6f785797b9cc124a1fb1f460ee4b37))
* **deps:** update packages ([c902f9f](https://github.com/nikhilnayyar002/react-min/commit/c902f9f2b215d422c0bb032baaa5047521ac72b4)), ([645d42c](https://github.com/nikhilnayyar002/react-min/commit/645d42c15565dedbfc376e6eae9fbd40a61563de))
* **wm-script:** dont update package when not req ([ce9fa0e](https://github.com/nikhilnayyar002/react-min/commit/ce9fa0e0253652b0a5ae74760ba57207b3aaa831))

## [3.0.0](https://github.com/nikhilnayyar002/react-min/compare/v2.0.0...v3.0.0) (2021-09-26)


### ⚠ BREAKING CHANGES

* **commit:** .versionrc has been replace with .versionrc.js and commit types has been reduced
from 11 to 6

### ✨ Features

* **commit:** refractor standard commit config ([5cc3cc7](https://github.com/nikhilnayyar002/react-min/commit/5cc3cc7f098210b0b131ed8d47e335f71bd0cf5a))

## [2.0.0](https://github.com/nikhilnayyar002/react-min/compare/v1.4.0...v2.0.0) (2021-09-26)


### Notes

Migration guide -
* you can now have custom `src` and `public` folder in root. `public` folder must have `index.html` file. `src` folder must have `index.js` or `index.ts` file depending upon you are using javascript or typescript. If you want to see an example where `src` and `public` folder are included check this out these branches below - 
  * [react-min-src](https://github.com/nikhilnayyar002/react-min/tree/react-min-src)
  * [react-min-ts-src](https://github.com/nikhilnayyar002/react-min/tree/react-min-ts-src)
* .gitignore now ignores `.env.*.local` files. 
* `config.js` has been split up into into `wm-config.js` & `wm-helper.js`.
* `getBabelLoaderDefaultOptions` which was earlier nested in `webpack` has been moved inside `babel` in `wm-config.js`. Lot of other properties has been modified as well but concept remains almost same. New options has been added such as `resolve` etc. `devServer` option also modified.

### ⚠ BREAKING CHANGES

* src and public folder are removed.
* .gitignore .env.*.local files, split config.js into wm-config.js & wm-helper.js.

### 🔥 Enhancements

* refractor, update, add eslint react-hook ([bb33d10](https://github.com/nikhilnayyar002/react-min/commit/bb33d10dd767bc5644f85a2ae9237f0fbb95d387))
  * eslint
    - add "plugin:react-hooks/recommended"
    - update ignorePatterns to only lint files in src
  * update package.json - remove packages (cross-env, acorn)
  * refractor react-min config


### 🐛 Bug Fixes

* **jsconfig.json:** replace with tsconfig.json ([23c4e63](https://github.com/nikhilnayyar002/react-min/commit/23c4e63a81ade65853505c639c5233527550dd84))


### ✨ Features

* **asset-txt:** import raw text file content ([72cf4c6](https://github.com/nikhilnayyar002/react-min/commit/72cf4c625d37841e27578392be17d9c9d6c8fb5c))
* remove public and src folder ([88618f4](https://github.com/nikhilnayyar002/react-min/commit/88618f45a57d87a19600771b1799e171d364ad2f))
* **svg-component:** add svg as component support ([6ff9774](https://github.com/nikhilnayyar002/react-min/commit/6ff97748c0e06519b60d8885faff45c276d0aa92))

## [1.4.0](https://github.com/nikhilnayyar002/react-min/compare/v1.3.1...v1.4.0) (2021-09-04)


### ⛏️ Build System

* update major packages, update devServer config ([da8f744](https://github.com/nikhilnayyar002/react-min/commit/da8f744e3c701800c7cd52ccbc97ec264490ae38)) ([0a55ccc](https://github.com/nikhilnayyar002/react-min/commit/0a55ccc324cf20c15179ecefe01b342925c7c9a0))


### 🔥 Enhancements

* config warnings, update packages & doc ([e6f8c16](https://github.com/nikhilnayyar002/react-min/commit/e6f8c168f825150013d852d11899eb30657e38ea))
* common config to generate vendor chunks ([01d56b6](https://github.com/nikhilnayyar002/react-min/commit/01d56b67ee6f25ac7768567306b0b9e6132f918f))
* **source-map:** enable source-map in dev ([d3bafaf](https://github.com/nikhilnayyar002/react-min/commit/d3bafaf3182aa5a089bf06313d3927b4d52050a2)), closes [#1](https://github.com/nikhilnayyar002/react-min/issues/1)

### 📝 Docs

* update [readme.md](readme.md)


### ↩️ Reverts

* **release-1.3.1:** remove 1.3.1 from changelog ([cb83267](https://github.com/nikhilnayyar002/react-min/commit/cb83267f71fae38cc29bf2bed36c93b6e865d03d))

## [1.3.0](https://github.com/nikhilnayyar002/react-min/compare/v1.2.0...v1.3.0) (2021-07-21)


### ⛏️ Build System

* config updates & react-refresh support ([392a32f](https://github.com/nikhilnayyar002/react-min/commit/392a32f1c44341281799f0c08e2363d147a151a6))
* misc ([ed57bd5](https://github.com/nikhilnayyar002/react-min/commit/ed57bd5892d81cd7584c12ce55c598472fcbdba0), [19e6191](https://github.com/nikhilnayyar002/react-min/commit/19e6191134194473a6c0c6f0bad91b46c16bfe36))
* misc updates, show local ip addresses ([3bc9876](https://github.com/nikhilnayyar002/react-min/commit/3bc9876e2943ba4f101d97a20834e28344ceedc1))

## [1.2.0](https://github.com/nikhilnayyar002/slickjs-react-antd/compare/v1.1.0...v1.2.0) (2021-07-02)


### ⛏️ Build System

* add, update config files ([f9469d9](https://github.com/nikhilnayyar002/slickjs-react-antd/commit/f9469d91bb23b385e96cc5d31cdc52dafe845dcb))
  - add .czrc file and remove config from package.json
  - .versionrc file: add enhance type, add emoji to display in changelog

## [1.1.0](https://github.com/nikhilnayyar002/slickjs-react-antd/compare/v1.0.0...v1.1.0) (2021-07-01)


### Features

* **webpack:** add plugin - detect circular depen. ([e686f2a](https://github.com/nikhilnayyar002/slickjs-react-antd/commit/e686f2ad46e2bbaa27a644b945337c2533d0fc64))


### Docs

* **readme.md:** add commit guidelines ([5eed889](https://github.com/nikhilnayyar002/slickjs-react-antd/commit/5eed889ecd91c3c466c6b04008f4ba4cf6b35f8b))


### Code Refactoring

* **.versionrc:** update config ([296c166](https://github.com/nikhilnayyar002/slickjs-react-antd/commit/296c1665d2c8d352b6c1aafeb81a984429ba7f3f))

## 1.0.0 (2021-06-30)


### Features

* add react and update packages ([c18e576](https://github.com/nikhilnayyar002/slickjs-react-antd/commit/c18e576784086f4ca04ba39563fed8e11a5f540e))
* add release support ([e55e965](https://github.com/nikhilnayyar002/slickjs-react-antd/commit/e55e965cc1c545af58444a5b3bfb3d9872fcd875))
