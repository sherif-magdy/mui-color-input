import React from 'react'
import { action } from 'storybook/actions'
import type { ColorButtonProps } from '@components/ColorButton/ColorButton'
import {
  Box,
  Button,
  createTheme,
  Icon,
  Paper,
  Popper,
  TextField,
  ThemeProvider
} from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  MuiColorInput,
  type MuiColorInputProps,
  type MuiColorInputValue
} from '../index'

const meta = {
  title: 'MuiColorInput',
  component: MuiColorInput
} satisfies Meta<typeof MuiColorInput>

export default meta

const CustomAdornment = (props: ColorButtonProps) => {
  const { onClick, bgColor } = props

  return (
    <Button sx={{ backgroundColor: bgColor }} onClick={onClick}>
      <Icon />
    </Button>
  )
}

const withTheme = (Story: () => React.ReactNode) => {
  return (
    <ThemeProvider theme={createTheme()}>
      <Story />
    </ThemeProvider>
  )
}

export const PrimaryLeft: StoryObj<typeof MuiColorInput> = () => {
  const [value, setValue] = React.useState<MuiColorInputValue>('')

  const handleChange = (
    ...argsChange: Parameters<NonNullable<MuiColorInputProps['onChange']>>
  ) => {
    action('onChange')(argsChange)
    setValue(argsChange[0])
  }

  return (
    <MuiColorInput
      value={value}
      format="rgb"
      onChange={handleChange}
      slotProps={{
        textField: { color: 'warning' },
        adornment: { position: 'start' }
      }}
    />
  )
}

PrimaryLeft.decorators = [withTheme]

export const PrimaryRight: StoryObj<typeof MuiColorInput> = () => {
  const [value, setValue] = React.useState<MuiColorInputValue>('black')

  const handleChange = (
    ...argsChange: Parameters<NonNullable<MuiColorInputProps['onChange']>>
  ) => {
    action('onChange')(argsChange)
    setValue(argsChange[0])
  }

  return (
    <MuiColorInput
      value={value}
      format="hex"
      onChange={handleChange}
      slotProps={{
        textField: { color: 'warning', fullWidth: true },
        adornment: { position: 'end' }
      }}
    />
  )
}

PrimaryRight.decorators = [withTheme]

export const CustomButton: StoryObj<typeof MuiColorInput> = () => {
  const [value, setValue] = React.useState<MuiColorInputValue>('black')

  const handleChange = (
    ...argsChange: Parameters<NonNullable<MuiColorInputProps['onChange']>>
  ) => {
    action('onChange')(argsChange)
    setValue(argsChange[0])
  }

  return (
    <MuiColorInput
      value={value}
      format="hex"
      onChange={handleChange}
      slots={{ adornment: CustomAdornment }}
      slotProps={{ adornment: { position: 'end' } }}
    />
  )
}

CustomButton.decorators = [withTheme]

export const SwatchOnly: StoryObj<typeof MuiColorInput> = () => {
  const [value, setValue] = React.useState<MuiColorInputValue>('#ff0000')

  const handleChange = (
    ...argsChange: Parameters<NonNullable<MuiColorInputProps['onChange']>>
  ) => {
    action('onChange')(argsChange)
    setValue(argsChange[0])
  }

  return (
    <MuiColorInput
      value={value}
      format="hex"
      onChange={handleChange}
      isTextFieldHidden
    />
  )
}

SwatchOnly.decorators = [withTheme]

export const CustomSwatchSize: StoryObj<typeof MuiColorInput> = () => {
  const [value, setValue] = React.useState<MuiColorInputValue>('#ff0000')

  const handleChange = (
    ...argsChange: Parameters<NonNullable<MuiColorInputProps['onChange']>>
  ) => {
    action('onChange')(argsChange)
    setValue(argsChange[0])
  }

  return (
    <MuiColorInput
      value={value}
      format="hex"
      onChange={handleChange}
      isTextFieldHidden
      slotProps={{ adornment: { sx: { width: 48, height: 48 } } }}
    />
  )
}

CustomSwatchSize.decorators = [withTheme]

export const ExtendedPopoverBody: StoryObj<typeof MuiColorInput> = () => {
  const [value, setValue] = React.useState<MuiColorInputValue>('#ff0000')

  const handleChange = (
    ...argsChange: Parameters<NonNullable<MuiColorInputProps['onChange']>>
  ) => {
    action('onChange')(argsChange)
    setValue(argsChange[0])
  }

  return (
    <MuiColorInput
      value={value}
      format="hex"
      onChange={handleChange}
      slotProps={{
        popoverBody: {
          children: ({ currentColor, onChange: handleColorChange }) => {
            return (
              <TextField
                sx={{ mt: '10px' }}
                size="small"
                fullWidth
                label="Hex"
                value={currentColor.toHexString()}
                onChange={(event) => {
                  handleColorChange(event.target.value)
                }}
              />
            )
          }
        }
      }}
    />
  )
}

ExtendedPopoverBody.decorators = [withTheme]

export const NestedInPopper: StoryObj<typeof MuiColorInput> = () => {
  const [value, setValue] = React.useState<MuiColorInputValue>('#00bcd4')
  const [isOpen, setIsOpen] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleChange = (
    ...argsChange: Parameters<NonNullable<MuiColorInputProps['onChange']>>
  ) => {
    action('onChange')(argsChange)
    setValue(argsChange[0])
  }

  const handleToggle = () => {
    setIsOpen((prevIsOpen) => {
      return !prevIsOpen
    })
  }

  return (
    <Box sx={{ p: 4 }}>
      <Button
        ref={setAnchorEl}
        variant="contained"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls={isOpen ? 'nested-color-popper' : undefined}
      >
        {isOpen ? 'Close popover' : 'Open popover'}
      </Button>
      <Popper
        id={isOpen ? 'nested-color-popper' : undefined}
        open={isOpen}
        anchorEl={anchorEl}
        placement="bottom-start"
        keepMounted
      >
        <Paper elevation={8} sx={{ p: 2 }}>
          <MuiColorInput value={value} format="hex" onChange={handleChange} />
        </Paper>
      </Popper>
    </Box>
  )
}

NestedInPopper.decorators = [withTheme]
