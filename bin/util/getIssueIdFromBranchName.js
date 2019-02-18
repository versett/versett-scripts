module.exports = branchName =>
  branchName.match(/^(?:feature|bugfix|hotfix)\/([0-9]{1,6})\-[a-zA-Z0-9]+/i); // eslint-disable-line no-useless-escape
