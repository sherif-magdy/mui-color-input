import React from 'react'
import type { ColorButtonProps } from '@components/ColorButton/ColorButton'
import { Button, Icon } from '@mui/material'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MuiColorInput, type MuiColorInputFormat } from '../src/index'
import { MuiColorInputWrapper } from './testUtils/mui-color-input-wrapper'

const FormatSwitcher = ({
  initialValue,
  initialFormat,
  nextFormat
}: {
  initialValue: string
  initialFormat: MuiColorInputFormat
  nextFormat: MuiColorInputFormat
}) => {
  const [format, setFormat] = React.useState(initialFormat)

  return (
    <>
      <MuiColorInput value={initialValue} format={format} />
      <button
        type="button"
        data-testid="switch-format"
        onClick={() => {
          setFormat(nextFormat)
        }}
      >
        Switch
      </button>
    </>
  )
}

const CustomAdornment = ({ bgColor, onClick }: ColorButtonProps) => {
  return (
    <Button
      data-testid="custom-adornment"
      sx={{ backgroundColor: bgColor }}
      onClick={onClick}
    >
      <Icon />
    </Button>
  )
}

describe('components/MuiColorInput', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('should render a text input with a color button', () => {
    render(<MuiColorInputWrapper />)

    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  test('should reformat the displayed value when the format prop changes', async () => {
    const user = userEvent.setup()

    render(
      <FormatSwitcher
        initialValue="#ff0000"
        initialFormat="hex"
        nextFormat="rgb"
      />
    )

    const input = screen.getByRole('textbox')
    expect(input).toHaveValue('#ff0000')

    await user.click(screen.getByTestId('switch-format'))

    await waitFor(() => {
      expect(input).toHaveValue('rgb(255, 0, 0)')
    })
  })

  test('renders only the swatch when isTextFieldHidden and opens the popover on click', async () => {
    const user = userEvent.setup()

    render(<MuiColorInputWrapper isTextFieldHidden />)

    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()

    const swatch = screen.getByRole('button')

    await user.click(swatch)

    await waitFor(() => {
      expect(screen.getByRole('slider', { name: 'hue' })).toBeInTheDocument()
    })
  })

  test('renders a CSS-valid swatch color when format is hsv', () => {
    render(<MuiColorInput value="hsv(329, 87%, 52%)" format="hsv" />)

    const swatch = screen.getByRole('button')
    const { backgroundColor } = swatch.style

    expect(backgroundColor).toMatch(/^rgba?\(/)
    expect(backgroundColor).not.toContain('hsv')
  })

  test('renders a custom adornment component via slots', () => {
    render(<MuiColorInputWrapper slots={{ adornment: CustomAdornment }} />)

    expect(screen.getByTestId('custom-adornment')).toBeInTheDocument()
  })

  test('merges slotProps.root.className onto the MuiColorInput-Root class', () => {
    render(
      <MuiColorInputWrapper slotProps={{ root: { className: 'my-root' } }} />
    )

    const root = document.querySelector('.MuiColorInput-Root')

    expect(root).not.toBeNull()
    expect(root?.classList.contains('my-root')).toBe(true)
  })

  test('renders the adornment at the end when position is end', () => {
    render(
      <MuiColorInputWrapper slotProps={{ adornment: { position: 'end' } }} />
    )

    const adornment = screen.getByRole('button')

    expect(adornment.parentElement?.className).toContain(
      'MuiInputAdornment-root'
    )
  })

  test('does not open the popover when disablePopover is set', async () => {
    const user = userEvent.setup()

    render(<MuiColorInputWrapper disablePopover />)

    await user.click(screen.getByRole('button'))

    expect(
      screen.queryByRole('slider', { name: 'hue' })
    ).not.toBeInTheDocument()
  })

  test('forwards the ref to the root span element', () => {
    const refCallback = vi.fn()

    render(<MuiColorInput ref={refCallback} value="#ff0000" />)

    const root = refCallback.mock.calls[0][0] as HTMLElement

    expect(root.tagName).toBe('SPAN')
    expect(root.classList.contains('MuiColorInput-Root')).toBe(true)
  })

  test('forwards the ref to the root span in swatch mode', () => {
    const refCallback = vi.fn()

    render(
      <MuiColorInput ref={refCallback} value="#ff0000" isTextFieldHidden />
    )

    const root = refCallback.mock.calls[0][0] as HTMLElement

    expect(root.tagName).toBe('SPAN')
    expect(root.classList.contains('MuiColorInput-Root')).toBe(true)
    expect(root.classList.contains('MuiColorInput-Swatch')).toBe(true)
  })

  test('renders a custom popover body via slotProps.popoverBody children render-prop', async () => {
    const user = userEvent.setup()

    render(
      <MuiColorInputWrapper
        value="#ff0000"
        slotProps={{
          adornment: { position: 'start' },
          popoverBody: {
            children: () => {
              return <div data-testid="custom-popover-body">custom</div>
            }
          }
        }}
      />
    )

    await user.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(screen.getByTestId('custom-popover-body')).toBeInTheDocument()
    })
  })
})
