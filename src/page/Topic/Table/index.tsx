import Table from '@/components/ui/Table/Table';
import { getCardTopicStatus } from '@/utils/validations/topic.validation';
import { Icon } from '@iconify/react';
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import InfoModal from '../Modal/InfoModal';
import AcceptTopicModal from '../Modal/AcceptTopicModal';
import RefuseTopicModal from '../Modal/RefuseTopicModal';
import EditModal from '../Modal/EditModal';
import { CustomToolbar } from './custom';
import DeleteModal from '../Modal/DeleteModal';

function TableManagamentTopic(props: any) {
  const { rows, totalItems, totalPages, page, handelChangePage, isApprovePermission, ...rest } =
    props;

  //handle
  const [openInfoModal, setOpenEditInfoModal] = useState({ topicId: '', isOpen: false });
  const handleCloseInfoModal = () => {
    setOpenEditInfoModal({ ...openInfoModal, isOpen: false });
  };
  const handleOpenInfoModal = (topicId: string) => {
    setOpenEditInfoModal({ topicId, isOpen: true });
  };

  //handle
  const [openDeleteModal, setOpenEditDeleteModal] = useState({ topicId: '', isOpen: false });
  const handleCloseDeleteModal = () => {
    setOpenEditDeleteModal({ ...openDeleteModal, isOpen: false });
  };
  const handleOpenDeleteModal = (topicId: string) => {
    setOpenEditDeleteModal({ topicId, isOpen: true });
  };

  //handle
  const [openAcceptModal, setOpenEditAcceptModal] = useState({ topicId: '', isOpen: false });
  const handleCloseAcceptModal = () => {
    setOpenEditAcceptModal({ ...openAcceptModal, isOpen: false });
  };
  const handleOpenAcceptModal = (topicId: string) => {
    setOpenEditAcceptModal({ topicId, isOpen: true });
  };

  //handle
  const [openRefuseModal, setOpenEditRefuseModal] = useState({ topicId: '', isOpen: false });
  const handleCloseRefuseModal = () => {
    setOpenEditRefuseModal({ ...openRefuseModal, isOpen: false });
  };
  const handleOpenRefuseModal = (topicId: string) => {
    setOpenEditRefuseModal({ topicId, isOpen: true });
  };

  //handle
  const [openEditModal, setOpenEditModal] = useState({ topicId: '', isOpen: false });

  const handleCloseEditModal = () => {
    setOpenEditModal({ ...openEditModal, isOpen: false });
  };
  const handleOpenEditModal = (topicId: string) => {
    setOpenEditModal({ topicId, isOpen: true });
  };
  const HeadLecturerColumn: GridColDef[] = [
    {
      headerName: 'Tên Đề tài',
      field: 'name',
      flex: 1.5,
      headerAlign: 'center',
    },
    {
      headerName: 'Giảng viên HD',
      field: 'target',
      headerAlign: 'center',
      align: 'center',
      flex: 0.8,
      renderCell: (params: any) => (
        <Typography variant='body2' color='initial'>
          {params.row.lecturerTerm.lecturer.fullName}
        </Typography>
      ),
    },
    {
      headerName: 'SL nhóm tối đa',
      field: 'quantityGroupMax',
      flex: 0.5,
      headerAlign: 'center',
      align: 'center',
    },
    {
      headerName: 'Ghi chú',
      field: 'note',
      flex: 1,
      headerAlign: 'center',
    },
    {
      headerName: 'Tính năng thêm',
      field: 'none',
      flex: 0.4,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) => (
        <Box display={'flex'} gap={2}>
          <Tooltip
            title='Chỉnh sửa thông tin đề tài'
            onClick={() => handleOpenEditModal(params.row.id)}
          >
            <IconButton size='small' color='primary'>
              <Icon icon='emojione:pencil' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Xem thông tin đề tài' onClick={() => handleOpenInfoModal(params.row.id)}>
            <IconButton size='small'>
              <Icon icon='noto-v1:eye-in-speech-bubble' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Xóa đề tài' onClick={() => handleOpenDeleteModal(params.row.id)}>
            <IconButton size='small'>
              <Icon icon='mdi:bin-empty' />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
    {
      headerName: 'Trạng thái',
      field: 'text2',
      flex: 0.4,
      headerAlign: 'center',
      align: 'center',
      renderCell: (param) => {
        return <Box>{getCardTopicStatus(param.row.status)}</Box>;
      },
    },
    {
      headerName: 'Duyệt đề tài',
      field: 'status',
      flex: 0.7,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) => {
        return (
          <>
            {params.row.status === 'PENDING' && (
              <Box display={'flex'} gap={4}>
                <Button
                  size='small'
                  onClick={() => handleOpenAcceptModal(params.row.id)}
                  color='success'
                  variant='outlined'
                >
                  <Icon style={{ marginRight: 1 }} icon='mdi:tick-outline' />
                  Duyệt
                </Button>
                <Button
                  size='small'
                  onClick={() => handleOpenRefuseModal(params.row.id)}
                  color='error'
                  variant='outlined'
                >
                  <Icon style={{ marginRight: 1 }} icon='lets-icons:cancel-fill' />
                  Từ chối
                </Button>
              </Box>
            )}
          </>
        );
      },
    },
  ];

  const LecturerColumn: GridColDef[] = [
    {
      headerName: 'Tên Đề tài',
      field: 'name',
      flex: 1.5,
      headerAlign: 'center',
    },
    {
      headerName: 'SL nhóm tối đa',
      field: 'quantityGroupMax',
      flex: 0.5,
      headerAlign: 'center',
      align: 'center',
    },
    {
      headerName: 'Ghi chú',
      field: 'note',
      flex: 1,
      headerAlign: 'center',
    },
    {
      headerName: 'Tính năng thêm',
      field: 'none',
      flex: 0.4,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) => (
        <Box display={'flex'} gap={2}>
          <Tooltip title='Chỉnh sửa thông tin đề tài'>
            <IconButton
              size='small'
              color='primary'
              onClick={() => handleOpenEditModal(params.row.id)}
            >
              <Icon icon='emojione:pencil' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Xem thông tin đề tài'>
            <IconButton size='small' onClick={() => handleOpenInfoModal(params.row.id)}>
              <Icon icon='noto-v1:eye-in-speech-bubble' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Xóa đề tài' onClick={() => handleOpenDeleteModal(params.row.id)}>
            <IconButton size='small'>
              <Icon icon='mdi:bin-empty' />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
    {
      headerName: 'Trạng thái',
      field: 'text2',
      flex: 0.4,
      headerAlign: 'center',
      align: 'center',
      renderCell: (param) => {
        return <Box>{getCardTopicStatus(param.row.status)}</Box>;
      },
    },
  ];
  return (
    <Box {...rest}>
      {' '}
      <>
        <Table
          rows={rows}
          sx={{
            bgcolor: 'white',
          }}
          minHeight={350}
          columns={isApprovePermission ? HeadLecturerColumn : LecturerColumn}
          totalItems={1}
          totalPages={1}
          page={1}
          checkboxSelection={true}
          handleChangePage={() => {}}
          disableColumnFilter
          slots={{
            toolbar: CustomToolbar,
          }}
        />
        <DeleteModal
          open={openDeleteModal.isOpen}
          onClose={handleCloseDeleteModal}
          topicId={openDeleteModal.topicId}
        />
        <EditModal
          // isApprovePermission={isApprovePermission}
          open={openEditModal.isOpen}
          onClose={handleCloseEditModal}
          topicId={openEditModal.topicId}
        />
        <InfoModal
          key={openAcceptModal.topicId}
          open={openInfoModal.isOpen}
          onClose={handleCloseInfoModal}
          topicId={openInfoModal.topicId}
        />
        {isApprovePermission && (
          <>
            <AcceptTopicModal
              key={openAcceptModal.topicId}
              open={openAcceptModal.isOpen}
              onClose={handleCloseAcceptModal}
              topicId={openAcceptModal.topicId}
            />
            <RefuseTopicModal
              key={openAcceptModal.topicId}
              open={openRefuseModal.isOpen}
              onClose={handleCloseRefuseModal}
              topicId={openRefuseModal.topicId}
            />
          </>
        )}
      </>
    </Box>
  );
}

export default TableManagamentTopic;
