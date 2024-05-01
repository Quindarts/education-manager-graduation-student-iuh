import Table from '@/components/ui/Table/Table';
import { Icon } from '@iconify/react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React from 'react';

function TableManagamentStudent(props: any) {
  const { rows, totalItems, totalPages, page, handelChangePage, ...rest } = props;
  const basicColumns: GridColDef[] = [
    {
      headerName: 'Thông tin chung',
      field: 'name',
      flex: 1.5,
      align: 'center',
      headerAlign: 'center',
    },
    {
      headerName: 'Email',
      field: 'name2',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      headerName: 'Giới tính',
      field: 'name3',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      headerName: 'Loại đào tạo',
      field: 'name4',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },

    {
      headerName: 'Chuyên ngành',
      field: 'name6',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      headerName: 'Trạng thái',
      field: 'name5',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      headerName: '',
      field: 'name8',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
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

export default TableManagamentStudent;
