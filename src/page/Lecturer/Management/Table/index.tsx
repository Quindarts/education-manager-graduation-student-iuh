import Table from '@/components/ui/Table/Table';
import { Icon } from '@iconify/react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useState } from 'react';
import EditInfoModal from '../Modal/EditInfoModal';
import { useNavigate } from 'react-router-dom';
import { checkGender } from '@/utils/validations/person.validation';
import DeleteModal from '../Modal/DeleteModal';
import ResetPassword from '../Modal/ResetPassword';

function TableManagamentLecturer(props: any) {
  const { rows, totalItems, currentTermId, totalPage, page, handleChangePage } = props;
  const navigate = useNavigate();

  const [openEditInfoModal, setOpenEditInfoModal] = useState({ lecturerId: '', isOpen: false });
  const handleCloseEditInfoModal = () => {
    setOpenEditInfoModal({ ...openEditInfoModal, isOpen: false });
  };
  const handleOpenInfoModal = (lecturerId: string) => {
    setOpenEditInfoModal({ lecturerId, isOpen: true });
  };

  const [openDeleteModal, setOpenDeleteModal] = useState({ lecturerId: '', isOpen: false });
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal({ ...openDeleteModal, isOpen: false });
  };

  const [openResetPasswordStudentModal, setOpenResetPasswordStudentModal] = useState({
    lecturerId: '',
    name: '',
    username: '',
    isOpen: false,
  });

  const handleCloseResetPasswordStudentModal = () => {
    setOpenResetPasswordStudentModal({ ...openResetPasswordStudentModal, isOpen: false });
  };
  const handleOpenResetPasswordStudentModal = (
    lecturerId: string,
    name: string,
    username: string,
  ) => {
    setOpenResetPasswordStudentModal({ lecturerId, name, username, isOpen: true });
  };
  const basicColumns: GridColDef[] = [
    {
      headerName: 'Mã Giảng viên',
      field: 'username',
      flex: 0.6,
      headerAlign: 'center',
      align: 'right',
      renderCell(params) {
        return (
          <Typography variant='body1' fontWeight={600}>
            {params.row.username}
          </Typography>
        );
      },
    },
    {
      headerName: 'Họ & Tên đệm',
      field: 'firstName',
      flex: 0.7,
      headerAlign: 'left',
      align: 'left',
    },
    {
      headerName: 'Tên',
      field: 'lastName',
      flex: 0.5,
      headerAlign: 'left',
      align: 'left',
    },

    {
      headerName: 'Giới tính',
      field: 'gender',
      flex: 0.5,
      headerAlign: 'left',
      align: 'left',
      renderCell: (params: any) => {
        return <Typography variant='body1'>{checkGender(params.row.gender)}</Typography>;
      },
    },
    {
      headerName: 'SĐT',
      field: 'phone',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) => {
        return <Typography variant='body1'>{params.row.phone}</Typography>;
      },
    },
    {
      headerName: 'Email',
      field: 'email',
      flex: 1.2,
      headerAlign: 'left',
      align: 'left',
      renderCell: (params: any) => {
        return <Typography variant='body1'>{params.row.email}</Typography>;
      },
    },
    {
      headerName: 'Chức năng',
      field: 'updateTing',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) => (
        <Box display={'flex'} gap={2}>
          <Tooltip
            onClick={() =>
              handleOpenResetPasswordStudentModal(
                params.row.id,
                params.row.fullName,
                params.row.username,
              )
            }
            title='Cấp lại mật khẩu'
          >
            <IconButton color='primary' size='small'>
              <Icon icon='carbon:password' width={20} style={{ color: '#0288d1' }} />
            </IconButton>
          </Tooltip>
          <Tooltip onClick={() => handleOpenInfoModal(params.row.id)} title='Cập nhật thông tin'>
            <IconButton>
              <Icon width={20} icon='fa-solid:user-edit' style={{ color: '#0288d1' }} />
            </IconButton>
          </Tooltip>
          <Box></Box>
          <Tooltip
            onClick={() => navigate(`/lecturers/detail/${params.row.id}`)}
            title='Xem Chi tiết'
          >
            <IconButton color='primary'>
              <Icon width={20} icon='flat-color-icons:view-details' />
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
            width: '100%',
          }}
          columns={basicColumns}
          totalItems={totalItems}
          totalPages={totalPage}
          page={page}
          handleChangePage={handleChangePage}
          disableColumnMenu
          disableColumnFilter
          disableColumnSelector
          minHeight={400}
          // noData={
          //   rows.length <= 0 ? (
          //     <Button color='primary' variant='contained' onClick={handleImport}>
          //       <Icon icon='fe:import' />
          //       Tải dữ liệu giảng viên lên học kì mới.
          //     </Button>
          //   ) : (
          //     <></>
          //   )
          // }
        />
      </Box>
      <EditInfoModal
        lecturerId={openEditInfoModal.lecturerId}
        open={openEditInfoModal.isOpen}
        onClose={handleCloseEditInfoModal}
        currentTermId={currentTermId}
      />
      <DeleteModal
        lecturerId={openDeleteModal.lecturerId}
        open={openDeleteModal.isOpen}
        onClose={handleCloseDeleteModal}
      />
      <ResetPassword
        name={openResetPasswordStudentModal.name}
        lecturerId={openResetPasswordStudentModal.lecturerId}
        open={openResetPasswordStudentModal.isOpen}
        onClose={handleCloseResetPasswordStudentModal}
        username={openResetPasswordStudentModal.username}
      />
    </>
  );
}

export default TableManagamentLecturer;
