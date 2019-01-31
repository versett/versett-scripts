# versett-scripts

Collection of scripts that are useful for V// projects.

## Installation

1. Run `yarn add @versett/versett-scripts --dev`
2. In order to enable the git hook commands, you have to add husky calls to your `package.json`. There are currently four commands supported by `versett-scripts`. Here's a configuration example containing all four:

```json
"husky": {
  "hooks": {
    "commit-msg": "versett-scripts commitmsg ${HUSKY_GIT_PARAMS}",
    "pre-commit": "versett-scripts precommit",
    "prepare-commit-msg": "versett-scripts preparecommitmsg ${HUSKY_GIT_PARAMS}",
    "pre-push": "versett-scripts prepush"
  }
}
```

This will ensure that the `versett-scripts` commands run whenever you do a commit or push in the target repository.

3. For the `precommit` hook, you also need some minimal `lint-staged` config. You should have it match the characteristics of your project as to what kind of linting is going to be done. Here's an example:

```json
"lint-staged": {
  "*.{js,json,css,md, ts, tsx}": ["prettier --write", "git add"]
}
```

4. For the `release` command, you also need to set the following in your `package.json`:

```json
"version": "0.0.0-semantically-released",
"scripts": {
  "release": "yarn && versett-scripts release$ --npm-publish"
},
"release": {
  "getLastRelease": "last-release-git"
}
```

## Usage

For the following, we'll assume that you enabled all commands as described in the `Installation` section.

- `versett-scripts` will use git hooks to perform checks on all commits to your repo. Whenever a commit is made, the following commands will be ran, in order: `prepare-commit-msg`, `commit-msg`, `pre-commit`. If any of the check fails, nothing will be commited.

  - `prepare-commit-msg`: Automatically appends the issue ID based on the branch name (`#ISSUEID Description`) to your commit message. If the branch name doesn't contain an issue ID (e.g. `master`), `prepare-commit-msg` won't append anything. This might imply that other checks will fail.

  - `commit-msg`: Enforces that template commit messages follow the pattern (`(feat|fix|perf): COMMITMESSAGE (#ISSUEID)`).

  - `pre-commit`: - Automatically applies [Prettier](https://github.com/prettier/prettier) to the staged files, according to the `lint-staged` configuration on your `package.json`.

- `versett-scripts` will validate your branch name before any push by using the `pre-push` hook. Every branch name has to follow the pattern `(feature|bugfix|hotfix)/ISSUEID-ISSUE-DESCRIPTION`. The `master` branch is an exception, and it won't be validated (although commiting content straight to `master` should be a rare exception). If the check fails, nothing gets pushed.

- `vesett-scripts` will be able to publish your package to npmjs, by means of the `release` command. Typically, Travis CI runs `release` at the end of a successful merge. It automatically calculates the new version number by using `get-latest-release`.
