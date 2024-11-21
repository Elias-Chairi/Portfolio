import { defineType } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: Rule => Rule.required().min(5).max(100),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block'
        }
      ]
    },
    {
      name: 'mainImage',
      title: 'Main Image (Cover Image)',
      type: 'image',
    },
    {
      name: 'gallery',
      title: 'Image Gallery (Screenshots, ...)',
      type: 'array',
      of: [{ type: 'image' }],
    },
    {
      name: 'technologies',
      title: 'Technologies Used (React, Node.js, ...)',
      type: 'array',
      of: [{ type: 'string' }],
      validation: Rule => Rule.min(1),
    },
    {
      name: 'date',
      title: 'Completion Date',
      type: 'date',
      validation: Rule => Rule.required(),
    },
    {
      name: 'url',
      title: 'Project URL (Live Demo)',
      type: 'url',
      validation: Rule => Rule.uri({
        allowRelative: false,
        scheme: ['http', 'https'],
      }),
    },
    {
      name: 'repositoryUrl',
      title: 'Repository URL (GitHub, GitLab, ...)',
      type: 'url',
      validation: Rule => Rule.uri({
        allowRelative: false,
        scheme: ['http', 'https'],
      }),
    },
    {
      name: 'category',
      title: 'Category (Web Development, Mobile App, ...)',
      type: 'string',
      validation: Rule => Rule.required().min(5).max(100),
    },
  ],
});
