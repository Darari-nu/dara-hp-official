import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

// 環境変数を読み込む
const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

if (!projectId) {
  throw new Error('Missing SANITY_PROJECT_ID. Please set SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_PROJECT_ID environment variable.')
}

if (!dataset) {
  throw new Error('Missing SANITY_DATASET. Please set SANITY_DATASET or NEXT_PUBLIC_SANITY_DATASET environment variable.')
}

export default defineConfig({
  name: 'default',
  title: 'Vibe Blog by Sanity',

  projectId,
  dataset,

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
