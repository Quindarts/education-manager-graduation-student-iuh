import SekeletonUI from '@/components/ui/Sekeleton';
import Table from '@/components/ui/Table/Table';
import { convertGroupMembersTable } from '@/utils/convertDataTable';
import { getStatusGroup } from '@/utils/validations/groupStudent.validation';
import { Icon } from '@iconify/react';
import { Avatar, Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import EditStatusStudentTerm from '../Modal/EditStatus';
import StudentLeaveGroup from '../Modal/LeaveGroup';
import useMemberGroupStudent from '@/hooks/api/useQueryMemberGroupStudent';
import AddStudentModal from '../Modal/AddStudent';

function TableStudentInGroup(props: any) {
  const { pathname } = useLocation();
  const current = pathname.split('/');
  const grStudentId = `${current[current.length - 1]}`;

  const { handleGetMemberInGroupStudent } = useMemberGroupStudent();
  const { data, isLoading } = handleGetMemberInGroupStudent(grStudentId);

  const [openAddStudentModal, setOpenModalAddStudent] = useState(false);

  const handleOpenModalAddStudent = () => {
    setOpenModalAddStudent(true);
  };
  const handleCloseModalAddStudent = () => {
    setOpenModalAddStudent(false);
  };

  const [openStatusStudentModal, setOpenModalStatusStudent] = useState({
    isOpen: false,
    studentId: '',
    status: '',
  });
  const handleOpenModalStatusStudent = (studentId: string, status: string) => {
    setOpenModalStatusStudent({
      studentId: studentId,
      status: status,
      isOpen: true,
    });
  };
  const handleCloseModalStatusStudent = (studentId: string, status: string) => {
    setOpenModalStatusStudent((pre) => ({
      ...pre,
      isOpen: false,
    }));
  };
  const [openStudentLeaveGroup, setOpenStudentLeaveGroup] = useState({
    studentId: '',
    isOpen: false,
  });

  const handleCloseStudentLeaveGroup = () => {
    setOpenStudentLeaveGroup({ ...openStudentLeaveGroup, isOpen: false });
  };
  const handleOpenStudentLeaveGroup = (studentId: string) => {
    setOpenStudentLeaveGroup({ studentId: studentId, isOpen: true });
  };
  const basicColumns: GridColDef[] = [
    {
      headerName: 'Thông tin chung',
      field: 'name',
      flex: 1.7,
      headerAlign: 'center',
      renderCell: (params: any) => {
        return (
          <Box gap={4} display={'flex'} alignItems={'center'}>
            <Avatar sizes='small' src={params.row.avatar} />
            <Box>
              <Typography component={'span'} color='primary'>
                {params.row.isAdmin ? 'Trưởng Nhóm' : ''}
              </Typography>
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
      headerName: 'Lớp chuyên ngành',
      field: 'clazzName',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      headerName: 'Điểm Hướng dẫn',
      field: 'hd',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: any) => {
        return (
          <Typography variant='body1'>
            {params.row.transcripts.length > 0 && params.row.transcripts[0]
              ? `${parseFloat(params.row.transcripts[0]?.avgScore.toFixed(2))}`
              : 'Chưa có'}
          </Typography>
        );
      },
    },
    {
      headerName: 'Điểm Phản biện',
      field: 'pb',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: any) => {
        return (
          <Typography variant='body1'>
            {params.row.transcripts.length > 0 && params.row.transcripts[1]
              ? `${parseFloat(params.row.transcripts[1]?.avgScore.toFixed(2))}`
              : 'Chưa có'}
          </Typography>
        );
      },
    },
    {
      headerName: 'Điểm Báo cáo',
      field: 'bc',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: any) => {
        return (
          <Typography variant='body1'>
            {params.row.transcripts.length > 0 && params.row.transcripts[2]
              ? `${parseFloat(params.row.transcripts[2]?.avgScore.toFixed(2))}`
              : 'Chưa có'}
          </Typography>
        );
      },
    },
    {
      headerName: 'Điểm Trung bình',
      field: 'tb',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: any) => {
        return (
          <Typography variant='body1'>
            {params.row.transcripts.length > 0 && params.row.transcripts[3]
              ? `${parseFloat(params.row.transcripts[3]?.avgScore.toFixed(2))}`
              : 'Chưa có'}
          </Typography>
        );
      },
    },

    {
      headerName: 'Tình trạng',
      field: 'abc',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: any) => {
        return (
          <Box display={'flex'}>
            <Typography variant='body1'>{getStatusGroup(params.row.status)}</Typography>
            <Tooltip title='Cập nhật trạng thái sinh viên'>
              <IconButton
                size='small'
                onClick={() => handleOpenModalStatusStudent(params.row.id, params.row.status)}
              >
                <Icon width={16} icon='fluent-mdl2:global-nav-button-active' />
              </IconButton>
            </Tooltip>
          </Box>
        );
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
            <IconButton
              size='small'
              color='primary'
              onClick={() => handleOpenStudentLeaveGroup(params.row.id)}
            >
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
          <Box>
            <Box display={'flex'} mt={6} mb={4} justifyContent={'end'}>
              <Button
                disabled={data?.members.length >= 2}
                size='small'
                color='error'
                variant='contained'
                onClick={handleOpenModalAddStudent}
              >
                <Icon icon='material-symbols:add' width={16} style={{ marginRight: 4 }} />
                Thêm Sinh viên
              </Button>
            </Box>
            <Table
              rows={convertGroupMembersTable(data?.members)}
              sx={{
                bgcolor: 'white',
                height: 350,
              }}
              minHeight={350}
              rowHeight={100}
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
        )}
      </Box>
      <EditStatusStudentTerm
        open={openStatusStudentModal.isOpen}
        studentId={openStatusStudentModal.studentId}
        status={openStatusStudentModal.status}
        onClose={handleCloseModalStatusStudent}
      />
      <StudentLeaveGroup
        studentId={openStudentLeaveGroup.studentId}
        open={openStudentLeaveGroup.isOpen}
        onClose={handleCloseStudentLeaveGroup}
      />
      <AddStudentModal
        groupStudentId={grStudentId}
        onClose={handleCloseModalAddStudent}
        open={openAddStudentModal}
      />
    </>
  );
}

export default TableStudentInGroup;
