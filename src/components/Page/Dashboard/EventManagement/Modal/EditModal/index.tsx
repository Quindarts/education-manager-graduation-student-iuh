import CustomTextField from '@/components/ui/CustomTextField';
import Modal from '@/components/ui/Modal';
import TitleManager from '@/components/ui/Title';
import { formatDates } from '@/utils/formatDate';
import { Icon } from '@iconify/react';
import { Box, Button, Checkbox, CircularProgress, Typography } from '@mui/material';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import useEvent from '@/hooks/api/useQueryEvent';
import { validationEventSchema } from '../../context';
import useGroupSupport from '@/hooks/api/useQueryGroupSupport';
import SekeletonUI from '@/components/ui/Sekeleton';
import { handleSearch } from '@/utils/search';
import DateTimeCalendar from '@/components/ui/Calendar/DateTimeCalendar';
import SearchInput from '../../SearchInput';
import dayjs from 'dayjs';
import TableEdit from './Table';
import DeleteModal from '../DeleteModal';

function EditModal(props: any) {
  const { onClose, open, id } = props;
  const { onUpdateEventById, handleGetEventById } = useEvent();
  const { data: eventFetch, isLoading: loadEvent } = handleGetEventById(id);
  const { mutate: updateEvent, isSuccess: successUpdate } = onUpdateEventById(id);

  useEffect(() => {
    onClose();
  }, [successUpdate]);

  const handleSubmit = (values: any) => {
    updateEvent({
      name: values.name,
      startDate: values.startDate,
      endDate: values.endDate,
      groupStudentIds: eventFetch?.event?.groupStudents,
    });
  };

  const [openDeleteEvent, setOpenDeleteEvent] = useState({ isOpen: false, id: '', name: '' });
  const handleOpenDeleteEvent = (id: string, name: string) => {
    setOpenDeleteEvent({ isOpen: true, id: id, name: name });
  };
  const handleCloseDeleteEventModal = () => {
    setOpenDeleteEvent((pre) => ({ ...pre, isOpen: false }));
  };
  return (
    <>
      <Modal maxWidth={'lg'} open={open} onClose={onClose}>
        <Box pb={4} px={10}>
          <TitleManager
            mb={4}
            variant='h6'
            icon='ant-design:field-time-outlined'
            textTransform={'uppercase'}
          >
            Cập nhật sự kiện
          </TitleManager>
          {loadEvent ? (
            <Box height={300} my={'auto'} mx={'auto'}>
              <CircularProgress />
            </Box>
          ) : (
            <Formik
              validationSchema={validationEventSchema}
              onSubmit={(values) => handleSubmit(values)}
              initialValues={{
                name: `${eventFetch?.event?.name}`,
                startDate: dayjs(eventFetch?.event?.startDate),
                endDate: dayjs(eventFetch?.event?.endDate),
              }}
            >
              {({
                values,
                errors,
                touched,
                setFieldValue,
                handleSubmit,
                handleBlur,
                handleChange,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box display={'flex'} gap={10}>
                    <Box flex={1}>
                      <CustomTextField
                        label='Tên sự kiện'
                        required={true}
                        name='name'
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.name && errors.name ? true : false}
                        helperText={errors.name}
                        placeholder='Ví dụ hợp lệ: Chấm bài hàng tuần'
                      />
                    </Box>
                    <Box width={250}>
                      <DateTimeCalendar
                        onChange={(value) => {
                          setFieldValue('startDate', value);
                        }}
                        sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
                        label='Ngày bắt đầu'
                        name='startDate'
                        format='DD/MM/YYYY hh:mm:ss A'
                        value={values.startDate}
                        error={touched.startDate && errors.startDate ? true : false}
                      />
                    </Box>
                    <Box width={250}>
                      <DateTimeCalendar
                        onChange={(value) => {
                          setFieldValue('endDate', value);
                        }}
                        sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
                        label='Ngày kết thúc'
                        name='endDate'
                        format='DD/MM/YYYY hh:mm:ss A'
                        value={values.endDate}
                        error={touched.endDate && errors.endDate ? true : false}
                      />
                    </Box>
                  </Box>

                  <Box mt={4}>
                    {loadEvent ? (
                      <SekeletonUI />
                    ) : (
                      <Box>
                        {' '}
                        <TableEdit
                          eventId={id}
                          totalItems={eventFetch?.event?.groupStudents?.length}
                          rows={eventFetch?.event?.groupStudents}
                        />{' '}
                      </Box>
                    )}
                  </Box>
                  <Box  justifyContent={'end'} gap={4} mb={6} display={'flex'}>
                    <Button variant='contained' color='primary' onClick={onClose}>
                      <Icon width={20} icon='mdi:close-outline' />
                      Hủy
                    </Button>
                    <Button
                      variant='contained'
                      color='error'
                      onClick={() =>
                        handleOpenDeleteEvent(eventFetch?.event?.id, eventFetch?.event?.name)
                      }
                    >
                      <Icon width={20} icon='solar:trash-bin-trash-bold' />
                      Xóa sự kiện
                    </Button>
                    <Button sx={{ width: 140 }} variant='contained' color='success' type='submit'>
                      <Icon width={20} icon='material-symbols:save-outline' />
                      Cập nhật
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          )}
        </Box>
      </Modal>{' '}
      <DeleteModal
        id={openDeleteEvent.id}
        onClose={handleCloseDeleteEventModal}
        onCloseParentModal={onClose}
        open={openDeleteEvent.isOpen}
        name={openDeleteEvent.name}
        isHaveParentModal={true}
      />
    </>
  );
}

export default React.memo(EditModal);
