---
sidebar_position: 3
---

# API Reference

This article discusses the API and props of **MuiColorInput**. Props are defined within `MuiColorInputProps`.

## `value`

- Type: `MuiColorInputValue`
- Required: `true`

The string parsing is very permissive. It is meant to make typing a color as input as easy as possible. All commas, percentages, parenthesis are optional, and most input allow either 0-1, 0%-100%, or 0-n (where n is either 100, 255, or 360 depending on the value).

HSL and HSV both require either 0%-100% or 0-1 for the `S`/`L`/`V` properties. The `H` (hue) can have values between 0%-100% or 0-360.

RGB input requires either 0-255 or 0%-100%.

Source : https://github.com/scttcper/tinycolor#accepted-string-input

Here are some examples of string input:

### Hex, 8-digit (RGBA) Hex

```tsx
<MuiColorInput value="#000" />
<MuiColorInput value="000" />
<MuiColorInput value="#369C" />
<MuiColorInput value="#f0f0f6" />
<MuiColorInput value="#f0f0f688" />
<MuiColorInput value="f0f0f688" />
```

### RGB, RGBA

```tsx
<MuiColorInput value="rgb (255, 0, 0)" />
<MuiColorInput value="rgb 255 0 0" />
<MuiColorInput value="rgba (255, 0, 0, .5)" />
<MuiColorInput value={{ r: 255, g: 0, b: 0 }} />
```

### HSL, HSLA

```tsx
<MuiColorInput value="hsl(0, 100%, 50%)" />
<MuiColorInput value="hsla(0, 100%, 50%, .5)" />
<MuiColorInput value="hsl 0 1.0 0.5" />
<MuiColorInput value={{ h: 0, s: 1, l: 0.5 }} />
```

### HSV, HSVA

```tsx
<MuiColorInput value="hsv(0, 100%, 50%)" />
<MuiColorInput value="hsva(0, 100%, 50%, .5)" />
<MuiColorInput value="hsv (0 100% 100%)" />
<MuiColorInput value={{ h: 0, s: 100, v: 100 }} />
```

## `onChange`

- Default: `undefined`
- Type: `(color: string, colors: MuiColorInputColors) => void`
- Required: `false`

Gets called once the user updates the color value.

