import Table from '@/components/ui/Table/Table';
import { dummyStudentData } from '@/dummy';
import { Icon } from '@iconify/react';
import { Avatar, Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useState } from 'react';
import EditInfoModal from '../Modal/EditInfoModal';
import EditStatus from '../Modal/EditStatus';
import DeleteModal from '../Modal/DeleteModal';
import { checkGender } from '@/utils/validations/person.validation';
import ModalUpload from '@/components/ui/Upload';
import { TypeEntityUpload } from '@/hooks/ui/useUploadExcel';
import { useTerm } from '@/hooks/api/useQueryTerm';

function TableManagamentStudent(props: any) {
  const { rows, totalItems, totalPages, page, handelChangePage } = props;

  const [openEditInfoModal, setOpenEditInfoModal] = useState({ studentId: '', isOpen: false });

  const { termStore } = useTerm();

  const handleCloseEditInfoModal = () => {
    setOpenEditInfoModal({ ...openEditInfoModal, isOpen: false });
  };
  const handleOpenInfoModal = (studentId: string) => {
    setOpenEditInfoModal({ studentId, isOpen: true });
  };

  const [openEditStatusStudentModal, setOpenEditStatusStudentModal] = useState({
    studentId: '',
    isOpen: false,
  });

  const handleCloseEditStatusStudentModal = () => {
    setOpenEditStatusStudentModal({ ...openEditStatusStudentModal, isOpen: false });
  };
  const handleOpenStatusStudentModal = (studentId: string) => {
    setOpenEditStatusStudentModal({ studentId, isOpen: true });
  };

  const [openDeleteStudentModal, setOpenDeleteStudentModal] = useState({
    studentId: '',
    isOpen: false,
  });

  const handleCloseDeleteStudentModal = () => {
    setOpenDeleteStudentModal({ ...openDeleteStudentModal, isOpen: false });
  };
  const handleOpenDeleteStudentModal = (studentId: string) => {
    setOpenDeleteStudentModal({ studentId, isOpen: true });
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
      renderCell: (params: any) => {
        return <Typography variant='body1'>{checkGender(params.row.gender)}</Typography>;
      },
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
            <IconButton size='small' onClick={() => handleOpenInfoModal(params.row.id)}>
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
          noData={
            <ModalUpload
              entityUpload={TypeEntityUpload.STUDENT}
              termId={termStore.currentTerm.id}
            />
          }
        />
      </Box>
      <EditInfoModal
        studentId={openEditInfoModal.studentId}
        open={openEditInfoModal.isOpen}
        onClose={handleCloseEditInfoModal}
      />
      <EditStatus
        open={openEditStatusStudentModal.isOpen}
        onClose={handleCloseEditStatusStudentModal}
        studentId={openEditStatusStudentModal.studentId}
      />
      <DeleteModal
        open={openDeleteStudentModal.isOpen}
        onClose={handleCloseDeleteStudentModal}
        studentId={openDeleteStudentModal.studentId}
      />
    </>
  );
}

export default TableManagamentStudent;
