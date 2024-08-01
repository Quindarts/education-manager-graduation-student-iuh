import Table from '@/components/ui/Table/Table';
import useGroupStudent from '@/hooks/api/useQueryGroupStudent';
import { Icon } from '@iconify/react';
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteGroupStudentModal from '../Modal/DeleteModal';

function TableManagamentGroupStudent(props: any) {
  const { rows, totalItems, totalPage, page, handleChangePage } = props;
  const navigate = useNavigate();
  const [openModalDelete, setOpenModalDelete] = useState({
    isOpen: false,
    groupStudentId: '',
    groupStudentName: '',
  });

  const handleOpenModalDelete = (groupStudentId: string, groupStudentName: string) => {
    setOpenModalDelete({
      groupStudentId: groupStudentId,
      groupStudentName: groupStudentName,
      isOpen: true,
    });
  };

  const handleCloseModalDelete = () => {
    setOpenModalDelete((pre: any) => ({ ...pre, isOpen: false }));
  };
  const basicColumns: GridColDef[] = [
    {
      headerName: 'Tên nhóm',
      field: 'name',
      flex: 1,
      align: 'left',
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
      align: 'left',
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
      headerName: 'Chức năng',
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
              <Icon icon='clarity:file-group-line' style={{ color: '#0288d1' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title='Xóa nhóm'>
            <IconButton
              color='primary'
              onClick={() => handleOpenModalDelete(params.row.id, params.row.name)}
            >
              <Icon icon='carbon:close-filled' style={{ color: ' #f2365b' }} />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];
  const { onImportGroupStudent } = useGroupStudent();
  const { mutate: importGr } = onImportGroupStudent();
  const hanldeImport = () => {
    importGr();
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
      <DeleteGroupStudentModal
        groupStudentId={openModalDelete.groupStudentId}
        groupStudentName={openModalDelete.groupStudentName}
        open={openModalDelete.isOpen}
        onClose={handleCloseModalDelete}
      />
    </Box>
  );
}

export default TableManagamentGroupStudent;
