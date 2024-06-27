import Table from '@/components/ui/Table/Table';
import { Icon } from '@iconify/react';
import { Box, Chip, IconButton, Tooltip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function TableManagamentGroupLecturer(props: any) {
  const { rows, totalItems, totalPages, page, handelChangePage, ...rest } = props;
  const navigate = useNavigate();
  const basicColumns: GridColDef[] = [
    {
      headerName: 'Tên nhóm',
      field: 'name',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (cell: any) => {
        return (
          <Box>
            <Typography variant='body1' fontWeight={'bold'} color='primary.main'>
              Nhóm giảng viên phản biện 1
            </Typography>
          </Box>
        );
      },
    },
    {
      headerName: 'Loại nhóm',
      field: 'name2',
      headerAlign: 'center',
      flex: 1,
      align: 'center',
      renderCell: (cell: any) => {
        return (
          <Box>
            <Chip label='Phản biện' />
          </Box>
        );
      },
    },
    {
      headerName: 'Thành viên',
      field: 'name3',
      headerAlign: 'center',
      flex: 1,
      align: 'center',
      renderCell: (cell: any) => {
        return (
          <Box>
            <Typography variant='body1' color='initial'>
              Giảng viên 1: Lê Minh Quang
            </Typography>
            <Typography variant='body1' mt={1} color='initial'>
              Giảng viên 2: Nguyễn Huy Hoàng
            </Typography>
          </Box>
        );
      },
    },
    {
      headerName: 'Danh sách nhóm sinh viên chấm điểm',
      field: 'listGroupStudent',
      headerAlign: 'center',
      flex: 1.5,
      align: 'center',
      renderCell: (cell: any) => {
        return (
          <Box>
            <Typography variant='body1' color='initial'>
              Nhóm sinh viên 1
            </Typography>
            <Typography variant='body1' mt={1} color='initial'>
              Nhóm sinh viên 2
            </Typography>
            <Typography variant='body1' color='initial'>
              Nhóm sinh viên 3
            </Typography>
            <Typography variant='body1' mt={1} color='initial'>
              Nhóm sinh viên 4
            </Typography>
          </Box>
        );
      },
    },
    {
      headerName: '',
      field: 'name8',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) => (
        <Box display={'flex'} gap={6}>
          <Tooltip title='Chi tiết nhóm giảng viên'>
            <IconButton
              color='primary'
              onClick={() =>
                navigate('/group-lecturers/details/2bcbc7b4-d1c4-416a-9d4e-d6ea9f77f2f2')
              }
            >
              <Icon icon='flat-color-icons:view-details' />
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
        minHeight={50}
        rowHeight={150}
        columns={basicColumns}
        totalItems={1}
        totalPages={1}
        page={1}
        handleChangePage={() => {}}
        disableColumnMenu
        disableColumnFilter
        disableColumnSelector
      />
    </Box>
  );
}

export default TableManagamentGroupLecturer;
