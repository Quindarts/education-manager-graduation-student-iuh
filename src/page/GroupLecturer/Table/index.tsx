import Table from '@/components/ui/Table/Table';
import { Icon } from '@iconify/react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React from 'react';

function TableManagamentGroupLecturer(props: any) {
  const { rows, totalItems, totalPages, page, handelChangePage, ...rest } = props;
  const basicColumns: GridColDef[] = [
    {
      headerName: 'Mã giảng viên',
      field: 'name',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      headerName: 'Tên giảng viên',
      field: 'name2',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      headerName: 'Cấp bậc',
      field: 'name3',
      width: 150,
      align: 'center',
    },
    {
      headerName: 'SĐT',
      field: 'name4',
      width: 150,
      align: 'center',
    },
    {
      headerName: 'Email',
      field: 'name5',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      headerName: 'Chuyên ngành',
      field: 'name6',
      width: 150,
      align: 'center',
    },
    {
      headerName: 'Giới tính',
      field: 'name7',
      width: 150,
      align: 'center',
    },
    {
      headerName: '',
      field: 'name8',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) => (
        <Box display={'flex'} gap={6}>
          <Tooltip title='Cập nhật mật khẩu'>
            <IconButton color='primary'>
              <Icon icon='emojione:pencil' />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];
  return (
    <Box>
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

export default TableManagamentGroupLecturer;
