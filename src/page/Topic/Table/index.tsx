import Table from '@/components/ui/Table/Table';
import { getCardTopicStatus } from '@/utils/validations/topic.validation';
import { Icon } from '@iconify/react';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useState } from 'react';
import InfoModal from '../Modal/InfoModal';
import AcceptTopicModal from '../Modal/AcceptTopicModal';
import RefuseTopicModal from '../Modal/RefuseTopicModal';
import EditModal from '../Modal/EditModal';

function TableManagamentTopic(props: any) {
  const { rows, totalItems, totalPages, page, handelChangePage, isApprovePermission, ...rest } =
    props;

  //handle
  const [openInfoModal, setOpenEditInfoModal] = useState({ topic_id: '', isOpen: false });
  const handleCloseInfoModal = () => {
    setOpenEditInfoModal({ ...openInfoModal, isOpen: false });
  };
  const handleOpenInfoModal = (topic_id: string) => {
    setOpenEditInfoModal({ topic_id, isOpen: true });
  };

  //handle
  const [openAcceptModal, setOpenEditAcceptModal] = useState({ topic_id: '', isOpen: false });
  const handleCloseAcceptModal = () => {
    setOpenEditAcceptModal({ ...openAcceptModal, isOpen: false });
  };
  const handleOpenAcceptModal = (topic_id: string) => {
    setOpenEditAcceptModal({ topic_id, isOpen: true });
  };

  //handle
  const [openRefuseModal, setOpenEditRefuseModal] = useState({ topic_id: '', isOpen: false });
  const handleCloseRefuseModal = () => {
    setOpenEditRefuseModal({ ...openRefuseModal, isOpen: false });
  };
  const handleOpenRefuseModal = (topic_id: string) => {
    setOpenEditRefuseModal({ topic_id, isOpen: true });
  };

  //handle
  const [openEditModal, setOpenEditModal] = useState({ topic_id: '', isOpen: false });

  const handleCloseEditModal = () => {
    setOpenEditModal({ ...openEditModal, isOpen: false });
  };
  const handleOpenEditModal = (topic_id: string) => {
    setOpenEditModal({ topic_id, isOpen: true });
  };
  //Permission

  const ApproveTopicColumn = isApprovePermission
    ? {
        headerName: 'Duyệt đề tài',
        field: 'status',
        flex: 1.2,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params: any) => {
          return (
            <>
              {params.row.status === 'PENDING' && (
                <Box display={'flex'} gap={2}>
                  <Button
                    onClick={() => handleOpenAcceptModal(params.row.id)}
                    color='success'
                    variant='outlined'
                  >
                    Duyệt <Icon icon='mdi:tick-outline' />
                  </Button>
                  <Button
                    onClick={() => handleOpenRefuseModal(params.row.id)}
                    color='error'
                    variant='outlined'
                  >
                    Từ chối
                    <Icon icon='mingcute:close-fill' />
                  </Button>
                </Box>
              )}
            </>
          );
        },
      }
    : {};

  const basicColumns: GridColDef[] = [
    {
      headerName: 'Tên Đề tài',
      field: 'name',
      flex: 1.5,
      headerAlign: 'center',
      align: 'center',
    },
    {
      headerName: 'Số lượng',
      field: 'quantityGroupMax',
      flex: 0.7,
      headerAlign: 'center',
      align: 'center',
    },
    {
      headerName: 'Mục tiêu',
      field: 'target',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      headerName: '',
      field: 'none',
      flex: 1,
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
        </Box>
      ),
    },
    {
      headerName: 'Trạng thái',
      field: 'text2',
      flex: 1.2,
      headerAlign: 'center',
      align: 'center',
      renderCell: (param) => {
        return <Box>{getCardTopicStatus(param.row.status)}</Box>;
      },
    },
    ApproveTopicColumn,
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
          columns={basicColumns}
          totalItems={1}
          totalPages={1}
          page={1}
          checkboxSelection={true}
          handleChangePage={() => {}}
          disableColumnMenu
          disableColumnFilter
          disableColumnSelector
        />
        <EditModal
          open={openEditModal.isOpen}
          onClose={handleCloseEditModal}
          topic_id={openEditModal.topic_id}
        />
        <InfoModal
          open={openInfoModal.isOpen}
          onClose={handleCloseInfoModal}
          topic_id={openInfoModal.topic_id}
        />
        {isApprovePermission && (
          <>
            <AcceptTopicModal
              open={openAcceptModal.isOpen}
              onClose={handleCloseAcceptModal}
              topic_id={openAcceptModal.topic_id}
            />
            <RefuseTopicModal
              open={openRefuseModal.isOpen}
              onClose={handleCloseRefuseModal}
              topic_id={openRefuseModal.topic_id}
            />
          </>
        )}
      </>
    </Box>
  );
}

export default TableManagamentTopic;
