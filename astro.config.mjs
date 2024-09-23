// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sanity from "@sanity/astro";
import { loadEnv } from "vite";

const {
  PUBLIC_SANITY_STUDIO_PROJECT_ID,
  PUBLIC_SANITY_STUDIO_DATASET,
  PUBLIC_SANITY_PROJECT_ID,
  PUBLIC_SANITY_DATASET,
  PUBLIC_SANITY_STUDIO_BASE_PATH
} = loadEnv(import.meta.env.MODE, process.cwd(), "");

const projectId = PUBLIC_SANITY_STUDIO_PROJECT_ID || PUBLIC_SANITY_PROJECT_ID;
const dataset = PUBLIC_SANITY_STUDIO_DATASET || PUBLIC_SANITY_DATASET;
const studioBasePath = PUBLIC_SANITY_STUDIO_BASE_PATH || "/admin";

// https://astro.build/config
export default defineConfig({
  output: "static", // we are hosting on github pages so we need to output to static
  integrations: [
    sanity({
      projectId,
      dataset,
      studioBasePath,
      useCdn: false,
      // `false` if you want to ensure fresh data
      apiVersion: "2023-03-20" // Set to date of setup to use the latest API version
    }),
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});