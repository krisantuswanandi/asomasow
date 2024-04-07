const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
  try {
    const ref = core.getInput("tag", { required: true });
    const version = ref.replace("refs/tags/", "");
    core.info(`Version: ${version}!`);

    const time = new Date().toTimeString();
    core.setOutput("time", time);

    core.info(
      `The event payload: ${JSON.stringify(github.context.payload, null, 2)}`
    );

    const token = core.getInput("token", { required: true });
    const octokit = github.getOctokit(token);

    const result = await octokit.rest.repos.createRelease({
      owner: "krisantuswanandi",
      repo: "asomasow",
      tag_name: version,
      name: version,
      body: "This is a release created by the GitHub Action",
    });

    core.setOutput("id", result.data.id);
    core.setOutput("upload_url", result.data.upload_url);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
