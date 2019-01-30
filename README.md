# versett-scripts

Collection of scripts that are useful for V// projects.

## Installation

1. Run `yarn add @versett/versett-scripts --dev`
2. In order to enable the git hook commands, you have to add husky calls to your `package.json`:

```
"husky": {
  "hooks": {
    "commit-msg": "versett-scripts commitmsg ${HUSKY_GIT_PARAMS}",
    "pre-commit": "versett-scripts precommit",
    "prepare-commit-msg": "versett-scripts preparecommitmsg ${HUSKY_GIT_PARAMS}",
    "pre-push": "versett-scripts prepush"
  }
}
```

3. For the `precommit` hook, you also need some minimal `lint-staged` config:

```
"lint-staged": {
  "*.{js,json,css,md, ts, tsx}": ["prettier --write", "git add"]
}
```

4. For the `release` command, you also need to set the following in your `package.json`:

```
"version": "0.0.0-semantically-released",
"scripts": {
  "release": "yarn && versett-scripts release$ --npm-publish"
},
"release": {
  "getLastRelease": "last-release-git"
}
```

## Commands and Features

- Enables `husky` git hooks.
- `commit-msg` command:
  - Enforces that template commit messages follow the pattern (`(feat|fix|perf): COMMITMESSAGE (#ISSUEID)`).
  - Enforces that all commit messages, regardless of template, include an `(#ISSUEID)` at the end.
- `pre-commit` command:
  - Automatically applies [Prettier](https://github.com/prettier/prettier) to all the staged JS, CSS, and JSON files when you commit them.
- `prepare-commit-msg` command:
  - Automatically appends the issue ID based on the branch name (`#ISSUEID Description`) to commit descriptions.
- `pre-push` command:
  - Validates the branch name against the pattern `(feature|bugfix|hotfix)/ISSUEID-ISSUE-DESCRIPTION`.
- `release` command:
  - Enables automated publishing to npmjs.
