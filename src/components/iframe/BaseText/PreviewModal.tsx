import Modal from '@/components/ui/Modal';
import React from 'react';
import SheetTranscriptReviewer from '../PageWord/SheetTranscriptReviewer';
import { Box, Button } from '@mui/material';
import TitleManager from '@/components/ui/Title';
import useDocx from '@/hooks/ui/useDocx';
import docTranscriptReviewer from '../PageWord/docUtils/docTranscriptReviewer';
import useEvaluation from '@/hooks/api/useQueryEvalutaion';
import { useAuth } from '@/hooks/api/useAuth';
import { TypeEvaluation } from '@/services/apiEvaluation';
import docTranscriptCouncil from '../PageWord/docUtils/docTranscriptCouncil';
function PreviewModal({
  open,
  onClose,
  groupStudentName,
  topicName,
  students,
  evaluators,
  lecturerSupport,
  evaluations,
  typeEvaluation,
}: any) {
  const { onExportDocxFile } = useDocx();
  const { handleUiRender } = useEvaluation();
  const { lecturerStore } = useAuth();
  const meId = lecturerStore.me.user.id;

  return (
    <Modal maxWidth={handleUiRender().includes('crud') ? 'md' : 'xl'} open={open} onClose={onClose}>
      <TitleManager icon='fontisto:preview' mx={10}>
        Preview file word
      </TitleManager>

      <Box px={10} py={10} display={'flex'} justifyContent={'center'} flexWrap={'wrap'} gap={10}>
        {handleUiRender().includes('crud')
          ? evaluators?.members
              ?.filter((evl) => evl.id === meId)
              .map((evaluator: any) => (
                <Box width={'100%'}>
                  <SheetTranscriptReviewer
                    evaluations={evaluations}
                    lecturerSupport={lecturerSupport}
                    evaluatorFullName={evaluator?.fullName}
                    students={students}
                    topicName={topicName}
                    groupStudentName={groupStudentName}
                  />
                </Box>
              ))
          : evaluators?.members?.map((evaluator: any) => (
              <Box width={'calc(50% - 10px)'}>
                <SheetTranscriptReviewer
                  evaluations={evaluations}
                  lecturerSupport={lecturerSupport}
                  evaluatorFullName={evaluator?.fullName}
                  students={students}
                  topicName={topicName}
                  groupStudentName={groupStudentName}
                />
              </Box>
            ))}
        {handleUiRender().includes('crud') && (
          <Button
            sx={{
              ml: 'auto',
            }}
            color='primary'
            variant='contained'
            onClick={() => {
              onExportDocxFile(
                'Phiếu chấm Nhóm sv_' + groupStudentName + '_' + lecturerStore.me.user.fullName,
                typeEvaluation === 'REPORT'
                  ? docTranscriptCouncil({
                      topicName,
                      groupStudentName,
                      students,
                      evaluatorFullName: lecturerStore.me.user.fullName,
                      lecturerSupport,
                      evaluations,
                      fileType: 'one',
                    })
                  : docTranscriptReviewer({
                      topicName,
                      groupStudentName,
                      students,
                      evaluatorFullName: lecturerStore.me.user.fullName,
                      lecturerSupport,
                      evaluations,
                      fileType: 'one',
                    }),
              );
            }}
          >
            Xuất phiếu đang preview
          </Button>
        )}
      </Box>
    </Modal>
  );
}

export default PreviewModal;
