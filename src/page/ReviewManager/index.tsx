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

function ReviewManagerPage() {
  const [currentTypeReview, setCurrentTypeReview] = useState(TypeEvaluation.ADVISOR);
  const { termStore } = useTerm();
  const { handleGetEvalutationByType } = useEvaluation();

  const { data, isLoading, isSuccess, isFetched } = handleGetEvalutationByType(
    termStore.currentTerm.id,
    currentTypeReview,
  );
  const [openModalCreateEvaluation, setOpenCreateEvaluationModal] = useState({
    isOpen: false,
  });

  const handleOpenCreateEvaluationModal = () => {
    setOpenCreateEvaluationModal({ isOpen: true });
  };
  const handleCloseCreateEvaluationModal = () => {
    setOpenCreateEvaluationModal({ ...openModalCreateEvaluation, isOpen: false });
  };

  return (
    <Paper sx={{ py: 20, px: 10 }} elevation={1}>
      <Box my={10} display={'flex'} justifyContent={'space-between'} gap={6}>
        <TitleManager>Tiêu chí Đánh giá</TitleManager>

        <Box display={'flex'} gap={10}>
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
          <Button color='error' variant='contained' onClick={handleOpenCreateEvaluationModal}>
            <Icon icon='ic:baseline-plus' />
            Tạo tiêu chí mới
          </Button>
          <ModalUpload
            disabled={isSuccess && convertEvalutationTable(data.evaluations).length > 0}
            entityUpload={TypeEntityUpload.EVALUATION}
            termId={termStore.currentTerm.id}
            typeEvaluation={currentTypeReview}
          />
        </Box>
      </Box>

      <Box mt={8}>
        {isLoading || !isFetched ? (
          <SekeletonUI />
        ) : (
          <>
            <TableManagerReviewScore
              termId={termStore.currentTerm.id}
              type={currentTypeReview}
              rows={convertEvalutationTable(data.evaluations)}
            />
            <Paper elevation={2} sx={{ px: 6, py: 10 }}>
              <TitleManager>Tổng điểm: 100</TitleManager>
            </Paper>
          </>
        )}
      </Box>
      <AddEvaluationModal
        open={openModalCreateEvaluation.isOpen}
        termId={termStore.currentTerm.id}
        type={currentTypeReview}
        onClose={handleCloseCreateEvaluationModal}
      />
    </Paper>
  );
}

export default ReviewManagerPage;
