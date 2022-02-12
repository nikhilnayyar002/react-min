Table of contents

- [Important cmds](#important-cmds)
- [Contributing](#contributing)
- [Merging PR](#merging-pr)
- [Commit Process](#commit-process)
- [Reverting commits](#reverting-commits)
- [Mark a commit as unimportant so that you could remove it from changelog](#mark-a-commit-as-unimportant-so-that-you-could-remove-it-from-changelog)
- [Release Process](#release-process)
- [Standard version](#standard-version)
  - [First release](#first-release)
  - [Initial Version less than equal to 0.X.X](#initial-version-less-than-equal-to-0xx)
  - [Initial Version greater than equal to 1.X.X](#initial-version-greater-than-equal-to-1xx)
  - [Which part will be bumped in case of custom commit types?](#which-part-will-be-bumped-in-case-of-custom-commit-types)
  - [Log tags](#log-tags)
  - [Doing multiple fix/feature](#doing-multiple-fixfeature)
  - [Config:](#config)
  - [Merging branches](#merging-branches)
    - [Pre-release](#pre-release)
    - [Merge any branch into prerelease](#merge-any-branch-into-prerelease)
  - [Important links](#important-links)

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
// read more for "git log" at https://www.atlassian.com/git/tutorials/git-log
git log --graph --oneline
git log -1 --pretty=format:%H
git log -1 --pretty=format:%h or git rev-parse --short HEAD
git log -1 --pretty=format:%B
git log --pretty=format:%s
git add . or git add -A . // add new/modified/deleted files in the current directory
git add --ignore-removal . // adds new/modified files in the current directory
git add -u . // adds modified/deleted files in the current directory
git restore --staged . // unstage all files
git restore --staged src/styles // unstage all files in src/styles
git restore --staged src/index.tsx  // unstage src/index.tsx
git restore . // discard unstaged files (only updated one i.e the ones which are modified/deleted)
git reset // unstage all files
git reset src/styles // unstage all files in src/styles
git reset src/index.tsx  // unstage src/index.tsx
git reset --hard HEAD // throw away all files in index
git reset --hard HEAD~1 // reset HEAD to parent commit
git reset --soft HEAD~1 // reset HEAD to parent commit + current HEAD commit changes staged
git reset HEAD~1 // reset HEAD to parent commit + current HEAD commit changes unstaged + all staged changes in index also gets unstaged
git tag --delete tagname
git push origin :tagname
git rebase --onto <new-parent> <old-parent> // https://stackoverflow.com/questions/3810348/setting-git-parent-pointer-to-a-different-parent

//swap staged and unstaged changes
Note the name of your current branch as:
<name-of-your-branch>

git checkout -b temp-unstaged
git commit -m "staged"
git branch temp-staged
git add .
git commit -m "unstaged"
git rebase --onto HEAD~2 HEAD~1
git checkout temp-staged
git rebase temp-unstaged
git reset HEAD~1
git reset --soft HEAD~1
git checkout <name-of-your-branch>
git branch -D temp-staged
git branch -D temp-unstaged

//revert
git revert --no-commit d4b4eba 13a97b2 // revert two commits
git revert --no-commit HEAD~3..HEAD // revert last three commits
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

## Reverting commits

- run `git revert --no-commit` with short commit hash
  ```
  git revert --no-commit d4b4eba 13a97b2
  ```
- run `npm run commit` and choose **revert** type.
- add message as for example: "d4b4eba,13a97b2"

After successfully done we will have a new commit with subject:
`revert: d4b4eba,13a97b2`

## Mark a commit as unimportant so that you could remove it from changelog

If a commit type is configered to be in included in changelog and if you dont want it to be included then add `-:X` in starting of message when you run `npm run commit` to remind yourself to remove that committed type from generated changelog. For example the commit subject will then look like:

`<type>: -:X unusual document updates`

## Release Process

Release should be made after adding changes in both code and docs.

- `npm run release -- --skip.tag --skip.commit`
- review changelog
  - combine multiple lines stating fixes: package updates to one line.
  - run `git log --pretty=format:%s vX.X.X..HEAD --grep="revert:"` to find **revert** type commits between tag vX.X.X to HEAD (tag excluded, head included). Remove commits mentioned by **revert** type from generated changelog. Here vX.X.X represents previous tagged release.
  - search for messages with `-X` in it. These are the commits you yourself marked as unimportant. See
- stage changes and commit
- `git tag -a vX.X.X -m "release: X.X.X"`
- `git push --follow-tags origin master`
- publish github release

> Note: `npm run release -- --dry-run` can be used for see changes without actually making them. [See](https://github.com/conventional-changelog/standard-version#dry-run-mode)

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

### Initial Version less than equal to 0.X.X

Commiting major changes (BREAKING CHANGES) when major part is intially 0
_(i.e. package.json & package-lock.json has "version" field with major=0_

- When breaking changes are introduced (major should be supposed to be incremented), running `npm run release` will actually bump minor part and set patch to 0.

  Eg: v0.0.0 to v0.1.0, v0.1.1 to v0.2.0 \
  You must have thought that it should be - v0.0.0 to v1.0.0, v0.1.1 to v2.0.0

  In order to release major > 0.X.X use

  ```
  npm run release -- --release-as major
  ```

  It will bump major. If it was 0 then it will be 0+1 = 1. So version will change from say v0.1.1 to v1.0.0.

- for all other commit types that does not introduce BREAKING CHANGES, running `npm run release` will actually bump patch part.

  Eg: // eg: v0.0.0 to v0.0.1, v0.1.1 to v0.1.2 \
  You must have thought for `feat` commit type it should have bumped from v0.0.0 to v0.1.0.

### Initial Version greater than equal to 1.X.X

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

### Merging branches

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

#### Pre-release

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

#### Merge any branch into prerelease

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
