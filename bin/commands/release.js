const { execSync } = require("child_process");

const { log } = console;

module.exports = args => {
  const workingDirectory = process.cwd();
  const semRel = `node ./node_modules/semantic-release/bin/semantic-release.js`;

  log(
    execSync(
      `cd ${workingDirectory} && npm i semantic-release@15.13.4 last-release-git@0.0.3 condition-circle@2.0.2 --no-save`
    ).toString("utf8")
  );

  log(
    execSync(
      "git config --replace-all remote.origin.fetch +refs/heads/*:refs/remotes/origin/* && git fetch --tags"
    ).toString("utf8")
  );

  const debug = args.includes("--dry-run") ? "--dry-run" : "";

  log(
    execSync(`cd ${workingDirectory} && ${semRel} ${debug}`).toString("utf8")
  );
};
