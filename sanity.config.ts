// Different environments use different variables
const projectId =
  import.meta.env.PUBLIC_SANITY_STUDIO_PROJECT_ID! ||
  import.meta.env.PUBLIC_SANITY_PROJECT_ID!;
const dataset =
  import.meta.env.PUBLIC_SANITY_STUDIO_DATASET! ||
  import.meta.env.PUBLIC_SANITY_DATASET!;

// Feel free to remove this check if you don't need it
if (!projectId || !dataset) {
  throw new Error(
    `Missing environment variable(s). Check if named correctly in .env file.\n\nShould be:\nPUBLIC_SANITY_STUDIO_PROJECT_ID=${projectId}\nPUBLIC_SANITY_STUDIO_DATASET=${dataset}\n\nAvailable environment variables:\n${JSON.stringify(
      import.meta.env,
      null,
      2
    )}`
  );
}

import { defineConfig, isDev } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schema";

const structureToolPlugin = structureTool({
  structure: (S) =>
    S.list()
      .title("Base")
      .items([
        S.listItem()
          .title("Footer")
          .child(
            S.document()
              .schemaType("footer")
              .documentId("ab5911fd-7dfd-413a-9a5f-f3f3e51db20b")
          ),
        ...S.documentTypeListItems().filter(
          (listItem) => !["Footer"].includes(listItem.getTitle() || "")
        ),
      ]),
});

export default defineConfig({
  name: "project-name",
  title: "Project Name",
  projectId,
  dataset,
  plugins: isDev ? [structureToolPlugin, visionTool()] : [structureToolPlugin],
  schema: {
    types: schemaTypes,
  },
});
