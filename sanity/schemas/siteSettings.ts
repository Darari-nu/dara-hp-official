import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'サイト設定',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'サイトタイトル',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'サイト説明',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'keywords',
      title: 'キーワード',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'logo',
      title: 'ロゴ',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'favicon',
      title: 'ファビコン',
      type: 'image'
    }),
    defineField({
      name: 'socialMedia',
      title: 'ソーシャルメディア',
      type: 'object',
      fields: [
        {
          name: 'twitter',
          title: 'Twitter URL',
          type: 'url'
        },
        {
          name: 'linkedin',
          title: 'LinkedIn URL',
          type: 'url'
        },
        {
          name: 'github',
          title: 'GitHub URL',
          type: 'url'
        }
      ],
      options: {
        collapsible: true
      }
    }),
    defineField({
      name: 'contact',
      title: '連絡先',
      type: 'object',
      fields: [
        {
          name: 'email',
          title: 'メールアドレス',
          type: 'email'
        },
        {
          name: 'phone',
          title: '電話番号',
          type: 'string'
        },
        {
          name: 'address',
          title: '住所',
          type: 'text',
          rows: 2
        }
      ],
      options: {
        collapsible: true
      }
    }),
    defineField({
      name: 'analytics',
      title: 'アナリティクス',
      type: 'object',
      fields: [
        {
          name: 'googleAnalyticsId',
          title: 'Google Analytics ID',
          type: 'string'
        }
      ],
      options: {
        collapsible: true,
        collapsed: true
      }
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description'
    }
  }
})