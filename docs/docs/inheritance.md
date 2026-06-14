---
sidebar_position: 4
---

# TextField inheritance

The text input is an MUI **[TextField](https://mui.com/material-ui/api/text-field/)**. In v10, its props are passed through the `textField` slot via `slotProps.textField`. The `onChange`, `value`, `defaultValue`, `select`, `type`, `multiline`, `inputRef`, `InputProps`, `inputProps`, and `InputLabelProps` props are managed internally and cannot be overridden on this slot.

See: https://mui.com/material-ui/api/text-field/

### Example

```jsx
<MuiColorInput
  slotProps={{
    textField: { size: 'small', variant: 'outlined', disabled: true }
  }}
/>
```
