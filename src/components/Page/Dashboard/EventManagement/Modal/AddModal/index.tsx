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

function AddModal(props: any) {
  const { onClose, open } = props;
  const { onCreateEvent } = useEvent();
  const { mutate: createEvent, isLoading, isSuccess } = onCreateEvent();
  const { handleGetMyGroupSupport } = useGroupSupport();
  const {
    data: groupFetch,
    isLoading: loadingGr,
    isSuccess: successFetch,
  } = handleGetMyGroupSupport();
  const [keywords, setKeywords] = useState('');
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    if (successFetch) {
      setGroups(groupFetch?.groupStudents?.map((gr: any) => ({ ...gr, checked: true })));
    }
  }, [successFetch]);
  useEffect(() => {
    onClose();
  }, [isSuccess]);

  //TODO handle event
  const changeSearch = (s: string) => {
    setKeywords(s);
  };
  const handleSubmit = (values: any) => {
    createEvent({
      name: values.name,
      startDate: values.startDate,
      endDate: values.endDate,
      groupStudentIds: groups.filter((gr) => gr.checked === true).map((gr) => gr.groupStudentId),
    });
  };
  const onToggleCheckbox = (id: string) => {
    let arr = groups?.map((gr: any) => {
      if (gr.groupStudentId === id) {
        let obj = { ...gr, checked: !gr.checked };
        return obj;
      } else return gr;
    });
    setGroups(arr);
  };

  return (
    <Modal maxWidth={'md'} open={open} onClose={onClose}>
      <Box pb={6} px={10}>
        <TitleManager
          mb={4}
          variant='h6'
          icon='ant-design:field-time-outlined'
          textTransform={'uppercase'}
        >
          Tạo sự kiện
        </TitleManager>
        {loadingGr ? (
          <Box height={300} my={'auto'} mx={'auto'}>
            <CircularProgress />
          </Box>
        ) : (
          <Formik
            validationSchema={validationEventSchema}
            onSubmit={(values) => handleSubmit(values)}
            initialValues={{
              name: '',
              endDate: null,
              startDate: null,
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
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.name && errors.name ? true : false}
                      helperText={errors.name}
                      name='name'
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
                  {isLoading ? (
                    <SekeletonUI />
                  ) : (
                    <Box>
                      <Typography variant='h6' mb={2} fontWeight={'bold'} color='grey.700'>
                        Nhóm hướng dẫn
                      </Typography>
                      <SearchInput
                        changeSearch={changeSearch}
                        keywords={keywords}
                        sx={{ mb: 6, mt: 4 }}
                      />
                      <Box display={'flex'} mx={10} flexWrap={'wrap'} gap={6}>
                        {handleSearch(groups, 'topicName', keywords)?.map((gr: any) => (
                          <Box
                            sx={{
                              bgcolor: 'grey.100',
                              py: 1,
                              px: 2,
                              width: 'calc(50% - 6px)',
                              borderRadius: 1,
                              display: 'flex',
                              gap: 2,
                              alignItems: 'center',
                            }}
                          >
                            <Checkbox
                              color='success'
                              onChange={() => onToggleCheckbox(gr.groupStudentId)}
                              checked={gr?.checked}
                            />
                            <Box>
                              <Typography variant='body1'>
                                Nhóm {gr?.groupStudentName} - {gr.topicName}
                              </Typography>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                      <Box>
                        <Button
                          onClick={() => {
                            setGroups((pre) => pre.map((l) => ({ ...l, checked: true })));
                          }}
                        >
                          Chọn tất cả
                        </Button>
                        {groups?.filter((gr) => gr.checked).length > 0 && (
                          <Button
                            color='error'
                            onClick={() => {
                              setGroups((pre) => pre.map((gr) => ({ ...gr, checked: false })));
                            }}
                          >
                            X Bỏ chọn
                          </Button>
                        )}
                        <Typography mt={2} mb={2} variant='body1'>
                          Đã chọn : {groups?.filter((gr) => gr.checked).length} nhom
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Box>
                <Box justifyContent={'end'} gap={4} display={'flex'}>
                  <Button variant='contained' color='primary' onClick={onClose}>
                    <Icon width={20} icon='mdi:close-outline' />
                    Hủy
                  </Button>
                  <Button variant='contained' color='success' type='submit'>
                    <Icon width={20} icon='material-symbols:save-outline' />
                    Lưu
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

export default React.memo(AddModal);
