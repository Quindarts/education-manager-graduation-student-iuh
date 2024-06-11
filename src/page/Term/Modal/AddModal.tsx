import Calendar from '@/components/ui/Calendar';
import CustomTextField from '@/components/ui/CustomTextField';
import Modal from '@/components/ui/Modal';
import TitleManager from '@/components/ui/Title';
import { useTerm } from '@/hooks/api/useQueryTerm';
import { TermDataRequest } from '@/services/apiTerm';
import { formatDates } from '@/utils/formatDate';
import { Icon } from '@iconify/react';
import { Box, Button, CircularProgress } from '@mui/material';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { validationTermSchema } from '../context';

function AddModal(props: any) {
  const { onClose, open } = props;
  const { onCreateTerm } = useTerm();
  const [clearedStartDate, setClearedStartDate] = useState<boolean>(false);

  const { mutate: createTerm, isLoading, isSuccess } = onCreateTerm();
  const handleSubmitTerm = (values: any) => {
    const data: TermDataRequest = {
      name: values.name,
      startDate: formatDates(values.startDate),
      endDate: formatDates(values.endDate),
    };
    createTerm(data);
  };
  useEffect(() => {
    onClose();
  }, [isSuccess]);
  return (
    <Modal open={open} onClose={onClose}>
      <Box p={10}>
        <TitleManager mb={10} variant='h4' textTransform={'uppercase'}>
          Tạo học kì mới
        </TitleManager>
        {isLoading ? (
          <Box height={300} my={'auto'} mx={'auto'}>
            <CircularProgress />
          </Box>
        ) : (
          <Formik
            validationSchema={validationTermSchema}
            onSubmit={(values, actions) => handleSubmitTerm(values)}
            initialValues={{
              name: '',
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
                      error={touched.endDate && errors.endDate ? true : false}
                      value={values.endDate}
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
