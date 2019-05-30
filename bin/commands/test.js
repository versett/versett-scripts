const { execSync } = require("child_process");
const { red, green } = require("chalk");
const { log } = console;
const getFormattedCommitsCount = require("../util/getFormattedCommitsCount");

module.exports = () => {
  /**
   * Get first and latest commits hash on current branch
   */
  const hashes = execSync(
    "git rev-list --simplify-by-decoration --no-merges HEAD -2"
  )
    .toString("utf8")
    .match(/[^\r\n]+/g);

  if (hashes.length != 2) {
    log(red("no revision found via 'git rev-list'"));
    return "error";
  }

  /**
   * Get commit messages, split them into an array, and remove the SHA part from them
   */
  const branchCommits = execSync(`git cherry -v ${hashes[1]} ${hashes[0]}`)
    .toString("utf8")
    .match(/[^\r\n]+/g)
    .map(commitMsgWithSHA => commitMsgWithSHA.substring(43)); // eslint-disable-line no-magic-numbers

  if (branchCommits.length == 0) {
    log(red("no commit found via 'git cherry -v'"));
    return "error";
  }

  const formattedCommitsCount = getFormattedCommitsCount(branchCommits);

  if (formattedCommitsCount) {
    log(
      green(
        `This branch contains ${formattedCommitsCount} commit messages that follow the template.`
      )
    );
  } else {
    log(
      red(
        "This branch doesn't have a commit message that follows the template."
      )
    );
    return "error";
  }
};
