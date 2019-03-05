const { execSync } = require("child_process");

const { log } = console;

module.exports = args => {
  const workingDirectory = process.cwd();
  const semRel = `node ./node_modules/semantic-release/bin/semantic-release.js`;

  log(
    execSync(
      `cd ${workingDirectory} && npm i semantic-release@8.2.3 last-release-git@0.0.3 condition-circle@2.0.2 --no-save`
    ).toString("utf8")
  );

  log(
    execSync(
      "git config --replace-all remote.origin.fetch +refs/heads/*:refs/remotes/origin/* && git fetch --tags"
    ).toString("utf8")
  );

  const debug = args.includes("--dry-run") ? "--debug" : "";
  try {
    log(
      execSync(`cd ${workingDirectory} && ${semRel} pre ${debug}`).toString(
        "utf8"
      )
    );
  } catch (e) {
    // Suppress error message if a new version has been calculated
    if (!e.message.includes("Not publishing in debug mode.")) {
      throw e;
    }

    log("Ignoring semantic-release 'not publishing' error.");
  }

  if (debug) return;

  if (args.includes("--npm-publish")) {
    log(execSync(`cd ${workingDirectory} && npm publish`).toString("utf8"));
  }

  log(
    execSync(`cd ${workingDirectory} && ${semRel} post ${debug}`).toString(
      "utf8"
    )
  );
};
