import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'author',
  title: '著者',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: '名前',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'role',
      title: '役職',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: '説明',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'avatar',
      title: 'アバター画像',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'emoji',
      title: '絵文字',
      type: 'string',
      validation: Rule => Rule.max(2)
    }),
    defineField({
      name: 'isActive',
      title: 'アクティブ',
      type: 'boolean',
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'avatar'
    }
  }
})