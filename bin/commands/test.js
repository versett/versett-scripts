const { red } = require("chalk");
const { log } = console;
module.exports = () => {
  log(red("print pull request number"));
  log(red(process.env.TRAVIS_PULL_REQUEST));
};
