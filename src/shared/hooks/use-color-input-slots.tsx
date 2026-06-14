import React from 'react'
import ColorButton, {
  type ColorButtonProps
} from '@components/ColorButton/ColorButton'
import ColorPopover from '@components/ColorPopover/ColorPopover'
import ColorPopoverBody from '@components/ColorPopoverBody/ColorPopoverBody'
import ColorTextField from '@components/ColorTextField/ColorTextField'
import type { TinyColor } from '@ctrl/tinycolor'
import type { BoxProps } from '@mui/material/Box'
import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import type { PopoverProps as MuiPopoverProps } from '@mui/material/Popover'
import type { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField'
import { mergeSlotProps, useForkRef } from '@mui/material/utils'
import { stringifyInputValue } from '@shared/helpers/format'
import type {
  ColorPopoverBodyProps,
  MuiColorInputAdornmentSlotProps,
  MuiColorInputFormat,
  MuiColorInputSlotProps,
  MuiColorInputSlots,
  MuiColorInputValue
} from '../../index.types'

const DEFAULT_SLOT_COMPONENTS = {
  root: Box,
  textField: ColorTextField,
  adornment: ColorButton,
  popover: ColorPopover,
  popoverBody: ColorPopoverBody
} as const satisfies Required<MuiColorInputSlots>

type CloseHandlerArgs = Parameters<NonNullable<MuiPopoverProps['onClose']>>

export type UseColorInputSlotsParams = {
  propRef: React.Ref<HTMLSpanElement>
  anchorRef: React.RefObject<HTMLSpanElement | null>
  inputRef: React.Ref<HTMLInputElement>
  inputValue: MuiColorInputValue
  currentTinyColor: TinyColor
  currentFormat: MuiColorInputFormat
  id: string | undefined
  isOpen: boolean
  anchorEl: HTMLElement | null
  isTextFieldHidden: boolean
  disablePopover: boolean
  isAlphaHidden: boolean
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void
  handleClose: (...args: CloseHandlerArgs) => void
  handlePopoverChange: (value: string) => void
  slots?: MuiColorInputSlots
  slotProps?: MuiColorInputSlotProps
}

export type UseColorInputSlotsResult = {
  RootSlot: React.ElementType
  TextFieldSlot: React.ElementType
  AdornmentSlot: React.ElementType
  PopoverSlot: React.ElementType
  PopoverBodySlot: React.ElementType
  rootSlotProps: BoxProps
  textFieldSlotProps: MuiTextFieldProps
  adornmentElement: React.ReactNode
  position: 'start' | 'end'
  popoverSlotProps: MuiPopoverProps
  popoverBodySlotProps: ColorPopoverBodyProps
}

type AdornmentPosition = 'start' | 'end'

type BuildRootSlotPropsParams = {
  userRootProps: Partial<BoxProps>
  isTextFieldHidden: boolean
  rootRef: React.Ref<HTMLSpanElement>
}

function buildRootSlotProps(params: BuildRootSlotPropsParams): BoxProps {
  const { userRootProps, isTextFieldHidden, rootRef } = params

  const defaultClassName = [
    'MuiColorInput-Root',
    isTextFieldHidden ? 'MuiColorInput-Swatch' : null
  ]
    .filter(Boolean)
    .join(' ')

  return {
    ...mergeSlotProps(userRootProps, {
      component: 'span',
      className: defaultClassName,
      sx: { display: 'inline-flex', position: 'relative' }
    }),
    ref: rootRef
  } as BoxProps
}

type BuildAdornmentElementParams = {
  userAdornment?: MuiColorInputAdornmentSlotProps
  isDisabled: boolean
  id: string | undefined
  disablePopover: boolean
  inputValue: MuiColorInputValue
  currentTinyColor: TinyColor
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  AdornmentSlot: React.ElementType
}

function buildAdornmentElement(params: BuildAdornmentElementParams): {
  adornmentElement: React.ReactNode
  position: AdornmentPosition
} {
  const {
    userAdornment,
    isDisabled,
    id,
    disablePopover,
    inputValue,
    currentTinyColor,
    handleClick,
    AdornmentSlot
  } = params

  const adornmentMerged = mergeSlotProps(userAdornment, {
    disabled: isDisabled,
    'aria-describedby': id,
    disablePopover,
    component: disablePopover ? 'span' : undefined,
    bgColor: currentTinyColor.toRgbString(),
    isBgColorValid: Boolean(inputValue !== '' && currentTinyColor.isValid),
    onClick: disablePopover ? undefined : handleClick
  }) as ColorButtonProps & { position?: AdornmentPosition }

  const { position = 'start', ...adornmentElementProps } = adornmentMerged

  return {
    adornmentElement: <AdornmentSlot {...adornmentElementProps} />,
    position
  }
}

type AttachInputAdornmentParams = {
  textFieldMerged: MuiTextFieldProps
  userTextFieldSlotProps: MuiTextFieldProps['slotProps']
  adornmentElement: React.ReactNode
  position: AdornmentPosition
}

function attachInputAdornment(
  params: AttachInputAdornmentParams
): MuiTextFieldProps {
  const {
    textFieldMerged,
    userTextFieldSlotProps,
    adornmentElement,
    position
  } = params

  const inputAdornment = (
    <InputAdornment position={position}>{adornmentElement}</InputAdornment>
  )
  const reservedInputSlotProps =
    position === 'start'
      ? { startAdornment: inputAdornment, endAdornment: undefined }
      : { startAdornment: undefined, endAdornment: inputAdornment }
  const inputSlotProps = mergeSlotProps(
    reservedInputSlotProps,
    userTextFieldSlotProps?.input ?? {}
  )

  return {
    ...textFieldMerged,
    slotProps: { ...userTextFieldSlotProps, input: inputSlotProps }
  } as MuiTextFieldProps
}

export function useColorInputSlots(
  params: UseColorInputSlotsParams
): UseColorInputSlotsResult {
  const {
    propRef,
    anchorRef,
    inputRef,
    inputValue,
    currentTinyColor,
    currentFormat,
    id,
    isOpen,
    anchorEl,
    isTextFieldHidden,
    disablePopover,
    isAlphaHidden,
    handleClick,
    handleInputChange,
    handleBlur,
    handleClose,
    handlePopoverChange,
    slots,
    slotProps
  } = params

  const {
    root: RootSlot,
    textField: TextFieldSlot,
    adornment: AdornmentSlot,
    popover: PopoverSlot,
    popoverBody: PopoverBodySlot
  } = {
    ...DEFAULT_SLOT_COMPONENTS,
    ...slots
  } as Required<MuiColorInputSlots>

  const {
    root: userRootProps = {},
    textField: userTextField = {},
    adornment: userAdornment,
    popover: userPopover,
    popoverBody: userPopoverBody
  } = slotProps ?? {}

  const rootSlotProps = buildRootSlotProps({
    userRootProps,
    isTextFieldHidden,
    rootRef: useForkRef(
      propRef,
      anchorRef,
      userRootProps.ref as React.Ref<HTMLSpanElement> | undefined
    )
  })

  const textFieldMerged = mergeSlotProps(userTextField, {
    spellCheck: false,
    type: 'text',
    autoComplete: 'off',
    value: stringifyInputValue(inputValue),
    onChange: handleInputChange,
    onBlur: handleBlur,
    inputRef
  }) as MuiTextFieldProps

  const { adornmentElement, position } = buildAdornmentElement({
    userAdornment,
    isDisabled: Boolean(textFieldMerged.disabled),
    id,
    disablePopover,
    inputValue,
    currentTinyColor,
    handleClick,
    AdornmentSlot
  })

  const textFieldSlotProps = attachInputAdornment({
    textFieldMerged,
    userTextFieldSlotProps: userTextField.slotProps,
    adornmentElement,
    position
  })

  const popoverSlotProps = mergeSlotProps(userPopover, {
    id,
    open: isOpen,
    anchorEl,
    position,
    onClose: handleClose
  }) as MuiPopoverProps

  const popoverBodySlotProps = mergeSlotProps(userPopoverBody, {
    currentColor: currentTinyColor,
    format: currentFormat,
    isAlphaHidden,
    onChange: handlePopoverChange
  }) as ColorPopoverBodyProps

  return {
    RootSlot,
    TextFieldSlot,
    AdornmentSlot,
    PopoverSlot,
    PopoverBodySlot,
    rootSlotProps,
    textFieldSlotProps,
    adornmentElement,
    position,
    popoverSlotProps,
    popoverBodySlotProps
  }
}
