import { ReactNode, FC as FunctionalComponent } from 'react'

export type Node = ReactNode

export type FC<
  T = { className?: string }
> = FunctionalComponent<T & { className?: string }>
