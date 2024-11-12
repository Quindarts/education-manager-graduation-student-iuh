import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import viLocale from '@fullcalendar/core/locales/vi'; // thêm locale tiếng Việt
import { Box, Paper } from '@mui/material';
import Header from './Header';
import useEvent from '@/hooks/api/useQueryEvent';
import { convertEventGrid } from '@/utils/convertDataTable';
import SekeletonTable from '@/components/ui/Sekeleton';

let eventGuid = 0;
const todayStr = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD của ngày hiện tại


export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    name: 'Sự kiện cả ngày',
    start: todayStr,
  },
  {
    id: createEventId(),
    name: 'Sự kiện có thời gian',
    start: todayStr + 'T12:00:00',
  },
];


export function createEventId() {
  return String(eventGuid++);
}


export default function EventManagement() {

  const { handleGetEvents } = useEvent();
  const { data: fetchEvents, isLoading: loadingEvents } = handleGetEvents();
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);

  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible);
  }

  function handleDateSelect(selectInfo) {
    const title = prompt('Vui lòng nhập tiêu đề mới cho sự kiện của bạn');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // xóa lựa chọn ngày

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }

  function handleEventClick(clickInfo) {
    if (confirm(`Bạn có chắc muốn xóa sự kiện '${clickInfo.event.title}' không?`)) {
      clickInfo.event.remove();
    }
  }

  function handleEvents(events) {
    setCurrentEvents(events);
  }
  console.log('fetchEvents', convertEventGrid(fetchEvents?.events));
  return (
    <>
      <Paper sx={{ px: 20, py: 10, fontSize: '16px', color: '#333' }}>
        <Header />
        <Box sx={{ fontSize: 12, color: 'primary.dark' }}>
          {loadingEvents ? (
            <SekeletonTable />
          ) : (
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay',
              }}
              locale={viLocale}
              timeZone='UTC+7'
              initialView='dayGridMonth'
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              weekends={weekendsVisible}
              initialEvents={convertEventGrid(fetchEvents?.events)}
              select={(e) => {
                alert(JSON.stringify(e));
              }}
              eventContent={renderEventContent}
              eventClick={handleDateSelect}
              eventsSet={handleEvents}
            />
          )}
        </Box>
      </Paper>
    </>
  );
}

function renderEventContent(eventInfo) {
  return (
    <Box>
      <b>a?</b>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </Box>
  );
}
