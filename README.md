<div align="center">
  <img src="https://github.com/sherif-magdy/mui-color-input/raw/main/docs/static/img/logo.jpg" width="70" />
</div>
<div align="center">
<h1>Material UI color input</h1>
  <p>A color input designed for the React library <a href="https://mui.com/">MUI</a></p>
</div>
<div align="center">

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/sherif-magdy/mui-color-input/blob/main/LICENSE)
![ts](https://badgen.net/badge/Built%20With/TypeScript/blue)
[![npm](https://img.shields.io/npm/v/@sherifmagdy/mui-color-input)](https://www.npmjs.com/package/@sherifmagdy/mui-color-input)

</div>

<div align="center">
  <img src="https://github.com/sherif-magdy/mui-color-input/raw/main/mui-color-input.gif" width="100%" />
</div>

## Installation

```
// with npm
npm install @sherifmagdy/mui-color-input

// with yarn
yarn add @sherifmagdy/mui-color-input

// with pnpm
pnpm add @sherifmagdy/mui-color-input
```

The component uses [@ctrl/tinycolor](https://www.npmjs.com/package/@ctrl/tinycolor) for color parsing and formatting.

## Usage

```jsx
import React from 'react'
import { MuiColorInput } from '@sherifmagdy/mui-color-input'

const MyComponent = () => {
  const [value, setValue] = React.useState('#ffffff')

  const handleChange = (newValue) => {
    setValue(newValue)
  }

  return <MuiColorInput format="hex" value={value} onChange={handleChange} />
}
```

## Slots & slotProps (v10)

`MuiColorInput` follows MUI's canonical composition API. Each internal part is overridable through `slots`, and any prop can be forwarded to the matching part through `slotProps`.

| Slot          | Default component     | Renders                      |
| ------------- | --------------------- | ---------------------------- |
| `root`        | `Box`                 | The wrapping `<span>`        |
| `textField`   | `ColorTextField`      | The text input               |
| `adornment`   | `MuiColorInputButton` | The color swatch button      |
| `popover`     | `ColorPopover`        | The dropdown                 |
| `popoverBody` | `ColorPopoverBody`    | The popover's inner controls |

```jsx
<MuiColorInput
  value={value}
  format="rgb"
  onChange={handleChange}
  slotProps={{
    textField: { label: 'Color', color: 'warning', fullWidth: true },
    adornment: { position: 'end', sx: { width: 40, height: 40 } },
    popover: { PaperProps: { sx: { width: 300 } } },
    popoverBody: { isAlphaHidden: true }
  }}
/>
```

### Migrating from v9 to v10

v10 replaces the ad-hoc props with the `slots` / `slotProps` pattern. Map your existing props as follows:

| v9                                          | v10                                                         |
| ------------------------------------------- | ----------------------------------------------------------- |
| `adornmentPosition="end"`                   | `slotProps={{ adornment: { position: 'end' } }}`            |
| `Adornment={CustomBtn}`                     | `slots={{ adornment: CustomBtn }}`                          |
| `AdornmentProps={{ sx }}`                   | `slotProps={{ adornment: { sx } }}`                         |
| `PopoverProps={{ ... }}`                    | `slotProps={{ popover: { ... } }}`                          |
| `<MuiColorInput label="..." color="..." />` | `slotProps={{ textField: { label: '...', color: '...' } }}` |

> **Breaking:** the `ref` now resolves to the root `<span class="MuiColorInput-Root">` wrapper (in v9 it targeted the text field's root `<div>`).

See the full [API reference](https://sherif-magdy.github.io/mui-color-input/docs/api-reference/) for every prop, slot, and type.

## Next.js integration

Learn how to use MUI color input with Next.js

Once you have installed `@sherifmagdy/mui-color-input` in your next.js project, it is important to transpile it as it is an ESM package first.

```js
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@sherifmagdy/mui-color-input']
  // your config
}

export default nextConfig
```

## [Documentation](https://sherif-magdy.github.io/mui-color-input/)

## Changelog

Go to [GitHub Releases](https://github.com/sherif-magdy/mui-color-input/releases)

## TypeScript

This library comes with TypeScript "typings". If you happen to find any bugs in those, create an issue.

### 🐛 Bugs

Please file an issue for bugs, missing documentation, or unexpected behavior.

### 💡 Feature Requests

Please file an issue to suggest new features. Vote on feature requests by adding
a 👍. This helps maintainers prioritize what to work on.

## LICENSE

MIT
