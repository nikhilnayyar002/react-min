## Important cmds

```
npm view <package>
npm view <package> peerDependencies
npm view <package> versions 
npm view <package> versions --json
npm i <package>@latest
npm outdated  
npm update
npm audit
npm audit fix
npm list
npm list --depth=0
npm list <package>
```

## Contributing
- Fork it!
- Create your feature branch: `git checkout -b my-new-feature`
- Commit your changes: `git commit -am 'Add some feature'` or `npm run commit`
- Push to the branch: git push origin my-new-feature
- Submit a pull request

## Merging PR
https://github.com/conventional-changelog/standard-version#should-i-always-squash-commits-when-merging-prs

## Commit Process
- `npm run commit`

## Release Process
- `npm run release -- --skip.tag --skip.commit`
- review and edit files; stage and commit
- `git tag -a vX.X.X -m "release: X.X.X"`
- `git push --follow-tags origin master`
- publish github release

## Standard version 
[Link](https://github.com/conventional-changelog/standard-version)

### First release

**--first-release flag** : use the exact "version" field value intially present in package.json i.e this will tag a release without bumping the version 
```
npm run release -- --first-release 
```

if you had package.json major part > 0 (example: 1.0.0) and you want to start intially at < 1 (say 0.0.0), use

```
 npm run release -- --release-as 0.X.X

 // Example: 
 npm run release -- --release-as 0.0.0
```

### Initial Version <= 0.X.X

Commiting major changes (BREAKING CHANGES) when major part is intially 0
*(i.e. package.json & package-lock.json has "version" field with major=0*

- When breaking changes are introduced (major should be supposed to be incremented), running  `npm run release` will actually bump minor part and set patch to 0.

  Eg: v0.0.0 to v0.1.0, v0.1.1 to v0.2.0 \
  You must have thought that it should be - v0.0.0 to v1.0.0, v0.1.1 to v2.0.0

  In order to release major > 0.X.X use 
  ```
  npm run release -- --release-as major
  ```
  It will bump major. If it was 0 then it will be 0+1 = 1. So version will change from say v0.1.1 to v1.0.0.

- for all other commit types that does not introduce BREAKING CHANGES, running  `npm run release` will actually bump patch part.
  
  Eg: // eg: v0.0.0 to v0.0.1, v0.1.1 to v0.1.2 \
  You must have thought for `feat` commit type it should have bumped from v0.0.0 to v0.1.0.

### Initial Version >= 1.X.X

In this case commiting major changes (BREAKING CHANGES) will bump the major part. Eg: v1.0.1 to v2.0.0, v2.1.1 to v3.0.0.

`feat` commit type bumps minor while `fix` bumps patch.

### Which part will be bumped in case of custom commit types?
If you add custom commit types they all will bump patch. See [here](https://github.com/conventional-changelog/standard-version/issues/826#issuecomment-945194325).

### Log tags
```
git log --no-walk --tags --pretty="%h %d %s" --decorate=full
```
### Doing multiple fix/feature
```
master - v1.0.0
structured commits (feature added)
structured commits (feature added)
structured commits (feature added)
npm run release
master - v1.1.0
```
## Merging branches
```
master - v1.0.0
git checkout -b feature
unstructured commits
structured commits (feature added)
unstructured commits
structured commits (feature added)
structured commits (fix added)
unstructured commits
structured commits (fix added)
unstructured commits
git checkout master
git merge feature
npm run release
master - v1.1.0
```
### Config:
[Link](https://github.com/conventional-changelog/standard-version#configuration)

By default, standard-version only records commit type `feat` and `fix` to CHANGELOG. Add custom commit types and other config as follow:
```
// .versionrc file
{
  "releaseCommitMessageFormat":"release: {{currentTag}}",
  "types": [
    {"type": "revert", "section":"Reverts", "hidden": false},
    {"type": "feat", "section": "Features", "hidden": false},
    {"type": "fix", "section": "Bug Fixes", "hidden": false},
    {"type": "docs", "section":"Docs", "hidden": false},
  ],
  "skip": {
    "changelog": true
  }
}
```

### Pre-release
```
master - v2.4.0
git checkout -b alpha
npm run release -- --prerelease alpha
alpha - v2.4.0-alpha.0
npm run release -- --prerelease alpha --release-as major
alpha - v3.0.0-alpha.0
do commits
do commits
do commits
npm run release -- --prerelease alpha
alpha - v3.0.0-alpha.1
do commits
do commits
npm run release -- --prerelease alpha
alpha - v3.0.0-alpha.2
```

### Merge any branch into prerelease
```
master - v2.4.0
structured commits (feat added)
npm run release  // v2.5.0
git checkout alpha
git merge master
```

### Important links
https://nitayneeman.com/posts/understanding-semantic-commit-messages-using-git-and-angular/ \
https://semver.org/ \
https://medium.com/tunaiku-tech/automate-javascript-project-versioning-with-commitizen-and-standard-version-6a967afae7 \
https://stackoverflow.com/questions/66235299/semver-and-0-x-y-releases-on-github \
https://www.baeldung.com/cs/semantic-versioning
