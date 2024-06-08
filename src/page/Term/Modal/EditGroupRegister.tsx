import Calendar from '@/components/ui/Calendar';
import Modal from '@/components/ui/Modal';
import TitleManager from '@/components/ui/Title';
import { Icon } from '@iconify/react';
import { Box, Button, CircularProgress, Switch, Typography } from '@mui/material';
import { Formik } from 'formik';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { validationTermGroupSchema } from '../context';
import dayjs from 'dayjs';
import { useTerm } from '@/hooks/api/useQueryTerm';
import { TypeTermStatus } from '@/services/apiTerm';

function EditGroupRegister(props: any) {
  const { onClose, open, termId } = props;
  const { handleGetTermDetailWithType, onUpdateTermWithType } = useTerm();
  const {
    mutate: updateTerm,
    isLoading: loadingUpdate,
    isSuccess,
  } = onUpdateTermWithType(termId, TypeTermStatus.CHOOSE_GROUP);
  const { data, isLoading: loadingDetail } = handleGetTermDetailWithType(
    termId,
    TypeTermStatus.CHOOSE_GROUP,
  );

  const [isCheckedOpenGroup, setCheckedOpenGroup] = useState(true);
  const [endDate, setEndDate] = useState<any | null>(null);
  const [startDate, setStartDate] = useState<any | null>(null);

  const handleChangeStatusGroupRegister = () => {
    setCheckedOpenGroup(!isCheckedOpenGroup);
  };
  useLayoutEffect(() => {
    setStartDate(dayjs(data?.termDetail.startDate));
    setEndDate(dayjs(data?.termDetail.endDate));
  }, [loadingDetail, termId]);

  useEffect(() => {
    if (isCheckedOpenGroup === false && endDate !== null && endDate >= new Date()) {
      setEndDate(dayjs());
    }
  }, [isCheckedOpenGroup, endDate]);

  const handleSubmit = (data: any) => {
    updateTerm(data);
    if (isSuccess) {
      onClose();
    }
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box px={10}>
        <TitleManager mb={10} mt={4}>
          Cập nhật thông tin đăng kí nhóm
        </TitleManager>
        {loadingDetail ? (
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
              startDate: startDate,
              endDate: endDate,
            }}
          >
            {({ values, handleSubmit, touched, errors, setFieldValue }) => (
              <form onSubmit={handleSubmit}>
                <Box gap={10} display={'flex'} mt={6}>
                  <Box flex={1}>
                    <Calendar
                      onChange={(value) => {
                        setStartDate(value);
                        setFieldValue('startDate', value);
                      }}
                      sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
                      label='Ngày bắt đầu'
                      name='startDate'
                      format='DD/MM/YYYY'
                      value={values.startDate}
                      disabled={!isCheckedOpenGroup}
                      error={ errors.startDate ? true : false}
                    />
                  </Box>
                  <Box flex={1}>
                    <Calendar
                      onChange={(value) => {
                        setFieldValue('endDate', value);
                        setEndDate(value);
                      }}
                      sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
                      label='Ngày kết thúc'
                      name='endDate'
                      format='DD/MM/YYYY'
                      value={values.endDate}
                      disabled={!isCheckedOpenGroup}
                      error={errors.endDate ? true : false}
                    />
                  </Box>
                </Box>
                {startDate <= dayjs() ? (
                  <Box mt={6}>
                    <Typography variant='h6' fontWeight={'bold'} color='primary.dark'>
                      Trạng thái đăng kí nhóm
                    </Typography>
                    <Switch
                      onChange={handleChangeStatusGroupRegister}
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
                      {startDate.locale('vi').format('DD/MM/YYYY')}
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
