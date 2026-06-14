import React from 'react'
import ColorPopoverBody from '@components/ColorPopoverBody/ColorPopoverBody'
import { TinyColor } from '@ctrl/tinycolor'
import { fireEvent, render, screen } from '@testing-library/react'

describe('components/ColorPopoverBody', () => {
  test('renders a static child below the picker', () => {
    render(
      <ColorPopoverBody
        currentColor={new TinyColor('#ff0000')}
        format="hex"
        onChange={() => {}}
      >
        <div data-testid="extra">extra content</div>
      </ColorPopoverBody>
    )

    expect(screen.getByTestId('extra')).toBeInTheDocument()
  })

  test('exposes the color api to a function child', () => {
    const handleChange = vi.fn()

    render(
      <ColorPopoverBody
        currentColor={new TinyColor('#ff0000')}
        format="hex"
        onChange={handleChange}
      >
        {({ currentColor, format, onChange }) => {
          return (
            <div>
              <span data-testid="hex">{currentColor.toHexString()}</span>
              <span data-testid="format">{format}</span>
              <button
                type="button"
                data-testid="fire"
                onClick={() => {
                  onChange('#00ff00')
                }}
              >
                fire
              </button>
            </div>
          )
        }}
      </ColorPopoverBody>
    )

    expect(screen.getByTestId('hex')).toHaveTextContent('#ff0000')
    expect(screen.getByTestId('format')).toHaveTextContent('hex')

    fireEvent.click(screen.getByTestId('fire'))
    expect(handleChange).toHaveBeenCalledWith('#00ff00')
  })
})
