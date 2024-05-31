import Table from '@/components/ui/Table/Table';
import { dummyTopics } from '@/dummy/topic';
import { getColorLecturer } from '@/utils/validations/lecturer.validation';
import { getColorStatusTopic, getNameStatus } from '@/utils/validations/topic.validation';
import { Icon } from '@iconify/react';
import { Box, Button, ButtonPropsColorOverrides, Chip, IconButton, Tooltip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useState } from 'react';
import InfoModal from '../Modal/InfoModal';
import AcceptTopicModal from '../Modal/AcceptTopicModal';
import { PanoramaSharp } from '@mui/icons-material';
import RefuseTopicModal from '../Modal/RefuseTopicModal';
interface EnumStatusTopicType {
  value: string;
  color: string;
}
function TableManagamentTopic(props: any) {
  const { rows, totalItems, totalPages, page, handelChangePage, ...rest } = props;
  const [openInfoModal, setOpenEditInfoModal] = useState({ topic_id: '', isOpen: false });

  const handleCloseInfoModal = () => {
    setOpenEditInfoModal({ ...openInfoModal, isOpen: false });
  };
  const handleOpenInfoModal = (topic_id: string) => {
    setOpenEditInfoModal({ topic_id, isOpen: true });
  };

  const [openAcceptModal, setOpenEditAcceptModal] = useState({ topic_id: '', isOpen: false });

  const handleCloseAcceptModal = () => {
    setOpenEditAcceptModal({ ...openAcceptModal, isOpen: false });
  };
  const handleOpenAcceptModal = (topic_id: string) => {
    setOpenEditAcceptModal({ topic_id, isOpen: true });
  };

  const [openRefuseModal, setOpenEditRefuseModal] = useState({ topic_id: '', isOpen: false });

  const handleCloseRefuseModal = () => {
    setOpenEditRefuseModal({ ...openRefuseModal, isOpen: false });
  };
  const handleOpenRefuseModal = (topic_id: string) => {
    setOpenEditRefuseModal({ topic_id, isOpen: true });
  };

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
    // {
    //   headerName: 'Mô tả',
    //   field: 'description',
    //   flex: 1.5,
    //   headerAlign: 'center',
    //   align: 'center',
    // },
    {
      headerName: 'Mục tiêu',
      field: 'target',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    // {
    //   headerName: 'Yêu cầu đầu vào',
    //   field: 'requireInput',
    //   flex: 1,
    //   headerAlign: 'center',
    //   align: 'center',
    // },
    // {
    //   headerName: 'Chuẩn đầu ra',
    //   field: 'standradOutput',
    //   flex: 1,
    //   headerAlign: 'center',
    //   align: 'center',
    // },
    {
      headerName: '',
      field: 'none',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) => (
        <Box display={'flex'} gap={2}>
          <Tooltip title='Chỉnh sửa thông tin đề tài'>
            <IconButton size='small' color='primary'>
              <Icon icon='emojione:pencil' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Xem thông tin đề tài'>
            <IconButton size='small' onClick={() => handleOpenInfoModal(params.row.id)}>
              <Icon icon='noto-v1:eye-in-speech-bubble' />
            </IconButton>
          </Tooltip>
          {/* <Tooltip title='Xóa đề tài'>
            <IconButton size='small'>
              <Icon color='#cc563d' icon='ri:delete-bin-2-fill' />
            </IconButton>
          </Tooltip> */}
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
        return (
          <>
            <Chip
              sx={{ color: `${getColorStatusTopic(param.row.status)}`, fontWeight: 500,fontSize:14 }}
              label={getNameStatus(param.row.status)}
            />
          </>
        );
      },
    },
    {
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
          columns={basicColumns}
          totalItems={1}
          totalPages={1}
          page={1}
          checkboxSelection={true}
          handelChangePage={() => {}}
          disableColumnMenu
          disableColumnFilter
          disableColumnSelector
        />
        <InfoModal
          open={openInfoModal.isOpen}
          onClose={handleCloseInfoModal}
          topic_id={openInfoModal.topic_id}
        />
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
    </Box>
  );
}

export default TableManagamentTopic;
