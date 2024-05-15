import Table from '@/components/ui/Table/Table';
import { Icon } from '@iconify/react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React from 'react';

function TableManagerReviewScore(props: any) {
  const { rows } = props;
  console.log("🚀 ~ TableManagerReviewScore ~ rows:", rows)
  const basicColumns: GridColDef[] = [
    {
      headerName: 'STT',
      field: 'stt',
      flex: 0.25,
      headerAlign: 'center',
    },
    {
      headerName: 'Tên tiêu chí',
      field: 'name',
      flex: 6,
      headerAlign: 'center',
    },
    {
      headerName: 'Mô tả',
      field: 'description',
      flex: 3,
      headerAlign: 'center',
      align: 'center',
    },
    {
      headerName: 'Điểm tối đa',
      field: 'gradeMax',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      headerName: '',
      field: 'none',
      flex: 1.5,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) => (
        <Box display={'flex'} gap={2}>
          <Tooltip title='Sửa tiêu chí'>
            <IconButton size='small'>
              <Icon icon='emojione:pencil' />
            </IconButton>
          </Tooltip>
          <Box></Box>
          <Tooltip title='Xóa tiêu chí'>
            <IconButton color='error' size='small'>
              <Icon icon='mdi:trash' />
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
        checkboxSelection={true}
        handelChangePage={() => {}}
        disableColumnMenu
        disableColumnFilter
        disableColumnSelector
      />
    </Box>
  );
}

export default TableManagerReviewScore;
