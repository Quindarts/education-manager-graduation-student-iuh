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
        flex: 1.6,
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
        headerName: 'Điểm Hướng dẫn',
        field: 'advisorScore',
        flex: 1,
        align: 'right',
        headerAlign: 'right',
      },
      {
        headerName: 'Điểm Phản biện',
        field: 'reviewerScore',
        flex: 1,
        align: 'right',
        headerAlign: 'right',
      },
      {
        headerName: 'Điểm Báo cáo',
        field: 'reportScore',
        flex: 1,
        align: 'right',
        headerAlign: 'right',
      },
      {
        headerName: 'Điểm cộng',
        field: 'bonusScore',
        flex: 1,
        align: 'right',
        headerAlign: 'right',
      },
      {
        headerName: 'Điểm Trung bình',
        field: 'totalAvgScore',
        flex: 1,
        align: 'right',
        headerAlign: 'right',
      },
      {
        headerName: 'Tình trạng',
        field: 'status',
        flex: 1.2,
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
                  textAlign: 'center',
                }}
                color={getStatusStudentStyle(params.value)}
                bgcolor={getStatusStudentStyle(params.value)}
                variant='body1'
              >
                {getStatusGroup(params.value)}
              </Typography>
            </Box>
          );
        },
      },
      {
        headerName: 'Chức năng',
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
        isPanigation={false}
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
