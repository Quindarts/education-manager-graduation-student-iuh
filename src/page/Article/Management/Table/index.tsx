import Table from '@/components/ui/Table/Table';
import { getCardArticleStatus } from '@/utils/validations/article.validation';
import { Icon } from '@iconify/react';
import { Box, Button, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import React, { useMemo, useState } from 'react';
import AcceptArticleModal from '../../Modal/AcceptArticleModal';
import RefuseArticleModal from '../../Modal/RefuseArticleModal';
import ResetArticleModal from '../../Modal/ResetArticleModal';
import { env } from '@/utils/env';
import DetailArticleModal from '../../Modal/DetailArticleModal';

interface Props {
  rows: any[];
  page: number;
}

function TableArticleManagement(props: Props) {
  const { rows } = props;
  //handle
  const [openAcceptModal, setOpenEditAcceptModal] = useState({
    articleId: '',
    name: '',
    bonnusScore: 1,
    isOpen: false,
  });
  const handleCloseAcceptModal = () => {
    setOpenEditAcceptModal({ ...openAcceptModal, isOpen: false });
  };
  const handleOpenAcceptModal = (articleId: string, name: string, bonnusScore: number) => {
    setOpenEditAcceptModal({ articleId, name, bonnusScore, isOpen: true });
  };

  //handle
  const [openRefuseModal, setOpenEditRefuseModal] = useState({
    articleId: '',
    name: '',
    isOpen: false,
  });

  const handleCloseRefuseModal = () => {
    setOpenEditRefuseModal({ ...openRefuseModal, isOpen: false });
  };
  const handleOpenRefuseModal = (articleId: string, name: string) => {
    setOpenEditRefuseModal({ articleId, name, isOpen: true });
  };

  //handle
  const [openResetArticleModal, setOpenResetArticleModal] = useState({
    articleId: '',
    name: '',
    isOpen: false,
  });
  const handleCloseArticleModal = () => {
    setOpenResetArticleModal({ ...openResetArticleModal, isOpen: false });
  };
  const handleOpenResetArticleModal = (articleId: string, name: string) => {
    setOpenResetArticleModal({ articleId, name, isOpen: true });
  };
  const [openDetailArticleModal, setOpenDetailArticleModal] = useState({
    articleId: '',
    isOpen: false,
  });
  const handleCloseDetailArticleModal = () => {
    setOpenDetailArticleModal({ ...openDetailArticleModal, isOpen: false });
  };
  const handleOpenDetailArticleModal = (articleId: string) => {
    setOpenDetailArticleModal({ articleId, isOpen: true });
  };

  const basicColumns: GridColDef[] = useMemo(
    () => [
      {
        headerName: 'Thông tin sinh viên nộp báo',
        field: 'fullName',
        flex: 0.7,
        align: 'left',
        headerAlign: 'left',
        renderCell: (params) => (
          <Typography variant='body1' color='initial'>
            <Typography component={'div'} variant='body1' color='initial'>
              MSSV: {params.row.username}
            </Typography>
            Họ tên: {params.row.fullName}
          </Typography>
        ),
      },
      {
        headerName: 'Tên bài báo',
        field: 'name',
        flex: 1.5,
      },
      {
        headerName: 'Điểm cộng',
        field: 'bonusScore',
        flex: 0.3,
        align: 'right',
        headerAlign: 'right',
      },
      {
        headerName: 'Chức năng',
        field: 'publicDate',
        flex: 0.4,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => (
          <Box>
            <Button onClick={() => handleOpenDetailArticleModal(params.row.id)}>
              Xem chi tiết
            </Button>
          </Box>
        ),
      },
      {
        headerName: 'Trạng thái',
        field: 'status',
        flex: 0.6,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => (
          <Box>
            {params.row.status === 'PENDING' ? (
              <Box display={'flex'} gap={2}>
                <Button
                  size='small'
                  onClick={() =>
                    handleOpenAcceptModal(params.row.id, params.row.name, params.row.bonusScore)
                  }
                  color='success'
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
                  onClick={() => handleOpenRefuseModal(params.row.id, params.row.name)}
                  color='error'
                >
                  <Icon style={{ marginRight: 1 }} icon='lets-icons:cancel-fill' />
                  Từ chối
                </Button>
              </Box>
            ) : (
              <Box>
                {getCardArticleStatus(params.row.status)}
                <Button
                  size='small'
                  onClick={() => handleOpenResetArticleModal(params.row.id, params.row.name)}
                  color='warning'
                >
                  Reset trạng thái
                </Button>
              </Box>
            )}
          </Box>
        ),
      },
    ],
    [],
  );

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
          totalItems={rows ? rows.length : 0}
          disableColumnFilter
          minHeight={350}
          isPanigation={false}
        />
      </Box>
      <AcceptArticleModal
        open={openAcceptModal.isOpen}
        articleId={openAcceptModal.articleId}
        bonnusScore={openAcceptModal.bonnusScore}
        name={openAcceptModal.name}
        onClose={handleCloseAcceptModal}
      />
      <RefuseArticleModal
        open={openRefuseModal.isOpen}
        articleId={openRefuseModal.articleId}
        name={openRefuseModal.name}
        onClose={handleCloseRefuseModal}
      />
      <ResetArticleModal
        open={openResetArticleModal.isOpen}
        articleId={openResetArticleModal.articleId}
        name={openResetArticleModal.name}
        onClose={handleCloseArticleModal}
      />
      <DetailArticleModal
        open={openDetailArticleModal.isOpen}
        onClose={handleCloseDetailArticleModal}
        articleId={openDetailArticleModal.articleId}
      />
    </>
  );
}

export default TableArticleManagement;
