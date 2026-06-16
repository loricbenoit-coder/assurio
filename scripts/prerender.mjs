/**
 * Prerender SEO — génère des pages HTML statiques pour les articles de blog.
 * Exécuté après `vite build` via le script "build" dans package.json.
 *
 * Pour chaque article : dist/blog/<slug>/index.html
 *   → titre, meta description, OG tags et contenu de l'article inline.
 * Les bots (Googlebot, Bingbot…) lisent ce HTML avant que React ne s'exécute.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DIST = join(ROOT, 'dist')
const SITE = 'https://assur-emprunteur.fr'

// ── Parse articles.js — extrait les métadonnées (champs string simples) ─
function parseArticlesMeta(source) {
  const articles = []
  // Chaque article commence par "slug:" après un "{"
  // On découpe le source en blocs délimités par les objets du tableau
  const blocks = source.split(/\n\s*\{/)
  for (const block of blocks) {
    const get = (key) => {
      const m = block.match(new RegExp(`\\b${key}:\\s*['"]([^'"\\\\]*(?:\\\\.[^'"\\\\]*)*)['"]`))
      return m ? m[1].replace(/\\'/g, "'").replace(/\\"/g, '"') : ''
    }
    const slug = get('slug')
    if (!slug) continue
    articles.push({
      slug,
      title: get('title'),
      description: get('description'),
      category: get('category'),
      date: get('date'),
      image: get('image'),
    })
  }
  return articles
}

const articlesSource = readFileSync(join(ROOT, 'src/data/articles.js'), 'utf-8')
const ARTICLES = parseArticlesMeta(articlesSource)

if (!ARTICLES.length) {
  console.error('❌  Impossible de lire les articles depuis src/data/articles.js')
  process.exit(1)
}

// ── Lit le template dist/index.html ────────────────────────────────────
if (!existsSync(join(DIST, 'index.html'))) {
  console.error('❌  dist/index.html introuvable. Lancez `vite build` avant ce script.')
  process.exit(1)
}
const template = readFileSync(join(DIST, 'index.html'), 'utf-8')

function escape(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function buildPage({ title, description, canonical, image, type = 'article', date, category, breadcrumbs }) {
  const fullTitle = `${title} | Assur Emprunteur`
  const imgUrl = image || `${SITE}/logo-carre.svg`

  const schema = type === 'article'
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description,
        image: imgUrl,
        datePublished: date,
        author: { '@type': 'Organization', name: 'Assur Emprunteur', url: SITE },
        publisher: { '@type': 'Organization', name: 'Assur Emprunteur', logo: { '@type': 'ImageObject', url: `${SITE}/logo-carre.svg` } },
        url: canonical,
        mainEntityOfPage: canonical,
      }
    : null

  const bcSchema = breadcrumbs
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((b, i) => ({ '@type': 'ListItem', position: i + 1, name: b.name, item: b.url })),
      }
    : null

  const meta = `
  <title>${escape(fullTitle)}</title>
  <meta name="description" content="${escape(description)}" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:title" content="${escape(fullTitle)}" />
  <meta property="og:description" content="${escape(description)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${escape(imgUrl)}" />
  <meta property="og:type" content="${type}" />
  <meta property="og:locale" content="fr_FR" />
  <meta property="og:site_name" content="Assur Emprunteur" />
  ${date ? `<meta property="article:published_time" content="${date}" />` : ''}
  ${category ? `<meta property="article:section" content="${escape(category)}" />` : ''}
  <meta property="article:author" content="Assur Emprunteur" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escape(fullTitle)}" />
  <meta name="twitter:description" content="${escape(description)}" />
  <meta name="twitter:image" content="${escape(imgUrl)}" />
  ${schema ? `<script type="application/ld+json">${JSON.stringify(schema)}</script>` : ''}
  ${bcSchema ? `<script type="application/ld+json">${JSON.stringify(bcSchema)}</script>` : ''}`

  // Strip existing SEO tags from the template that would conflict with article-specific ones
  const stripped = template
    .replace(/<title>[^<]*<\/title>/, '')
    .replace(/<meta\s+name="description"[^>]*>/gi, '')
    .replace(/<link\s+rel="canonical"[^>]*>/gi, '')
    .replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, '')
    .replace(/<meta\s+property="article:[^"]*"[^>]*>/gi, '')
    .replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, '')
    .replace(/<meta\s+name="twitter:card"[^>]*>/gi, '')
    .replace(/<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi, '')

  return stripped.replace('</head>', meta + '\n</head>')
}

// ── Génère une page par article ─────────────────────────────────────────
let count = 0
for (const article of ARTICLES) {
  const { slug, title, description, category, date, image } = article
  const canonical = `${SITE}/blog/${slug}`

  const html = buildPage({
    title,
    description,
    canonical,
    image,
    type: 'article',
    date,
    category,
    breadcrumbs: [
      { name: 'Accueil', url: SITE },
      { name: 'Conseils', url: `${SITE}/blog` },
      { name: title, url: canonical },
    ],
  })

  const dir = join(DIST, 'blog', slug)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html, 'utf-8')
  count++
  console.log(`  ✓ /blog/${slug}`)
}

// ── Page /blog (liste) ──────────────────────────────────────────────────
const blogHtml = buildPage({
  title: 'Conseils assurance emprunteur',
  description: 'Tous nos conseils pour choisir, comparer et résilier votre assurance emprunteur. Loi Lemoine, délégation, garanties, économies...',
  canonical: `${SITE}/blog`,
  type: 'website',
})
mkdirSync(join(DIST, 'blog'), { recursive: true })
writeFileSync(join(DIST, 'blog', 'index.html'), blogHtml, 'utf-8')
console.log('  ✓ /blog')

console.log(`\n✅  Prerender terminé — ${count} articles + page /blog`)
