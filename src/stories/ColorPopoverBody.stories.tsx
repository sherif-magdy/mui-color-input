import React from 'react'
import { action } from 'storybook/actions'
import ColorPopoverBody from '@components/ColorPopoverBody/ColorPopoverBody'
import { TinyColor } from '@ctrl/tinycolor'
import { createTheme, TextField, ThemeProvider } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ColorPopoverBodyRenderProps } from '../index.types'

type HexFieldProps = Pick<
  ColorPopoverBodyRenderProps,
  'currentColor' | 'onChange'
>

const HexField = ({ currentColor, onChange }: HexFieldProps) => {
  const currentHex = currentColor.toHexString()
  const [text, setText] = React.useState(currentHex)
  const [trackedHex, setTrackedHex] = React.useState(currentHex)

  if (currentHex !== trackedHex) {
    setTrackedHex(currentHex)
    setText(currentHex)
  }

  return (
    <TextField
      sx={{ mt: '10px' }}
      size="small"
      fullWidth
      label="Hex"
      value={text}
      onChange={(event) => {
        const nextText = event.target.value
        setText(nextText)
        const parsedColor = new TinyColor(nextText)

        if (parsedColor.isValid) {
          onChange(parsedColor.toHexString())
        }
      }}
    />
  )
}

const meta = {
  title: 'ColorPopoverBody',
  component: ColorPopoverBody
} satisfies Meta<typeof ColorPopoverBody>

export default meta

export const WithHexField: StoryObj<typeof ColorPopoverBody> = () => {
  const [color, setColor] = React.useState(new TinyColor('#ff0000'))

  const handleChange = (value: string) => {
    action('onChange')(value)
    setColor(new TinyColor(value))
  }

  return (
    <ColorPopoverBody currentColor={color} format="hex" onChange={handleChange}>
      {({ currentColor, onChange }) => {
        return <HexField currentColor={currentColor} onChange={onChange} />
      }}
    </ColorPopoverBody>
  )
}

WithHexField.decorators = [
  (Story) => {
    const theme = createTheme()

    return (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    )
  }
]
