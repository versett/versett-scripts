# versett-scripts

Collection of scripts that are useful for all V// projects.

## Usage

When you add it as a dependency in your project, and configure it accordingly on its `package.json` (see instructions below), `versett-scripts`'s runs in the background.
Whenever you commit or push code to your project, `versett-scripts` will run its validations in order to enforce good practices on branch names and commit messages.
Furthermore, it adds support for automated changelog, release, and npmjs publishing.

### Installation

1. Run `yarn add @versett/versett-scripts --dev`
2. In order to enable the git hook commands, you have to add [husky](https://github.com/typicode/husky) configuration to your `package.json`. There are currently four commands supported by `versett-scripts`. Here's a configuration example containing all four, which can be added to your `package.json`'s root':

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

3. For the `precommit` hook, you also need some minimal [lint-staged](https://github.com/okonet/lint-staged) config. You should have it match the characteristics of your project as to what kind of linting is going to be done. Here's an example, which can be added to your `package.json`'s root:

```json
"lint-staged": {
  "*.{js,json,css,md,ts,tsx}": ["prettier --write", "git add"]
}
```

4. For the `release` command, you also need to set the following in your `package.json`'s root:

```json
"version": "0.0.0-semantically-released",
"scripts": {
  "release": "yarn && versett-scripts release --npm-publish"
},
"release": {
  "getLastRelease": "last-release-git"
}
```

### Commands and features

For the following, let's assume that you enabled all commands as described in the `Installation` section.

- `versett-scripts` will use git hooks to perform checks on all commits to your repo. Whenever a commit is made, the following commands will be ran, in order: `prepare-commit-msg`, `commit-msg`, `pre-commit`. If any of the check fails, nothing will be commited.

  - `prepare-commit-msg`: Automatically appends the issue ID based on the branch name (`(#ISSUEID)`) to your commit message. If the branch name doesn't contain an issue ID (e.g. `master`), `prepare-commit-msg` won't append anything. This might imply that other checks will fail.

  - `commit-msg`: It checks whether the commit message is a template one. If it is, it's enforced to follow the pattern (`(feat|fix|perf): COMMITMESSAGE (#ISSUEID)`).

  - `pre-commit`: - Automatically applies [Prettier](https://github.com/prettier/prettier) to the staged files, according to the `lint-staged` configuration on your `package.json`.

- `versett-scripts` will validate your branch name before any push by using the `pre-push` hook. Every branch name has to follow the pattern `(feature|bugfix|hotfix)/ISSUEID-ISSUE-DESCRIPTION`. If the check fails, nothing gets pushed.

- `vesett-scripts` will be able to publish your package to npmjs, by means of the `release` command. Typically, Travis CI runs `release` at the end of a successful merge. It automatically calculates the new version number by using `get-latest-release`.

## Development

To get started on development run these commands:

```
nvm use
yarn
```

For testing purposes you can use `yarn link` (or `npm link`):

```
cd versett-scripts
yarn link
```

then

```
cd my-project
yarn link @versett/versett-scripts
```

After that, a symbolic link is added to `node_modules` of the project directory.

## Contributing

Please read [this doc](https://versett.quip.com/zyEcAZ0ZosJn/How-to-Contribute-Code) for details on our code of conduct, and the process for submitting pull requests.

## Versioning

Versioning is done automatically by `versett-scripts` when a branch is merged with master and our CI/CD runs.

## Need help?

Post on the _#internal-tools_ channel on Slack or create an issue.
