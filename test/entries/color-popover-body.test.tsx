import React from 'react'
import { TinyColor } from '@ctrl/tinycolor'
import { render, screen } from '@testing-library/react'
import { ColorPopoverBody } from '../../src/entries/ColorPopoverBody'

describe('entries/ColorPopoverBody', () => {
  test('exports a renderable ColorPopoverBody from the sub-entry', () => {
    render(
      <ColorPopoverBody
        currentColor={new TinyColor('#ff0000')}
        format="hex"
        onChange={() => {}}
      />
    )

    expect(screen.getByRole('slider', { name: 'hue' })).toBeInTheDocument()
  })
})
