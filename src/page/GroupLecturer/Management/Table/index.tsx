import Table from '@/components/ui/Table/Table';
import { typeConvertGroupLecturer } from '@/utils/validations/groupLecturer.validation';
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
      renderCell: (params: any) => {
        return (
          <Box>
            <Typography variant='body1' fontWeight={'bold'} color='primary.main'>
              {params.row.name}
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
      renderCell: (params: any) => {
        return (
          <Box>
            <Chip label={typeConvertGroupLecturer(params.row.type.toLowerCase())} />
          </Box>
        );
      },
    },
    {
      headerName: 'Thành viên',
      field: 'name3',
      headerAlign: 'center',
      flex: 1,
      renderCell: (params: any) => {
        return (
          <Box>
            {params.row.members.map((mem: any, index: number) => (
              <Box component={'div'} my={2}>
                <Typography component={'span'}> {mem.username}</Typography>
                {'--'}
                <Typography component={'span'} width={100} color='initial'>
                  GV{index + 1}: {mem.fullName}
                </Typography>
              </Box>
            ))}
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
              onClick={() => navigate(`/group-lecturers/details/${params.row.id}`)}
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
        rows={rows}
        sx={{
          bgcolor: 'white',
        }}
        rowHeight={100}
        columns={basicColumns}
        totalItems={1}
        totalPages={1}
        checkboxSelection
        page={1}
        handleChangePage={() => {}}
        disableColumnFilter
      />
    </Box>
  );
}

export default TableManagamentGroupLecturer;
