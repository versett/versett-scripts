#! /usr/bin/env node

const commands = {
  precommit: require("./commands/precommit.js"),
  preparecommitmsg: require("./commands/preparecommitmsg.js"),
  prepush: require("./commands/prepush.js"),
  commitmsg: require("./commands/commitmsg.js"),
  release: require("./commands/release.js")
};

const { yellow, red } = require("chalk");
const { log } = console;

const command = process.argv.slice(2, 3);
const args = process.argv.slice(3);

if (command && command in commands) {
  const startTime = new Date().getTime();
  const commandFailed = commands[command](args) === "error";
  const took = Math.round(new Date().getTime() - startTime) / 1000;
  log(`versett-devtools '${command}' command took ${took} seconds.`);
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
