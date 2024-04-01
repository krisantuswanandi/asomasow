const core = require("@actions/core");
const github = require("@actions/github");
const fs = require("fs");

async function run() {
  try {
    const path = core.getInput("path", { required: true });
    core.info(`Path: ${path}!`);

    const time = new Date().toTimeString();
    core.setOutput("time", time);

    core.info(`The event context: ${JSON.stringify(github.context, null, 2)}`);

    const token = core.getInput("token", { required: true });
    const octokit = github.getOctokit(token);

    const releaseId = core.getInput("release", { required: true });
    await octokit.rest.repos.uploadReleaseAsset({
      owner: "krisantuswanandi",
      repo: "asomasow",
      release_id: releaseId,
      name: "data.txt",
      data: fs.readFileSync(path),
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
