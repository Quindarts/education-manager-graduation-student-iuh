import styled from '@emotion/styled'
import { Button } from '@mui/material'
import { MaterialDesignContent } from 'notistack'

export const StyledButton = styled(Button)`
    border-radius: 4px;
`

export const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
    '&.notistack-MuiContent-warning': {
        backgroundColor: '#dd7a01',
    },
    '&.notistack-MuiContent-info': {
        backgroundColor: '#299cdb',
    },
    '&.notistack-MuiContent-success': {
        backgroundColor: '#4fd06b',
    },
    '&.notistack-MuiContent-error': {
        backgroundColor: '#ba0517',
    },
}))