import Table from '@/components/ui/Table/Table';
import { Icon } from '@iconify/react';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React from 'react';

function TableManagamentTopic(props: any) {
  const { rows, totalItems, totalPages, page, handelChangePage, ...rest } = props;
  const basicColumns: GridColDef[] = [
    {
      headerName: 'Tên Đề tài',
      field: 'name',
      flex: 1.5,
      headerAlign: 'center',
      align: 'center',
    },
    {
      headerName: 'Số lượng',
      field: 'name2',
      flex: 0.7,
      headerAlign: 'center',
      align: 'center',
    },
    {
      headerName: 'Mô tả',
      field: 'name3',
      flex: 1.5,
      headerAlign: 'center',
      align: 'center',
    },
    {
      headerName: 'Mục tiêu',
      field: 'name5',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      headerName: 'Chuẩn đầu ra',
      field: 'name6',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      headerName: 'Yêu cầu đầu vào',
      field: 'name7',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      headerName: 'Trạng thái',
      field: 'name9',
      flex: 0.7,
      headerAlign: 'center',
      align: 'center',
    },
    {
      headerName: '',
      field: 'name10',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) => (
        <Box display={'flex'} gap={2}>
          <Tooltip title='Chỉnh sửa thông tin đề tài'>
            <IconButton size='small' color='primary'>
              <Icon icon='emojione:pencil' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Xem thông tin đề tài'>
            <IconButton size='small'>
              <Icon icon='noto-v1:eye-in-speech-bubble' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Xóa đề tài'>
            <IconButton size='small'>
              <Icon color='#cc563d' icon='ri:delete-bin-2-fill' />
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
        rows={[
          {
            id: 1,
            name: 'a',
            name2: 'a',
            name3: 'a',
            name4: 'as',
            name5: '5',
            name6: '6',
            name7: '7',
            name8: '6',
          },
        ]}
        sx={{
          bgcolor: 'white',
        }}
        columns={basicColumns}
        totalItems={1}
        totalPages={1}
        page={1}
        handelChangePage={() => {}}
        disableColumnMenu
        disableColumnFilter
        disableColumnSelector
      />
    </Box>
  );
}

export default TableManagamentTopic;
