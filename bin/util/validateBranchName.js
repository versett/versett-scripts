const { red } = require("chalk");
const { log } = console;

module.exports = branchName => {
  /**
   * If committing directly to master, don't do anything.
   */
  if (["master"].includes(branchName)) {
    return;
  }

  /**
   * Make sure the branch name is prefixed with 'feature/'
   */
  if (
    branchName.indexOf("feature/") !== 0 &&
    branchName.indexOf("bugfix/") !== 0 &&
    branchName.indexOf("hotfix/") !== 0
  ) {
    log(
      red(
        `Branch name should be prefixed with 'feature/', 'bugfix/', or 'hotfix/'. '${branchName}' is invalid.`
      )
    );
    return "error";
  }

  /**
   * Find the issue ID in the branch name
   */
  const issueIdMatch = branchName.match(
    /^(?:feature|bugfix|hotfix)\/([0-9]{1,6})\-[a-zA-Z0-9]+/i
  );

  /**
   * Make sure the branch name contains the issue ID
   */
  if (!issueIdMatch || !issueIdMatch[1]) {
    log(
      red(
        `The prefix in the branch name (e.g. 'feature/') should be immediately followed by the Github issue ID. (Example: feature/1234-header-fix)`
      )
    );
    return "error";
  }
};
