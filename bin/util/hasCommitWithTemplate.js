const { red, green } = require("chalk");
const { log } = console;

module.exports = branchCommits => {
  const hasCommitWithTemplate = branchCommits.filter(
    commitMsg =>
      commitMsg.match(/[a-zA-Z]+\(.+\):.+/) &&
      commitMsg.match(/^(feat|fix|perf)\([a-zA-Z0-9 -]+\): [^ ]+/)
  ).length;

  if (hasCommitWithTemplate) {
    log(
      green("This pull request has a commit which follows the commit template")
    );
  } else {
    log(
      red(
        "This pull request doesn't have a commit which follows the commit template"
      )
    );
    return "error";
  }
};
