import CustomTextField from '@/components/ui/CustomTextField';
import Modal from '@/components/ui/Modal';
import SekeletonUI from '@/components/ui/Sekeleton';
import TitleManager from '@/components/ui/Title';
import { useNotification } from '@/hooks/api/useQueryNotification';
import { checkUser } from '@/utils/validations/auth.validation';
import { Icon } from '@iconify/react';
import { Box, Button, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

function InfoNotificationModal(props: any) {
  const { open, onClose, notifyId } = props;
  const { handleGetNotificationById } = useNotification();
  const { data, isLoading } = handleGetNotificationById(notifyId);
  return (
    <Modal maxWidth='md' onClose={onClose} open={open}>
      <Box p={10}>
        <TitleManager mb={10} variant='h6' textTransform={'uppercase'}>
          Chi tiết thông báo
        </TitleManager>
        {isLoading ? (
          <SekeletonUI />
        ) : (
          <Box>
            <Box display={'flex'} width={'100%'} gap={8}>
              <Box flex={1}>
                <CustomTextField
                  sx={{ flex: 1 }}
                  label='Ngày tạo thông báo'
                  value={dayjs(data?.notification?.createdAt).format('DD/MM/YYYY')}
                  placeholder='ngày tạo'
                  disabled
                />
              </Box>
              <Box flex={5}>
                <CustomTextField
                  label='Tiêu đề '
                  value={data?.notification?.title}
                  placeholder='Tiêu đề '
                  disabled
                />
              </Box>
            </Box>
            <Box>
              {data?.details?.length > 0 ? (
                <Box>
                  <Box justifyContent={'space-between'} display={'flex'}> 
                    <Typography variant='h6' fontWeight={'bold'} color='grey.800'>
                      {checkUser(data?.notification?.type)} nhận thông báo
                    </Typography>
                    <Typography variant='h6' color='grey.700'>
                      Số người nhận: {data?.details.length}
                    </Typography>
                  </Box>

                  <Box
                    border={'1px solid #d9d9d9'}
                    sx={{ height: 300, overflowY: 'auto' }}
                    px={10}
                    py={4}
                  >
                    {data?.details.map((user: any) => (
                      <Box gap={10} mb={2} display={'flex'}>
                        <Typography variant='h6' color='primary.dark'>
                          Mã số : {user.username}
                        </Typography>
                        <Typography variant='h6' color='primary.dark'>
                          Họ và tên: {user.full_name}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              ) : (
                <CustomTextField
                  label='Người nhận thông báo'
                  value={checkUser(data?.notification?.type)}
                  placeholder='Người nhận'
                  disabled
                />
              )}
              <Typography mt={4} variant='body1' mb={2} fontWeight={'700'} color='initial'>
                Nội dung thông báo
              </Typography>
              <Box py={4} px={10} border={'1px solid #cecece'}>
                <Typography dangerouslySetInnerHTML={{ __html: data?.notification?.content }} />
              </Box>
            </Box>
            <Box mt={10} justifyContent={'end'} gap={8} display={'flex'}>
              <Button variant='contained' color='primary' onClick={onClose}>
                <Icon icon='mdi:close-outline' />
                Thoát
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
  );
}

export default InfoNotificationModal;
