import { defineStackbitConfig } from '@stackbit/types'

export default defineStackbitConfig({
  stackbitVersion: '~0.6.0',
  ssgName: 'custom',
  nodeVersion: '18',

  // Source de contenu : fichiers JSON dans /content
  contentSources: [
    {
      type: 'files',
      rootPath: 'content',
      models: [
        {
          name: 'hero',
          type: 'data',
          label: 'Hero Section',
          filePath: 'hero.json',
          fields: [
            { name: 'badge', type: 'string', label: 'Badge text' },
            { name: 'headline', type: 'string', label: 'Titre principal' },
            { name: 'highlight', type: 'string', label: 'Mot mis en avant (ex: -60%)' },
            { name: 'subtitle', type: 'string', label: 'Sous-titre' },
            { name: 'ctaPrimary', type: 'string', label: 'Bouton principal' },
            { name: 'ctaSecondary', type: 'string', label: 'Bouton secondaire' },
          ],
        },
        {
          name: 'siteSettings',
          type: 'data',
          label: 'Réglages du site',
          filePath: 'settings.json',
          fields: [
            { name: 'siteTitle', type: 'string', label: 'Nom du site' },
            { name: 'tagline', type: 'string', label: 'Tagline' },
          ],
        },
      ],
    },
  ],
})
