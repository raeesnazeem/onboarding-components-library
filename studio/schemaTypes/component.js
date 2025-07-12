export default {
  name: 'component',
  title: 'Component',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          {title: 'React', value: 'react'},
          {title: 'Vue', value: 'vue'},
          {title: 'Svelte', value: 'svelte'},
          {title: 'HTML/CSS', value: 'html-css'},
          {title: 'Tailwind', value: 'tailwind'},
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'previewImage',
      title: 'Preview Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'codeSnippet',
      title: 'Code Snippet',
      type: 'text',
      description: 'The raw code for the component',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],
}
