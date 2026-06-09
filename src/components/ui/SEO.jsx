import { useEffect } from 'react'

/**
 * Composant SEO — met à jour dynamiquement le <head>
 * title, meta description, canonical, Open Graph, Twitter Card, Schema.org
 */
export const SEO = ({
  title,
  description,
  canonical,
  image = 'https://assur-emprunteur.fr/logo-carre.svg',
  type = 'website',
  schema = null,
  breadcrumbs = null,
  article = null,
}) => {
  useEffect(() => {
    const SITE = 'Assur Emprunteur'
    const fullTitle = title ? `${title} | ${SITE}` : `${SITE} — Assurance Emprunteur au meilleur prix`

    // Title
    document.title = fullTitle

    const setMeta = (name, content, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name'
      let el = document.querySelector(`meta[${attr}="${name}"]`)
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el) }
      el.setAttribute('content', content)
    }

    const setLink = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`)
      if (!el) { el = document.createElement('link'); el.setAttribute('rel', rel); document.head.appendChild(el) }
      el.setAttribute('href', href)
    }

    // Meta SEO
    if (description) setMeta('description', description)
    if (canonical) setLink('canonical', canonical)

    // Open Graph
    setMeta('og:title', fullTitle, true)
    setMeta('og:type', type, true)
    if (description) setMeta('og:description', description, true)
    if (canonical) setMeta('og:url', canonical, true)
    setMeta('og:image', image, true)
    setMeta('og:site_name', SITE, true)
    setMeta('og:locale', 'fr_FR', true)

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', fullTitle)
    if (description) setMeta('twitter:description', description)
    setMeta('twitter:image', image)

    // Article spécifique
    if (article) {
      setMeta('article:published_time', article.publishedTime, true)
      setMeta('article:author', 'Assur Emprunteur', true)
      setMeta('article:section', article.section, true)
    }

    // Schema.org JSON-LD
    const schemaId = 'dynamic-schema'
    let existing = document.getElementById(schemaId)
    if (!existing) { existing = document.createElement('script'); existing.id = schemaId; existing.type = 'application/ld+json'; document.head.appendChild(existing) }
    existing.textContent = JSON.stringify(schema || {})

    // Breadcrumb Schema
    const breadcrumbId = 'breadcrumb-schema'
    let bcEl = document.getElementById(breadcrumbId)
    if (breadcrumbs) {
      if (!bcEl) { bcEl = document.createElement('script'); bcEl.id = breadcrumbId; bcEl.type = 'application/ld+json'; document.head.appendChild(bcEl) }
      bcEl.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((b, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: b.name,
          item: b.url,
        })),
      })
    } else if (bcEl) {
      bcEl.remove()
    }

    return () => {
      // Nettoyage optionnel
    }
  }, [title, description, canonical, image, type, schema, breadcrumbs, article])

  return null
}
