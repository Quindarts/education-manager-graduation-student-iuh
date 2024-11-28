import Table from '@/components/ui/Table/Table';
import { getCardTopicStatus } from '@/utils/validations/topic.validation';
import { Icon } from '@iconify/react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useMemo, useState } from 'react';
import DeleteModal from '@/components/Page/Topic/Modal/DeleteModal';
import AddGroupStudentToTopicModal from '@/components/Page/Topic/Modal/AddGroupStudentToTopic';
import EditModal from '@/components/Page/Topic/Modal/EditModal';
import InfoModal from '@/components/Page/Topic/Modal/InfoModal';

function TableTopicLecturer(props: any) {
  const { rows, totalItems, limit, totalPage, isPanigation, page, ...rest } = props;
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
  const [openEditModal, setOpenEditModal] = useState({ topicId: '', isOpen: false });

  const handleCloseEditModal = () => {
    setOpenEditModal({ ...openEditModal, isOpen: false });
  };
  const handleOpenEditModal = (topicId: string) => {
    setOpenEditModal({ topicId, isOpen: true });
  };

  const LecturerColumn: GridColDef[] = useMemo(
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
        flex: 1.5,
        headerAlign: 'left',
        align: 'left',
      },
      {
        headerName: 'SL nhóm đề tài',
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
        headerName: 'Chức năng',
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
              <IconButton color='primary'>
                <Icon icon='ph:pencil-line-fill' width={20} style={{ color: '#0288d1' }} />
              </IconButton>
            </Tooltip>
            <Tooltip
              title='Xem thông tin đề tài'
              onClick={() => handleOpenInfoModal(params.row.id)}
            >
              <IconButton>
                <Icon width={20} icon='flat-color-icons:view-details' />
              </IconButton>
            </Tooltip>
            <Tooltip
              title='Xóa đề tài'
              onClick={() => handleOpenDeleteModal(params.row.id, params.row.name)}
            >
              <IconButton>
                <Icon width={20} icon='carbon:close-filled' style={{ color: ' #f2365b' }} />
              </IconButton>
            </Tooltip>
          </Box>
        ),
      },
    ],
    [handleOpenDeleteModal, handleOpenEditModal, handleOpenInfoModal],
  );

  return (
    <>
      <Table
        isLimit={false}
        rows={rows}
        sx={{
          minHeight: 500,
        }}
        rowHeight={75}
        isPanigation={isPanigation}
        columns={LecturerColumn}
        totalItems={rows.length}
        totalPages={totalPage}
        page={page}
        disableColumnFilter
        limit={limit}
      />
      <DeleteModal
        open={openDeleteModal.isOpen}
        name={openDeleteModal.name}
        onClose={handleCloseDeleteModal}
        topicId={openDeleteModal.topicId}
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
        key={openInfoModal.topicId}
        open={openInfoModal.isOpen}
        onClose={handleCloseInfoModal}
        topicId={openInfoModal.topicId}
      />
    </>
  );
}

export default TableTopicLecturer;
