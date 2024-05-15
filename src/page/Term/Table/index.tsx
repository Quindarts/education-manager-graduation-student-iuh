import Table from '@/components/ui/Table/Table';
import { dummyTerms } from '@/dummy/term';
import { Icon } from '@iconify/react';
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useState } from 'react';
import EditGroupRegister from '../Modal/EditGroupRegister';
import EditTopicRegister from '../Modal/EditTopicRegister';
import EditPublicResult from '../Modal/EditPublicResult';
import DeleteModal from '../Modal/DeleteModal';
import TermDetail from '../Modal/TermDetail';

function TableManagamentTerm(props: any) {
  const { rows, totalItems, totalPages, page, handelChangePage, ...rest } = props;
  const [openModalEditGroupRegister, setOpenModalEditGroupRegister] = useState({
    isOpen: false,
    term_id: 0,
  });
  const handleCloseEditGroupRegister = () => {
    setOpenModalEditGroupRegister({
      ...openModalEditGroupRegister,
      isOpen: false,
    });
  };
  const handleOpenEditGroupRegister = (term_id: any) => {
    setOpenModalEditGroupRegister({ term_id: term_id, isOpen: true });
  };

  //Hanlde
  const [openModalEditTopicRegister, setOpenModalEditTopicRegister] = useState({
    isOpen: false,
    term_id: 0,
  });
  const handleCloseEditTopicRegister = () => {
    setOpenModalEditTopicRegister({
      ...openModalEditTopicRegister,
      isOpen: false,
    });
  };
  const handleOpenEditTopicRegister = (term_id: any) => {
    setOpenModalEditTopicRegister({ term_id: term_id, isOpen: true });
  };

  //Handle
  const [openModalPublicResult, setOpenModalPublicResult] = useState({
    isOpen: false,
    term_id: 0,
  });

  const handleClosePublicResult = () => {
    setOpenModalPublicResult({
      ...openModalPublicResult,
      isOpen: false,
    });
  };
  const handleOpenPublicResult = (term_id: any) => {
    setOpenModalPublicResult({ term_id: term_id, isOpen: true });
  };
  //
  const [openDeleteTermModal, setOpenDeleteTermModal] = useState({
    term_id: 0,
    isOpen: false,
  });

  const handleCloseDeleteTermModal = () => {
    setOpenDeleteTermModal({ ...openDeleteTermModal, isOpen: false });
  };
  const handleOpenDeleteTermModal = (term_id: number) => {
    setOpenDeleteTermModal({ term_id, isOpen: true });
  };

  //
  const [openModalTermDetail, setOpenModalTermDetail] = useState({
    isOpen: false,
    term_id: 0,
  });
  const handleCloseTermDetail = () => {
    setOpenModalTermDetail({
      ...openModalTermDetail,
      isOpen: false,
    });
  };
  const handleOpenTermDetail = (term_id: number) => {
    setOpenModalTermDetail({ term_id, isOpen: true });
  };
  const basicColumns: GridColDef[] = [
    {
      headerName: 'Tên Học Kỳ',
      field: 'name',
      flex: 1.4,
      headerAlign: 'center',
      align: 'center',
    },
    {
      headerName: 'Ngày Bắt đầu',
      field: 'startDate',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      headerName: 'Ngày Kết thúc ',
      field: 'endDate',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      headerName: 'Đăng ký nhóm',
      field: 'name5',
      flex: 2,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <Box display={'flex'} gap={4} alignItems={'center'}>
            <Typography
              width={60}
              color={params.row.isGroupRegister ? 'success.main' : 'error.main'}
              fontWeight={'600'}
            >
              {params.row.isGroupRegister ? 'Đang mở' : 'Đóng'}
            </Typography>
            <Tooltip title='Cập nhật đăng ký nhóm'>
              <IconButton
                onClick={() => handleOpenEditGroupRegister(params.row.term_id)}
                color='primary'
                size='small'
              >
                <Icon icon='flat-color-icons:info' />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
    {
      headerName: 'Đăng ký đề tài',
      field: 'name6',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <Box display={'flex'} gap={4} alignItems={'center'}>
            <Typography
              width={60}
              color={params.row.isTopicRegister ? 'success.main' : 'error.main'}
              fontWeight={'600'}
            >
              {params.row.isTopicRegister ? 'Đang mở' : 'Đóng'}
            </Typography>
            <Tooltip title='Cập nhật đăng ký Đề tài'>
              <IconButton
                onClick={() => handleOpenEditTopicRegister(params.row.term_id)}
                color='primary'
                size='small'
              >
                <Icon icon='flat-color-icons:info' />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
    {
      headerName: 'Công bố kết quả',
      field: 'name8',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <Box display={'flex'} gap={4} alignItems={'center'}>
            <Typography
              width={60}
              color={params.row.isPublicResult ? 'success.main' : 'error.main'}
              fontWeight={'600'}
            >
              {params.row.isPublicResult ? 'Đang mở' : 'Đóng'}
            </Typography>
            <Tooltip title='Cập nhật công bố kết quả'>
              <IconButton
                onClick={() => handleOpenPublicResult(params.row.term_id)}
                color='primary'
                size='small'
              >
                <Icon icon='flat-color-icons:info' />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
    {
      headerName: '',
      field: 'name9',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) => (
        <Box display={'flex'} gap={6}>
          <Tooltip title='Xem thông tin học kì'>
            <IconButton
              onClick={() => {
                handleOpenTermDetail(params.row.term_id);
              }}
              size='small'
            >
              <Icon icon='noto-v1:eye-in-speech-bubble' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Xóa học kì'>
            <IconButton
              onClick={() => {
                handleOpenDeleteTermModal(params.row.term_id);
              }}
              size='small'
              color='error'
            >
              <Icon icon='mdi:trash' />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];
  return (
    <Box {...rest}>
      {' '}
      <Table
        rows={rows}
        sx={{
          bgcolor: 'white',
        }}
        columns={basicColumns}
        totalItems={1}
        totalPages={1}
        page={1}
        handelChangePage={() => {}}
        disableColumnMenu
        disableColumnFilter
        disableColumnSelector
      />
      <EditGroupRegister
        open={openModalEditGroupRegister.isOpen}
        onClose={handleCloseEditGroupRegister}
      />
      <EditTopicRegister
        open={openModalEditTopicRegister.isOpen}
        onClose={handleCloseEditTopicRegister}
      />
      <EditPublicResult open={openModalPublicResult.isOpen} onClose={handleClosePublicResult} />
      <DeleteModal onClose={handleCloseDeleteTermModal} open={openDeleteTermModal.isOpen} />
      <TermDetail onClose={handleCloseTermDetail} open={openModalTermDetail.isOpen} />
    </Box>
  );
}

export default TableManagamentTerm;
