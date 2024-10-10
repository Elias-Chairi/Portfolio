// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sanity from "@sanity/astro";

// https://astro.build/config
export default defineConfig({
  site: "https://Elias-Chairi.github.io",
  base: "Portfolio",
  output: "static",
  devToolbar: { enabled: false },
  integrations: [
    sanity({
      projectId: process.env.SANITY_STUDIO_PROJECT_ID,
      dataset: process.env.SANITY_STUDIO_DATASET,
      useCdn: false,
      // `false` if you want to ensure fresh data
      apiVersion: "2023-03-20", // Set to date of setup to use the latest API version
    }),
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
