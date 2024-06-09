import Table from '@/components/ui/Table/Table';
import { Icon } from '@iconify/react';
import { Box, Chip, IconButton, Tooltip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function TableManagamentGroupStudent(props: any) {
  const { rows, totalItems, totalPages, page, handelChangePage, ...rest } = props;
  const navigate = useNavigate();
  const basicColumns: GridColDef[] = [
    {
      headerName: 'STT',
      field: 'ddd',
      flex: 0.5,
      align: 'center',
      headerAlign: 'center',
    },
    {
      headerName: 'Tên nhóm',
      field: 'name',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      headerName: 'Tên Đề tài',
      field: 'name6',
      flex: 2,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: any) => {
        return (
          <Typography>{params.row.topic_id ? params.row.topic_id : 'Chưa có đề tài'}</Typography>
        );
      },
    },
    {
      headerName: 'Số lượng thành viên',
      field: 'name4',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: any) => {
        return <Typography>0/2</Typography>;
      },
    },
    {
      headerName: 'Trạng thái nhóm',
      field: 'status',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: any) => {
        return <Chip color='success' sx={{ color: 'white' }} label={params.row.status} />;
      },
    },
    {
      headerName: '',
      field: 'name8',
      flex: 0.5,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: any) => (
        <Box display={'flex'} gap={6}>
          <Tooltip title='Chi tiết'>
            <IconButton
              color='primary'
              onClick={() => navigate(`/group-student/detail/${params.row.id}`)}
            >
              <Icon icon='majesticons:checkbox-list-detail' />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];
  return (
    <Box>
      <Table
        rows={rows}
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

export default TableManagamentGroupStudent;
