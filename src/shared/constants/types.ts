import type React from 'react'

export type StyledComponentType<TComponent extends React.ElementType> =
  React.ComponentType<React.ComponentPropsWithRef<TComponent>>
