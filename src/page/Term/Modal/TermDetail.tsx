import Calendar from '@/components/ui/Calendar';
import CustomTextField from '@/components/ui/CustomTextField';
import Modal from '@/components/ui/Modal';
import SekeletonUI from '@/components/ui/Sekeleton';
import TitleManager from '@/components/ui/Title';
import { useTerm } from '@/hooks/api/useQueryTerm';
import { Icon } from '@iconify/react';
import { Box, Button, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { Formik } from 'formik';
import React from 'react';

function TermDetail(props: any) {
  const { onClose, open, termId } = props;
  const { handelGetTermById } = useTerm();
  const { data, isLoading, isFetching } = handelGetTermById(termId);
  return (
    <Modal open={open} onClose={onClose}>
      <Box pb={5} px={10}>
        <TitleManager
          mb={10}
          variant='h6'
          icon='ant-design:field-time-outlined'
          textTransform={'uppercase'}
        >
          Thông tin chi tiết Học kì
        </TitleManager>
        {isLoading || isFetching ? (
          <SekeletonUI />
        ) : (
          <Formik
            onSubmit={() => {}}
            initialValues={{
              name: `${data?.term ? data?.term?.name : ''}`,
              startDate: data?.term?.startDate,
              endDate: data?.term?.endDate,
              startChooseGroupDate: data?.term?.startChooseGroupDate,
              endChooseGroupDate: data?.term?.endChooseGroupDate,
              startChooseTopicDate: data?.term?.startChooseTopicDate,
              endChooseTopicDate: data?.term?.endChooseTopicDate,
              startDiscussionDate: data?.term?.endChooseTopicDate,
              endDiscussionDate: data?.term?.endDiscussionDate,
              startReportDate: data?.term?.startReportDate,
              endReportDate: data?.term?.endReportDate,
              startPublicResultDate: data?.term?.startPublicResultDate,
              endPublicResultDate: data?.term?.endPublicResultDate,
              startPublicTopicDate: data?.term.startPublicTopicDate,
              endPublicTopicDate: data?.term.endPublicTopicDate,
            }}
          >
            {({ values, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <CustomTextField label='Tên học kì' value={values.name} placeholder='Tên học kì' />
                <Box display={'flex'} gap={8}>
                  <Calendar
                    sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
                    label='Ngày bắt đầu'
                    value={dayjs(values.startDate)}
                  />
                  <Calendar
                    sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
                    label='Ngày kết thúc'
                    value={dayjs(values.endDate)}
                  />
                </Box>

                <Box my={8} borderRadius={2} p={6} bgcolor={'grey.100'}>
                  <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography variant='h5' fontWeight={'bold'}>
                      Đăng ký Nhóm
                    </Typography>
                  </Box>
                  <Box display={'flex'} gap={8}>
                    <Calendar
                      sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
                      label='Ngày mở đăng ký Nhóm'
                      value={dayjs(values.startChooseGroupDate)}
                    />
                    <Calendar
                      sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
                      label='Ngày đóng đăng ký Nhóm'
                      value={dayjs(values.endChooseGroupDate)}
                    />
                  </Box>
                </Box>
                <Box my={8} borderRadius={2} p={6} bgcolor={'grey.100'}>
                  <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography variant='h5' fontWeight={'bold'}>
                      Xem Đề tài
                    </Typography>
                  </Box>
                  <Box display={'flex'} gap={8}>
                    <Calendar
                      sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
                      label='Ngày mở xem Đề tài'
                      value={dayjs(values.startPublicTopicDate)}
                    />
                    <Calendar
                      sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
                      label='Ngày đóng xem Đề tài'
                      value={dayjs(values.endPublicTopicDate)}
                    />
                  </Box>
                </Box>
                <Box my={8} borderRadius={2} p={6} bgcolor={'grey.100'}>
                  <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography variant='h5' fontWeight={'bold'}>
                      Đăng ký Đề tài
                    </Typography>
                  </Box>
                  <Box display={'flex'} gap={8}>
                    <Calendar
                      sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
                      label='Ngày mở đăng ký Đề tài'
                      value={dayjs(values.startChooseTopicDate)}
                    />
                    <Calendar
                      sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
                      label='Ngày đóng đăng ký Đề tài'
                      value={dayjs(values.endChooseTopicDate)}
                    />
                  </Box>
                </Box>
                <Box my={8} borderRadius={2} p={6} bgcolor={'grey.100'}>
                  <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography variant='h5' fontWeight={'bold'}>
                      Phản biện
                    </Typography>
                  </Box>
                  <Box display={'flex'} gap={8}>
                    <Calendar
                      sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
                      label='Ngày mở phản biện'
                      value={dayjs(values.startChooseTopicDate)}
                    />
                    <Calendar
                      sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
                      label='Ngày đóng phản biện'
                      value={dayjs(values.endChooseTopicDate)}
                    />
                  </Box>
                </Box>
                <Box my={8} borderRadius={2} p={6} bgcolor={'grey.100'}>
                  <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography variant='h5' fontWeight={'bold'}>
                      Báo cáo đề tài
                    </Typography>
                  </Box>
                  <Box display={'flex'} gap={8}>
                    <Calendar
                      sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
                      label='Ngày mở báo cáo đề tài'
                      value={dayjs(values.startChooseTopicDate)}
                    />
                    <Calendar
                      sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
                      label='Ngày đóng báo cáo đề tài'
                      value={dayjs(values.endChooseTopicDate)}
                    />
                  </Box>
                </Box>
                <Box my={8} borderRadius={2} p={6} bgcolor={'grey.100'}>
                  <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography variant='h5' fontWeight={'bold'}>
                      Công bố kết quả
                    </Typography>
                  </Box>
                  <Box display={'flex'} gap={8}>
                    <Calendar
                      sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
                      label='Ngày mở Công bố kết quả'
                      value={dayjs(values.startPublicResultDate)}
                    />
                    <Calendar
                      sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
                      label='Ngày đóng Công bố kết quả'
                      value={dayjs(values.endPublicResultDate)}
                    />
                  </Box>
                </Box>
                <Box mt={10} justifyContent={'end'} gap={4} display={'flex'}>
                  <Button variant='contained' color='primary' onClick={onClose}>
                    <Icon icon='mdi:close-outline' />
                    Thoát
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

export default TermDetail;
