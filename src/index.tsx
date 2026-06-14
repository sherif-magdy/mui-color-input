import React from 'react'
import ColorButton from '@components/ColorButton/ColorButton'
import { TinyColor } from '@ctrl/tinycolor'
import { FORMAT_FALLBACK } from '@shared/constants/fallback'
import {
  buildValueFromTinyColor,
  getSafeTinyColor
} from '@shared/helpers/format'
import { useColorInputSlots } from '@shared/hooks/use-color-input-slots'
import type {
  MuiColorButtonProps,
  MuiColorInputAdornmentSlotProps,
  MuiColorInputColors,
  MuiColorInputFormat,
  MuiColorInputProps,
  MuiColorInputSlotProps,
  MuiColorInputSlots,
  MuiColorInputValue
} from './index.types'

export type {
  MuiColorButtonProps,
  MuiColorInputAdornmentSlotProps,
  MuiColorInputColors,
  MuiColorInputFormat,
  MuiColorInputProps,
  MuiColorInputSlotProps,
  MuiColorInputSlots,
  MuiColorInputValue,
  TinyColor
}

export { ColorButton as MuiColorInputButton }

export function matchIsValidColor(color: MuiColorInputValue): boolean {
  return new TinyColor(color).isValid
}

const MuiColorInput = React.forwardRef<HTMLSpanElement, MuiColorInputProps>(
  (props, propRef) => {
    const {
      value,
      fallbackValue,
      format,
      disablePopover: disablePopoverProp,
      isAlphaHidden: isAlphaHiddenProp,
      isTextFieldHidden: isTextFieldHiddenProp,
      onChange,
      slots,
      slotProps
    } = props

    const isTextFieldHidden = Boolean(isTextFieldHiddenProp)
    const disablePopover = Boolean(disablePopoverProp)
    const isAlphaHidden = Boolean(isAlphaHiddenProp)

    const anchorRef = React.useRef<HTMLSpanElement | null>(null)
    const inputRef = React.useRef<HTMLInputElement | null>(null)
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)
    const currentFormat = format || FORMAT_FALLBACK
    const currentTinyColor = getSafeTinyColor(value, {
      format: currentFormat
    })
    const [inputValue, setInputValue] =
      React.useState<MuiColorInputValue>(value)
    const [previousValue, setPreviousValue] =
      React.useState<MuiColorInputValue>(value)

    const handleClick = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      event.preventDefault()
      event.stopPropagation()

      const isDisabled = Boolean(slotProps?.textField?.disabled)

      if (!isDisabled && !disablePopover) {
        setAnchorEl(anchorRef.current)
      }
    }

    const handleChange = (newValue: string) => {
      const tinyColor = new TinyColor(newValue)

      onChange?.(newValue, {
        hex: tinyColor.isValid ? tinyColor.toHexString() : '',
        hsv: tinyColor.isValid ? tinyColor.toHsvString() : '',
        hsl: tinyColor.isValid ? tinyColor.toHslString() : '',
        rgb: tinyColor.isValid ? tinyColor.toRgbString() : '',
        hex8: tinyColor.isValid ? tinyColor.toHex8String() : ''
      })
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newInputValue = event.target.value
      setInputValue(newInputValue)

      if (newInputValue === '') {
        setPreviousValue('')
        handleChange('')
      } else {
        const tinyColor = new TinyColor(newInputValue)
        const newValue = buildValueFromTinyColor(tinyColor, currentFormat)
        setPreviousValue(newValue)
        handleChange(newValue)
      }
    }

    const handleClose = () => {
      setAnchorEl(null)
      queueMicrotask(() => {
        inputRef.current?.focus()
      })
    }

    const handleBlur = () => {
      const tinyColorOfInputValue = new TinyColor(inputValue)

      if (!tinyColorOfInputValue.isValid) {
        if (inputValue === '') {
          return
        }

        if (fallbackValue) {
          const tinyColor = new TinyColor(fallbackValue)
          const newValue = buildValueFromTinyColor(tinyColor, currentFormat)
          setInputValue(newValue)
          setPreviousValue(newValue)
          handleChange(newValue)
        }
      } else if (tinyColorOfInputValue.format !== currentFormat) {
        setInputValue(
          buildValueFromTinyColor(tinyColorOfInputValue, currentFormat)
        )
      }
    }

    const previousFormatRef = React.useRef(currentFormat)

    React.useEffect(() => {
      const isFormatChanged = previousFormatRef.current !== currentFormat
      previousFormatRef.current = currentFormat

      if (isFormatChanged) {
        const tinyColor = getSafeTinyColor(inputValue)

        if (tinyColor.isValid) {
          const reformatted = buildValueFromTinyColor(tinyColor, currentFormat)
          setInputValue(reformatted)
          setPreviousValue(reformatted)
        }
      }

      if (value === previousValue) {
        return
      }

      const valueTinyColor = getSafeTinyColor(value)
      const previousTinyColor = getSafeTinyColor(previousValue)
      const isSameColor =
        valueTinyColor.isValid && previousTinyColor.isValid
          ? valueTinyColor.equals(previousTinyColor)
          : false

      if (!isSameColor) {
        const newValue = valueTinyColor.originalInput
        setPreviousValue(newValue)
        setInputValue(newValue)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps -- inputValue is intentionally excluded to avoid loops
    }, [value, previousValue, currentFormat])

    const handlePopoverChange = (newValue: string) => {
      setInputValue(newValue)
      setPreviousValue(newValue)
      handleChange(newValue)
    }

    const isOpen = Boolean(anchorEl)
    const id = isOpen ? 'color-popover' : undefined

    const {
      RootSlot,
      TextFieldSlot,
      PopoverSlot,
      PopoverBodySlot,
      rootSlotProps,
      textFieldSlotProps,
      adornmentElement,
      popoverSlotProps,
      popoverBodySlotProps
    } = useColorInputSlots({
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
    })

    return (
      <RootSlot {...rootSlotProps}>
        {isTextFieldHidden ? (
          adornmentElement
        ) : (
          <TextFieldSlot {...textFieldSlotProps} />
        )}
        {!disablePopover ? (
          <PopoverSlot {...popoverSlotProps}>
            <PopoverBodySlot {...popoverBodySlotProps} />
          </PopoverSlot>
        ) : null}
      </RootSlot>
    )
  }
)

export { MuiColorInput }
