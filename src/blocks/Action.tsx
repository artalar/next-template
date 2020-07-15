import React from 'react'
import styled from 'reshadow'

import { FC } from '~/utils/types'
import { usePerspectiveHover, UsePerspectiveHoverOptions } from '~/utils/dom'
import { Link, LinkProps } from './Link'

export type ActionProps = LinkProps &
  UsePerspectiveHoverOptions<HTMLAnchorElement>

export const Action: FC<ActionProps> = ({
  ratio,
  transform,
  transition,
  ...props
}) => {
  transition = transition ? `${transition}, ` : ``
  transition = `${transition}box-shadow 270ms, transform 270ms`
  const ref = usePerspectiveHover<HTMLAnchorElement>({
    ratio,
    transform,
    transition,
  })

  return styled()`
    Link {
      box-shadow: var(--white) 0 0 0 0;
    }
    Link:hover {
      box-shadow: var(--black) 0 0 2em -1em;
    }
  `(
    // FIXME:
    // @ts-ignore
    <Link ref={ref} {...props} />,
  )
}
