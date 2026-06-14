import React from 'react'
import { action } from 'storybook/actions'
import { TinyColor } from '@ctrl/tinycolor'
import {
  Box,
  createTheme,
  Divider,
  Stack,
  ThemeProvider,
  Typography
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

const withTheme = (Story: () => React.ReactNode) => {
  return (
    <ThemeProvider theme={createTheme()}>
      <Story />
    </ThemeProvider>
  )
}

const showcaseColor = new TinyColor('#e91e63')
const hexValue = showcaseColor.toString('hex')
const rgbValue = showcaseColor.toString('rgb')
const hslValue = showcaseColor.toString('hsl')
const hsvValue = showcaseColor.toString('hsv')
const hex8Value = showcaseColor.toString('hex8')

type StatefulColorInputProps = Omit<
  MuiColorInputProps,
  'value' | 'onChange'
> & {
  initialValue?: MuiColorInputValue
}

const StatefulColorInput = (props: StatefulColorInputProps) => {
  const { initialValue, ...rest } = props
  const [value, setValue] = React.useState<MuiColorInputValue>(
    initialValue ?? ''
  )

  const handleChange = (
    ...argsChange: Parameters<NonNullable<MuiColorInputProps['onChange']>>
  ) => {
    action('onChange')(argsChange)
    setValue(argsChange[0])
  }

  return <MuiColorInput {...rest} value={value} onChange={handleChange} />
}

type RowProps = {
  title: string
  description?: string
  children: React.ReactNode
}

const Row = (props: RowProps) => {
  const { title, description, children } = props

  return (
    <Box>
      <Typography variant="subtitle2">{title}</Typography>
      {description ? (
        <Typography variant="caption" color="text.secondary">
          {description}
        </Typography>
      ) : null}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 2,
          mt: 1
        }}
      >
        {children}
      </Box>
      <Divider sx={{ mt: 3 }} />
    </Box>
  )
}

export const Showcase: StoryObj<typeof MuiColorInput> = () => {
  return (
    <Stack sx={{ width: 380, pb: 4 }}>
      <Row title="Default" description="Minimal props, no format override">
        <StatefulColorInput initialValue={hexValue} />
      </Row>
      <Row
        title="Color formats"
        description="Same color in every supported format"
      >
        <StatefulColorInput initialValue={hexValue} format="hex" />
        <StatefulColorInput initialValue={rgbValue} format="rgb" />
        <StatefulColorInput initialValue={hslValue} format="hsl" />
        <StatefulColorInput initialValue={hsvValue} format="hsv" />
        <StatefulColorInput initialValue={hex8Value} format="hex8" />
      </Row>
      <Row
        title="Adornment position"
        description="slotProps.adornment.position: start vs end"
      >
        <StatefulColorInput
          initialValue={hexValue}
          format="hex"
          slotProps={{ adornment: { position: 'start' } }}
        />
        <StatefulColorInput
          initialValue={hexValue}
          format="hex"
          slotProps={{ adornment: { position: 'end' } }}
        />
      </Row>
      <Row
        title="Swatch only"
        description="isTextFieldHidden — open the swatch to adjust alpha (hex8)"
      >
        <StatefulColorInput
          initialValue={hex8Value}
          format="hex8"
          isTextFieldHidden
        />
      </Row>
      <Row title="Alpha hidden" description="isAlphaHidden on an hex8 color">
        <StatefulColorInput
          initialValue={hex8Value}
          format="hex8"
          isAlphaHidden
        />
      </Row>
      <Row
        title="Popover disabled"
        description="disablePopover — swatch does not open the popover"
      >
        <StatefulColorInput
          initialValue={hexValue}
          format="hex"
          disablePopover
        />
      </Row>
      <Row title="Disabled" description="slotProps.textField.disabled">
        <StatefulColorInput
          initialValue={hexValue}
          format="hex"
          slotProps={{ textField: { disabled: true } }}
        />
      </Row>
      <Row
        title="Fallback value"
        description="Starts invalid — blur the field to apply fallbackValue"
      >
        <StatefulColorInput
          initialValue="not-a-color"
          format="hex"
          fallbackValue="#1976d2"
        />
      </Row>
      <Row
        title="Custom swatch size"
        description="slotProps.adornment.sx resizes the swatch"
      >
        <StatefulColorInput
          initialValue={hexValue}
          format="hex"
          slotProps={{ adornment: { sx: { width: 48, height: 48 } } }}
        />
      </Row>
    </Stack>
  )
}

Showcase.decorators = [withTheme]
