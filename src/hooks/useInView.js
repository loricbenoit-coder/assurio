import { useEffect, useRef, useState } from 'react'

/**
 * Retourne true une fois que l'élément est entré dans le viewport.
 * Une fois visible, reste true (pas de toggle).
 */
export const useInView = (options = {}) => {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || inView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px 0px', threshold: 0, ...options }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [inView])

  return [ref, inView]
}
