import SekeletonUI from '@/components/ui/Sekeleton';
import Table from '@/components/ui/Table/Table';
import { convertGroupMembersTable } from '@/utils/convertDataTable';
import { getStatusGroup } from '@/utils/validations/groupStudent.validation';
import { Icon } from '@iconify/react';
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import useMemberGroupStudent from '@/hooks/api/useQueryMemberGroupStudent';
import useGroupStudent from '@/hooks/api/useQueryGroupStudent';

function TableDetailGroupSupport() {
  const { pathname } = useLocation();
  const current = pathname.split('/');
  const grStudentId = `${current[current.length - 1]}`;
  const { handleUiRender } = useGroupStudent();
  const { handleGetMemberInGroupStudent } = useMemberGroupStudent();
  const { data, isLoading } = handleGetMemberInGroupStudent(grStudentId);

  const basicColumns: GridColDef[] = [
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
            <Typography variant='body1'>{getStatusGroup(params.row.status)}</Typography>
          </Box>
        );
      },
    },
  ];
  return (
    <>
      <Box>
        {isLoading ? (
          <SekeletonUI />
        ) : (
          <Box>
            <Table
              rows={convertGroupMembersTable(data?.members)}
              sx={{
                bgcolor: 'white',
                height: 350,
              }}
              minHeight={350}
              rowHeight={80}
              columns={basicColumns}
              totalItems={data.members.length}
              totalPages={1}
              page={1}
              handleChangePage={() => {}}
            />
          </Box>
        )}
      </Box>
    </>
  );
}

export default TableDetailGroupSupport;
