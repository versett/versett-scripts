module.exports = branchCommits => {
  const getFormattedCommitsCount = branchCommits.filter(
    commitMsg =>
      commitMsg.match(/[a-zA-Z]+\(.+\):.+/) &&
      commitMsg.match(/^(feat|fix|perf)\([a-zA-Z0-9 -]+\): [^ ]+/)
  ).length;

  return getFormattedCommitsCount;
};
