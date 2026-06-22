import React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { MuiColorInputProps } from '../src/index'
import { MuiColorInputWrapper } from './testUtils/mui-color-input-wrapper'

const COLOR_SPACE_SIZE = 200
const COLOR_SPACE_CENTER = COLOR_SPACE_SIZE / 2
const EXPECTED_THUMB_PERCENT = 50

type NestedPopperHarnessProps = {
  onChange: NonNullable<MuiColorInputProps['onChange']>
}

const NestedPopperHarness = ({ onChange }: NestedPopperHarnessProps) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null)

  return (
    <>
      <Box ref={setAnchorEl} data-testid="nested-popper-anchor" />
      <Popper open={anchorEl !== null} anchorEl={anchorEl} keepMounted>
        <Paper>
          <MuiColorInputWrapper onChange={onChange} />
        </Paper>
      </Popper>
    </>
  )
}

describe('components/MuiColorInput nested in a Popper', () => {
  test('positions the color-space thumb from pointer coordinates', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()

    render(<NestedPopperHarness onChange={handleChange} />)

    const adornmentButton = await screen.findByRole('button')
    await user.click(adornmentButton)

    const thumb = await screen.findByLabelText('Color space thumb')
    const colorSpace = thumb.parentElement as HTMLElement

    colorSpace.getBoundingClientRect = () => {
      return {
        x: 0,
        y: 0,
        top: 0,
        left: 0,
        right: COLOR_SPACE_SIZE,
        bottom: COLOR_SPACE_SIZE,
        width: COLOR_SPACE_SIZE,
        height: COLOR_SPACE_SIZE,
        toJSON: () => {
          return {}
        }
      } as DOMRect
    }

    fireEvent.pointerDown(colorSpace, {
      clientX: COLOR_SPACE_CENTER,
      clientY: COLOR_SPACE_CENTER
    })

    await waitFor(() => {
      expect(thumb.style.left).toBe(`${EXPECTED_THUMB_PERCENT}%`)
      expect(thumb.style.bottom).toBe(`${EXPECTED_THUMB_PERCENT}%`)
    })

    expect(handleChange).toHaveBeenCalled()
  })
})
