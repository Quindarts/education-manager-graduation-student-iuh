import Table from '@/components/ui/Table/Table';
import { Icon } from '@iconify/react';
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import React, { useMemo, useState } from 'react';
import EditInfoModal from '../Modal/EditInfoModal';
import EditStatus from '../Modal/EditStatus';
import DeleteModal from '../Modal/DeleteModal';
import { checkGender } from '@/utils/validations/person.validation';
import ResetPassword from '../Modal/ResetPassword';
import EditStatusMuiltiStudent from '../Modal/EditStatusMuiltiStudentModal';
import { CustomToolbar } from './custom';

function TableManagamentStudent(props: any) {
  const { rows, totalItems, limit, handleChangeLimit, totalPage, page, handleChangePage } = props;
  const [openEditInfoModal, setOpenEditInfoModal] = useState({
    studentId: '',
    name: '',
    isOpen: false,
  });

  const handleCloseEditInfoModal = () => {
    setOpenEditInfoModal({ ...openEditInfoModal, isOpen: false });
  };
  const handleOpenInfoModal = (studentId: string, name: string) => {
    setOpenEditInfoModal({ studentId, name, isOpen: true });
  };

  const [openEditStatusStudentModal, setOpenEditStatusStudentModal] = useState({
    studentId: '',
    name: '',
    status: true,
    isOpen: false,
  });

  const handleCloseEditStatusStudentModal = () => {
    setOpenEditStatusStudentModal({ ...openEditStatusStudentModal, isOpen: false });
  };
  const handleOpenStatusStudentModal = (studentId: string, name: string, status: boolean) => {
    setOpenEditStatusStudentModal({ studentId, status, name, isOpen: true });
  };

  //
  const [openResetPasswordStudentModal, setOpenResetPasswordStudentModal] = useState({
    studentId: '',
    name: '',
    username: '',
    isOpen: false,
  });

  const handleCloseResetPasswordStudentModal = () => {
    setOpenResetPasswordStudentModal({ ...openResetPasswordStudentModal, isOpen: false });
  };
  const handleOpenResetPasswordStudentModal = (
    studentId: string,
    name: string,
    username: string,
  ) => {
    setOpenResetPasswordStudentModal({ studentId, name, username, isOpen: true });
  };

  const [openDeleteStudentModal, setOpenDeleteStudentModal] = useState({
    studentId: '',
    name: '',
    isOpen: false,
  });

  const handleCloseDeleteStudentModal = () => {
    setOpenDeleteStudentModal({ ...openDeleteStudentModal, isOpen: false });
  };
  const handleOpenDeleteStudentModal = (studentId: string, name: string) => {
    setOpenDeleteStudentModal({ studentId, name, isOpen: true });
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

  const basicColumns: GridColDef[] = useMemo(
    () => [
      {
        headerName: 'MSSV',
        field: 'username',
        flex: 0.4,
        headerAlign: 'right',
        align: 'right',
        renderCell(params) {
          return (
            <Typography variant='body1' fontWeight={400}>
              {params.row.username}
            </Typography>
          );
        },
      },
      {
        headerName: 'Họ & Tên đệm',
        field: 'firstName',
        flex: 0.9,
        headerAlign: 'left',
        align: 'left',
        renderCell(params) {
          return (
            <Typography variant='body1' color='initial'>
              {params.row.fullName.trim().split(' ').slice(0, -1).join(' ')}
            </Typography>
          );
        },
      },
      {
        headerName: 'Tên',
        field: 'lastName',
        flex: 0.5,
        headerAlign: 'left',
        align: 'left',
        renderCell(params) {
          return (
            <Typography variant='body1' color='initial'>
              {params.row.fullName.trim().split(' ').pop()}
            </Typography>
          );
        },
      },

      {
        headerName: 'Email',
        field: 'email',
        flex: 1.5,
        align: 'left',
        headerAlign: 'left',
        renderCell(params) {
          return (
            <Typography variant='body1' color='grey.900'>
              {params.row.email ? params.row.email : 'Chưa có thông tin'}
            </Typography>
          );
        },
      },
      {
        headerName: 'Giới tính',
        field: 'gender',
        flex: 0.5,
        align: 'left',
        headerAlign: 'left',
        renderCell: (params: any) => {
          return <Typography variant='body1'>{checkGender(params.row.gender)}</Typography>;
        },
      },
      {
        headerName: 'Lớp danh nghĩa',
        field: 'clazzName',
        flex: 0.7,
        align: 'left',

        headerAlign: 'left',
      },
      {
        headerName: 'Chức năng',
        field: 'name8',
        flex: 1,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params: any) => (
          <Box display={'flex'} gap={3}>
            <Tooltip
              onClick={() =>
                handleOpenStatusStudentModal(
                  params.row.id,
                  params.row.fullName,
                  params.row.isActive,
                )
              }
              title={params.row.isActive ? 'Tài khoản đang hoạt động' : 'Tài khoản đã bị khóa'}
            >
              <IconButton size='small' color={params.row.isActive ? 'success' : 'error'}>
                <Icon
                  width={20}
                  style={{ color: '#034eb1' }}
                  icon={params.row.isActive ? 'bi:unlock' : 'material-symbols:lock-outline'}
                />
              </IconButton>
            </Tooltip>

            <Tooltip
              onClick={() => handleOpenInfoModal(params.row.id, params.row.fullName)}
              title='Cập nhật thông tin'
            >
              <IconButton size='small'>
                <Icon width={20} icon='fa-solid:user-edit' style={{ color: '#0288d1' }} />
              </IconButton>
            </Tooltip>
            <Box></Box>
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
            <Tooltip
              onClick={() => handleOpenDeleteStudentModal(params.row.id, params.row.fullName)}
              title='Xóa sinh viên'
            >
              <IconButton color='error' size='small'>
                <Icon width={20} icon='carbon:close-filled' style={{ color: ' #f2365b' }} />
              </IconButton>
            </Tooltip>
          </Box>
        ),
      },
    ],
    [],
  );
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
          isLimit={true}
          columns={basicColumns}
          totalItems={totalItems}
          totalPages={totalPage}
          handleChangeLimit={handleChangeLimit}
          handleChangePage={handleChangePage}
          page={page}
          limit={limit}
          disableColumnFilter
          minHeight={400}
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
        />
      </Box>
      <ResetPassword
        name={openResetPasswordStudentModal.name}
        studentId={openResetPasswordStudentModal.studentId}
        open={openResetPasswordStudentModal.isOpen}
        onClose={handleCloseResetPasswordStudentModal}
        username={openResetPasswordStudentModal.username}
      />
      <EditInfoModal
        studentId={openEditInfoModal.studentId}
        open={openEditInfoModal.isOpen}
        onClose={handleCloseEditInfoModal}
      />
      <EditStatus
        name={openEditStatusStudentModal.name}
        status={openEditStatusStudentModal.status}
        open={openEditStatusStudentModal.isOpen}
        onClose={handleCloseEditStatusStudentModal}
        studentId={openEditStatusStudentModal.studentId}
      />
      <DeleteModal
        name={openDeleteStudentModal.name}
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
