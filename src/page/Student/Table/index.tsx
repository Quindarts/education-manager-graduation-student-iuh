import Table from '@/components/ui/Table/Table';
import { dummyStudentData } from '@/dummy';
import { Icon } from '@iconify/react';
import { Avatar, Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import React, { useState } from 'react';
import EditInfoModal from '../Modal/EditInfoModal';
import EditStatus from '../Modal/EditStatus';
import DeleteModal from '../Modal/DeleteModal';
import { checkGender } from '@/utils/validations/person.validation';
import ModalUpload from '@/components/ui/Upload';
import { TypeEntityUpload } from '@/hooks/ui/useUploadExcel';
import { useTerm } from '@/hooks/api/useQueryTerm';
import ResetPassword from '../Modal/ResetPassword';
import EditStatusMuiltiStudent from '../Modal/EditStatusMuiltiStudentModal';

function TableManagamentStudent(props: any) {
  const { rows, totalItems, currentTermId, totalPage, page, handleChangePage } = props;

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
    status: true,
    isOpen: false,
  });

  const handleCloseEditStatusStudentModal = () => {
    setOpenEditStatusStudentModal({ ...openEditStatusStudentModal, isOpen: false });
  };
  const handleOpenStatusStudentModal = (studentId: string, status: boolean) => {
    setOpenEditStatusStudentModal({ studentId, status, isOpen: true });
  };

  //
  const [openResetPasswordStudentModal, setOpenResetPasswordStudentModal] = useState({
    studentId: '',
    isOpen: false,
  });

  const handleCloseResetPasswordStudentModal = () => {
    setOpenResetPasswordStudentModal({ ...openResetPasswordStudentModal, isOpen: false });
  };
  const handleOpenResetPasswordStudentModal = (studentId: string) => {
    setOpenResetPasswordStudentModal({ studentId, isOpen: true });
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

  const [openEditStatusMultiStudent, setOpenEditStatusMultiStudent] = useState<{
    listStudent: GridRowSelectionModel;
    isOpen: boolean;
  }>({
    listStudent: [],
    isOpen: false,
  });

  const handleCloseEditStatusMultiStudent = () => {
    setOpenEditStatusMultiStudent({ ...openEditStatusMultiStudent, isOpen: false });
  };
  const handleOpenEditStatusMultiStudent = (listStudent: GridRowSelectionModel) => {
    setOpenEditStatusMultiStudent({ listStudent, isOpen: true });
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
            <Avatar
              sizes='small'
              src={
                params.row.avatar
                  ? params.row.avatar
                  : 'https://i.pngimg.me/thumb/f/720/m2H7H7K9m2Z5G6i8.jpg'
              }
            />
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
            onClick={() => handleOpenStatusStudentModal(params.row.id, params.row.isActive)}
            color={params.row.isActive ? 'success' : 'error'}
          >
            {' '}
            <Icon
              width={20}
              icon={params.row.isActive ? 'bi:unlock' : 'material-symbols:lock-outline'}
            />
            {params.row.isActive ? 'Đang mở' : 'Bị khóa'}
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
            <IconButton
              color='primary'
              size='small'
              onClick={() => handleOpenResetPasswordStudentModal(params.row.id)}
            >
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
  const [rowSelectionModel, setRowSelectionModel] = React.useState<GridRowSelectionModel>([]);

  return (
    <>
      <Box>
        {rowSelectionModel.length > 0 && (
          <Box width={'100%'} display={'flex'} justifyContent={'end'}>
            <Button
              color='primary'
              variant='contained'
              onClick={() => handleOpenEditStatusMultiStudent(rowSelectionModel)}
            >
              <Icon icon='ri:lock-2-line' width={20} />
              Đã chọn {rowSelectionModel.length} Sinh viên
            </Button>
          </Box>
        )}
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
          disableColumnMenu
          disableColumnFilter
          disableColumnSelector
          checkboxSelection
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
          noData={
            <ModalUpload
              entityUpload={TypeEntityUpload.STUDENT}
              termId={termStore.currentTerm.id}
            />
          }
        />
      </Box>
      <ResetPassword
        studentId={openResetPasswordStudentModal.studentId}
        open={openResetPasswordStudentModal.isOpen}
        onClose={handleCloseResetPasswordStudentModal}
      />
      <EditInfoModal
        studentId={openEditInfoModal.studentId}
        open={openEditInfoModal.isOpen}
        onClose={handleCloseEditInfoModal}
      />
      <EditStatus
        status={openEditStatusStudentModal.status}
        open={openEditStatusStudentModal.isOpen}
        onClose={handleCloseEditStatusStudentModal}
        studentId={openEditStatusStudentModal.studentId}
      />
      <DeleteModal
        open={openDeleteStudentModal.isOpen}
        onClose={handleCloseDeleteStudentModal}
        studentId={openDeleteStudentModal.studentId}
      />
      <EditStatusMuiltiStudent
        open={openEditStatusMultiStudent.isOpen}
        onClose={handleCloseEditStatusMultiStudent}
        rows={rows}
        listStudent={openEditStatusMultiStudent.listStudent}
      />
    </>
  );
}

export default TableManagamentStudent;
