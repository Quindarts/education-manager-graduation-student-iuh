import Table from '@/components/ui/Table/Table';
import { Icon } from '@iconify/react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useState } from 'react';
import EditEvaluationModal from '../Modal/Edit';
import DeleteEvaluationModal from '../Modal/Delete';

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
  const FeatureComponent = currentRole.includes('all') && {
    headerName: '',
    field: 'none',
    flex: 1.5,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: any) => (
      <Box display={'flex'} gap={2}>
        <Tooltip title='Sửa tiêu chí'>
          <IconButton size='small' onClick={() => handleOpenEditEvaluationModal(params.row.id)}>
            <Icon icon='emojione:pencil' />
          </IconButton>
        </Tooltip>
        <Box></Box>
        <Tooltip title='Xóa tiêu chí'>
          <IconButton
            color='error'
            size='small'
            onClick={() => handleOpenDeleteEvaluationModal(params.row.id)}
          >
            <Icon icon='mdi:trash' />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  };
  const basicColumns: GridColDef[] = [
    {
      headerName: 'STT',
      field: 'stt',
      flex: 0.25,
      headerAlign: 'center',
    },
    {
      headerName: 'Tên tiêu chí',
      field: 'name',
      flex: 6,
      headerAlign: 'center',
    },
    {
      headerName: 'Mô tả',
      field: 'description',
      flex: 3,
      headerAlign: 'center',
      align: 'center',
    },
    {
      headerName: 'Điểm tối đa',
      field: 'scoreMax',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    FeatureComponent,
  ];
  return (
    <Box>
      <Table
        rows={rows}
        sx={{
          bgcolor: 'white',
        }}
        minHeight={300}
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
