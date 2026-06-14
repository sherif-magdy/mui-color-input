import type React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MuiColorInputWrapper } from './testUtils/mui-color-input-wrapper'

type CustomPopoverProps = {
  open?: boolean
  children?: React.ReactNode
}

const CustomPopover = ({ open, children }: CustomPopoverProps) => {
  return (
    <div data-testid="custom-popover" data-open={Boolean(open)}>
      {children}
    </div>
  )
}

describe('components/MuiColorInput', () => {
  test('calls onChange with the full colors object for a valid hex', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()

    render(<MuiColorInputWrapper onChange={handleChange} />)

    await user.type(screen.getByRole('textbox'), '#ff0000')

    expect(handleChange).toHaveBeenLastCalledWith('rgb(255, 0, 0)', {
      hex: '#ff0000',
      hsl: 'hsl(0, 100%, 50%)',
      hsv: 'hsv(0, 100%, 100%)',
      rgb: 'rgb(255, 0, 0)',
      hex8: '#ff0000ff'
    })
  })

  test('reverts to the formatted fallbackValue when the input blurs invalid', async () => {
    const user = userEvent.setup()

    render(<MuiColorInputWrapper fallbackValue="#ff0000" />)

    const input = screen.getByRole('textbox')
    await user.type(input, 'not-a-color')
    await user.tab()

    await waitFor(() => {
      expect(input).toHaveValue('rgb(255, 0, 0)')
    })
  })

  test('hides the alpha slider when isAlphaHidden is set', async () => {
    const user = userEvent.setup()

    render(<MuiColorInputWrapper isAlphaHidden />)

    await user.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(screen.getByRole('slider', { name: 'hue' })).toBeInTheDocument()
    })
    expect(
      screen.queryByRole('slider', { name: 'alpha' })
    ).not.toBeInTheDocument()
  })

  test('renders the adornment before the input when position is start', () => {
    render(<MuiColorInputWrapper />)

    const adornment = screen.getByRole('button')
    const input = screen.getByRole('textbox')

    const documentPosition = adornment.compareDocumentPosition(input)
    expect(documentPosition & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  test('renders a custom popover component via slots.popover', async () => {
    const user = userEvent.setup()

    render(<MuiColorInputWrapper slots={{ popover: CustomPopover }} />)

    const popover = screen.getByTestId('custom-popover')
    expect(popover).toHaveAttribute('data-open', 'false')

    await user.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(popover).toHaveAttribute('data-open', 'true')
    })
  })
})
