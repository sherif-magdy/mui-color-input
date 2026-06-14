import React from 'react'
import { action } from 'storybook/actions'
import ColorPopoverBody from '@components/ColorPopoverBody/ColorPopoverBody'
import { TinyColor } from '@ctrl/tinycolor'
import { createTheme, TextField, ThemeProvider } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'

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
        return (
          <TextField
            sx={{ mt: '10px' }}
            size="small"
            fullWidth
            label="Hex"
            value={currentColor.toHexString()}
            onChange={(event) => {
              onChange(event.target.value)
            }}
          />
        )
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
