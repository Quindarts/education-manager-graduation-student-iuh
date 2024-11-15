import SekeletonUI from '@/components/ui/Sekeleton';
import Table from '@/components/ui/Table/Table';
import { convertGroupMembersTable } from '@/utils/convertDataTable';
import { getStatusGroup, getStatusStudentStyle } from '@/utils/validations/groupStudent.validation';
import { Icon } from '@iconify/react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useMemo, useState } from 'react';
import EditStatusStudentTerm from '@/components/Page/DetailGroupStudent/Modal/EditStatus';

function TableDetailGroupSupport({ members }) {
  const basicColumns: GridColDef[] = useMemo(
    () => [
      {
        headerName: 'Thông tin sinh viên',
        field: 'name',
        flex: 1.7,
        headerAlign: 'left',
        renderCell: (params: any) => {
          return (
            <Box gap={2} display={'flex'} alignItems={'center'}>
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
        align: 'left',
        headerAlign: 'left',
      },
      {
        headerName: 'Điểm Hướng dẫn',
        field: 'hd',
        flex: 1,
        align: 'right',
        headerAlign: 'right',
        renderCell: (params: any) => {
          return (
            <Typography variant='body1'>
              {params.row.transcripts?.length > 0 && params.row.transcripts[0]
                ? `${(parseFloat(params.row.transcripts[0]?.sumScore) / 10).toFixed(2)}`
                : 'Chưa có'}
            </Typography>
          );
        },
      },
      {
        headerName: 'Điểm Phản biện',
        field: 'pb',
        flex: 1,
        align: 'right',
        headerAlign: 'right',
        renderCell: (params: any) => {
          return (
            <Typography variant='body1'>
              {params.row.transcripts?.length > 0 && params.row.transcripts[1]
                ? `${(parseFloat(params.row.transcripts[1]?.sumScore) / 10).toFixed(2)}`
                : 'Chưa có'}
            </Typography>
          );
        },
      },
      {
        headerName: 'Điểm Báo cáo',
        field: 'bc',
        flex: 1,
        align: 'right',
        headerAlign: 'right',
        renderCell: (params: any) => {
          return (
            <Typography variant='body1'>
              {params.row.transcripts?.length > 0 && params.row.transcripts[2]
                ? `${(parseFloat(params.row.transcripts[2]?.sumScore) / 10).toFixed(2)}`
                : 'Chưa có'}
            </Typography>
          );
        },
      },
      {
        headerName: 'Điểm Trung bình',
        field: 'tb',
        flex: 1,
        align: 'right',
        headerAlign: 'right',
        renderCell: (params: any) => {
          return (
            <Typography variant='body1'>
              {params.row.transcripts?.length > 0 && params.row.transcripts[3]
                ? `${(parseFloat(params.row.transcripts[3]?.sumScore) / 10).toFixed(2)}`
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
              <Typography
                sx={{
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                }}
                color={getStatusStudentStyle(params.row.status)}
                bgcolor={getStatusStudentStyle(params.row.status)}
                variant='body1'
              >
                {getStatusGroup(params.row.status)}
              </Typography>
            </Box>
          );
        },
      },
      {
        headerName: '',
        field: 'name8',
        align: 'center',
        headerAlign: 'center',
        renderCell: (params: any) => (
          <Box display={'flex'} gap={2}>
            <Tooltip
              title='Cập nhật trạng thái sinh viên'
              onClick={() => handleOpenModalStatusStudent(params.row.id, params.row.status)}
            >
              <IconButton size='small'>
                <Icon width={20} style={{ color: '#1e4990' }} icon='mdi:user-edit' />
              </IconButton>
            </Tooltip>
          </Box>
        ),
      },
    ],
    [],
  );

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

  return (
    <>
      <Table
        rows={convertGroupMembersTable(members)}
        sx={{
          bgcolor: 'white',
          height: 350,
        }}
        minHeight={350}
        rowHeight={80}
        columns={basicColumns}
        totalItems={members?.length}
        totalPages={1}
        page={1}
        handleChangePage={() => {}}
      />
      <>
        <EditStatusStudentTerm
          open={openStatusStudentModal.isOpen}
          studentId={openStatusStudentModal.studentId}
          status={openStatusStudentModal.status}
          onClose={handleCloseModalStatusStudent}
        />
      </>
    </>
  );
}

export default TableDetailGroupSupport;
