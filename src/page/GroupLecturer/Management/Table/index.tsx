import Table from '@/components/ui/Table/Table';
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Assign from '../../Assign';
import { Icon } from '@iconify/react';
import DeleteGroupModal from '../Modal/DeleteGroupModal';

function TableManagamentGroupLecturer(props: any) {
  const { rows, totalItems, totalPages, page, handelChangePage, groupType, ...rest } = props;
  const navigate = useNavigate();

  const [assignModal, setAssignModal] = useState({
    groupId: '',
    groupName: '',
    totalAssigns: 0,
    isOpen: false,
  });
  const handleOpenAssignModal = (groupId: string, groupName: string, totalAssigns: number) => {
    setAssignModal({ groupId, groupName, totalAssigns, isOpen: true });
  };
  const handleCloseAssignModal = () => {
    setAssignModal((pre: any) => ({ ...pre, isOpen: false }));
  };

  //
  const [openModalDelete, setOpenModalDelete] = useState({
    isOpen: false,
    grLecturerId: '',
    groupLecturerName: '',
  });

  const handleOpenModalDelete = (grLecturerId: string, groupLecturerName: string) => {
    setOpenModalDelete({
      grLecturerId: grLecturerId,
      groupLecturerName: groupLecturerName,
      isOpen: true,
    });
  };
  const handleCloseModalDelete = () => {
    setOpenModalDelete((pre: any) => ({ ...pre, isOpen: false }));
  }
  const basicColumns: GridColDef[] = [
    {
      headerName: 'Mã nhóm',
      field: 'name',
      flex: 0.3,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) => {
        return (
          <Box>
            <Typography variant='h6' fontWeight={'bold'} color='primary.main'>
              {params.row.name}
            </Typography>
          </Box>
        );
      },
    },
    {
      headerName: 'Thông tin thành viên ',
      field: 'name3',
      headerAlign: 'left',
      flex: 1,
      renderCell: (params: any) => {
        return (
          <Box>
            {params.row.members.map((mem: any, index: number) => (
              <Box component={'div'} my={2}>
                <Typography mr={4} component={'span'}>
                  {mem.username}
                </Typography>
                {' - '}
                <Typography ml={4} component={'span'} width={100} color='initial'>
                  {mem.fullName}
                </Typography>
              </Box>
            ))}
          </Box>
        );
      },
    },
    {
      headerName: 'Số nhóm sinh viên phân công',
      field: 'totalAssigns',
      headerAlign: 'center',
      align: 'center',
      flex: 0.7,
    },
    {
      headerName: 'Chức năng',
      field: 'name8',
      flex: 0.8,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) => (
        <Box display={'flex'} gap={6}>
          <Button
            size='large'
            onClick={() => navigate(`/group-lecturers/details/${params.row.id}`)}
          >
            Xem chi tiết
          </Button>
          <Button
            size='large'
            sx={{
              color: 'orange',
            }}
            color='warning'
            onClick={() =>
              handleOpenAssignModal(params.row.id, params.row.name, params.row.totalAssigns)
            }
          >
            Xem/Phân công
          </Button>
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
  return (
    <>
      <Box>
        <Table
          rows={rows}
          sx={{
            bgcolor: 'white',
          }}
          rowHeight={100}
          columns={basicColumns}
          totalItems={1}
          totalPages={1}
          page={1}
          handleChangePage={() => {}}
          disableColumnFilter
        />
      </Box>
      <Assign
        groupId={assignModal.groupId}
        groupName={assignModal.groupName}
        totalAssigns={assignModal.totalAssigns}
        onClose={handleCloseAssignModal}
        open={assignModal.isOpen}
        groupType={groupType}
      />
      <DeleteGroupModal
        groupLecturerId={openModalDelete.grLecturerId}
        groupLecturerName={openModalDelete.groupLecturerName}
        open={openModalDelete.isOpen}
        onClose={handleCloseModalDelete}
      />
    </>
  );
}

export default TableManagamentGroupLecturer;
