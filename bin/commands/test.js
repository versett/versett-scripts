const { red, green } = require("chalk");
const { log } = console;
const { execSync } = require("child_process");

module.exports = () => {
  const branchName = execSync("git rev-parse --abbrev-ref HEAD");

  /**
   * Get commit messages, split them into an array, and remove the SHA part from them
   */
  const branchCommits = execSync(`git cherry -v origin/master ${branchName}`)
    .toString("utf8")
    .match(/[^\r\n]+/g)
    .map(commitMsgWithSHA => commitMsgWithSHA.substring(43)); // eslint-disable-line no-magic-numbers

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
