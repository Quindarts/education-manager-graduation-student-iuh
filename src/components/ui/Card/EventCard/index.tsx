import { Box } from '@mui/material';

function EventCard(eventInfo) {
  return (
    <Box>
      hi
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </Box>
  );
}

export default EventCard;
