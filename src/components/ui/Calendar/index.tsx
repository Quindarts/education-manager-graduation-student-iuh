import { Box, InputLabel } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import React from 'react';
interface CalendarPropsType extends DatePickerProps<any> {
  className?: string;
  id?: string;
  label?: string;
}
function Calendar(props: CalendarPropsType) {
  const { className, label, id, sx, ...rest } = props;
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
            '.MuiInputBase-root input': {
              padding: 5,
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
}

export default Calendar;
