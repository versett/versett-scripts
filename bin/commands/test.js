const { execSync } = require("child_process");
const { red, green } = require("chalk");
const { log } = console;
const getFormattedCommitsCount = require("../util/getFormattedCommitsCount");

const execGitCommand = cmd => {
  return execSync(cmd)
    .toString("utf8")
    .match(/[^\r\n]+/g);
};

const error = message => log(red(`${message}`));
const success = message => log(green(`${message}`));
const MAX_NO_OF_REV = 2;

const validatePRCommits = () => {
  if (process.env.PR_URL) {
    success(`Validating PR Commit Messages on ${process.env.PR_URL}`);

    // Get first and latest commits hash on current branch
    const revHashs = execGitCommand(
      `git rev-list --simplify-by-decoration --no-merges HEAD -${MAX_NO_OF_REV}`
    );

    if (revHashs.length !== MAX_NO_OF_REV) {
      error(`no revision found in this pull request ${process.env.PR_URL}`);
      return "error";
    }

    // Get commit messages, split them into an array, and remove the SHA part from them
    const commitMessages = execGitCommand(
      `git log ${revHashs[1]}..${revHashs[0]} --pretty=format:"%s" --no-merges`
    );

    if (commitMessages.length === 0) {
      error(`no commit found in this pull request ${process.env.PR_URL}`);
      return "error";
    }

    const formattedCommitsCount = getFormattedCommitsCount(commitMessages);

    if (formattedCommitsCount) {
      success(
        `This branch contains ${formattedCommitsCount} commit messages that follow the template.`
      );
    } else {
      error(
        "This branch doesn't have a commit message that follows the template."
      );
      return "error";
    }
  }
};

module.exports = () => {
  return validatePRCommits();
};
