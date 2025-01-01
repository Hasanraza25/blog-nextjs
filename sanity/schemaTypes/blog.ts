import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'blog',
  type: 'document',
  title: 'Blog',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title Of the Blog',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug Of the Blog',
      options: {
        source: 'title',
      },
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image Of the Blog',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Small Description',
    },
    {
      name: 'content',
      type: 'array',
      title: 'Content Of the Blog',
      of: [
        {
          type: 'block', 
        },
        {
          type: 'image', 
          title: 'Image',
          options: {
            hotspot: true, 
          },
        },
      ],
    },
  ],
})
