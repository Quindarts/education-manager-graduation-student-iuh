import Table from '@/components/ui/Table/Table';
import { Icon } from '@iconify/react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { checkGender } from '@/utils/validations/person.validation';
import DeleteModal from '../Modal/DeleteModal';
import EditInfoModal from '../Modal/EditInfoModal';
import { useNavigate } from 'react-router-dom';

function TableManagamentLecturer(props: any) {
  const { rows, totalItems, totalPage, page, handleChangePage } = props;

  const [openDeleteModal, setOpenDeleteModal] = useState({
    lecturerId: '',
    name: '',
    isOpen: false,
  });

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal({ ...openDeleteModal, isOpen: false });
  };
  const handleOpenDeleteModal = (lecturerId: string, name: string) => {
    setOpenDeleteModal({ lecturerId, name, isOpen: true });
  };

  const [openEditInfoModal, setOpenEditInfoModal] = useState({ lecturerId: '', isOpen: false });
  const navigate = useNavigate();

  const basicColumns: GridColDef[] = [
    {
      headerName: 'Mã Giảng Viên',
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
      headerName: 'Chuyên ngành',
      field: 'majorName',
      flex: 1,
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
      headerName: 'Chức năng',
      field: 'updateTing',
      flex: 0.5,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) => (
        <Box display={'flex'} gap={2}>
          <Tooltip
            onClick={() => handleOpenDeleteModal(params.row.id, params.row.fullName)}
            title='Gỡ giảng viên khỏi học kì'
          >
            <IconButton color='error'>
              <Icon width={20} icon='carbon:close-filled' style={{ color: ' #f2365b' }} />
            </IconButton>
          </Tooltip>
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
        />
      </Box>

      <DeleteModal
        lecturerId={openDeleteModal.lecturerId}
        open={openDeleteModal.isOpen}
        onClose={handleCloseDeleteModal}
        name={openDeleteModal.name}
      />
    </>
  );
}

export default TableManagamentLecturer;
