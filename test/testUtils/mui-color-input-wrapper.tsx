import React from 'react'
import {
  MuiColorInput,
  type MuiColorInputColors,
  type MuiColorInputProps
} from '../../src/index'

export const MuiColorInputWrapper = (props: Partial<MuiColorInputProps>) => {
  const { onChange, ...rest } = props
  const [state, setState] = React.useState('')

  const handleChange = (newValue: string, colors: MuiColorInputColors) => {
    setState(newValue)
    onChange?.(newValue, colors)
  }

  return (
    <MuiColorInput
      value={state}
      onChange={handleChange}
      slotProps={{ adornment: { position: 'start' } }}
      {...rest}
    />
  )
}
