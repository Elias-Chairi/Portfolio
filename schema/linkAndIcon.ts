import { defineType } from "sanity";
import { icons } from "lucide-react";

const iconsList = Object.entries(icons).map(
  ([icon, component]) => ({ title: component.displayName || "", value: icon })
);

export default defineType({
  title: "Link and Icon",
  name: "linkAndIcon",
  type: "object",
  fields: [
    {
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        list: iconsList,
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "href",
      title: "Full URL or mailto href (ex. mailto:someone@example.com)",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "text",
      title: "Link text (visual text)",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
  ],
});
