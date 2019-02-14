const fs = require("fs-extra");
const path = require("path");
const { red } = require("chalk");
const { log } = console;

module.exports = args => {
  const commitMsgFile = args[0];
  if (!commitMsgFile) {
    log(red("Commit msg file is not set."));
    return "error";
  }

  const gitDir = path.join(commitMsgFile, "../");

  const prevCommitMsg = fs.readFileSync(commitMsgFile, "utf8").trim();

  /**
   * If commit message is attempting to use message template, but not doing so correctly.
   */
  if (
    prevCommitMsg.match(/[a-zA-Z]+\(.+\):.+/) &&
    !prevCommitMsg.match(/^(feat|fix|perf)\([a-zA-Z0-9 -]+\)\: [^ ]+/)
  ) {
    log(
      red(
        "When making templated commit messages, please use one of the valid prefixes(feat, fix, perf) and ensure there is a single space afer the colon. eg. 'feat(descriptor): Commit message.'"
      )
    );
    return "error";
  }

  /**
   * All commit messages will be checked for task id like (#999) at the end.
   */
  if (!prevCommitMsg.match(/^.+ \(\#[1-9][0-9]*\)(?:\s|\n|$)/)) {
    log(red("All commit messages must end in a task id, written as '(#999)'"));
    return "error";
  }
};
