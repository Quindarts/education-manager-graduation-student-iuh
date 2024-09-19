import { Box, Button, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TitleManager from '@/components/ui/Title';
import { Form, Formik } from 'formik';
import { getFileNameExportEvaluation } from '@/utils/validations/evaluation.validation';
import CustomTextField from '@/components/ui/CustomTextField';
import { Icon } from '@iconify/react';
import useDocx from '@/hooks/ui/useDocx';
import docTranscriptCouncil from '../PageWord/docUtils/docTranscriptCouncil';
import docTranscriptReviewer from '../PageWord/docUtils/docTranscriptReviewer';
import docTranscriptAdvisor from '../PageWord/docUtils/docTranscriptAdvisor';
import { useGlobalContextReview } from '@/page/ReviewManager/Context';
import GroupsDetailForm from './groupsDetailForm';

function FormInfoExportWord({ permission, typeReport, evaluations }: any) {
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
        `${fileName}` + `${'groupStudentName' ? '_' + 'groupStudentName' : ''}`,
        docTranscriptAdvisor(
          evaluations,
          topic,
          lecturerSupportName,
          'groupStudentName',
          lecturerToScoreName,
          groupMember,
        ),
      );
    else if (typeReport === 'REPORT')
      return onExportDocxFile(
        `${fileName}` + `${'groupStudentName' ? '_' + 'groupStudentName' : ''}`,
        docTranscriptCouncil(evaluations),
      );
    else if (typeReport === 'REVIEWER')
      return onExportDocxFile(
        `${fileName}` + `${'groupStudentName' ? '_' + 'groupStudentName' : ''}`,
        docTranscriptReviewer(evaluations),
      );
    return;
  };

  return (
    <Paper elevation={1} sx={{ width: '50%', px: 4, pt: 2, minHeight: 200 }}>
      <TitleManager mb={2}>Chỉnh sửa thông tin file tải xuống</TitleManager>
      <Formik
        initialValues={{
          fileName: fileName + `${'groupStudentName' ? '_' + 'groupStudentName' : ''}`,
        }}
        onSubmit={() => {}}
      >
        {({ values, handleBlur }) => (
          <Form style={{ margin: '2px' }}>
            <Box>
              <CustomTextField
                placeholder='VD: GVPB_PhieuChamDiem_CuoiKy_KLTN'
                onChange={(e) => {
                  setFileName(e.target.value);
                }}
                onBlur={handleBlur}
                value={`${values.fileName}` + `${groupStudentName ? '_' + groupStudentName : ''}`}
                label='Tên file'
              />
            </Box>
            {/** //TODO: FETCH GROUPS **/}
            <GroupsDetailForm />

            <Box mt={4} mx={2}>
              <Button variant='contained' type={'submit'} color='primary' onClick={handleSubmit}>
                <Icon width={20} icon='line-md:download-outline-loop' />
                Xuất phiếu chấm
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Paper>
  );
}

export default FormInfoExportWord;
