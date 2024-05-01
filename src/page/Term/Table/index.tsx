import Table from '@/components/ui/Table/Table';
import { Icon } from '@iconify/react';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React from 'react';

function TableManagamentTerm(props: any) {
  const { rows, totalItems, totalPages, page, handelChangePage, ...rest } = props;
  const basicColumns: GridColDef[] = [
    {
      headerName: 'Tên Học Kỳ',
      field: 'name',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      headerName: 'Niên khóa',
      field: 'name2',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      headerName: 'Ngày Bắt đầu',
      field: 'name3',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      headerName: 'Ngày Kết thúc ',
      field: 'name4',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      headerName: 'Đăng ký nhóm',
      field: 'name5',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      headerName: 'Đăng ký đề tài',
      field: 'name6',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      headerName: 'Công bố điểm',
      field: 'name7',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      headerName: 'Công bố kết quả',
      field: 'name8',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      headerName: '',
      field: 'name9',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) => (
        <Box display={'flex'} gap={6}>
          <Tooltip title='Chỉnh sửa thông tin học kì'>
            <IconButton color='primary'>
              <Icon icon='emojione:pencil' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Xem thông tin học kì'>
            <IconButton>
              <Icon icon='noto-v1:eye-in-speech-bubble' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Xóa học kì'>
            <IconButton>
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

export default TableManagamentTerm;
