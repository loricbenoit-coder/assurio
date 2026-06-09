import React from 'react'

/**
 * Image optimisée pour les articles :
 * - WebP forcé via paramètre Unsplash
 * - srcSet responsive (400/800/1200px)
 * - lazy loading + decoding async
 * - width/height pour éviter CLS
 */
export const ArticleImage = ({
  src,
  alt,
  className = '',
  eager = false,
  aspectRatio = '3/2',
}) => {
  if (!src) return null

  const base = src.split('?')[0]
  const isUnsplash = base.includes('unsplash.com')

  const buildSrc = (w) =>
    isUnsplash
      ? `${base}?w=${w}&q=75&fm=webp&fit=crop`
      : src

  const srcSet = isUnsplash
    ? `${buildSrc(400)} 400w, ${buildSrc(800)} 800w, ${buildSrc(1200)} 1200w`
    : undefined

  return (
    <img
      src={buildSrc(1200)}
      srcSet={srcSet}
      sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      width={1200}
      height={800}
      className={className}
      style={{ aspectRatio }}
    />
  )
}
