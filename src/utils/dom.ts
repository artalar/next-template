import React from 'react'

export type HandlePerspectiveHoverOptions<T extends HTMLElement> = {
  element: T
  ratio?: number
  getBoundingClientRect?: (element: T) => DOMRect
  transform?: string
  transition?: string
}

export function handlePerspectiveHover<T extends HTMLElement>({
  element,
  ratio = 0.1,
  getBoundingClientRect,
  transform = '',
  transition = '',
}: HandlePerspectiveHoverOptions<T>) {
  const originalDuration = Number(
    transition.match(/transform (?<ms>\d*)ms/)?.groups?.ms,
  )
  let duration = originalDuration
  let _transform = ''
  let lastMoveTime: null | number = null
  let scheduledCb: null | ((time: number) => void) = null
  let gbcrCache: DOMRect
  getBoundingClientRect =
    getBoundingClientRect ||
    ((e: T) => {
      if (!gbcrCache) gbcrCache = e.getBoundingClientRect()
      return gbcrCache
    })

  function getTransition() {
    return transition.replace(/transform \d*ms/, `transform ${duration}ms`)
  }

  function handleMouseLeave(e: MouseEvent & { currentTarget: T }) {
    const target = e.currentTarget
    requestAnimationFrame(() => {
      lastMoveTime = null
      duration = originalDuration
      target.style.transform = ``
      target.style.transition = getTransition()
    })
  }
  function handleMouseMove(e: MouseEvent & { currentTarget: T }) {
    const target = e.currentTarget
    if (!target) return

    const { x, y, width, height } = getBoundingClientRect!(target)

    const perspective = `perspective(${(width + height) / 2}px)`
    const shiftXpx = e.clientX - x
    const shiftYpx = e.clientY - y

    const shiftX = (((shiftXpx - width / 2) / width) * 100) | 0
    const shiftY = ((-(shiftYpx - height / 2) / height) * 100) | 0
    const rotateX = `rotateX(${shiftY * ratio}deg)`
    const rotateY = `rotateY(${shiftX * ratio}deg)`

    _transform = `${transform} ${perspective} ${rotateX} ${rotateY}`

    if (!scheduledCb)
      requestAnimationFrame(
        (scheduledCb = (time) => {
          if (lastMoveTime === null) lastMoveTime = time
          scheduledCb = null
          target.style.transform = _transform
          target.style.transition = getTransition()
          duration = duration < 16 ? 0 : duration - (time - lastMoveTime)
          lastMoveTime = time
        }),
      )
  }

  element.style.transition = getTransition()
  element.addEventListener('mouseleave', handleMouseLeave as any)
  element.addEventListener('mousemove', handleMouseMove as any)

  return function cleanup() {
    element.removeEventListener('mouseleave', handleMouseLeave as any)
    element.removeEventListener('mousemove', handleMouseMove as any)
  }
}

export type UsePerspectiveHoverOptions<T extends HTMLElement> = Omit<
  HandlePerspectiveHoverOptions<T>,
  'element'
>

/**
 * @example
 * ```tsx
 * const ref = usePerspectiveHover<HTMLAnchorElement>()
 * return <a ref={ref} href="/">link</a>
 * ```
 */
export function usePerspectiveHover<T extends HTMLElement>(
  options?: UsePerspectiveHoverOptions<T>,
) {
  const ref = React.useRef<T>(null)

  React.useLayoutEffect(() => {
    if (ref.current)
      return handlePerspectiveHover({ ...options, element: ref.current })
  })

  return ref
}
