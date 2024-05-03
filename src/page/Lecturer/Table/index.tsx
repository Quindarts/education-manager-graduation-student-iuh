import Table from '@/components/ui/Table/Table';
import { Icon } from '@iconify/react';
import { Avatar, Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useState } from 'react';
import AddModal from '../Modal/AddModal';
import { dummyTeacherData } from '@/dummy';
import EditInfoModal from '../Modal/EditInfoModal';
import EditStatus from '../Modal/EditStatus';
import DeleteModal from '../Modal/DeleteModal';

function TableManagamentLecturer(props: any) {
  const { rows, totalItems, totalPages, page, handelChangePage, ...rest } = props;
  const [openEditInfoModal, setOpenEditInfoModal] = useState(false);

  const handleCloseEditInfoModal = () => {
    setOpenEditInfoModal(false);
  };
  const handleOpenInfoModal = () => {
    setOpenEditInfoModal(true);
  };

  const [openEditStatusLecturerModal, setOpenEditStatusLecturerModal] = useState({
    lecturer_id: '',
    isOpen: false,
  });

  const handleCloseEditStatusLecturerModal = () => {
    setOpenEditStatusLecturerModal({ ...openEditStatusLecturerModal, isOpen: false });
  };
  const handleOpenStatusLecturerModal = (lecturer_id: string) => {
    setOpenEditStatusLecturerModal({ lecturer_id, isOpen: true });
  };

  const [openDeleteLecturerModal, setOpenDeleteLecturerModal] = useState({
    lecturer_id: '',
    isOpen: false,
  });

  const handleCloseDeleteLecturerModal = () => {
    setOpenDeleteLecturerModal({ ...openDeleteLecturerModal, isOpen: false });
  };
  const handleOpenDeleteLecturerModal = (lecturer_id: string) => {
    setOpenDeleteLecturerModal({ lecturer_id, isOpen: true });
  };

  const basicColumns: GridColDef[] = [
    {
      headerName: 'Thông tin giảng viên',
      field: 'none',
      flex: 2,
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
                Mã GV: {'  '}
                <Typography component={'span'}>{params.row.username}</Typography>
              </Typography>
            </Box>
          </Box>
        );
      },
    },
    {
      headerName: 'Giới tính',
      field: 'gender',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      headerName: 'Cấp bậc',
      field: 'role',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      headerName: 'SĐT',
      field: 'phoneNumber',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      headerName: 'Email',
      field: 'email',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      headerName: 'Chuyên ngành',
      field: 'majors',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
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
            onClick={() => {
              handleOpenStatusLecturerModal(params.row.username);
            }}
            color={params.row.isActive ? 'success' : 'error'}
          >
            {' '}
            {params.row.isActive ? 'còn làm' : 'nghỉ làm'}
          </Button>
        </Box>
      ),
    },
    {
      headerName: '',
      field: 'updateTing',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
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
          <Tooltip title='Xóa giảng viên'>
            <IconButton
              color='error'
              size='small'
              onClick={() => handleOpenDeleteLecturerModal(params.row.id)}
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
          rows={dummyTeacherData}
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
        open={openEditStatusLecturerModal.isOpen}
        onClose={handleCloseEditStatusLecturerModal}
        lecturer_id={openEditStatusLecturerModal.lecturer_id}
      />
      <DeleteModal
        open={openDeleteLecturerModal.isOpen}
        onClose={handleCloseDeleteLecturerModal}
        lecturer_id={openDeleteLecturerModal.lecturer_id}
      />
    </>
  );
}

export default TableManagamentLecturer;
