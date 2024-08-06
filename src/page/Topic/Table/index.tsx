import Table from '@/components/ui/Table/Table';
import { getCardTopicStatus } from '@/utils/validations/topic.validation';
import { Icon } from '@iconify/react';
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useState } from 'react';
import InfoModal from '../Modal/InfoModal';
import AcceptTopicModal from '../Modal/AcceptTopicModal';
import RefuseTopicModal from '../Modal/RefuseTopicModal';
import EditModal from '../Modal/EditModal';
import { CustomToolbar } from './custom';
import DeleteModal from '../Modal/DeleteModal';
import { useTerm } from '@/hooks/api/useQueryTerm';
import { useTopic } from '@/hooks/api/useQueryTopic';

function TableManagamentTopic(props: any) {
  const { rows, totalItems, totalPages, page, handelChangePage, isApprovePermission, ...rest } =
    props;
  const { handleUiRender } = useTopic();
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
      headerName: 'STT',
      field: 'stt',
      flex: 0.2,
      headerAlign: 'center',
      align: 'center',
    },
    {
      headerName: 'Tên Đề tài',
      field: 'name',
      flex: 1.5,
      headerAlign: 'center',
      align: 'left',
    },
    {
      headerName: 'Giảng viên HD',
      field: 'fullName',
      headerAlign: 'center',
      align: 'left',
      flex: 0.8,
    },
    {
      headerName: 'SL nhóm tối đa',
      field: 'quantityGroupMax',
      flex: 0.4,
      headerAlign: 'center',
      align: 'center',
    },
    {
      headerName: 'Trạng thái',
      field: 'text2',
      flex: 0.6,
      headerAlign: 'center',
      align: 'center',
      renderCell: (param) => {
        return <Box>{getCardTopicStatus(param.row.status)}</Box>;
      },
    },
    {
      headerName: 'Tính năng thêm',
      field: 'none',
      flex: 0.6,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) => (
        <Box display={'flex'} gap={2}>
          <Tooltip
            title='Chỉnh sửa thông tin đề tài'
            onClick={() => handleOpenEditModal(params.row.id)}
          >
            <IconButton size='small' color='primary'>
              <Icon icon='ph:pencil-line-fill' width={20} style={{ color: '#0288d1' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title='Xem thông tin đề tài' onClick={() => handleOpenInfoModal(params.row.id)}>
            <IconButton size='small'>
              <Icon width={20} icon='flat-color-icons:view-details' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Xóa đề tài' onClick={() => handleOpenDeleteModal(params.row.id)}>
            <IconButton size='small'>
              <Icon width={20} icon='carbon:close-filled' style={{ color: ' #f2365b' }} />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
    {
      headerName: 'Duyệt đề tài',
      field: 'status',
      flex: 0.8,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) => {
        return (
          <>
            {params.row.status === 'PENDING' && (
              <Box display={'flex'} gap={2}>
                <Button
                  size='small'
                  onClick={() => handleOpenAcceptModal(params.row.id)}
                  color='success'
                  variant='outlined'
                  sx={{
                    fontSize: {
                      md: 12,
                      lg: 12,
                    },
                    px: 0,
                  }}
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
      headerName: 'STT',
      field: 'stt',
      flex: 0.2,
      headerAlign: 'center',
      align: 'center',
    },
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
      headerName: 'Tính năng thêm',
      field: 'none',
      flex: 0.7,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) => (
        <Box display={'flex'} gap={2}>
          {params.row.status !== 'APPROVED' && (
            <Tooltip
              title='Chỉnh sửa thông tin đề tài'
              onClick={() => handleOpenEditModal(params.row.id)}
            >
              <IconButton color='primary'>
                <Icon icon='ph:pencil-line-fill' width={20} style={{ color: '#0288d1' }} />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip onClick={() => handleOpenInfoModal(params.row.id)} title='Xem thông tin đề tài'>
            <IconButton>
              <Icon width={20} icon='flat-color-icons:view-details' />
            </IconButton>
          </Tooltip>
          {params.row.status !== 'APPROVED' && handleUiRender().includes('crud') ? (
            <Tooltip title='Xóa đề tài' onClick={() => handleOpenDeleteModal(params.row.id)}>
              <IconButton>
                <Icon width={20} icon='carbon:close-filled' style={{ color: ' #f2365b' }} />
              </IconButton>
            </Tooltip>
          ) : (
            <></>
          )}
        </Box>
      ),
    },
  ];

  return (
    <Box {...rest}>
      {' '}
      <>
        <Table
          rows={rows.map((row: any, index: number) => ({ ...row, stt: index + 1 }))}
          // minHeight={500}
          rowHeight={100}
          columns={isApprovePermission ? HeadLecturerColumn : LecturerColumn}
          totalItems={rows.length}
          totalPages={1}
          page={1}
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
