import { Avatar, Box, Button, Paper } from '@mui/material';
import TableManagerReviewScore from './Table';
import { useState } from 'react';

import DropDown from '@/components/ui/Dropdown';
import TitleManager from '@/components/ui/Title';
import ModalUpload from '@/components/ui/Upload';
import { TypeEntityUpload } from '@/hooks/ui/useUploadExcel';
import { useTerm } from '@/hooks/api/useQueryTerm';
import useEvaluation from '@/hooks/api/useEvalutaion';
import SekeletonUI from '@/components/ui/Sekeleton';
import { convertEvalutationTable } from '@/utils/convertDataTable';
import { TypeEvaluation } from '@/services/apiEvaluation';
import { Icon } from '@iconify/react';
import AddEvaluationModal from './Modal/Add';
import ExportWordModal from './Modal/ExportWord';
import { useAuth } from '@/hooks/api/useAuth';

function ReviewManagerPage() {
  const [currentTypeReview, setCurrentTypeReview] = useState(TypeEvaluation.ADVISOR);
  const { termStore } = useTerm();
  const { handleGetEvalutationByType, handleUiRender } = useEvaluation();
  const currentRole = handleUiRender();

  const { data, isLoading, isSuccess, isFetching } = handleGetEvalutationByType(
    termStore.currentTerm.id,
    currentTypeReview,
  );
  const [openModalCreateEvaluation, setOpenCreateEvaluationModal] = useState({
    isOpen: false,
  });
  const [openModalExport, setOpenExportModal] = useState({
    isOpen: false,
  });

  const handleOpenExportModal = () => {
    setOpenExportModal({ isOpen: true });
  };
  const handleCloseExportModal = () => {
    setOpenExportModal({ isOpen: false });
  };

  const handleOpenCreateEvaluationModal = () => {
    setOpenCreateEvaluationModal({ isOpen: true });
  };
  const handleCloseCreateEvaluationModal = () => {
    setOpenCreateEvaluationModal({ ...openModalCreateEvaluation, isOpen: false });
  };

  return (
    <Paper sx={{ py: 10, px: 10 }} elevation={1}>
      <Box my={4} display={'flex'} justifyContent={'space-between'} gap={2}>
        <TitleManager>Tiêu chí Đánh giá</TitleManager>

        <Box display={'flex'} gap={2}>
          <DropDown
            value={currentTypeReview}
            onChange={(e: any) => {
              setCurrentTypeReview(e.target.value);
            }}
            options={[
              {
                name: 'Tiêu chí Đánh giá Hướng dẫn',
                _id: 'ADVISOR',
              },
              {
                name: 'Tiêu chí Đánh giá Phản biện',
                _id: 'REVIEWER',
              },
              {
                name: 'Tiêu chí Đánh giá Báo cáo',
                _id: 'REPORT',
              },
            ]}
          />
          {currentRole.includes('all') && (
            <>
              <Button
                size='small'
                color='error'
                variant='contained'
                onClick={handleOpenCreateEvaluationModal}
              >
                <Icon icon='ic:baseline-plus' />
                Tạo tiêu chí mới
              </Button>

              <Button
                disabled={data?.evaluations.length < 1}
                size='small'
                color='success'
                variant='contained'
                onClick={handleOpenExportModal}
              >
                <Icon width={20} icon='material-symbols:export-notes' />
                Xuất phiếu chấm
              </Button>
              <ModalUpload
                disabled={isSuccess && convertEvalutationTable(data.evaluations).length > 0}
                entityUpload={TypeEntityUpload.EVALUATION}
                termId={termStore.currentTerm.id}
                typeEvaluation={currentTypeReview}
              />
            </>
          )}
        </Box>
      </Box>

      <Box mt={4}>
        {isLoading || isFetching ? (
          <SekeletonUI />
        ) : (
          <>
            <TableManagerReviewScore
              termId={termStore.currentTerm.id}
              type={currentTypeReview}
              currentRole={currentRole}
              rows={convertEvalutationTable(data.evaluations)}
            />
            <Paper elevation={2} sx={{ px: 6, py: 10 }}>
              <TitleManager>Tổng điểm: 100</TitleManager>
            </Paper>
          </>
        )}
      </Box>
      {currentRole.includes('all') && (
        <>
          <AddEvaluationModal
            open={openModalCreateEvaluation.isOpen}
            termId={termStore.currentTerm.id}
            type={currentTypeReview}
            onClose={handleCloseCreateEvaluationModal}
          />
          <ExportWordModal
            onClose={handleCloseExportModal}
            termId={termStore.currentTerm.id}
            typeReport={currentTypeReview}
            open={openModalExport.isOpen}
            evaluations={data?.evaluations}
          />
        </>
      )}
    </Paper>
  );
}

export default ReviewManagerPage;
