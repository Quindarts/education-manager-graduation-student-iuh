import Modal from '@/components/ui/Modal';
import TitleManager from '@/components/ui/Title';
import { Icon } from '@iconify/react';
import { Box, Button, CircularProgress, Switch, Typography } from '@mui/material';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { validationTermGroupSchema } from '../context';
import dayjs from 'dayjs';
import { useTerm } from '@/hooks/api/useQueryTerm';
import { TypeTermStatus } from '@/services/apiTerm';
import DateTimeCalendar from '@/components/ui/Calendar/DateTimeCalendar';

function EditGroupRegister(props: any) {
  const { onClose, open, termId } = props;
  const { handleGetTermDetailWithType, onUpdateTermWithType } = useTerm();
  const {
    mutate: updateTerm,
    isLoading: loadingUpdate,
    isSuccess,
  } = onUpdateTermWithType(termId, TypeTermStatus.CHOOSE_GROUP);

  const {
    data,
    isLoading: loadingDetail,
    isSuccess: successDetail,
    isFetching,
  } = handleGetTermDetailWithType(termId, TypeTermStatus.CHOOSE_GROUP);
  const [isCheckedOpenGroup, setCheckedOpenGroup] = useState(true);

  const handleChangeStatusGroupRegister = () => {
    setCheckedOpenGroup(!isCheckedOpenGroup);
  };

  const handleSubmit = (data: any) => {
    updateTerm(data);
  };
  useEffect(() => {
    onClose();
  }, [isSuccess]);
  useEffect(() => {
    if (data?.termDetail) {
      var checked: boolean = dayjs(data?.termDetail.endDate) <= dayjs() ? false : true;
      setCheckedOpenGroup(checked);
    }
  }, [successDetail, isFetching]);
  return (
    <Modal open={open} onClose={onClose}>
      <Box px={10}>
        <TitleManager mb={10} mt={4}>
          Cập nhật trạng thái đăng kí nhóm
        </TitleManager>
        {loadingDetail || isFetching ? (
          <Box
            justifyContent={'center'}
            display={'flex'}
            alignItems={'center'}
            width={'100%'}
            height={200}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Formik
            key={termId}
            onSubmit={(values) => handleSubmit(values)}
            validationSchema={validationTermGroupSchema}
            initialValues={{
              startDate: data?.termDetail.startDate ? dayjs(data?.termDetail.startDate) : null,
              endDate: data?.termDetail.endDate ? dayjs(data?.termDetail.endDate) : null,
            }}
          >
            {({ touched, values, handleSubmit, errors, setFieldValue }) => (
              <form onSubmit={handleSubmit}>
                <Box gap={10} display={'flex'} mt={6}>
                  <Box flex={1}>
                    <DateTimeCalendar
                      onChange={(value) => {
                        setFieldValue('startDate', value);
                      }}
                      sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
                      label='Ngày bắt đầu'
                      name='startDate'
                      format='DD/MM/YYYY hh:mm:ss A'
                      value={values.startDate}
                      disabled={isCheckedOpenGroup === false && dayjs(values.startDate) <= dayjs()}
                      error={touched.startDate && errors.startDate ? true : false}
                    />
                  </Box>
                  <Box flex={1}>
                    <DateTimeCalendar
                      onChange={(value) => {
                        setFieldValue('endDate', value);
                      }}
                      sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
                      label='Ngày kết thúc'
                      name='endDate'
                      format='DD/MM/YYYY hh:mm:ss A'
                      value={values.endDate}
                      disabled={isCheckedOpenGroup === false && dayjs(values.startDate) <= dayjs()}
                      error={touched.endDate && errors.endDate ? true : false}
                    />
                  </Box>
                </Box>
                {dayjs(values.startDate) <= dayjs() ? (
                  <Box mt={6}>
                    <Typography variant='h6' fontWeight={'bold'} color='primary.dark'>
                      Trạng thái đăng kí nhóm
                    </Typography>
                    <Switch
                      onChange={() => {
                        handleChangeStatusGroupRegister();
                        setFieldValue('endDate', dayjs());
                      }}
                      checked={isCheckedOpenGroup}
                      color='success'
                    />
                    <Typography
                      component={'span'}
                      variant='h6'
                      color={isCheckedOpenGroup ? 'primary' : 'error'}
                    >
                      {isCheckedOpenGroup ? 'Đang mở đăng kí nhóm' : 'Đã đóng đăng kí nhóm'}
                    </Typography>
                  </Box>
                ) : (
                  <Box mt={10}>
                    <Typography variant='h6' fontWeight={'bold'} color='primary.dark'>
                      Trạng thái đăng kí nhóm :
                    </Typography>
                    <Typography variant='body1'>
                      Chưa đến ngày mở đăng kí nhóm, bắt đầu mở từ ngày:{' '}
                      {dayjs(values.startDate).format('DD/MM/YYYY hh:mm:ss A')}
                    </Typography>
                  </Box>
                )}
                <Box mt={20} mb={6} justifyContent={'end'} gap={8} display={'flex'}>
                  <Button variant='contained' color='primary' onClick={onClose}>
                    <Icon width={20} style={{ marginRight: 4 }} icon='mdi:cancel-outline' />
                    Hủy
                  </Button>
                  <Button variant='contained' color='success' type='submit'>
                    <Icon icon='material-symbols:save-outline' />
                    Lưu thông tin
                    {loadingUpdate && (
                      <CircularProgress
                        size={'small'}
                        sx={{ width: 20, height: 20, color: 'white' }}
                      />
                    )}
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

export default EditGroupRegister;
