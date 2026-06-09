import React, { Suspense } from 'react'
import { useInView } from '@/hooks/useInView'

/**
 * Monte le children uniquement quand la section approche du viewport.
 * Affiche un placeholder de même hauteur pour éviter le CLS.
 */
export const LazySection = ({ children, minHeight = 400, id }) => {
  const [ref, inView] = useInView()

  return (
    <div ref={ref} id={id} style={{ minHeight: inView ? undefined : minHeight }}>
      {inView && (
        <Suspense fallback={<div style={{ minHeight }} />}>
          {children}
        </Suspense>
      )}
    </div>
  )
}