The callback gives you **2 parameters**:
  1. The new color [value](#value) stringified
  2. An object of the color value in different formats stringified (`hex`, `hex8`, `hsl`, `hsv`, `rgb`)

Example:

```tsx
const handleChange = (color, colors) => {
  /**
  color: "#ffffff"
  colors: {
    hex: "#ffffff",
    hex8: "#ffffffff",
    hsl: "hsl(0, 0%, 100%)",
    hsv: "hsv(0, 0%, 100%)",
    rgb: "rgb(255, 255, 255)"
  }
  **/
}

<MuiColorInput onChange={handleChange} />
```

## `format`

- Default: `"rgb"`
- Type: `MuiColorInputFormat`
- Required: `false`

The format to use for the color [value](#value). The first parameter of `onChange` respects this format.

**Available formats**: `hex`, `hex8`, `hsl`, `hsv` and `rgb`.

```tsx
<MuiColorInput format="hex" />
<MuiColorInput format="hex8" />
<MuiColorInput format="rgb" />
<MuiColorInput format="hsv" />
<MuiColorInput format="hsl" />
```

## `fallbackValue`

- Default: `undefined`
- Type: `MuiColorInputValue`
- Required: `false`

A fallback color [value](#value) applied when the user leaves the input with an invalid color. When omitted, an invalid input is left untouched.

```tsx
<MuiColorInput fallbackValue="#ffffff" />
<MuiColorInput fallbackValue="#ffffffff" />
<MuiColorInput fallbackValue="hsv(0, 0%, 100%)" />
<MuiColorInput fallbackValue="rgb(255, 255, 255)" />
<MuiColorInput fallbackValue={{ h: 0, s: 100, v: 100 }} />
```

## `isAlphaHidden`

- Default: `false`
- Type: `boolean`
- Required: `false`

Whether to hide the input controls for a color's alpha channel.

```tsx
<MuiColorInput isAlphaHidden />
```

## `isTextFieldHidden`

- Default: `false`
- Type: `boolean`
- Required: `false`

When `true`, the text input is omitted and the component renders as a standalone color swatch. The root element receives the `MuiColorInput-Swatch` class in this mode. Clicking the swatch still opens the picker popover (unless [`disablePopover`](#disablepopover) is set).

```tsx
<MuiColorInput value={color} isTextFieldHidden onChange={handleChange} />
```

## `disablePopover`

- Default: `false`
- Type: `boolean`
- Required: `false`

Whether to disable the color picker popover. When set to `true`, clicking the color button will not open the popover.

```tsx
<MuiColorInput disablePopover />
```

## `slots`

- Default: `{}`
- Type: `MuiColorInputSlots`
- Required: `false`

An object mapping each part of `MuiColorInput` to a custom React element type (a component or a DOM tag). Only the slots you provide are overridden; the rest fall back to their built-in component.

| Slot | Default component | Renders |
|------|-------------------|---------|
| `root` | `Box` | The wrapping `<span>` (`display: inline-flex`, `position: relative`). |
| `textField` | `ColorTextField` | The text input (wraps MUI `TextField`). |
| `adornment` | `MuiColorInputButton` (`ColorButton`) | The color swatch button attached to the input. |
| `popover` | `ColorPopover` | The dropdown (wraps MUI `Popover`). |
| `popoverBody` | `ColorPopoverBody` | The popover's inner controls (channels and preview). |

```tsx
const CustomSwatch = (props) => (
  <button style={{ backgroundColor: props.bgColor }} {...props} />
)

<MuiColorInput slots={{ adornment: CustomSwatch }} />
```

## `slotProps`

- Default: `{}`
- Type: `MuiColorInputSlotProps`
- Required: `false`

An object whose props are forwarded to the matching [slot](#slots). Props are merged with the component's internal defaults using MUI's `mergeSlotProps`, so:

- **Event handlers compose** — your `onBlur` (via `slotProps.textField`) or `onClose` (via `slotProps.popover`) runs *alongside* the internal handler, not instead of it.
- **`className` concatenates**, and **`style` / `sx` merge**.
- **Reserved keys**: `slotProps.textField.slotProps.input.startAdornment` and `endAdornment` are managed internally to host the adornment; overriding them has no effect.

| Slot | `slotProps` type |
|------|------------------|
| `root` | `Partial<BoxProps>` — receives the internal `component` and `ref`. Style the root via `className`, `style`, or `sx` here; `className` is concatenated with the internal `MuiColorInput-Root` class (and `MuiColorInput-Swatch` when [`isTextFieldHidden`](#istextfieldhidden) is set), so it never replaces them. |
| `textField` | `Partial<TextFieldProps>` — `onChange`, `value`, `defaultValue`, `select`, `type`, `multiline`, `inputRef`, `InputProps`, `inputProps`, and `InputLabelProps` are managed internally. Use this slot for `label`, `disabled`, `color`, `fullWidth`, `size`, `onBlur`, etc. |
| `adornment` | `Partial<ColorButtonProps> & { position?: 'start' \| 'end' }` — see [`position`](#slotpropsadornmentposition) below. |
| `popover` | `Partial<PopoverProps>` — `open`, `anchorEl`, and `children` are managed internally. |
| `popoverBody` | `Partial<ColorPopoverBodyProps>`. |

```tsx
<MuiColorInput
  value={color}
  format="rgb"
  onChange={handleChange}
  slotProps={{
    root: { className: 'my-root' },
    textField: { label: 'Color', color: 'warning', fullWidth: true },
    adornment: { position: 'end', sx: { width: 40, height: 40 } },
    popover: { PaperProps: { sx: { width: 300 } } },
    popoverBody: { isAlphaHidden: true }
  }}
/>
```

### `slotProps.adornment.position`

- Default: `"start"`
- Type: `"start" | "end"`

Replaces the former `adornmentPosition` prop. Controls which side of the input the color swatch sits on, and adjusts the popover's anchor and transform origin accordingly. It is consumed internally and **not** forwarded to the adornment component.

```tsx
<MuiColorInput slotProps={{ adornment: { position: 'end' } }} />
```

## `ref`

- Type: `React.Ref<HTMLSpanElement>`

A ref to the root `<span class="MuiColorInput-Root">` wrapper. **Breaking**: in v9 the ref resolved to the text field's root `<div>`; in v10 it targets the outermost root `<span>`.

## Exported types

`mui-color-input` exports the following types alongside the component:

| Type | Description |
|------|-------------|
| `MuiColorInputProps` | The component's props (described in this document). |
| `MuiColorInputSlots` | Shape of the [`slots`](#slots) prop. |
| `MuiColorInputSlotProps` | Shape of the [`slotProps`](#slotprops) prop. |
| `MuiColorInputAdornmentSlotProps` | Shape of `slotProps.adornment` — `Partial<ColorButtonProps> & { position?: 'start' \| 'end' }`. |

Also exported: `MuiColorInputValue`, `MuiColorInputColors`, `MuiColorInputFormat`, `MuiColorButtonProps`, and `TinyColor` (re-exported from `@ctrl/tinycolor`).

## Migrating from v9 to v10

v10 replaces the ad-hoc props API with the canonical MUI `slots` / `slotProps` pattern. Map your existing props as follows:

| v9 | v10 |
|----|-----|
| `adornmentPosition="end"` | `slotProps={{ adornment: { position: 'end' } }}` |
| `Adornment={CustomBtn}` | `slots={{ adornment: CustomBtn }}` |
| `AdornmentProps={{ sx }}` | `slotProps={{ adornment: { sx } }}` |
| `PopoverProps={{ ... }}` | `slotProps={{ popover: { ... } }}` |
| `PopoverBodyProps={{ ... }}` | `slotProps={{ popoverBody: { ... } }}` |
| `<MuiColorInput label="..." color="..." />` | `slotProps={{ textField: { label: '...', color: '...' } }}` |
| `ref` → text field root `<div>` | `ref` → root `<span class="MuiColorInput-Root">` |
