import React from 'react'
import AlphaSlider from '@components/AlphaSlider/AlphaSlider'
import ColorSpace from '@components/ColorSpace/ColorSpace'
import HueSlider from '@components/HueSlider/HueSlider'
import type { HSV, Numberify } from '@ctrl/tinycolor'
import { TinyColor } from '@ctrl/tinycolor'
import Box from '@mui/material/Box'
import { buildValueFromTinyColor } from '@shared/helpers/format'
import { clamp, matchIsNumber } from '@shared/helpers/number'
import type { ColorPopoverBodyProps } from '../../index.types'

const ColorPopoverBody = (props: ColorPopoverBodyProps) => {
  const { currentColor, format, onChange, isAlphaHidden, children } = props
  const [currentHsv, setCurrentHsv] = React.useState<Numberify<HSV>>(
    currentColor.toHsv()
  )

  const isInteractingRef = React.useRef<boolean>(false)

  React.useEffect(() => {
    if (isInteractingRef.current) {
      return
    }

    const incomingHsv = currentColor.toHsv()
    const localHex8 = new TinyColor({
      h: currentHsv.h,
      s: currentHsv.s,
      v: currentHsv.v,
      a: incomingHsv.a
    }).toHex8String()

    if (localHex8 !== currentColor.toHex8String()) {
      setCurrentHsv(incomingHsv)
    }
  }, [currentColor, currentHsv])

  React.useEffect(() => {
    const handlePointerUp = () => {
      isInteractingRef.current = false
    }

    document.addEventListener('pointerup', handlePointerUp)

    return () => {
      document.removeEventListener('pointerup', handlePointerUp)
    }
  }, [])

  const endInteraction = () => {
    isInteractingRef.current = false
  }

  const handleChangeHue = (event: Event, hue: number | number[]) => {
    if (!matchIsNumber(hue)) {
      return
    }

    isInteractingRef.current = true
    const newHue = clamp((360 * hue) / 100, 0, 359)
    setCurrentHsv((prevState) => {
      return {
        ...prevState,
        h: newHue
      }
    })
    const tinyColor = new TinyColor({
      ...currentHsv,
      a: currentColor.toHsv().a,
      h: newHue
    })
    onChange?.(buildValueFromTinyColor(tinyColor, format))
  }

  const handleChangeAlpha = (event: Event, alphaValue: number | number[]) => {
    if (!matchIsNumber(alphaValue)) {
      return
    }

    const tinyColor = currentColor.clone().setAlpha(alphaValue)
    onChange?.(buildValueFromTinyColor(tinyColor, format))
  }

  const handleChangeSpace = ({ s, v }: Pick<Numberify<HSV>, 's' | 'v'>) => {
    isInteractingRef.current = true
    const tinyColor = new TinyColor({
      h: currentHsv.h,
      a: currentColor.toHsv().a,
      s,
      v
    })
    setCurrentHsv((prevState) => {
      return {
        ...prevState,
        s,
        v
      }
    })
    onChange?.(buildValueFromTinyColor(tinyColor, format))
  }

  const renderProps = { currentColor, format, onChange }
  const renderedChildren =
    typeof children === 'function' ? children(renderProps) : children

  return (
    <Box className="MuiColorInput-PopoverBody">
      <ColorSpace
        currentHue={currentHsv.h}
        hsv={currentHsv}
        onChange={handleChangeSpace}
      />
      <Box sx={{ mt: '10px', px: '3px' }}>
        <HueSlider
          min={0}
          max={100}
          step={1}
          onChange={handleChangeHue}
          onChangeCommitted={endInteraction}
          aria-label="hue"
          value={(currentHsv.h * 100) / 360}
        />
      </Box>
      {!isAlphaHidden ? (
        <Box sx={{ mt: '10px', px: '3px' }}>
          <AlphaSlider
            min={0}
            max={1}
            step={0.01}
            aria-label="alpha"
            rgbColor={currentColor.toRgb()}
            onChange={handleChangeAlpha}
            onChangeCommitted={endInteraction}
            value={currentColor.getAlpha()}
          />
        </Box>
      ) : null}
      {renderedChildren}
    </Box>
  )
}

export default ColorPopoverBody
