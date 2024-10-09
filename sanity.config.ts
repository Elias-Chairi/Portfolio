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
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,
  plugins: isDev ? [structureToolPlugin, visionTool()] : [structureToolPlugin],
  schema: {
    types: schemaTypes,
  },
});
