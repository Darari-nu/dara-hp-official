import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'タグの説明（任意）',
      rows: 3,
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'タグの表示色（例: #5B47E0）',
      validation: Rule => Rule.regex(/^#[0-9A-Fa-f]{6}$/).warning('有効なHEXカラーコードを入力してください')
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'description'
    },
  },
})