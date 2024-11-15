import Table from '@/components/ui/Table/Table';
import { getStatusGroup, getStatusStudentStyle } from '@/utils/validations/groupStudent.validation';
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
      flex: 0.6,
      align: 'center',
      headerAlign: 'center',
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
      headerName: 'Thành viên',
      field: 'groups',
      flex: 1.6,
      renderCell: (params) => {
        return (
          <Box py={2}>
            {params.row.members.map((mem) => (
              <Box mb={2} display={'flex'}>
                <Typography width={150} variant='body1' color='initial'>
                  {mem.fullName}
                </Typography>
                <Typography
                  sx={{
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                  }}
                  color={getStatusStudentStyle(mem.status)}
                  bgcolor={getStatusStudentStyle(mem.status)}
                  variant='body1'
                >
                  {getStatusGroup(mem.status)}
                </Typography>
              </Box>
            ))}
          </Box>
        );
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
          minHeight: 350,
        }}
        columns={basicColumns}
        rowHeight={80}
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
