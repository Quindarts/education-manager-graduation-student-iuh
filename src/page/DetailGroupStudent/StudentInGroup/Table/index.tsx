import Table from '@/components/ui/Table/Table';
import { Icon } from '@iconify/react';
import { Avatar, Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

function TableStudentInGroup(props: any) {
  const { rows, totalItems, totalPages, page, handelChangePage } = props;
  const basicColumns: GridColDef[] = [
    {
      headerName: 'Thông tin chung',
      field: 'name',
      flex: 1.5,
      headerAlign: 'center',
      renderCell: (params: any) => {
        return (
          <Box gap={4} display={'flex'} alignItems={'center'}>
            <Avatar sizes='small' src={params.row.avatar} />
            <Box>
              <Typography fontWeight={600} variant='h6'>
                {params.row.name}
              </Typography>
              <Typography>
                Mã SV: {'  '}
                <Typography component={'span'}>{params.row.username}</Typography>
              </Typography>
            </Box>
          </Box>
        );
      },
    },
    {
      headerName: 'Email',
      field: 'email',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      headerName: 'Giới tính',
      field: 'gender',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      headerName: 'Trạng thái',
      field: 'abc',
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
        <Box display={'flex'} gap={2}>
          <Tooltip title='Cập nhật thông tin'>
            <IconButton size='small'>
              <Icon icon='emojione:pencil' />
            </IconButton>
          </Tooltip>
          <Box></Box>
          <Tooltip title='Cấp lại mật khẩu'>
            <IconButton color='primary' size='small'>
              <Icon width={20} icon='wpf:password1' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Xóa sinh viên'>
            <IconButton color='error' size='small'>
              <Icon icon='mdi:trash' />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];
  return (
    <>
      <Box>
        <Table
          rows={rows}
          sx={{
            bgcolor: 'white',
          }}
          minHeight={200}
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
    </>
  );
}

export default TableStudentInGroup;
