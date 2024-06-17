import SekeletonUI from '@/components/ui/Sekeleton';
import Table from '@/components/ui/Table/Table';
import useGroupStudent from '@/hooks/api/useQueryGroupStudent';
import { convertGroupMembersTable } from '@/utils/convertDataTable';
import { checkGender } from '@/utils/validations/person.validation';
import { Icon } from '@iconify/react';
import { Avatar, Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useLocation } from 'react-router-dom';

function TableStudentInGroup(props: any) {
  const { pathname } = useLocation();
  const current = pathname.split('/');
  const grStudentId = `${current[current.length - 1]}`;

  const { handleGetMemberInGroupStudent } = useGroupStudent();
  const { data, isLoading } = handleGetMemberInGroupStudent(grStudentId);
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
                {params.row.fullName}
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
      headerName: 'Số điện thoại',
      field: 'phone',
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
      renderCell: (params: any) => {
        return <Typography variant='body1'>{checkGender(params.row.gender)}</Typography>;
      },
    },
    {
      headerName: 'Lớp chuyên ngành',
      field: 'clazzName',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      headerName: 'Tình trạng',
      field: 'abc',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: any) => {
        return <Typography variant='body1'>Đang trong học phần</Typography>;
      },
    },

    {
      headerName: '',
      field: 'name8',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: any) => (
        <Box display={'flex'} gap={2}>
          <Tooltip title='Cho rời nhóm'>
            <IconButton size='small' color='primary'>
              <Icon icon='pepicons-print:leave-circle' width={20} />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];
  return (
    <>
      <Box>
        {isLoading ? (
          <SekeletonUI />
        ) : (
          <Table
            rows={convertGroupMembersTable(data?.members)}
            sx={{
              bgcolor: 'white',
              height: 400,
            }}
            minHeight={200}
            columns={basicColumns}
            totalItems={1}
            totalPages={1}
            page={1}
            handleChangePage={() => {}}
            disableColumnMenu
            disableColumnFilter
            disableColumnSelector
          />
        )}
      </Box>
    </>
  );
}

export default TableStudentInGroup;
