import Table from '@/components/ui/Table/Table';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useState } from 'react';

import dayjs from 'dayjs';
import { CustomToolbar } from './custom';
import { Icon } from '@iconify/react';

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
      headerName: 'Người tạo',
      field: 'senderName',
      flex: 1,
      headerAlign: 'center',
      align: 'left',
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
              color='initial'
              dangerouslySetInnerHTML={{ __html: params.row.title }}
            />
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
          <Tooltip title='Xem chi tiết'>
            <IconButton size='large'>
              <Icon width={26} icon='flat-color-icons:view-details' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Xóa thông báo'>
            <IconButton size='large'>
              <Icon width={26} icon='carbon:close-filled' style={{ color: ' #f2365b' }} />
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
      
      </>
    </Box>
  );
}

export default TableManagementNotification;
