import Table from '@/components/ui/Table/Table';
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Assign from '../../Assign';
import { Icon } from '@iconify/react';
import DeleteGroupModal from '../Modal/DeleteGroupModal';
import dayjs from 'dayjs';
import EditInfoGroupModal from '../Modal/EditInfoGroupModal';

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
  };

  const [openModalEditInfo, setOpenModalEditInfo] = useState({
    isOpen: false,
    grLecturerId: '',
    groupLecturerName: '',
  });

  const handleOpenModalEditInfo = (grLecturerId: string, groupLecturerName: string) => {
    setOpenModalEditInfo({
      grLecturerId: grLecturerId,
      groupLecturerName: groupLecturerName,
      isOpen: true,
    });
  };
  const handleCloseModalEditInfo = () => {
    setOpenModalEditInfo((pre: any) => ({ ...pre, isOpen: false }));
  };
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
      align: 'left',
      flex: 0.8,
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
      headerName: 'Thông tin phản biện',
      field: 'time',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
      renderCell(params) {
        return (
          <Box sx={{ width: '100%' }}>
            {params.row.startDate && params.row.endDate && params.row.location ? (
              <>
                <Typography component={'span'}>
                  Bắt đầu: {dayjs(params.row.startDate).format('DD/MM/YYYY hh :mm :ss A')}
                </Typography>

                <Typography>
                  Kết thúc: {dayjs(params.row.endDate).format('DD/MM/YYYY hh :mm :ss A')}
                </Typography>
                <Typography variant='body1' color='initial'>
                  Địa điểm: {params.row.location}
                </Typography>
                <Button
                  sx={{ fontSize: 11, ml: 8 }}
                  onClick={() => handleOpenModalEditInfo(params.row.id, params.row.name)}
                  startIcon={<Icon icon='mingcute:edit-4-line' />}
                >
                  Sửa{' '}
                </Button>
              </>
            ) : (
              <Typography variant='body1' color='initial'>
                Chưa cập nhật
                <Button
                  sx={{ fontSize: 11, ml: 8 }}
                  onClick={() => handleOpenModalEditInfo(params.row.id, params.row.name)}
                  startIcon={<Icon icon='mingcute:edit-4-line' />}
                >
                  Sửa{' '}
                </Button>
              </Typography>
            )}
          </Box>
        );
      },
    },
    {
      headerName: 'Số nhóm SV',
      field: 'totalAssigns',
      headerAlign: 'center',
      align: 'center',
      flex: 0.4,
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
          rowHeight={120}
          columns={basicColumns}
          totalItems={rows?.length}
          isPanigation={false}
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
      <EditInfoGroupModal
        groupLecturerId={openModalEditInfo.grLecturerId}
        groupLecturerName={openModalEditInfo.groupLecturerName}
        open={openModalEditInfo.isOpen}
        onClose={handleCloseModalEditInfo}
      />
    </>
  );
}

export default TableManagamentGroupLecturer;
