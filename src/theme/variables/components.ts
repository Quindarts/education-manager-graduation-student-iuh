import { Components } from '@mui/material/styles';

const components: Components = {
  MuiButton: {
    styleOverrides: {
      root: () => ({
        textTransform: "none",
      }),
      contained: () => ({
        color: 'white'
      }),

      sizeSmall: ({ theme }: any) => ({
        fontSize: theme.typography.h6,
        height: 35,
      }),
      sizeMedium: ({ theme }: any) => ({
        fontSize: theme.typography.h5,
      }),
      sizeLarge: ({ theme }: any) => ({
        fontSize: theme.typography.h3,
      })
    }
  },
  MuiInputBase: {
    styleOverrides: {
      root: ({ theme }: any) => ({
        // backgroundColor: theme.palette.common.white,
        borderRadius: 8,
        // minHeight: textFieldHeight,
        outline: 'none',
        border: 'none',
        overflow: 'hidden',
        ' fieldset.MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.divider,
          borderWidth: '0.5px',
        },
        '&.Mui-focused': {
          '& fieldset.MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.divider,
            borderWidth: '0.5px',
          },
        },
        '&:hover': {
          '& fieldset.MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.divider,
            borderWidth: '0.5px',
          },
        },
        '& .MuiSelect-icon ': {
          color: theme.palette.text.primary,
        },

        '& .MuiSelect-select': {
          color: theme.palette.text.primary,
          fontWeight: 600,
        },

        '&.Mui-error': {
          '& fieldset.MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.error.main,
          },
        },
        '&.Mui-disabled input': {
          '-webkit-text-fill-color': theme.palette.text.primary,
          backgroundColor: theme.palette.background.defaults,
          fontWeight: 600,
          '& .MuiInputBase-input:not(.MuiSelect-select)': {
            // minHeight: textFieldHeight,
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
          },
          '& .MuiInputBase-input.MuiSelect-select': {
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
          },
          svg: {
            display: 'none',
          },
          'fieldset.MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
          '& textarea': {
            border: 'none',
          },
        },
      }),

      multiline: ({ theme }: any) => ({
        '& textarea': {
          padding: theme.spacing(4),
        },
      }),
      input: {
        padding: 0,
      },
    },
  },

  // Card
  MuiCardContent: {
    styleOverrides: {
      root: {
        padding: '24px',
      },
    },
  },
  //IconButton
  MuiIconButton: {
    styleOverrides: {
      root: ({ theme }: any) => ({
        color: theme.palette.grey[600],
        '&:focus': {
          backgroundColor: theme.palette.grey[300]
        }
      })
    }
  }
};

export default components;
