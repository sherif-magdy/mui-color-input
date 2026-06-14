import type React from 'react'
import type { ColorButtonProps } from '@components/ColorButton/ColorButton'
import type {
  ColorFormats,
  ColorInput as MuiColorInputValue,
  TinyColor
} from '@ctrl/tinycolor'
import type { BoxProps } from '@mui/material/Box'
import type { PopoverProps as MuiPopoverProps } from '@mui/material/Popover'
import type { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField'

export type MuiColorInputFormat = Extract<
  'hex' | 'rgb' | 'hex8' | 'hsl' | 'hsv',
  ColorFormats
>

export type { ColorButtonProps as MuiColorButtonProps, MuiColorInputValue }

export type MuiColorInputColors = {
  hex: string
  hsl: string
  hsv: string
  rgb: string
  hex8: string
}

export type ColorPopoverBodyRenderProps = {
  currentColor: TinyColor
  format: MuiColorInputFormat
  onChange: (value: string) => void
}

export type ColorPopoverBodyProps = {
  currentColor: TinyColor
  format: MuiColorInputFormat
  isAlphaHidden?: boolean
  onChange: (value: string) => void
  children?:
    | React.ReactNode
    | ((renderProps: ColorPopoverBodyRenderProps) => React.ReactNode)
}

type PopoverSlotProps = Omit<MuiPopoverProps, 'open' | 'anchorEl' | 'children'>

type TextFieldSlotProps = Omit<
  MuiTextFieldProps,
  | 'onChange'
  | 'value'
  | 'defaultValue'
  | 'select'
  | 'type'
  | 'multiline'
  | 'inputRef'
  | 'InputProps'
  | 'inputProps'
  | 'InputLabelProps'
>

export type MuiColorInputAdornmentSlotProps = Partial<ColorButtonProps> & {
  position?: 'start' | 'end'
}

export type MuiColorInputSlotProps = {
  root?: Partial<BoxProps>
  textField?: Partial<TextFieldSlotProps>
  adornment?: MuiColorInputAdornmentSlotProps
  popover?: Partial<PopoverSlotProps>
  popoverBody?: Partial<ColorPopoverBodyProps>
}

export type MuiColorInputSlots = {
  root?: React.ElementType
  textField?: React.ElementType
  adornment?: React.ElementType
  popover?: React.ElementType
  popoverBody?: React.ElementType
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- interface required for consumer declaration merging
export interface MuiColorInputProps {
  value: MuiColorInputValue
  fallbackValue?: MuiColorInputValue
  format?: MuiColorInputFormat
  disablePopover?: boolean
  isAlphaHidden?: boolean
  isTextFieldHidden?: boolean
  onChange?: (value: string, colors: MuiColorInputColors) => void
  slots?: MuiColorInputSlots
  slotProps?: MuiColorInputSlotProps
}
