import Table from '@/components/ui/Table/Table';
import { Icon } from '@iconify/react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useState } from 'react';

import dayjs from 'dayjs';
import EditInfoMajorModal from '../Modal/EditInfoModal';
import DeleteMajorModal from '../Modal/DeleteModal';

function TableManagementMajor(props: any) {
  const { rows, totalItems, totalPages, page, handelChangePage, ...rest } = props;

  //Handle
  const [openModalEditMajor, setOpenModalEditMajor] = useState({
    isOpen: false,
    majorId: 0,
  });

  const handleCloseModalEditMajor = () => {
    setOpenModalEditMajor({
      ...openModalEditMajor,
      isOpen: false,
    });
  };

  const handleOpenModalEditMajor = (majorId: any) => {
    setOpenModalEditMajor({
      majorId,
      isOpen: true,
    });
  };

  const [openModalDeleteMajor, setOpenModalDeleteMajor] = useState({
    isOpen: false,
    majorId: 0,
  });
  const handleCloseModalDeleteMajor = () => {
    setOpenModalDeleteMajor({
      ...openModalDeleteMajor,
      isOpen: false,
    });
  };

  const handleOpenModalDeleteMajor = (majorId: any) => {
    setOpenModalDeleteMajor({
      majorId,
      isOpen: true,
    });
  };
  const basicColumns: GridColDef[] = [
    {
      headerName: 'Tên Chuyên ngành',
      field: 'name',
      flex: 1.4,
      headerAlign: 'center',
      align: 'center',
    },
    {
      headerName: 'Ngày Tạo',
      field: 'startDate',
      flex: 2,
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
      headerName: '',
      field: 'name9',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) => (
        <Box display={'flex'} gap={6}>
          <Tooltip title='Cập nhật thông tin chuyên ngành'>
            <IconButton
              onClick={() => {
                handleOpenModalEditMajor(params.row.id);
              }}
              size='small'
            >
              <Icon icon='lucide:edit' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Xóa chuyên ngành'>
            <IconButton
              onClick={() => {
                handleOpenModalDeleteMajor(params.row.id);
              }}
              size='small'
            >
              <Icon icon='ic:baseline-delete' />
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
          bgcolor: 'white',
          height: 500,
        }}
        columns={basicColumns}
        totalItems={1}
        totalPages={1}
        page={1}
        handleChangePage={() => {}}
        disableColumnMenu
        disableColumnFilter
        disableColumnSelector
      />
      <EditInfoMajorModal
        onClose={handleCloseModalEditMajor}
        open={openModalEditMajor.isOpen}
        majorId={openModalEditMajor.majorId}
      />
      <DeleteMajorModal
        onClose={handleCloseModalDeleteMajor}
        open={openModalDeleteMajor.isOpen}
        majorId={openModalDeleteMajor.majorId}
      />
    </Box>
  );
}

export default TableManagementMajor;
