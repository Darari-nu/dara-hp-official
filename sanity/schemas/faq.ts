import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: '質問',
      type: 'string',
      validation: Rule => Rule.required().max(200)
    }),
    defineField({
      name: 'answer',
      title: '回答',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H4', value: 'h4' }
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' }
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url'
                  }
                ]
              }
            ]
          }
        }
      ],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'カテゴリ',
      type: 'string',
      options: {
        list: [
          { title: 'サービス', value: 'service' },
          { title: '料金', value: 'pricing' },
          { title: 'AI規制', value: 'regulation' },
          { title: '技術', value: 'technology' },
          { title: 'その他', value: 'other' }
        ]
      },
      initialValue: 'service'
    }),
    defineField({
      name: 'order',
      title: '表示順',
      type: 'number',
      initialValue: 0
    }),
    defineField({
      name: 'isPublished',
      title: '公開状態',
      type: 'boolean',
      initialValue: true
    })
  ],
  orderings: [
    {
      title: '表示順',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'category',
      isPublished: 'isPublished'
    },
    prepare({ title, subtitle, isPublished }) {
      return {
        title: title,
        subtitle: `${subtitle} ${!isPublished ? '（非公開）' : ''}`
      }
    }
  }
})