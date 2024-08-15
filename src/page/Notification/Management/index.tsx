import TitleManager from '@/components/ui/Title';
import { Box, Button, Paper } from '@mui/material';
import React, { useState } from 'react';
import TableManagementNotification from './Table';
import { Icon } from '@iconify/react';
import AddNotificationModal from './Modal/AddModal';
import { useNotification } from '@/hooks/api/useQueryNotification';
import SekeletonUI from '@/components/ui/Sekeleton';

function NotificationManagementPage() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };
  const handleCloseModal = () => {
    setOpenAddModal(false);
  };
  const { handleGetMyNotification } = useNotification();
  const { data, isFetching, isLoading } = handleGetMyNotification();
  return (
    <>
      <Paper sx={{ py: 10, px: 10 }} elevation={1}>
        <Box display={'flex'} justifyContent={'space-between'}>
          <TitleManager icon='basil:notification-on-outline' mb={4} mt={2}>
            Danh sách thông báo
          </TitleManager>
          <Button onClick={handleOpenAddModal} color='error' variant='contained' size='small'>
            <Icon width={16} icon='material-symbols:add' />
            Thêm thông báo mới{' '}
          </Button>
        </Box>
        {isLoading || isFetching ? (
          <SekeletonUI />
        ) : (
          <Box width={'full'} my={4}>
            <TableManagementNotification rows={data?.notifications} />
          </Box>
        )}  
        <>
          <AddNotificationModal open={openAddModal} onClose={handleCloseModal} />
        </>
      </Paper>
    </>
  );
}

export default NotificationManagementPage;
