import Table from '@/components/ui/Table/Table';
import { Box, Button } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React from 'react';

function TableManagamentTerm(props: any) {
  const { rows, columns, totalItems, totalPages, page, handelChangePage, ...rest } = props;
  const basicColumns: GridColDef[] = [
    {
      headerName: 'Tên Học Kỳ',
      field: 'name',
      width: 150,
      sortable: false,
      align: 'center',
    },
    {
      headerName: 'Niên khóa',
      field: 'headName',
      width: 150,
      sortable: false,
      align: 'center',
    },
    {
      headerName: 'Ngày Bắt đầu',
      field: 'id',
      width: 150,
      sortable: false,
      align: 'center',
    },
    {
      headerName: 'Ngày Kết thúc ',
      field: 'id',
      width: 150,
      sortable: false,
      align: 'center',
    },
    {
      headerName: 'Đăng ký nhóm',
      field: 'id',
      width: 150,
      sortable: false,
      align: 'center',
    },
    {
      headerName: 'Đăng ký đề tài',
      field: 'id',
      width: 150,
      sortable: false,
      align: 'center',
    },
    {
      headerName: 'Công bố điểm',
      field: 'c',
      width: 150,
      sortable: false,
      align: 'center',
    },
    {
      headerName: 'Công bố kết quả',
      field: 'dsa',
      width: 150,
      sortable: false,
      align: 'center',
    },
  ];
  return (
    <Box {...rest}>
      {' '}
      <Table
        rows={[]}
        columns={basicColumns}
        totalItems={1}
        totalPages={1}
        page={1}
        
        handelChangePage={() => {}}
      />
    </Box>
  );
}

export default TableManagamentTerm;
