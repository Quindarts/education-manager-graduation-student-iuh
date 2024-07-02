import Table from '@/components/ui/Table/Table';
import useGroupStudent from '@/hooks/api/useQueryGroupStudent';
import { useTerm } from '@/hooks/api/useQueryTerm';
import { Icon } from '@iconify/react';
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function TableManagamentGroupStudent(props: any) {
  const { rows, totalItems, totalPage, page, handleChangePage } = props;
  const navigate = useNavigate();
  const basicColumns: GridColDef[] = [
    {
      headerName: 'Tên nhóm',
      field: 'name',
      flex: 0.5,
      align: 'center',
      headerAlign: 'center',
    },
    {
      headerName: 'Tên Đề tài',
      field: 'name6',
      flex: 3,
      headerAlign: 'center',
      renderCell: (params: any) => {
        return (
          <Typography>{params.row.topicName ? params.row.topicName : 'Chưa có đề tài'}</Typography>
        );
      },
    },
    {
      headerName: 'GV hướng dẫn',
      field: 'name3',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: any) => {
        return (
          <Typography>
            {params.row.lecturerName ? params.row.lecturerName : 'Chưa có giảng viên HD'}
          </Typography>
        );
      },
    },
    {
      headerName: 'Số lượng thành viên',
      field: 'name4',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: any) => {
        return (
          <Typography>
            {params.row.numOfMembers}
            /2
          </Typography>
        );
      },
    },
    {
      headerName: '',
      field: 'name8',
      flex: 0.5,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: any) => (
        <Box display={'flex'} gap={6}>
          <Tooltip title='Chi tiết'>
            <IconButton
              color='primary'
              onClick={() => navigate(`/group-students/detail/${params.row.id}`)}
            >
              <Icon icon='majesticons:checkbox-list-detail' />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];
  const { onImportGroupStudent } = useGroupStudent();
  const { termStore } = useTerm();

  const { mutate: importGr, isLoading } = onImportGroupStudent(termStore.currentTerm.id);
  const hanldeImport = () => {
    importGr(termStore.currentTerm.id);
  };
  return (
    <Box>
      <Table
        rows={rows}
        sx={{
          bgcolor: 'white',
        }}
        columns={basicColumns}
        totalItems={totalItems}
        totalPages={totalPage}
        page={page}
        handleChangePage={handleChangePage}
        noData={
          <Button variant='contained' onClick={hanldeImport}>
            Tạo danh sách nhóm sinh viên{' '}
          </Button>
        }
        disableColumnMenu
        disableColumnFilter
        disableColumnSelector
      />
    </Box>
  );
}

export default TableManagamentGroupStudent;
