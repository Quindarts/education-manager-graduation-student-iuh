import Calendar from '@/components/ui/Calendar';
import CustomTextField from '@/components/ui/CustomTextField';
import Modal from '@/components/ui/Modal';
import TitleManager from '@/components/ui/Title';
import { useTerm } from '@/hooks/api/useQueryTerm';
import { formatDates } from '@/utils/formatDate';
import { Icon } from '@iconify/react';
import { Box, Button, CircularProgress } from '@mui/material';
import { Formik } from 'formik';
import { useEffect } from 'react';
import { validationTermSchema } from '../context';
import dayjs from 'dayjs';
import { useMajor } from '@/hooks/api/useQueryMajor';

const calculateEndDate = (date: null | string) => {
  if (date !== null) {
    const start = dayjs(date);
    const end = start.add(15 * 7, 'day');
    return end;
  }
  return null;
};

function AddModal(props: any) {
  const { onClose, open } = props;
  const { onCreateTerm } = useTerm();
  const { mutate: createTerm, isLoading, isSuccess } = onCreateTerm();
  const { majorStore } = useMajor();
  const handleSubmitTerm = (values: any) => {
    createTerm({
      name: values.name,
      majorId: values.majorId,
      startDate: formatDates(values.startDate),
      endDate: formatDates(values.endDate),
    });
  };
  useEffect(() => {
    onClose();
  }, [isSuccess]);
  return (
    <Modal open={open} onClose={onClose}>
      <Box p={10}>
        <TitleManager  mb={10} variant='h4' textTransform={'uppercase'}>
          Tạo học kì mới
        </TitleManager>
        {isLoading ? (
          <Box height={300} my={'auto'} mx={'auto'}>
            <CircularProgress />
          </Box>
        ) : (
          <Formik
            validationSchema={validationTermSchema}
            onSubmit={(values) => handleSubmitTerm(values)}
            initialValues={{
              name: '',
              majorId: majorStore.currentMajor.id,
              startDate: null,
              endDate: null,
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
                <CustomTextField
                  label='Tên học kì'
                  required={true}
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && errors.name ? true : false}
                  helperText={errors.name}
                  name='name'
                  placeholder='Ví dụ hợp lệ: HK1_2023-2024'
                />
                <CustomTextField
                  label='Chuyên ngành'
                  required={true}
                  value={majorStore.currentMajor.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled
                  name='name'
                />
                <Box gap={10} display={'flex'} mt={6}>
                  <Box flex={1}>
                    <Calendar
                      onChange={(value) => setFieldValue('startDate', value)}
                      sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
                      label='Ngày bắt đầu'
                      name='startDate'
                      format='DD/MM/YYYY'
                      value={values.startDate}
                      error={touched.startDate && errors.startDate ? true : false}
                    />
                  </Box>
                  <Box flex={1}>
                    <Calendar
                      onChange={(value) => {
                        setFieldValue('endDate', value);
                      }}
                      sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
                      label='Ngày kết thúc'
                      format='DD/MM/YYYY'
                      name='endDate'
                      value={values.startDate ? calculateEndDate(values?.startDate) : null}
                      error={touched.endDate && errors.endDate ? true : false}
                    />
                  </Box>
                </Box>
                <Box justifyContent={'end'} gap={4} display={'flex'} mt={10}>
                  <Button type='submit' variant='contained' color='primary' onClick={onClose}>
                    <Icon icon='mdi:close-outline' />
                    Hủy
                  </Button>
                  <Button variant='contained' color='success' type='submit'>
                    <Icon icon='material-symbols:save-outline' />
                    Lưu thông tin
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        )}
      </Box>
    </Modal>
  );
}

export default AddModal;
