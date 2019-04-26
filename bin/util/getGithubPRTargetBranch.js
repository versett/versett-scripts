const { red } = require("chalk");
const { log } = console;
const fetch = require("node-fetch");

module.exports = (repoSlug, PRNumber, githubToken) => {
  const url = `https://api.github.com/repos/${repoSlug}/pulls/${PRNumber}/commits?access_token=${githubToken}`;
  return fetch(url)
    .then(res => res.json())
    .then(json => {
      console.log(json);
      try {
        const targetBranch = json.base.ref;
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
