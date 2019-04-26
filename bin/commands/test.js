const { red } = require("chalk");
const { log } = console;
const getGithubPRCommits = require("../util/getGithubPRCommits");

module.exports = () => {
  const repoOwner = process.env.CIRCLE_PROJECT_USERNAME;
  const repoSlug = process.env.CIRCLE_PROJECT_REPONAME;
  const PRNumber = new RegExp("/([0-9]+)(?=[^/]*$)").exec(
    process.env.CIRCLE_PULL_REQUEST
  )[1];
  const githubToken = process.env.GH_TOKEN;

  return getGithubPRCommits(repoOwner, repoSlug, PRNumber, githubToken).then(
    commits => {
      const hasCommitWithTemplate = commits.filter(commitData => {
        const commitMsg = commitData.commit.message;
        return (
          commitMsg.match(/[a-zA-Z]+\(.+\):.+/) &&
          commitMsg.match(/^(feat|fix|perf)\([a-zA-Z0-9 -]+\): [^ ]+/)
        );
      }).length;

      if (!hasCommitWithTemplate) {
        log(
          red(
            "This pull request doesn't have a commit which follows the commit template"
          )
        );
        return "error";
      }
    }
  );
};
