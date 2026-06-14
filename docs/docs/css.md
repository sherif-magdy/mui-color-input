---
sidebar_position: 5
---

# CSS

Like any component, if you want to override a component's styles using custom classes, pass a `className` to the root via `slotProps`.

```jsx
<MuiColorInput slotProps={{ root: { className: 'my-class-name' } }} />
```

Then, you can use the different global class names (see below) to target an element of `MuiColorInput`.

| Global class | Description |
| ------------ | ----------- |
| `.MuiColorInput-Root` | Styles applied to the root element (a `<span>` wrapping the whole component). |
| `.MuiColorInput-Swatch` | Added to the root element when `isTextFieldHidden` is set. |
| `.MuiColorInput-TextField` | Styles applied to the text field (wraps the MUI [TextField](https://mui.com/material-ui/api/text-field/)). |
| `.MuiColorInput-Button` | Styles applied to the color swatch [Button](https://mui.com/material-ui/api/button/) (the adornment). |
| `.MuiColorInput-Popover` | Styles applied to the [Popover](https://mui.com/material-ui/api/popover/) component. |
| `.MuiColorInput-PopoverBody` | Styles applied to the popover body (channels and preview). |
| `.MuiColorInput-ColorSpace` | Styles applied to the ColorSpace component (the saturation/value square). |
| `.MuiColorInput-Thumb-active` | Styles applied to the active thumb inside the ColorSpace. |
| `.MuiColorInput-HueSlider` | Styles applied to the hue [Slider](https://mui.com/material-ui/api/slider/). |
| `.MuiColorInput-AlphaSlider` | Styles applied to the alpha [Slider](https://mui.com/material-ui/api/slider/). |

For example: target the `.MuiColorInput-HueSlider` global class name to customize the Hue Slider.

## Example with styled-component / emotion

```jsx
import { styled } from 'styled-components' // or emotion
import { MuiColorInput } from 'mui-color-input'

const MuiColorInputStyled = styled(MuiColorInput)`
  & .MuiColorInput-AlphaSlider {
    margin-top: 10px;
  }
`

function MyComponent() {
  return <MuiColorInputStyled />
}
```
