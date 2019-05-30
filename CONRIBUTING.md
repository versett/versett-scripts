# Contributing

Here is a brief walk through of how to make your first commit to a Versett project. It will cover each aspect from getting setup for the first keystroke in your IDE to marking the work as 'complete'.

## Step 1 - Tracking

1.  Open an issue. All code should have an associated issue for tracking what the problem is, and the requirements and steps for resolution.
2.  Assign the issue to yourself. Let the world know you're working on this, to avoid duplicate PRs.

## Step 2 - Coding

1.  Create a new branch. To keep things simple, follow the below branching model, where the number is the issue number.

```
feature/123-some-task-description
bugfix/321-some-task-description
hotfix/456-some-task-description
```

2.  Make the fixes.
3.  Test your fixes by running `yarn test`. Be sure to write new tests for any new code paths you've written.
4.  Commit your code, using a commit message that follows [these guidelines](https://github.com/conventional-changelog-archived-repos/conventional-changelog-angular/blob/master/convention.md).

## Step 3 - Pull Request

1.  Create a new pull request, be sure to follow the PR template.
2.  Wait for a review.
3.  Keep it up to date. Sometimes it can take a little while for us to complete a review, especially for large PRs. Be sure to keep your PR up to date and fixing merge conflicts as they arise, so it can be merged as soon as it's been reviewed.
