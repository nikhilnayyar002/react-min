# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [6.1.0](https://github.com/nikhilnayyar002/react-min/compare/v6.0.0...v6.1.0) (2022-02-12)


### Features

* **.czrc:** add type **docs-i** (Important Docs change) ([5d99774](https://github.com/nikhilnayyar002/react-min/commit/5d997744e917c8bf11a2a4c63479062d014c2466))
* add revert commit type ([12019b7](https://github.com/nikhilnayyar002/react-min/commit/12019b70bba8f884ff55be88b71b7ce0d8a2fcef))
* log gzip and Brotli size after build ([5560bd7](https://github.com/nikhilnayyar002/react-min/commit/5560bd7f220e98c41ac7934905f80e4d84292d0e))


### Bug Fixes

* **.eslintrc.js:** conditionally use typescript ([57f479f](https://github.com/nikhilnayyar002/react-min/commit/57f479f260a0d1e4ce374d89346132d54b164f50))
* **deps:** update packages; `package-lock.json` updated, do `npm ci` ([6c3e0ce](https://github.com/nikhilnayyar002/react-min/commit/6c3e0ced26df3d1c270fd23f0e4b7ef851086def)), ([f7b0a9f](https://github.com/nikhilnayyar002/react-min/commit/f7b0a9f11d6abaedec9eba3bc17fb51e5ce22ad7)), ([17bd754](https://github.com/nikhilnayyar002/react-min/commit/17bd75409f9f62ee02d67904e40fe6526a8573c7)), ([c8b9f25](https://github.com/nikhilnayyar002/react-min/commit/c8b9f2569d4fb2bc4a8700f698e3c868d0ce11ee)), ([7efaf35](https://github.com/nikhilnayyar002/react-min/commit/7efaf35967584c38d21708a0f1b2923438c5b3e2))
* **minicssextractplugin:** incorrect chunkFilename ([19c257c](https://github.com/nikhilnayyar002/react-min/commit/19c257cda4f40fa4f7fdbcfa3e8c0672407d564e))
* **splitchunks:** async/inital chunks expectations ([0e3a2b4](https://github.com/nikhilnayyar002/react-min/commit/0e3a2b42046733211bef1a16387c8fbc15ef8912))


### Performance

* forkTsCheckerWebpackPlugin dev/prod settings ([8f1447d](https://github.com/nikhilnayyar002/react-min/commit/8f1447d7a0ef45b0ab395891be4ca4664d06afc9))

## [6.0.0](https://github.com/nikhilnayyar002/react-min/compare/v5.1.0...v6.0.0) (2022-01-09)


### ⚠ BREAKING CHANGES

* **eslint:** architecture for eslint config file changed.
* add wm-util.js.
"wm-util.js" is like library that provide reusable functionality
"wm-helper.js" provides major functionality for "react min".

### Features

* **devserver:** serve index.html instead of 404 ([9def7b2](https://github.com/nikhilnayyar002/react-min/commit/9def7b2b2e245a2fe18330696cbc87fbbf61fd07))
* **prettier:** add config & npm script ([3c24fbe](https://github.com/nikhilnayyar002/react-min/commit/3c24fbecda25089438e37867dfb097261aca32f9))
* **typescript:** type checking during compilation ([97814bf](https://github.com/nikhilnayyar002/react-min/commit/97814bf818141c8a06a8929b10862228ba5449e2))


### Bug Fixes

* **deps:** update ([9463c1e](https://github.com/nikhilnayyar002/react-min/commit/9463c1e5313e48ea6df8e30e4dc6ccf4b7853664)), ([cecb04c](https://github.com/nikhilnayyar002/react-min/commit/cecb04ca0c1c3a2dbbc09e7858af2d0b319564b6)), ([6148648](https://github.com/nikhilnayyar002/react-min/commit/6148648cb1bab5fbe924212c5b1e77c948e5d181)), ([68ef180](https://github.com/nikhilnayyar002/react-min/commit/68ef18012779022c5b4aee26dbeb02bc19b298fc)), ([c9ba227](https://github.com/nikhilnayyar002/react-min/commit/c9ba22765cfb46c563e4f3689d333253b9f94c93)), ([5d21491](https://github.com/nikhilnayyar002/react-min/commit/5d21491ebd9bc9ef34d033a9b2c1cfbafb03a880)), ([f0c7e95](https://github.com/nikhilnayyar002/react-min/commit/f0c7e95ed8da803b488337f7f6aa4ea4fd64ef81))
* **eslint:** use overrides for ts, tsx files ([b02a9e9](https://github.com/nikhilnayyar002/react-min/commit/b02a9e9083625c557e346f61f854da47ce1b7061))


### Chore

* remove table, chalk deps; add wm-util.js ([7c4c3cf](https://github.com/nikhilnayyar002/react-min/commit/7c4c3cfe31fb938994a988ea33b06cfc79458671))

## [5.1.0](https://github.com/nikhilnayyar002/react-min/compare/v5.0.0...v5.1.0) (2021-11-20)

### Features

- **esm:** support type=module for script tag ([36d1851](https://github.com/nikhilnayyar002/react-min/commit/36d1851a90cc2b1727f012b05aab609abd6bedfe))
- **publicpath:** %PUBLIC_URL% in index.html file ([18fb583](https://github.com/nikhilnayyar002/react-min/commit/18fb5834ccb6abeb11dc1a23da462320ffce78e1))

### Bug Fixes

- **build:** copy public dir contents to output dir ([5f15248](https://github.com/nikhilnayyar002/react-min/commit/5f1524835f0780e174c645749cfdb5aedcb62224))
- **bump:** version does not bump in package files ([ea2c2d7](https://github.com/nikhilnayyar002/react-min/commit/ea2c2d7c3cd8acfa63b0ab8e88d234f2b9bda7d1))
- **eslintrc:** remove duplicate, set "no-undef" on ([c6734e2](https://github.com/nikhilnayyar002/react-min/commit/c6734e299482f8da1943ff46c2de6953e263ab2d))
- **types:** process is not defined ([4827f10](https://github.com/nikhilnayyar002/react-min/commit/4827f10e201456b66457cc9e2d2a56011970b8ca))
- **wm-config:** features are enabled by mistake ([68c171e](https://github.com/nikhilnayyar002/react-min/commit/68c171ea25888787f3ef46e9f4057aceda26ad91))
- **wm-script:** no exact deps, invalid argument ([f9be127](https://github.com/nikhilnayyar002/react-min/commit/f9be127ab765d8c961a793c9085eae52508abe31)), unable to run feature cmds ([3135a94](https://github.com/nikhilnayyar002/react-min/commit/3135a940830496583b03e6234bbc37bc696923fd))
- dependencies updated

## [5.0.0](https://github.com/nikhilnayyar002/react-min/compare/v4.0.1...v5.0.0) (2021-10-09)

### ⚠ BREAKING CHANGES

- **.czrc:** default .czrc config now does not allow changelog generation with icons

### Features

- **.czrc:** add prop. \_addIcon, refractor `CHANGELOG.md` ([c502c3d](https://github.com/nikhilnayyar002/react-min/commit/c502c3dce1050ab6453726a29f63d617c5424fd1))

### [4.0.1](https://github.com/nikhilnayyar002/react-min/compare/v4.0.0...v4.0.1) (2021-10-09)

### Bug Fixes

- **deps:** update ([75d3472](https://github.com/nikhilnayyar002/react-min/commit/75d347287540c82226f66be2c05211251a60535f)), ([6933c10](https://github.com/nikhilnayyar002/react-min/commit/6933c104bf5f27a77a9dc2dedee672cf7665582d)), ([65d5d29](https://github.com/nikhilnayyar002/react-min/commit/65d5d298aac137395e25d47a02597d199da7bdfa))

## [4.0.0](https://github.com/nikhilnayyar002/react-min/compare/v3.0.0...v4.0.0) (2021-10-03)

### ⚠ BREAKING CHANGES

- .eslintrc -> .eslintrc.js, entryFilenameJs & entryFilenameTs options added in
  wm-config.js

### Features

- **env-var:** auto add REACT*MIN*\* vars ([eaf546c](https://github.com/nikhilnayyar002/react-min/commit/eaf546c2da3dcc983a80de39e592caac1f6b86b7))
- **sourcemaps:** config style sourcemaps ([9604338](https://github.com/nikhilnayyar002/react-min/commit/9604338185146ffaf183fbf8652b80eec03d48dc))
- **typescript:** add typesript support ([2d5e753](https://github.com/nikhilnayyar002/react-min/commit/2d5e7539ad5f6710a49420597bdc5411dc71b969))
- **typings:** add index.d.ts for custom types ([45f87a7](https://github.com/nikhilnayyar002/react-min/commit/45f87a7f98c2cb566b9c7fa15748cdc0b45e527c))
- **wm-script:** on/off/update extra features ([8166f46](https://github.com/nikhilnayyar002/react-min/commit/8166f46b7cb898361aa1736e6e1010cb8c69ce10)), pass multiple args ([79cf827](https://github.com/nikhilnayyar002/react-min/commit/79cf82742a5dd4c7e6f3e65e5a78a29950efcf25))

### Bug Fixes

- **.czrc:** change boolean strings to boolean ([051b62f](https://github.com/nikhilnayyar002/react-min/commit/051b62f5cd6f785797b9cc124a1fb1f460ee4b37))
- **deps:** update packages ([c902f9f](https://github.com/nikhilnayyar002/react-min/commit/c902f9f2b215d422c0bb032baaa5047521ac72b4)), ([645d42c](https://github.com/nikhilnayyar002/react-min/commit/645d42c15565dedbfc376e6eae9fbd40a61563de))
- **wm-script:** dont update package when not req ([ce9fa0e](https://github.com/nikhilnayyar002/react-min/commit/ce9fa0e0253652b0a5ae74760ba57207b3aaa831))

## [3.0.0](https://github.com/nikhilnayyar002/react-min/compare/v2.0.0...v3.0.0) (2021-09-26)

### ⚠ BREAKING CHANGES

- **commit:** .versionrc has been replace with .versionrc.js and commit types has been reduced
  from 11 to 6

### Features

- **commit:** refractor standard commit config ([5cc3cc7](https://github.com/nikhilnayyar002/react-min/commit/5cc3cc7f098210b0b131ed8d47e335f71bd0cf5a))

## [2.0.0](https://github.com/nikhilnayyar002/react-min/compare/v1.4.0...v2.0.0) (2021-09-26)

### Notes

Migration guide -

- you can now have custom `src` and `public` folder in root. `public` folder must have `index.html` file. `src` folder must have `index.js` or `index.ts` file depending upon you are using javascript or typescript. If you want to see an example where `src` and `public` folder are included check this out these branches below -
  - [react-min-src](https://github.com/nikhilnayyar002/react-min/tree/react-min-src)
  - [react-min-ts-src](https://github.com/nikhilnayyar002/react-min/tree/react-min-ts-src)
- .gitignore now ignores `.env.*.local` files.
- `config.js` has been split up into into `wm-config.js` & `wm-helper.js`.
- `getBabelLoaderDefaultOptions` which was earlier nested in `webpack` has been moved inside `babel` in `wm-config.js`. Lot of other properties has been modified as well but concept remains almost same. New options has been added such as `resolve` etc. `devServer` option also modified.

### ⚠ BREAKING CHANGES

- src and public folder are removed.
- .gitignore .env.\*.local files, split config.js into wm-config.js & wm-helper.js.

### Enhancements

- refractor, update, add eslint react-hook ([bb33d10](https://github.com/nikhilnayyar002/react-min/commit/bb33d10dd767bc5644f85a2ae9237f0fbb95d387))
  - eslint
    - add "plugin:react-hooks/recommended"
    - update ignorePatterns to only lint files in src
  - update package.json - remove packages (cross-env, acorn)
  - refractor react-min config

### Bug Fixes

- **jsconfig.json:** replace with tsconfig.json ([23c4e63](https://github.com/nikhilnayyar002/react-min/commit/23c4e63a81ade65853505c639c5233527550dd84))

### Features

- **asset-txt:** import raw text file content ([72cf4c6](https://github.com/nikhilnayyar002/react-min/commit/72cf4c625d37841e27578392be17d9c9d6c8fb5c))
- remove public and src folder ([88618f4](https://github.com/nikhilnayyar002/react-min/commit/88618f45a57d87a19600771b1799e171d364ad2f))
- **svg-component:** add svg as component support ([6ff9774](https://github.com/nikhilnayyar002/react-min/commit/6ff97748c0e06519b60d8885faff45c276d0aa92))

## [1.4.0](https://github.com/nikhilnayyar002/react-min/compare/v1.3.1...v1.4.0) (2021-09-04)

### Build System

- update major packages, update devServer config ([da8f744](https://github.com/nikhilnayyar002/react-min/commit/da8f744e3c701800c7cd52ccbc97ec264490ae38)) ([0a55ccc](https://github.com/nikhilnayyar002/react-min/commit/0a55ccc324cf20c15179ecefe01b342925c7c9a0))

### Enhancements

- config warnings, update packages & doc ([e6f8c16](https://github.com/nikhilnayyar002/react-min/commit/e6f8c168f825150013d852d11899eb30657e38ea))
- common config to generate vendor chunks ([01d56b6](https://github.com/nikhilnayyar002/react-min/commit/01d56b67ee6f25ac7768567306b0b9e6132f918f))
- **source-map:** enable source-map in dev ([d3bafaf](https://github.com/nikhilnayyar002/react-min/commit/d3bafaf3182aa5a089bf06313d3927b4d52050a2)), closes [#1](https://github.com/nikhilnayyar002/react-min/issues/1)

### Docs

- update [readme.md](readme.md)

### Reverts

- **release-1.3.1:** remove 1.3.1 from changelog ([cb83267](https://github.com/nikhilnayyar002/react-min/commit/cb83267f71fae38cc29bf2bed36c93b6e865d03d))

## [1.3.0](https://github.com/nikhilnayyar002/react-min/compare/v1.2.0...v1.3.0) (2021-07-21)

### Build System

- config updates & react-refresh support ([392a32f](https://github.com/nikhilnayyar002/react-min/commit/392a32f1c44341281799f0c08e2363d147a151a6))
- misc ([ed57bd5](https://github.com/nikhilnayyar002/react-min/commit/ed57bd5892d81cd7584c12ce55c598472fcbdba0), [19e6191](https://github.com/nikhilnayyar002/react-min/commit/19e6191134194473a6c0c6f0bad91b46c16bfe36))
- misc updates, show local ip addresses ([3bc9876](https://github.com/nikhilnayyar002/react-min/commit/3bc9876e2943ba4f101d97a20834e28344ceedc1))

## [1.2.0](https://github.com/nikhilnayyar002/slickjs-react-antd/compare/v1.1.0...v1.2.0) (2021-07-02)

### Build System

- add, update config files ([f9469d9](https://github.com/nikhilnayyar002/slickjs-react-antd/commit/f9469d91bb23b385e96cc5d31cdc52dafe845dcb))
  - add .czrc file and remove config from package.json
  - .versionrc file: add enhance type, add emoji to display in changelog

## [1.1.0](https://github.com/nikhilnayyar002/slickjs-react-antd/compare/v1.0.0...v1.1.0) (2021-07-01)

### Features

- **webpack:** add plugin - detect circular depen. ([e686f2a](https://github.com/nikhilnayyar002/slickjs-react-antd/commit/e686f2ad46e2bbaa27a644b945337c2533d0fc64))

### Docs

- **readme.md:** add commit guidelines ([5eed889](https://github.com/nikhilnayyar002/slickjs-react-antd/commit/5eed889ecd91c3c466c6b04008f4ba4cf6b35f8b))

### Code Refactoring

- **.versionrc:** update config ([296c166](https://github.com/nikhilnayyar002/slickjs-react-antd/commit/296c1665d2c8d352b6c1aafeb81a984429ba7f3f))

## 1.0.0 (2021-06-30)

### Features

- add react and update packages ([c18e576](https://github.com/nikhilnayyar002/slickjs-react-antd/commit/c18e576784086f4ca04ba39563fed8e11a5f540e))
- add release support ([e55e965](https://github.com/nikhilnayyar002/slickjs-react-antd/commit/e55e965cc1c545af58444a5b3bfb3d9872fcd875))
