const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
  try {
    const version = core.getInput("version", { required: true });
    core.info(`Version: ${version}!`);

    const time = new Date().toTimeString();
    core.setOutput("time", time);

    core.info(
      `The event payload: ${JSON.stringify(github.context.payload, null, 2)}`
    );
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
