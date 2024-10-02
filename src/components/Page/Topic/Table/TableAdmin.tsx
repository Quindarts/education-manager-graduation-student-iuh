import Table from '@/components/ui/Table/Table';
import { getCardTopicStatus } from '@/utils/validations/topic.validation';
import { Icon } from '@iconify/react';
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useMemo, useState } from 'react';
import DeleteModal from '@/components/Page/Topic/Modal/DeleteModal';
import AddGroupStudentToTopicModal from '@/components/Page/Topic/Modal/AddGroupStudentToTopic';
import EditModal from '@/components/Page/Topic/Modal/EditModal';
import InfoModal from '@/components/Page/Topic/Modal/InfoModal';
import AcceptTopicModal from '@/components/Page/Topic/Modal/AcceptTopicModal';
import RefuseTopicModal from '@/components/Page/Topic/Modal/RefuseTopicModal';

const TableTopicAdmin = (props: any) => {
  const { rows, totalItems, limit, totalPage, page, handleChangePage, handleChangeLimit, ...rest } =
    props;
  const HeadLecturerColumn: GridColDef[] = useMemo(
    () => [
      {
        headerName: 'Mã đề tài',
        field: 'key',
        headerAlign: 'center',
        align: 'center',
        flex: 0.4,
      },
      {
        headerName: 'Tên Đề tài',
        field: 'name',
        flex: 2,
        headerAlign: 'left',
        align: 'left',
        renderCell(params) {
          return (
            <Typography variant='body1' textTransform={'lowercase'}>
              {params.row.name}
            </Typography>
          );
        },
      },
      {
        headerName: 'Giảng viên HD',
        field: 'fullName',
        headerAlign: 'left',
        align: 'left',
        flex: 0.8,
      },
      {
        headerName: 'SL nhóm',
        field: 'quantityGroupMax',
        flex: 0.5,
        headerAlign: 'right',
        align: 'right',
        renderCell: (param) => (
          <Box>
            {param.row.quantityGroup} / {param.row.quantityGroupMax}
          </Box>
        ),
      },
      {
        headerName: 'Trạng thái',
        field: 'text2',
        flex: 0.6,
        headerAlign: 'center',
        align: 'center',
        renderCell: (param) => <Box>{getCardTopicStatus(param.row.status)}</Box>,
      },
      {
        headerName: 'Duyệt đề tài',
        field: 'status',
        flex: 0.7,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params: any) => (
          <>
            {params.row.status === 'PENDING' ? (
              <Box display={'flex'} gap={2}>
                <Button
                  size='small'
                  onClick={() => handleOpenAcceptModal(params.row.id, params.row.name)}
                  color='success'
                >
                  <Icon style={{ marginRight: 1 }} icon='mdi:tick-outline' />
                  Duyệt
                </Button>
                <Button
                  size='small'
                  onClick={() => handleOpenRefuseModal(params.row.id, params.row.name)}
                  color='error'
                >
                  <Icon style={{ marginRight: 1 }} icon='lets-icons:cancel-fill' />
                  Từ chối
                </Button>
              </Box>
            ) : (
              <>
                {params.row.status === 'APPROVED' && (
                  <Button size='small' onClick={() => handleOpenAddGroupStudent(params.row)}>
                    Gán/xem đề tài
                  </Button>
                )}
              </>
            )}
          </>
        ),
      },
      {
        headerName: 'Chức năng ',
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
            <Tooltip
              title='Xem thông tin đề tài'
              onClick={() => handleOpenInfoModal(params.row.id)}
            >
              <IconButton size='small'>
                <Icon width={20} icon='flat-color-icons:view-details' />
              </IconButton>
            </Tooltip>
            <Tooltip
              title='Xóa đề tài'
              onClick={() => handleOpenDeleteModal(params.row.id, params.row.name)}
            >
              <IconButton size='small'>
                <Icon width={20} icon='carbon:close-filled' style={{ color: ' #f2365b' }} />
              </IconButton>
            </Tooltip>
          </Box>
        ),
      },
    ],
    [],
  );
  //handle
  const [openInfoModal, setOpenEditInfoModal] = useState({ topicId: '', isOpen: false });
  const handleCloseInfoModal = () => {
    setOpenEditInfoModal({ ...openInfoModal, isOpen: false });
  };
  const handleOpenInfoModal = (topicId: string) => {
    setOpenEditInfoModal({ topicId, isOpen: true });
  };

  //handle
  const [openAddGroupStudent, setOpenAddGroupStudent] = useState({ topic: {}, isOpen: false });
  const handleCloseAddGroupStudent = () => {
    setOpenAddGroupStudent({ ...openAddGroupStudent, isOpen: false });
  };
  const handleOpenAddGroupStudent = (topic: any) => {
    setOpenAddGroupStudent({ topic, isOpen: true });
  };

  //handle
  const [openDeleteModal, setOpenEditDeleteModal] = useState({
    topicId: '',
    name: '',
    isOpen: false,
  });
  const handleCloseDeleteModal = () => {
    setOpenEditDeleteModal({ ...openDeleteModal, isOpen: false });
  };
  const handleOpenDeleteModal = (topicId: string, name: string) => {
    setOpenEditDeleteModal({ topicId, name, isOpen: true });
  };

  //handle
  const [openAcceptModal, setOpenEditAcceptModal] = useState({
    topicId: '',
    name: '',
    isOpen: false,
  });
  const handleCloseAcceptModal = () => {
    setOpenEditAcceptModal({ ...openAcceptModal, isOpen: false });
  };
  const handleOpenAcceptModal = (topicId: string, name: string) => {
    setOpenEditAcceptModal({ topicId, name, isOpen: true });
  };

  //handle
  const [openRefuseModal, setOpenEditRefuseModal] = useState({
    topicId: '',
    name: '',
    isOpen: false,
  });
  const handleCloseRefuseModal = () => {
    setOpenEditRefuseModal({ ...openRefuseModal, isOpen: false });
  };
  const handleOpenRefuseModal = (topicId: string, name: string) => {
    setOpenEditRefuseModal({ topicId, name, isOpen: true });
  };

  //handle
  const [openEditModal, setOpenEditModal] = useState({ topicId: '', isOpen: false });

  const handleCloseEditModal = () => {
    setOpenEditModal({ ...openEditModal, isOpen: false });
  };
  const handleOpenEditModal = (topicId: string) => {
    setOpenEditModal({ topicId, isOpen: true });
  };

  return (
    <>
      <Table
        isLimit={true}
        rows={rows.map((row: any, index: number) => ({ ...row }))}
        sx={{
          minHeight: 500,
        }}
        rowHeight={75}
        columns={HeadLecturerColumn}
        totalItems={rows.length}
        totalPages={totalPage}
        page={page}
        handleChangeLimit={handleChangeLimit}
        handleChangePage={handleChangePage}
        disableColumnFilter
        limit={limit}
      />
      <DeleteModal
        open={openDeleteModal.isOpen}
        name={openDeleteModal.name}
        onClose={handleCloseDeleteModal}
        topicId={openDeleteModal.topicId}
      />
      <AcceptTopicModal
        key={openAcceptModal.topicId}
        open={openAcceptModal.isOpen}
        name={openAcceptModal.name}
        onClose={handleCloseAcceptModal}
        topicId={openAcceptModal.topicId}
      />
      <RefuseTopicModal
        key={openAcceptModal.topicId}
        open={openRefuseModal.isOpen}
        name={openRefuseModal.name}
        onClose={handleCloseRefuseModal}
        topicId={openRefuseModal.topicId}
      />
      <AddGroupStudentToTopicModal
        open={openAddGroupStudent.isOpen}
        onClose={handleCloseAddGroupStudent}
        topic={openAddGroupStudent.topic}
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
    </>
  );
};

export default TableTopicAdmin;
