import Table from '@/components/ui/Table/Table';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useState } from 'react';

import dayjs from 'dayjs';
import { CustomToolbar } from './custom';
import { Icon } from '@iconify/react';
import DeleteNotificationModal from '../Modal/DeleteModal';
import InfoNotificationModal from '../Modal/InfoModal';
import { checkUser } from '@/utils/validations/auth.validation';

function TableManagementNotification(props: any) {
  const { rows, totalItems, limit, totalPage, page, handleChangePage, handleChangeLimit, ...rest } =
    props;
  //Handle
  const [openModalEditNotification, setOpenModalEditNotification] = useState({
    isOpen: false,
    notificationId: 0,
  });
  const handleCloseModalEditNotification = () => {
    setOpenModalEditNotification({
      ...openModalEditNotification,
      isOpen: false,
    });
  };
  const handleOpenModalEditNotification = (notificationId: any) => {
    setOpenModalEditNotification({
      notificationId,
      isOpen: true,
    });
  };

  const [openModalInfoNotification, setOpenModalInfoNotification] = useState({
    isOpen: false,
    notificationId: 0,
  });
  const handleCloseModalInfoNotification = () => {
    setOpenModalInfoNotification({
      ...openModalInfoNotification,
      isOpen: false,
    });
  };

  const handleOpenModalInfoNotification = (notificationId: any) => {
    setOpenModalInfoNotification({
      notificationId,
      isOpen: true,
    });
  };

  const [openModalDeleteNotification, setOpenModalDeleteNotification] = useState({
    isOpen: false,
    notificationId: 0,
  });
  const handleCloseModalDeleteNotification = () => {
    setOpenModalDeleteNotification({
      ...openModalDeleteNotification,
      isOpen: false,
    });
  };

  const handleOpenModalDeleteNotification = (notificationId: any) => {
    setOpenModalDeleteNotification({
      notificationId,
      isOpen: true,
    });
  };

  const basicColumns: GridColDef[] = [
    {
      headerName: 'Ngày Tạo',
      field: 'createdAt',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <>
            <Typography>{dayjs(params.row.created_at).format('DD/MM/YYYY')}</Typography>
          </>
        );
      },
    },

    {
      headerName: 'Tiêu đề thông báo',
      field: 'title',
      flex: 5,
      headerAlign: 'center',
      align: 'left',
      renderCell(params) {
        return (
          <Box>
            <Typography
              variant='body1'
              fontWeight={'bold'}
              color='initial'
              dangerouslySetInnerHTML={{ __html: params.row.title }}
            />
          </Box>
        );
      },
    },
    {
      headerName: 'Người gửi',
      field: 'senderName',
      flex: 1.5,
      headerAlign: 'center',
      align: 'left',
      renderCell: (params) => {
        return (
          <>
            <Typography color={'grey.900'}>{params.value}</Typography>
          </>
        );
      },
    },
    {
      headerName: 'Người nhận',
      field: 'type',
      flex: 1,
      headerAlign: 'center',
      align: 'left',
      renderCell(params) {
        return (
          <Box>
            <Typography variant='body1' color='initial'>
              {checkUser(params.row.type)}
            </Typography>
          </Box>
        );
      },
    },
    {
      headerName: 'Chức năng',
      field: 'name9',
      flex: 1.2,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) => (
        <Box display={'flex'} gap={6}>
          <Tooltip
            onClick={() => handleOpenModalInfoNotification(params.row.id)}
            title='Xem chi tiết'
          >
            <IconButton size='large'>
              <Icon width={20} icon='flat-color-icons:view-details' />
            </IconButton>
          </Tooltip>
          <Tooltip
            onClick={() => handleOpenModalDeleteNotification(params.row.id)}
            title='Xóa thông báo'
          >
            <IconButton size='large'>
              <Icon width={20} icon='carbon:close-filled' style={{ color: ' #f2365b' }} />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];
  return (
    <Box {...rest}>
      {' '}
      <Table
        rows={rows}
        sx={{
          minHeight: 500,
        }}
        slots={{
          toolbar: CustomToolbar,
        }}
        rowHeight={80}
        columns={basicColumns}
        totalItems={rows.length}
        totalPages={totalPage}
        page={page}
        limit={limit}
        isLimit={true}
        handleChangeLimit={handleChangeLimit}
        handleChangePage={handleChangePage}
        disableColumnFilter
      />
      <>
        <DeleteNotificationModal
          open={openModalDeleteNotification.isOpen}
          onClose={handleCloseModalDeleteNotification}
          notifyId={openModalDeleteNotification.notificationId}
        />
        <InfoNotificationModal
          open={openModalInfoNotification.isOpen}
          onClose={handleCloseModalInfoNotification}
          notifyId={openModalInfoNotification.notificationId}
        />
      </>
    </Box>
  );
}

export default TableManagementNotification;
