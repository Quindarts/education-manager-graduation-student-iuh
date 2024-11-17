import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import viLocale from '@fullcalendar/core/locales/vi'; // thêm locale tiếng Việt
import { Box, Link, Paper, Typography } from '@mui/material';
import Header from './Header';
import useEvent from '@/hooks/api/useQueryEvent';
import { convertEventGrid } from '@/utils/convertDataTable';
import SekeletonTable from '@/components/ui/Sekeleton';
import EditModal from './Modal/EditModal';
import SwitchDayModal from './Modal/SwitchDayModal';
import { useNavigate } from 'react-router-dom';
import AllEventModal from './Modal/AllEventModal';

let eventGuid = 0;
const todayStr = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD của ngày hiện tại

export function createEventId() {
  return String(eventGuid++);
}

export default function EventManagement() {
  const { handleGetEvents } = useEvent();
  const {
    data: fetchEvents,
    isLoading: loadingEvents,
    isFetching: fetchingEvents,
  } = handleGetEvents();
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);

  const [openEditEvent, setOpenEditEvent] = useState({ isOpen: false, id: '' });
  const handleOpenEditEvent = (id: string) => {
    setOpenEditEvent({ isOpen: true, id: id });
  };
  const handleCloseEditEventModal = () => {
    setOpenEditEvent((pre) => ({ ...pre, isOpen: false }));
  };

  const [openSwitchEndDateModal, setopenSwitchEndDateModal] = useState({
    isOpen: false,
    oldDate: '',
    newDate: '',
    name: '',
    id: '',
    eventDrag: {},
  });
  const handleOpenSwitchEndDateModal = (
    id: string,
    name: string,
    oldDate: string,
    newDate: string,
    eventDrag: any,
  ) => {
    setopenSwitchEndDateModal({ isOpen: true, oldDate, newDate, name, id, eventDrag });
  };
  const handleCloseSwitchEndDate = () => {
    setopenSwitchEndDateModal((pre) => ({ ...pre, isOpen: false }));
  };

  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible);
  }

  function handleDateSelect(selectInfo) {
    const id = selectInfo.event._def.publicId;
    handleOpenEditEvent(id);
  }

  function handleEvents(events) {
    setCurrentEvents(events);
  }
  function handleEventDrop(eventInfo) {
    const oldDate = eventInfo.oldEvent?._instance?.range?.start;
    const newDate = eventInfo.event?._instance.range?.start;
    const name = eventInfo.event.title;
    const id = eventInfo.event.id;
    handleOpenSwitchEndDateModal(id, name, oldDate, newDate, eventInfo);
  }

  //Events
  const [openEvents, setOpenEvents] = useState(false);
  const handleOpenEvents = () => {
    setOpenEvents(true);
  };
  const handleCloseEvents = () => {
    setOpenEvents(false);
  };

  return (
    <>
      <Paper sx={{ px: 10, py: 10, fontSize: '16px', color: '#03437f' }}>
        <Header />
        <Typography textAlign={'left'} mb={6} variant='body1' color='initial'>
          Tất cả sự kiện đã tạo:{' '}
          <Typography variant='body1' color='grey.600' fontWeight={'bold'} component='span'>
            {fetchEvents?.events?.length} sự kiện{' '}
          </Typography>
          <Typography
            sx={{ cursor: 'pointer', '&:hover': { color: 'error.dark' } }}
            component={'span'}
            ml={2}
            variant='body1'
            color='primary.main'
            onClick={handleOpenEvents}
          >
            Xem chi tiết
          </Typography>
        </Typography>
        <Box sx={{ fontSize: 12, color: 'primary.dark' }}>
          {loadingEvents || fetchingEvents ? (
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
              eventDrop={handleEventDrop}
              eventContent={renderEventContent}
              eventClick={handleDateSelect}
              eventsSet={handleEvents}
            />
          )}
        </Box>
      </Paper>
      <EditModal
        id={openEditEvent.id}
        onClose={handleCloseEditEventModal}
        open={openEditEvent.isOpen}
      />
      <SwitchDayModal
        id={openSwitchEndDateModal.id}
        name={openSwitchEndDateModal.name}
        oldDate={openSwitchEndDateModal.oldDate}
        newDate={openSwitchEndDateModal.newDate}
        onClose={handleCloseSwitchEndDate}
        open={openSwitchEndDateModal.isOpen}
        eventDrag={openSwitchEndDateModal.eventDrag}
      />
      <AllEventModal onClose={handleCloseEvents} open={openEvents} />
    </>
  );
}

function renderEventContent(eventInfo) {
  return (
    <Box sx={{ height: 60, px: 4, py: 2 }}>
      <Typography variant='body2' fontSize={8} mb={2} fontWeight={'bold'} color='grey.200'>
        Ngày bắt đầu {eventInfo.event.title.split('_')[1]}
      </Typography>
      <Typography variant='body2' fontSize={10} color='grey.100'>
        {eventInfo.event.title.split('_')[0]}
      </Typography>
    </Box>
  );
}
