import { defineCliConfig, getStudioEnvironmentVariables } from "sanity/cli";

const { SANITY_STUDIO_PROJECT_ID: projectId, SANITY_STUDIO_DATASET: dataset } =
  getStudioEnvironmentVariables({
    envFile: { mode: "sanity-studio" },
  });

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  studioHost: "elias-chairi",
});
