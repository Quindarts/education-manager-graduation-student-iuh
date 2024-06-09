import Table from '@/components/ui/Table/Table';
import { Icon } from '@iconify/react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useState } from 'react';
import EditGroupRegister from '../Modal/EditGroupRegister';
import EditTopicRegister from '../Modal/EditTopicRegister';
import EditPublicResult from '../Modal/EditPublicResult';
import TermDetail from '../Modal/TermDetail';
import { formatDates } from '@/utils/formatDate';
import dayjs from 'dayjs';

const checkStatusGroup = (startDate: any, endDate: any) => {
  let data: {
    mess: string;
    color: string;
  };
  if (startDate !== null && endDate !== null) {
    if (dayjs(endDate) < dayjs()) data = { mess: 'Đã đóng', color: 'error' };
    else if (dayjs(startDate) > dayjs()) data = { mess: 'Sắp diễn ra', color: 'primary' };
    else data = { mess: 'Đang mở', color: 'success.main' };
  } else {
    data = { mess: 'Chưa cập nhật', color: '' };
  }

  return (
    <Typography variant='body1' color={data.color}>
      {data.mess}
    </Typography>
  );
};

function TableManagamentTerm(props: any) {
  const { rows, totalItems, totalPages, page, handelChangePage, ...rest } = props;
  const [openModalEditGroupRegister, setOpenModalEditGroupRegister] = useState({
    isOpen: false,
    termId: 0,
  });
  const handleCloseEditGroupRegister = () => {
    setOpenModalEditGroupRegister({
      ...openModalEditGroupRegister,
      isOpen: false,
    });
  };
  const handleOpenEditGroupRegister = (termId: any) => {
    setOpenModalEditGroupRegister({ termId: termId, isOpen: true });
  };

  //Hanlde
  const [openModalEditTopicRegister, setOpenModalEditTopicRegister] = useState({
    isOpen: false,
    termId: 0,
  });
  const handleCloseEditTopicRegister = () => {
    setOpenModalEditTopicRegister({
      ...openModalEditTopicRegister,
      isOpen: false,
    });
  };
  const handleOpenEditTopicRegister = (termId: any) => {
    setOpenModalEditTopicRegister({ termId: termId, isOpen: true });
  };

  //Handle
  const [openModalPublicResult, setOpenModalPublicResult] = useState({
    isOpen: false,
    termId: 0,
  });

  const handleClosePublicResult = () => {
    setOpenModalPublicResult({
      ...openModalPublicResult,
      isOpen: false,
    });
  };
  const handleOpenPublicResult = (termId: any) => {
    setOpenModalPublicResult({ termId: termId, isOpen: true });
  };
  const [openModalTermDetail, setOpenModalTermDetail] = useState({
    isOpen: false,
    termId: 0,
  });
  const handleCloseTermDetail = () => {
    setOpenModalTermDetail({
      ...openModalTermDetail,
      isOpen: false,
    });
  };
  const handleOpenTermDetail = (termId: number) => {
    setOpenModalTermDetail({ termId, isOpen: true });
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
      renderCell: (params) => {
        return <Typography>{dayjs(params.row.startDate).format('DD/MM/YYYY')}</Typography>;
      },
    },
    {
      headerName: 'Ngày Kết thúc ',
      field: 'endDate',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return <Typography>{dayjs(params.row.startDate).format('DD/MM/YYYY')}</Typography>;
      },
    },
    {
      headerName: 'Đăng ký nhóm',
      field: 'name5',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <Box display={'flex'} gap={4} alignItems={'center'}>
            {checkStatusGroup(params.row.startChooseGroupDate, params.row.endChooseGroupDate)}
            <Tooltip title='Cập nhật đăng ký nhóm'>
              <IconButton
                onClick={() => handleOpenEditGroupRegister(params.row.id)}
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
      field: 'startChooseTopicDate',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <Box display={'flex'} gap={4} alignItems={'center'}>
            {checkStatusGroup(
              formatDates(params.row.startChooseTopicDate),
              formatDates(params.row.endChooseTopicDate),
            )}
            <Tooltip title='Cập nhật đăng ký Đề tài'>
              <IconButton
                onClick={() => handleOpenEditTopicRegister(params.row.id)}
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
      headerName: 'Phản biện',
      field: 'startDiscussionDate',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <Box display={'flex'} gap={4} alignItems={'center'}>
            {checkStatusGroup(
              formatDates(params.row.startDiscussionDate),
              formatDates(params.row.endDiscussionDate),
            )}
            <Tooltip title='Cập nhật Phản biện'>
              <IconButton
                onClick={() => handleOpenEditTopicRegister(params.row.id)}
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
      headerName: 'Báo cáo Đề tài',
      field: 'startPublicResultDate',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <Box display={'flex'} gap={4} alignItems={'center'}>
            {checkStatusGroup(
              formatDates(params.row.startPublicResultDate),
              formatDates(params.row.endPublicResultDate),
            )}
            <Tooltip title='Cập nhật báo cáo đề tài'>
              <IconButton
                onClick={() => handleOpenPublicResult(params.row.id)}
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
            {checkStatusGroup(
              formatDates(params.row.startPublicResultDate),
              formatDates(params.row.endPublicResultDate),
            )}
            <Tooltip title='Cập nhật công bố kết quả'>
              <IconButton
                onClick={() => handleOpenPublicResult(params.row.id)}
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
                handleOpenTermDetail(params.row.id);
              }}
              size='small'
            >
              <Icon icon='noto-v1:eye-in-speech-bubble' />
            </IconButton>
          </Tooltip>
          {/* <Tooltip title='Xóa học kì'>
            <IconButton
              onClick={() => {
                handleOpenDeleteTermModal(params.row.id);
              }}
              size='small'
              color='error'
            >
              <Icon icon='mdi:trash' />
            </IconButton>
          </Tooltip> */}
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
        id={openModalEditGroupRegister.termId}
        open={openModalEditGroupRegister.isOpen}
        onClose={handleCloseEditGroupRegister}
        termId={openModalEditGroupRegister.termId}
      />
      <EditTopicRegister
        open={openModalEditTopicRegister.isOpen}
        onClose={handleCloseEditTopicRegister}
      />
      <EditPublicResult open={openModalPublicResult.isOpen} onClose={handleClosePublicResult} />
      {/* <DeleteModal onClose={handleCloseDeleteTermModal} open={openDeleteTermModal.isOpen} /> */}
      <TermDetail
        termId={openModalTermDetail.termId}
        onClose={handleCloseTermDetail}
        open={openModalTermDetail.isOpen}
      />
    </Box>
  );
}

export default TableManagamentTerm;
