const { execSync } = require("child_process");
const { red, green, yellow } = require("chalk");
const { log } = console;
const getFormattedCommitsCount = require("../util/getFormattedCommitsCount");

module.exports = () => {
  const execGitCommand = cmd => {
    return execSync(cmd)
      .toString("utf8")
      .match(/[^\r\n]+/g);
  };

  const error = message => log(red(`ERROR: ${message}`));
  const warning = message => log(yellow(`WARNING: ${message}`));
  const success = message => log(green(`${message}`));

  if (!process.env.PR_URL) {
    warning("No link pull reuqest, ignoring the commit message validation");
    return;
  }

  // Get first and latest commits hash on current branch
  const hashes = execGitCommand(
    "git rev-list --simplify-by-decoration --no-merges HEAD -2"
  );

  // eslint-disable-next-line no-magic-numbers
  if (hashes.length !== 2) {
    log(red("no revision found via 'git rev-list'"));
    return "error";
  }

  // Get commit messages, split them into an array, and remove the SHA part from them
  const commitMessages = execGitCommand(
    `git log ${hashes[1]}..${hashes[0]} --pretty=format:"%s" --no-merges`
  );

  log(commitMessages);

  if (commitMessages.length === 0) {
    error("no commit found via 'git cherry -v'");
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
};
