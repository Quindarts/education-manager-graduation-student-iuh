import Table from '@/components/ui/Table/Table';
import { dummyStudentData } from '@/dummy';
import { Icon } from '@iconify/react';
import { Avatar, Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useState } from 'react';
import EditInfoModal from '../Modal/EditInfoModal';
import EditStatus from '../Modal/EditStatus';
import DeleteModal from '../Modal/DeleteModal';

function TableManagamentStudent(props: any) {
  const { rows, totalItems, totalPages, page, handelChangePage, ...rest } = props;

  const [openEditInfoModal, setOpenEditInfoModal] = useState(false);

  const handleCloseEditInfoModal = () => {
    setOpenEditInfoModal(false);
  };
  const handleOpenInfoModal = () => {
    setOpenEditInfoModal(true);
  };

  const [openEditStatusStudentModal, setOpenEditStatusStudentModal] = useState({
    student_id: '',
    isOpen: false,
  });

  const handleCloseEditStatusStudentModal = () => {
    setOpenEditStatusStudentModal({ ...openEditStatusStudentModal, isOpen: false });
  };
  const handleOpenStatusStudentModal = (student_id: string) => {
    setOpenEditStatusStudentModal({ student_id, isOpen: true });
  };

  const [openDeleteStudentModal, setOpenDeleteStudentModal] = useState({
    student_id: '',
    isOpen: false,
  });

  const handleCloseDeleteStudentModal = () => {
    setOpenDeleteStudentModal({ ...openDeleteStudentModal, isOpen: false });
  };
  const handleOpenDeleteStudentModal = (student_id: string) => {
    setOpenDeleteStudentModal({ student_id, isOpen: true });
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
      headerName: 'Loại đào tạo',
      field: 'typeTraining',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },

    {
      headerName: 'Chuyên ngành',
      field: 'majors',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: any) => <Typography>{params.row.majorName}</Typography>,
    },
    {
      headerName: 'Trạng thái',
      field: 'isActive',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) => (
        <Box>
          <Button
            variant='contained'
            sx={{ py: 0, fontSize: 12 }}
            onClick={() => handleOpenStatusStudentModal(params.row.id)}
            color={params.row.isActive ? 'success' : 'error'}
          >
            {' '}
            {params.row.isActive ? 'Đang học' : 'Bị khóa'}
          </Button>
        </Box>
      ),
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
            <IconButton size='small' onClick={handleOpenInfoModal}>
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
            <IconButton
              color='error'
              size='small'
              onClick={() => handleOpenDeleteStudentModal(params.row.id)}
            >
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
      <EditInfoModal open={openEditInfoModal} onClose={handleCloseEditInfoModal} />
      <EditStatus
        open={openEditStatusStudentModal.isOpen}
        onClose={handleCloseEditStatusStudentModal}
        student_id={openEditStatusStudentModal.student_id}
      />
      <DeleteModal
        open={openDeleteStudentModal.isOpen}
        onClose={handleCloseDeleteStudentModal}
        student_id={openDeleteStudentModal.student_id}
      />
    </>
  );
}

export default TableManagamentStudent;
