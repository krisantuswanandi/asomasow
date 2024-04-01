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

    const token = core.getInput("token", { required: true });
    const octokit = github.getOctokit(token);

    await octokit.rest.repos.createRelease({
      owner: "krisantuswanandi",
      repo: "asomasow",
      tag_name: version,
      name: version,
      body: "This is a release created by the GitHub Action",
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
