import Table from '@/components/ui/Table/Table';
import { Icon } from '@iconify/react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useState } from 'react';
import EditEvaluationModal from '../Modal/Edit';
import DeleteEvaluationModal from '../Modal/Delete';
import { stripHtmlTags } from '@/utils/convertHtmlText';

function TableManagerReviewScore(props: any) {
  const { rows, termId, type, currentRole } = props;

  const [openModalEditEvaluation, setOpenEditEvaluationModal] = useState({
    isOpen: false,
    evaluationId: '',
  });

  const handleOpenEditEvaluationModal = (evaluationId: string) => {
    setOpenEditEvaluationModal({ evaluationId, isOpen: true });
  };
  const handleCloseEditEvaluationModal = () => {
    setOpenEditEvaluationModal({ ...openModalEditEvaluation, isOpen: false });
  };

  const [openModalDeleteEvaluationModal, setOpenDeleteEvaluationModal] = useState({
    isOpen: false,
    evaluationId: '',
  });

  const handleOpenDeleteEvaluationModal = (evaluationId: string) => {
    setOpenDeleteEvaluationModal({ evaluationId, isOpen: true });
  };
  const handleCloseDeleteEvaluationModal = () => {
    setOpenDeleteEvaluationModal({ ...openModalDeleteEvaluationModal, isOpen: false });
  };

  const allRoleColumns: GridColDef[] = [
    {
      headerName: 'CLO',
      field: 'key',
      flex: 0.6,
      align: 'right',
      headerAlign: 'right',
    },
    {
      headerName: 'Tên tiêu chí',
      field: 'name',
      flex: 2,
      align: 'left',
      headerAlign: 'left',
    },
    {
      headerName: 'Điểm tối đa',
      field: 'scoreMax',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      headerName: 'Mô tả',
      field: 'description',
      flex: 6,
      align: 'left',
      headerAlign: 'left',
      renderCell(params) {
        return (
          <Typography variant='body1' color='initial'>
            {stripHtmlTags(params?.value)}
          </Typography>
        );
      },
    },
    {
      headerName: 'Chức năng',
      field: 'none',
      flex: 1.5,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) => (
        <Box display={'flex'} gap={2}>
          <Tooltip
            onClick={() => handleOpenEditEvaluationModal(params.row.id)}
            title='Sửa tiêu chí'
          >
            <IconButton size='small'>
              <Icon icon='ph:pencil-line-fill' width={20} style={{ color: '#0288d1' }} />
            </IconButton>
          </Tooltip>
          <Box></Box>
          <Tooltip
            onClick={() => handleOpenDeleteEvaluationModal(params.row.id)}
            title='Xóa tiêu chí'
          >
            <IconButton color='error' size='small'>
              <Icon icon='carbon:close-filled' width={20} style={{ color: ' #f2365b' }} />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];
  const basicColumns: GridColDef[] = [
    {
      headerName: 'CLO',
      field: 'key',
      flex: 0.7,
      align: 'right',
      headerAlign: 'right',
    },
    {
      headerName: 'Tên tiêu chí',
      field: 'name',
      flex: 2,
      align: 'left',
      headerAlign: 'left',
    },
    {
      headerName: 'Điểm tối đa',
      field: 'scoreMax',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      headerName: 'Mô tả',
      field: 'description',
      flex: 6,
      align: 'left',
      headerAlign: 'left',
      renderCell(params) {
        return (
          <Typography variant='body1' color='initial'>
            {stripHtmlTags(params?.value)}
          </Typography>
        );
      },
    },
  ];
  return (
    <Box>
      <Table
        rows={rows}
        sx={{
          bgcolor: 'white',
        }}
        rowHeight={200}
        minHeight={350}
        columns={currentRole.includes('all') ? allRoleColumns : basicColumns}
        totalItems={rows.length}
        totalPages={1}
        page={1}
        handleChangePage={() => {}}
        disableColumnFilter
        isPanigation={false}
      />
      <EditEvaluationModal
        termId={termId}
        type={type}
        open={openModalEditEvaluation.isOpen}
        onClose={handleCloseEditEvaluationModal}
        evaluationId={openModalEditEvaluation.evaluationId}
      />
      <DeleteEvaluationModal
        termId={termId}
        type={type}
        open={openModalDeleteEvaluationModal.isOpen}
        onClose={handleCloseDeleteEvaluationModal}
        evaluationId={openModalDeleteEvaluationModal.evaluationId}
      />
    </Box>
  );
}

export default TableManagerReviewScore;
