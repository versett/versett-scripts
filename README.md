# versett-scripts

Collection of scripts that are useful for V// projects.

## Installation

1. This module shouldn't be installed on its own. Please use `versett-devtools` with the `--script` flag to add `versett-scripts` to your repo.

## Commands and Features

- Adds `husky` as a dev dependency
- Adds the following husky scripts to package.json:
  - `commit-msg`
  - `pre-commit` script and `lint-staged`
  - `prepare-commit-msg`
  - `pre-push`
- `commit-msg` command:
  - Enforces that template commit messages follow the pattern (`(feat|fix|perf): COMMITMESSAGE (#ISSUEID)`).
  - Enforces that all commit messages, regardless of template, include an `(#ISSUEID)` at the end.
- `pre-commit` command:
  - Automatically applies [Prettier](https://github.com/prettier/prettier) to all the staged JS, CSS, and JSON files when you commit them.
- `prepare-commit-msg` command:
  - Automatically appends the issue ID based on the branch name (`#ISSUEID Description`) to commit descriptions.
- `pre-push` command:
  - Validates the branch name against the pattern `(feature|bugfix|hotfix)/ISSUEID-ISSUE-DESCRIPTION`.
