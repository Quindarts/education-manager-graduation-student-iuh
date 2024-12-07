import Modal from '@/components/ui/Modal';
import { useGroupLecturer } from '@/hooks/api/useQueryGroupLecturer';
import { Icon } from '@iconify/react';
import {
  Box,
  Button,
  CircularProgress,
  DialogActions,
  DialogTitle,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import TitleManager from '@/components/ui/Title';
import CustomTextField from '@/components/ui/CustomTextField';
import { Formik } from 'formik';
import dayjs from 'dayjs';
import * as Yup from 'yup';
import DateTimeCalendar from '@/components/ui/Calendar/DateTimeCalendar';

const GroupLecturerValidationSchema = Yup.object().shape({
  location: Yup.string(),
  startDate: Yup.date().required('Thời gian bắt đầu không được bỏ trống'),
  endDate: Yup.date().required('Thời gian kết thúc không được bỏ trống'),
});

function EditInfoGroupModal(props: any) {
  const { groupLecturerId, groupLecturerName, open, onClose } = props;
  const { onUpdateTimeAndLocation, handleGetGroupLecturerById } = useGroupLecturer();
  const { data: grFetch, isLoading } = handleGetGroupLecturerById(groupLecturerId);
  const { mutate: onUpdate, isSuccess } = onUpdateTimeAndLocation();

  const handleSubmit = (values: any) => {
    onUpdate({ ...values, id: groupLecturerId });
  };
  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess]);

  return (
    <Modal onClose={onClose} open={open}>
      <DialogTitle>
        <TitleManager color={'primary.main'}>
          Cập nhật thời gian/ địa điểm phân công chấm điểm
        </TitleManager>
      </DialogTitle>
      <Box sx={{ px: 10 }}>
        {isLoading ? (
          <Box
            sx={{
              width: '100%',
              height: 300,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box>
            <Box>
              <Typography fontWeight={'500'}>Mã nhóm giảng viên {groupLecturerName}</Typography>
            </Box>
            <Formik
              validationSchema={GroupLecturerValidationSchema}
              initialValues={{
                startDate: grFetch?.groupLecturer?.startDate
                  ? dayjs(`${grFetch?.groupLecturer?.startDate}`)
                  : null,
                endDate: dayjs(`${grFetch?.groupLecturer?.endDate}`)
                  ? dayjs(`${grFetch?.groupLecturer?.endDate}`)
                  : null,
                location: grFetch?.groupLecturer?.location
                  ? `${grFetch?.groupLecturer?.location}`
                  : '',
              }}
              onSubmit={(values, _) => handleSubmit(values)}
            >
              {({ values, handleChange, touched, errors, setFieldValue, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <Box sx={{ display: 'flex', gap: 10, mt: 4 }}>
                    <Box sx={{ flex: 1 }}>
                      <DateTimeCalendar
                        required
                        onChange={(value) => setFieldValue('startDate', value)}
                        sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
                        value={values?.startDate}
                        label='Thời gian bắt đầu chấm điểm'
                        name='startDate'
                        format='DD/MM/YYYY hh :mm :ss A'
                        error={touched.startDate && errors.startDate ? true : false}
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <DateTimeCalendar
                        required
                        onChange={(value) => setFieldValue('endDate', value)}
                        sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
                        value={values?.endDate}
                        label='Thời gian kết thúc chấm điểm'
                        name='endDate'
                        format='DD/MM/YYYY hh :mm :ss A'
                        error={touched.endDate && errors.endDate ? true : false}
                      />
                    </Box>
                  </Box>

                  <Box sx={{ mt: 4 }}>
                    <CustomTextField
                      name='location'
                      onChange={handleChange}
                      value={values?.location}
                      placeholder='VD: Zoom H117: 99150297936 / 621280'
                      label='Địa điểm / phòng trực tuyến'
                    />
                  </Box>

                  <DialogActions sx={{ px: 0 }}>
                    <Button
                      onClick={onClose}
                      sx={{ width: '20%' }}
                      color='primary'
                      variant='contained'
                    >
                      <Icon width={20} style={{ marginRight: 4 }} icon='mdi:cancel-outline' />
                      Hủy
                    </Button>
                    <Button type='submit' sx={{ width: '80%' }} color='success' variant='contained'>
                      <Icon
                        width={20}
                        style={{ marginRight: 4 }}
                        icon='material-symbols:sync-saved-locally'
                      />
                      Lưu
                    </Button>
                  </DialogActions>
                </form>
              )}
            </Formik>
          </Box>
        )}
      </Box>
    </Modal>
  );
}

export default React.memo(EditInfoGroupModal);
