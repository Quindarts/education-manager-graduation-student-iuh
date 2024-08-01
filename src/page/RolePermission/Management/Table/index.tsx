import Table from '@/components/ui/Table/Table';
import { checkRoleLecturer, checkRoleLecturerColor } from '@/utils/validations/lecturer.validation';
import { Icon } from '@iconify/react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditRoleModal from '../Modal/EditModal';

function TableManagementRole(props: any) {
  const { rows, totalItems, totalPage, page, handleChangePage } = props;
  const navigate = useNavigate();

  const [openEditInfoModal, setOpenEditInfoModal] = useState({
    lecturerId: '',
    lecturerName: '',
    username: '',
    isOpen: false,
  });

  const handleCloseEditInfoModal = () => {
    setOpenEditInfoModal({ ...openEditInfoModal, isOpen: false });
  };
  const handleOpenRoleModal = (lecturerId: string, lecturerName: string, username: string) => {
    setOpenEditInfoModal({ lecturerId, lecturerName, username, isOpen: true });
  };

  const basicColumns: GridColDef[] = [
    {
      headerName: 'Mã Giảng Viên',
      field: 'username',
      flex: 0.6,
      headerAlign: 'center',
      align: 'center',
      renderCell(params) {
        return (
          <Typography variant='body1' fontWeight={600} color='primary'>
            {params.row.username}
          </Typography>
        );
      },
    },
    {
      headerName: 'Họ & Tên đệm',
      field: 'firstName',
      flex: 0.7,
      headerAlign: 'center',
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
      field: 'lastname',
      flex: 0.5,
      headerAlign: 'center',
      align: 'center',
      renderCell(params) {
        return (
          <Typography variant='body1' color='initial'>
            {params.row.fullName.trim().split(' ').pop()}
          </Typography>
        );
      },
    },
    {
      headerName: 'Chuyên ngành',
      field: 'none2',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) => <Typography variant='body1'>{params.row.majorName}</Typography>,
    },
    {
      headerName: 'Quyền người dùng',
      field: 'myRole',
      flex: 2,
      headerAlign: 'center',
      renderCell: (params: any) => {
        return (
          <Box display={'flex'} flexWrap={'wrap'} gap={4}>
            {params.row.roles.map((role: string) => (
              <Typography
                display={'flex'}
                color={checkRoleLecturerColor(role)}
                alignItems={'center'}
                justifyItems={'center'}
                gap={2}
                bgcolor={'grey.300'}
                px={4}
                py={2}
                borderRadius={3}
                variant='body1'
              >
                <Typography
                  borderRadius={'50%'}
                  width={10}
                  height={10}
                  bgcolor={checkRoleLecturerColor(role)}
                  variant='body1'
                  color='initial'
                >
                </Typography>
                {checkRoleLecturer(role)}
              </Typography>
            ))}
          </Box>
        );
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
            title='Cập nhật quyền'
            onClick={() =>
              handleOpenRoleModal(params.row.id, params.row.fullName, params.row.username)
            }
          >
            <IconButton size='small'>
              <Icon width={22} color='#014895' icon='uiw:setting' />
            </IconButton>
          </Tooltip>
          <Box></Box>
          {/* <Tooltip title='Xem Chi tiết quyền'>
            <IconButton
              color='primary'
              size='small'
              onClick={() => navigate(`/authorizations/lecturers?lecturerId=${params.row.id}`)}
            >
              <Icon width={20} icon='mdi:card-account-details-star-outline' />
            </IconButton>
          </Tooltip> */}
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
          rowHeight={80}
          columns={basicColumns}
          totalItems={rows.length}
          totalPages={totalPage}
          page={page}
          handleChangePage={handleChangePage}
          disableColumnMenu
          disableColumnFilter
          disableColumnSelector
          minHeight={400}
        />
      </Box>
      <EditRoleModal
        open={openEditInfoModal.isOpen}
        lecturerName={openEditInfoModal.lecturerName}
        username={openEditInfoModal.username}
        lecturerId={openEditInfoModal.lecturerId}
        onClose={handleCloseEditInfoModal}
      />
    </>
  );
}

export default TableManagementRole;
