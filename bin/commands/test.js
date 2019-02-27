const { green, red } = require("chalk");
const { log } = console;
const fetch = require("node-fetch");
module.exports = () => {
  const repoSlug = process.env.TRAVIS_REPO_SLUG;
  const PRNumber = process.env.TRAVIS_PULL_REQUEST;
  const githubToken = process.env.GH_TOKEN;
  const url = `https://api.github.com/repos/${repoSlug}/pulls/${PRNumber}?access_token=${githubToken}`;
  fetch(url)
    .then(res => res.json())
    .then(json => {
      try {
        const targetBranch = json.base.ref;
        green(log(`the Target Branch is ${targetBranch}`));
        return targetBranch;
      } catch (err) {
        red(log("Couldn't find the target branch"));
        process.exit(1);
      }
    })
    .catch(err => {
      red(log(err));
      process.exit(1);
    });
};
