import styled from '@emotion/styled';
import { Box, InputLabel } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { ErrorMessage } from 'formik';
import React from 'react';

interface CalendarPropsType extends DatePickerProps<any> {
  className?: string;
  id?: string;
  label?: string;
  error?: boolean;
}
const ErrorStyled = styled(ErrorMessage)`
  div {
    color: '#ca4f36';
    font-size: '12px';
    margin-top: '6px';
    margin-left: '16px';
  }
`;
function Calendar(props: CalendarPropsType) {
  const { className, label, id, name, error, sx, ...rest } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display={'flex'} className={`${className}`} sx={sx} flexDirection='column'>
        {label && (
          <InputLabel
            htmlFor={id}
            sx={{ mb: 4, color: 'grey.900', fontWeight: '500', fontSize: '13px' }}
          >
            {label}
          </InputLabel>
        )}
        <DatePicker
          {...rest}
          sx={{
            fieldset: {
              border: error ? '1px solid #ca4f36!important' : '',
            },
            '.MuiInputBase-root input': {
              padding: 5,
            },
            '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' },
          }}
        />
        {error && (
          <ErrorMessage
            // style={{
            //   color: '#ca4f36',
            //   fontSize: '12px',
            //   marginTop: '6px',
            //   marginLeft: '16px',
            // }}
            name={`${name}`}
            component={'span'}
          />
        )}
      </Box>
    </LocalizationProvider>
  );
}

export default Calendar;
