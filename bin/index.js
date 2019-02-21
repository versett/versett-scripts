#! /usr/bin/env node
const precommit = require("./commands/precommit.js");
const preparecommitmsg = require("./commands/preparecommitmsg.js");
const prepush = require("./commands/prepush.js");
const commitmsg = require("./commands/commitmsg.js");
const release = require("./commands/release.js");
const commands = {
  precommit,
  preparecommitmsg,
  prepush,
  commitmsg,
  release
};

const { yellow, red } = require("chalk");
const { log } = console;

const command = process.argv.slice(2, 3); // eslint-disable-line no-magic-numbers
const args = process.argv.slice(3); // eslint-disable-line no-magic-numbers
const SECOND_IN_MILLIS = 1000;

if (command && command in commands) {
  const startTime = new Date().getTime();
  const commandFailed = commands[command](args) === "error";
  const took = Math.round(new Date().getTime() - startTime) / SECOND_IN_MILLIS;
  log(`versett-scripts '${command}' command took ${took} seconds.`);
  if (commandFailed) {
    process.exit(1);
  }
} else {
  if (command && command.length > 0) {
    log(red(`Command '${command}' not found.`));
  }

  log(
    yellow(`
Available commands:

- ${Object.keys(commands).join("\n- ")}
`)
  );
}
