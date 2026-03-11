import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    blog: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.text({
          label: 'Date',
          description: 'Format: MAR 11, 2026',
        }),
        category: fields.text({ label: 'Category', description: 'e.g. MALWARE ANALYSIS, INTEL' }),
        author: fields.text({ label: 'Author Alias' }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
        readTime: fields.text({ label: 'Read Time', description: 'e.g. 10 MIN READ' }),
        image: fields.image({
          label: 'Cover Image',
          directory: 'public/images',
          publicPath: '/images/',
        }),
        summary: fields.text({ label: 'Summary', multiline: true }),
        featured: fields.checkbox({ label: 'Featured Post?' }),
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'public/images',
            publicPath: '/images/',
          },
        }),
      },
    }),
  },
});
