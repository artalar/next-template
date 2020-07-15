import React from 'react'
import styled from 'reshadow'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'

export type LinkProps = NextLinkProps & JSX.IntrinsicElements['a']

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, as, replace, scroll, shallow, passHref, prefetch, ...props }, ref) =>
    styled()`
      a {
        text-decoration: none;
      }
    `(
      <NextLink {...{ href, as, replace, scroll, shallow, passHref, prefetch }}>
        <a {...props} ref={ref} />
      </NextLink>,
    ),
)
