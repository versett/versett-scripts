const { execSync } = require("child_process");
const validateBranchName = require("../util/validateBranchName");

module.exports = () => {
  const branchName = execSync("git rev-parse --abbrev-ref HEAD").toString(
    "utf8"
  );
  return validateBranchName(branchName);
};
