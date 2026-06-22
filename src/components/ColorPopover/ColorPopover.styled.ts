import { styled } from '@mui/material/styles'
import type { StyledComponentType } from '@shared/constants/types'

const Styled: { Container: StyledComponentType<'div'> } = {
  Container: styled('div')(() => {
    return {
      width: 300,
      padding: 8
    }
  })
}

export { Styled }
