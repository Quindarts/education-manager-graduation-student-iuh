import Table from '@/components/ui/Table/Table';
import { Box, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function TableDetailGroupStudentOfLecturer(props: any) {
  const { rows, totalItems, totalPages, page, handelChangePage, ...rest } = props;
  const navigate = useNavigate();
  const basicColumns: GridColDef[] = [
    {
      headerName: 'Mã nhóm',
      field: 'name',
      flex: 0.4,
      align: 'right',
      headerAlign: 'right',
    },
    {
      headerName: 'Tên Đề tài',
      field: 'name6',
      flex: 3,
      renderCell: (params: any) => {
        return (
          <Typography>{params.row.topicName ? params.row.topicName : 'Chưa có đề tài'}</Typography>
        );
      },
    },
    {
      headerName: 'Số lượng thành viên',
      field: 'name4',
      flex: 1,
      align: 'right',
      headerAlign: 'right',
      renderCell: (params: any) => {
        return <Typography>{params.row.numOfMembers}</Typography>;
      },
    },
    {
      headerName: 'Chức năng',
      field: 'name2',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: any) => {
        return (
          <Typography
            sx={{
              '&:hover': {
                color: 'primary.dark',
                cursor: 'pointer',
              },
            }}
            onClick={() => navigate(`/group-students/detail/${params.row.id}`)}
          >
            Xem chi tiết
          </Typography>
        );
      },
    },
  ];
  return (
    <Box>
      <Table
        rows={rows}
        sx={{
          bgcolor: 'white',
          minHeight:350
        }}
        columns={basicColumns}
        totalItems={1}
        totalPages={1}
        page={1}
        handleChangePage={() => {}}
        disableColumnMenu
        disableDensitySelector
        disableColumnFilter
        disableColumnSelector
      />
    </Box>
  );
}

export default TableDetailGroupStudentOfLecturer;
