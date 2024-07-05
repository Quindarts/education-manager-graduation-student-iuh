import SekeletonUI from '@/components/ui/Sekeleton';
import Table from '@/components/ui/Table/Table';
import { useGroupLecturer } from '@/hooks/api/useQueryGroupLecturer';
import { checkDegree } from '@/utils/validations/lecturer.validation';
import { Icon } from '@iconify/react';
import { Avatar, Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import LecturerLeaveGroupModal from './Modal/LeaveGroup';

function TableManagementGroupLecturer(props: any) {
  const { rows } = props;
  console.log('🚀 ~ TableManagementGroupLecturer ~ rows:', rows);
  const { pathname } = useLocation();
  const [isOpenLeaveGroupModal, setIsOpenLeaveGroupModal] = useState({
    isOpen: false,
    lecturerId: '',
  });
  const [isOpenAddMember, setIsOpenAddMember] = useState(false);

  const { handleUiRender } = useGroupLecturer();
  const currentRole = handleUiRender();

  const handleOpenLeaveGroupModal = (lecturerId: string) => {
    setIsOpenLeaveGroupModal({ lecturerId: lecturerId, isOpen: true });
  };
  const handleCloseLeaveGroupModal = () => {
    setIsOpenLeaveGroupModal((pre) => ({ ...pre, isOpen: false }));
  };
  const PermissionComponent = currentRole.includes('all') && {
    headerName: '',
    field: 'name8',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params: any) => (
      <Box display={'flex'} gap={2}>
        <Tooltip title='Mời rời nhóm'>
          <IconButton
            size='small'
            color='primary'
            onClick={() => handleOpenLeaveGroupModal(params.row.id)}
          >
            <Icon icon='pepicons-print:leave-circle' width={20} />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  };
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
              <Typography fontWeight={600} variant='body1'>
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
      headerName: 'Chuyên ngành',
      field: 'majorName',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      headerName: 'Trình độ',
      field: 'degree',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: any) => {
        return <Box>{checkDegree(params.row.degree)}</Box>;
      },
    },
    PermissionComponent,
  ];

  return (
    <>
      <Box>
        <Box>
          <Box display={'flex'} mt={6} mb={4} justifyContent={'end'}>
            {currentRole.includes('all') && (
              <Button
                size='small'
                color='error'
                disabled={rows.length >= 2 ? true : false}
                variant='contained'
              >
                <Icon icon='material-symbols:add' width={16} style={{ marginRight: 4 }} />
                Thêm Giảng viên
              </Button>
            )}
          </Box>
          <Table
            rows={rows}
            sx={{
              bgcolor: 'white',
              height: 250,
            }}
            minHeight={250}
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
        {/* )} */}
      </Box>
      <LecturerLeaveGroupModal
        onClose={handleCloseLeaveGroupModal}
        open={isOpenLeaveGroupModal.isOpen}
        lecturerId={isOpenLeaveGroupModal.lecturerId}
      />
    </>
  );
}

export default TableManagementGroupLecturer;
