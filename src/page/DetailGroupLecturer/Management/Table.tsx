import SekeletonUI from '@/components/ui/Sekeleton';
import Table from '@/components/ui/Table/Table';
import { useGroupLecturer } from '@/hooks/api/useQueryGroupLecturer';
import { checkDegree } from '@/utils/validations/lecturer.validation';
import { Icon } from '@iconify/react';
import { Avatar, Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import LecturerLeaveGroupModal from './Modal/LeaveGroup';
import AddMemberGroupLecturerModal from './Modal/AddMember';

function TableManagementGroupLecturer(props: any) {
  const { rows, groupType } = props;
  const [isOpenLeaveGroupModal, setIsOpenLeaveGroupModal] = useState({
    isOpen: false,
    lecturerId: '',
  });

  const { handleUiRender } = useGroupLecturer();
  const currentRole = handleUiRender();

  const handleOpenLeaveGroupModal = (lecturerId: string) => {
    setIsOpenLeaveGroupModal({ lecturerId: lecturerId, isOpen: true });
  };
  const handleCloseLeaveGroupModal = () => {
    setIsOpenLeaveGroupModal((pre) => ({ ...pre, isOpen: false }));
  };

  const [isOpenAddMember, setIsOpenAddMember] = useState(false);
  const handleOpenAddMemberModal = () => {
    setIsOpenAddMember(true);
  };
  const handleCloseAddMemberModal = () => {
    setIsOpenAddMember(false);
  };
  const LecturerColumns: GridColDef[] = [
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
  ];
  const HeadLecturerColumns: GridColDef[] = [
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
    {
      headerName: '',
      field: 'name8',
      flex: 0.5,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: any) => (
        <Button onClick={() => handleOpenLeaveGroupModal(params.row.id)}>Rời nhóm</Button>
      ),
    },
  ];

  return (
    <>
      <Box>
        <Box>
          <Box display={'flex'} mt={6} mb={4} justifyContent={'end'}>
            {currentRole.includes('all') && (
              <Button
                size='small'
                onClick={handleOpenAddMemberModal}
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
            }}
            minHeight={400}
            columns={currentRole.includes('all') ? HeadLecturerColumns : LecturerColumns}
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
      <AddMemberGroupLecturerModal
        groupType={groupType}
        onClose={handleCloseAddMemberModal}
        open={isOpenAddMember}
      />
    </>
  );
}

export default TableManagementGroupLecturer;
