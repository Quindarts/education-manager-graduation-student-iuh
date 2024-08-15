import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/vi'; // Import locale Vietnamese
import { Box, Paper } from '@mui/material';

function CalendarSection() {
  dayjs.extend(localizedFormat);
  dayjs.locale('vi');
  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar />
      </LocalizationProvider>
    </Box>
  );
}

export default CalendarSection;
