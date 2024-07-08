import Table from '@/components/ui/Table/Table';
import { Icon } from '@iconify/react';
import { Avatar, Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import EditInfoModal from '../Modal/EditInfoModal';
import { useNavigate } from 'react-router-dom';
import { checkGender } from '@/utils/validations/person.validation';
import { checkRoleLecturer } from '@/utils/validations/lecturer.validation';
import { useLecturer } from '@/hooks/api/useQueryLecturer';
import DeleteModal from '../Modal/DeleteModal';

function TableManagamentLecturer(props: any) {
  const { rows, totalItems, currentTermId, totalPage, page, handleChangePage } = props;
  const navigate = useNavigate();
  const { onImportLecturerTerm } = useLecturer();
  const { mutate: importLecturer } = onImportLecturerTerm(currentTermId);

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
  const handleOpenDeleteModal = (lecturerId: string) => {
    setOpenDeleteModal({ lecturerId, isOpen: true });
  };

  const handleImport = () => {
    importLecturer(currentTermId);
  };

  const basicColumns: GridColDef[] = [
    {
      headerName: 'Tên giảng viên',
      field: 'fullName',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      headerName: 'Mã giảng viên',
      field: 'username',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      headerName: 'Giới tính',
      field: 'gender',
      flex: 0.5,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) => {
        return <Typography variant='body1'>{checkGender(params.row.gender)}</Typography>;
      },
    },
    {
      headerName: 'Cấp bậc',
      field: 'role',
      flex: 0.5,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) => {
        return <Typography variant='body1'>{checkRoleLecturer(params.row.role)}</Typography>;
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
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) => {
        return <Typography variant='body1'>{params.row.email}</Typography>;
      },
    },
    // {
    //   headerName: 'Chuyên ngành',
    //   field: 'none2',
    //   flex: 1,
    //   headerAlign: 'center',
    //   align: 'center',
    //   renderCell: (params: any) => <Typography variant='body1'>{params.row.majorName}</Typography>,
    // },
    {
      headerName: '',
      field: 'updateTing',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) => (
        <Box display={'flex'} gap={2}>
          <Tooltip title='Cập nhật thông tin'>
            <IconButton size='small' onClick={() => handleOpenInfoModal(params.row.id)}>
              <Icon icon='emojione:pencil' />
            </IconButton>
          </Tooltip>
          <Box></Box>
          <Tooltip title='Xem Chi tiết'>
            <IconButton
              color='primary'
              size='small'
              onClick={() => navigate(`/lecturers/detail/${params.row.id}`)}
            >
              <Icon width={20} icon='fluent:apps-list-detail-20-filled' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Xóa giảng viên'>
            <IconButton
              color='error'
              size='small'
              onClick={() => handleOpenDeleteModal(params.row.id)}
            >
              <Icon width={20} icon='ic:baseline-delete' />
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
          noData={
            <Button color='primary' variant='contained' onClick={handleImport}>
              <Icon icon='fe:import' />
              Tải dữ liệu giảng viên lên học kì mới.
            </Button>
          }
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
    </>
  );
}

export default TableManagamentLecturer;
