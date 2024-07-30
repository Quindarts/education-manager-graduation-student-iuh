import Table from '@/components/ui/Table/Table';
import { Box, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useState } from 'react';

import dayjs from 'dayjs';

function TableManagementNotification(props: any) {
  const { rows, totalItems, totalPages, page, handelChangePage, ...rest } = props;

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
      field: 'created_at',
      flex: 0.8,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <>
            <Typography>{dayjs(params.row.created_at).format('DD/MM/YYYY hh:ss')}</Typography>
          </>
        );
      },
    },

    {
      headerName: 'Nội dung',
      field: 'message',
      flex: 5,
      headerAlign: 'center',
      align: 'left',
      renderCell(params) {
        return (
          <Box>
            <Typography
              variant='body1'
              color='initial'
              dangerouslySetInnerHTML={{ __html: params.row.message }}
            />
          </Box>
        );
      },
    },
    {
      headerName: '',
      field: 'name9',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) => (
        <Box display={'flex'} gap={6}>
          {/* <Tooltip title='Cập nhật thông báo'>
            <IconButton
              //   onClick={() => {
              //     handleOpenModalEditNotification(params.row.id);
              //   }}
              size='small'
            >
              <Icon icon='lucide:edit' />
            </IconButton>
          </Tooltip> */}
          {/* <Tooltip title='Xóa thông báo'>
            <IconButton
              //   onClick={() => {
              //     handleOpenModalDeleteNotification(params.row.id);
              //   }}
              size='small'
            >
              <Icon icon='ic:baseline-delete' />
            </IconButton>
          </Tooltip> */}
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
          bgcolor: 'white',
          // height: 500,
        }}
        rowHeight={200}
        columns={basicColumns}
        totalItems={1}
        totalPages={1}
        page={1}
        handleChangePage={() => {}}
        disableColumnMenu
        disableColumnFilter
        disableColumnSelector
      />
    </Box>
  );
}

export default TableManagementNotification;
