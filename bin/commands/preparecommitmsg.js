const fs = require("fs-extra");
const path = require("path");
const { red, green, yellow } = require("chalk");
const { log } = console;

module.exports = args => {
  const commitMsgFile = args[0];
  if (!commitMsgFile) {
    log(red("Commit msg file is not set."));
    return "error";
  }

  const gitDir = path.join(commitMsgFile, "../");

  const prevCommitMsg = fs.readFileSync(commitMsgFile, "utf8").trim();
  const branchName = fs
    .readFileSync(path.join(gitDir, "HEAD"), "utf8")
    .replace("ref: refs/heads/", "")
    .trim();

  /**
   * Find the issue ID in the branch name
   */
  const issueIdMatch = branchName.match(
    /^(?:feature|bugfix|hotfix)\/([0-9]{1,6})\-[a-zA-Z0-9]+/i
  );

  if (!issueIdMatch || !issueIdMatch[1]) {
    log(yellow(`Won’t append issue id to commit message.`));
    return;
  }
  const issueId = issueIdMatch[1];

  /**
   * If commit msg is already prefixed with issue ID, just make sure it follows the right template: #ISSUEID
   */
  const issueIdInCommitMsgMatch = prevCommitMsg.match(
    new RegExp(`#${issueId}(?:\\n|\\s|\\)|$)`, "m")
  );

  /**
   * Append #ISSUEID to the commit msg
   */
  let newCommitMsg;
  if (issueIdInCommitMsgMatch) {
    newCommitMsg = prevCommitMsg;
  } else {
    const prevCommitMsgLines = prevCommitMsg.split("\n");
    newCommitMsg = `${prevCommitMsgLines[0]} (#${issueId})`;
    if (prevCommitMsgLines.length > 1) {
      newCommitMsg += `\n${prevCommitMsgLines.slice(1).join("\n")}`;
    }
  }

  /**
   * Update commit msg
   */
  if (newCommitMsg !== prevCommitMsg) {
    fs.writeFileSync(commitMsgFile, newCommitMsg, "utf8");
    log(
      green(`Commit ID was automatically formatted.
Original: ${prevCommitMsg}
Formatted: ${newCommitMsg}`)
    );
  } else {
    log(green(`Commit message was already properly formatted.`));
  }
};
