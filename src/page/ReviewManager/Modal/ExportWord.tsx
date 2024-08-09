import Modal from '@/components/ui/Modal';
import TitleManager from '@/components/ui/Title';
import { Box, Button, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface ExportWordModalProps {
  open: boolean;
  onClose: () => void;
  termId: string;
  typeReport: string;
  evaluations: any;
  permissions: any[];
}
import useDocx from '@/hooks/ui/useDocx';
import { Icon } from '@iconify/react';
import { Form, Formik } from 'formik';
import CustomTextField from '@/components/ui/CustomTextField';
import {
  getFileNameExportEvaluation,
  getTypeEvaluation,
} from '@/utils/validations/evaluation.validation';
import SheetTranscriptCouncil from '@/components/iframe/PageWord/SheetTranscriptCouncil';
import SheetTranscriptAdvisor from '@/components/iframe/PageWord/SheetTranscriptAdvisor';
import docTranscriptAdvisor from '@/components/iframe/PageWord/docUtils/docTranscriptAdvisor';
import docTranscriptReviewer from '@/components/iframe/PageWord/docUtils/docTranscriptReviewer';
import docTranscriptCouncil from '@/components/iframe/PageWord/docUtils/docTranscriptCouncil';
import SheetTranscriptReviewer from '@/components/iframe/PageWord/SheetTranscriptReviewer';
import BaseExportDataOfLecturer from '@/components/iframe/BaseText/BaseExportDataOfLecturer';
import { useGlobalContextReview } from '../Context';

function ExportWordModal(props: ExportWordModalProps) {
  const { open, onClose, typeReport, evaluations, permissions } = props;
  const [fileName, setFileName] = useState(getFileNameExportEvaluation(typeReport));
  const { topic, lecturerSupportName, groupStudentName, lecturerToScoreName, groupMember } =
    useGlobalContextReview();

  useEffect(() => {
    setFileName(getFileNameExportEvaluation(typeReport));
  }, [typeReport]);

  const { onExportDocxFile } = useDocx();
  const handleSubmit = () => {
    if (typeReport === 'ADVISOR')
      return onExportDocxFile(
        `${fileName}` + `${groupStudentName ? '_' + groupStudentName : ''}`,
        docTranscriptAdvisor(
          evaluations,
          topic,
          lecturerSupportName,
          groupStudentName,
          lecturerToScoreName,
          groupMember,
        ),
      );
    else if (typeReport === 'REPORT')
      return onExportDocxFile(
        `${fileName}` + `${groupStudentName ? '_' + groupStudentName : ''}`,
        docTranscriptCouncil(evaluations),
      );
    else if (typeReport === 'REVIEWER')
      return onExportDocxFile(
        `${fileName}` + `${groupStudentName ? '_' + groupStudentName : ''}`,
        docTranscriptReviewer(evaluations),
      );
    return;
  };

  const { onClearData } = useGlobalContextReview();
  useEffect(() => {
    onClearData();
  }, [open]);
  return (
    <Modal maxWidth='lg' open={open} onClose={onClose}>
      <Box px={6} sx={{ height: '94vh' }} py={6}>
        <TitleManager my={6}>
          <Icon width={16} icon='vscode-icons:file-type-word2' />
          Xuất phiếu Chấm điểm {getTypeEvaluation(typeReport)}
        </TitleManager>
        <Box sx={{ display: 'flex', gap: 10, px: 10, py: 6 }}>
          <Box width={'calc(50%)'}>
            {typeReport === 'ADVISOR' && (
              <SheetTranscriptAdvisor
                lecturerSupportName={lecturerSupportName}
                groupStudentName={groupStudentName}
                lecturerToScoreName={lecturerToScoreName}
                groupMember={groupMember}
                topic={topic}
                evaluations={evaluations}
              />
            )}
            {typeReport === 'REVIEWER' && <SheetTranscriptReviewer evaluations={evaluations} />}
            {typeReport === 'REPORT' && <SheetTranscriptCouncil evaluations={evaluations} />}
          </Box>
          <Paper elevation={2} sx={{ width: '50%', p: 10, minHeight: 200 }}>
            <TitleManager>Tải xuống phiếu chấm</TitleManager>
            <Formik
              initialValues={{
                fileName: fileName + `${groupStudentName ? '_' + groupStudentName : ''}`,
              }}
              onSubmit={() => {}}
            >
              {({ values, handleBlur }) => (
                <Form>
                  <Box>
                    <Box>
                      <CustomTextField
                        placeholder='VD: GVPB_PhieuChamDiem_CuoiKy_KLTN'
                        onChange={(e) => {
                          setFileName(e.target.value);
                        }}
                        onBlur={handleBlur}
                        value={
                          `${values.fileName}` + `${groupStudentName ? '_' + groupStudentName : ''}`
                        }
                        label='Tên file'
                      />
                    </Box>
                    <Box>{permissions.includes('crud') && <BaseExportDataOfLecturer />}</Box>
                    <Box mt={4}>
                      <Button
                        variant='contained'
                        type={'submit'}
                        color='primary'
                        onClick={handleSubmit}
                      >
                        <Icon width={20} icon='line-md:download-outline-loop' />
                        Xuất phiếu chấm
                      </Button>
                    </Box>
                  </Box>
                </Form>
              )}
            </Formik>
          </Paper>
        </Box>
      </Box>
    </Modal>
  );
}

export default ExportWordModal;
