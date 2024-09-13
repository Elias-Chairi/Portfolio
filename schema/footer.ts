import { defineField, defineType } from "sanity";
import { icons } from "lucide-react";

let iconsList: { title: string; value: string }[] = [];

Object.entries(icons).forEach(([icon, component]) => {
  iconsList.push({ title: component.displayName || "", value: icon });
})

export const linkAndIcon = [
  {
    type: "object",
    fields: [
      defineField({
        name: "icon",
        title: "Icon",
        type: "string",
        options: {
          list: iconsList,
          layout: "dropdown",
        },
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: "href",
        title: "Full URL or mailto href (ex. mailto:someone@example.com)",
        type: "string",
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: "text",
        title: "Link text (visual text)",
        type: "string",
        validation: (Rule) => Rule.required(),
      }),
    ],
  },
];

export default defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: linkAndIcon,
    }),
    defineField({
      name: "highlightedLinks",
      title: "Highlighted Links",
      type: "array",
      of: linkAndIcon,
      validation: (Rule) => Rule.min(1) && Rule.max(3),
    }),
  ],
});
