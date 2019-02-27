const { green } = require("chalk");
const { log } = console;
const getGithubPRTargetBranch = require("../util/getGithubPRTargetBranch");

module.exports = () => {
  const repoSlug = process.env.TRAVIS_REPO_SLUG;
  const PRNumber = process.env.TRAVIS_PULL_REQUEST;
  const githubToken = process.env.GH_TOKEN;
  getGithubPRTargetBranch(repoSlug, PRNumber, githubToken).then(targetBranch =>
    green(log(`the Target Branch is ${targetBranch}`))
  );
};
