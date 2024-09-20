import Modal from '@/components/ui/Modal';
import TitleManager from '@/components/ui/Title';
import { Box, Button, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useDocx from '@/hooks/ui/useDocx';
import { Icon } from '@iconify/react';
import { Form, Formik } from 'formik';
import CustomTextField from '@/components/ui/CustomTextField';
import {
  getFileNameToExportDocx,
  getTypeEvaluation,
} from '@/utils/validations/evaluation.validation';
import SheetTranscriptAdvisor from '@/components/iframe/PageWord/SheetTranscriptAdvisor';
import docTranscriptAdvisor from '@/components/iframe/PageWord/docUtils/docTranscriptAdvisor';
import docTranscriptReviewer from '@/components/iframe/PageWord/docUtils/docTranscriptReviewer';
import { useGlobalContextReview } from '../Context';
import InfoGroupSupportFile from '@/components/iframe/BaseText/InfoGroupSupportFile';
import { TypeEvaluation } from '@/services/apiEvaluation';
import InfoOtherGroupFile from '@/components/iframe/BaseText/InfoOtherGroupFile';
import * as GroupLecturerServices from '@/services/apiGroupLecturer';
interface ExportWordModalProps {
  open: boolean;
  onClose: () => void;
  termId: string;
  typeEvaluation: string;
  evaluations: any;
  permissions: any[];
}

const useExportMultiDocs = async (groupLecturers: any[], evaluations: any[], typeEvaluation) => {
  const [resultCall, setResultCall] = useState([]);
  const fetchGroupLecturers = async () => {
    try {
      const initApis = groupLecturers.map((gr: any) =>
        GroupLecturerServices.getGroupLecturerById(gr.id),
      );
      const array = await Promise.all(initApis);
      const groupLecturerArray = array.map((gr: any) => gr.groupLecturer);
      setResultCall(groupLecturerArray);
    } catch (error) {}
  };
  useEffect(() => {
    fetchGroupLecturers();
  }, [groupLecturers, typeEvaluation]);

  const filterData = resultCall.filter(
    (gr: any) => gr.groupStudents && gr.groupStudents.length !== 0,
  );
  const processData = filterData.flatMap((group: any) => {
    return group.groupStudents.flatMap((studentGroup: any) => {
      if (Array.isArray(group.members) && group.members.length > 0) {
        return group.members.map((evaluator: any, index: number) => ({
          topicName: studentGroup.topicName,
          groupStudentName: studentGroup.name,
          students: studentGroup.members.map((student: any) => ({
            username: student.username,
            fullName: student.fullName,
          })),
          evaluatorFullName: 'Thành viên' + `${index + 1}_` + evaluator.fullName,
          lecturerSupport: studentGroup.lecturerName,
          evaluations: evaluations,
        }));
      } else {
        return {
          topicName: studentGroup.topicName,
          groupStudentName: studentGroup.name,
          students: studentGroup.members.map((student: any) => ({
            username: student.username,
            fullName: student.fullName,
          })),
          evaluatorFullName: '',
          lecturerSupport: studentGroup.lecturerName,
          evaluations: evaluations,
        };
      }
    });
  });
  return Promise.all(
    processData.map((container: any) => {
      return docTranscriptReviewer(container);
    }),
  );
};

function ExportWordModal(props: ExportWordModalProps) {
  const { open, onClose, typeEvaluation, evaluations } = props;
  //TODO: HOOKS
  const [currentGrLecturers, setCurrentGrLecturers] = useState([]);
  const [isExportOneFile, setIsExportOneFile] = useState(true);
  const [fileName, setFileName] = useState(getFileNameToExportDocx(typeEvaluation));
  const {
    topic,
    lecturerSupportName,
    groupStudentName,
    lecturerToScoreName,
    groupMember,
    onClearData,
  } = useGlobalContextReview();
  const { onExportDocxFile, onExportMultiDocxFiles } = useDocx();
  const changeCurrentGrLecturers = (currentGrLecturers: any[]) => {
    setCurrentGrLecturers(currentGrLecturers);
  };

  //TODO: [HANDLE EXPORT MULTI DOCX FILE]
  const listFile = useExportMultiDocs(currentGrLecturers, evaluations, typeEvaluation);

  //TODO: [Handler submit]
  const handleSubmit = () => {
    if (typeEvaluation === 'ADVISOR')
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
    else return onExportMultiDocxFiles(fileName, fileName, listFile);
  };

  //TODO: HANDLE EXPORT ONE DOCX
  useEffect(() => {
    onClearData();
  }, [open]);
  useEffect(() => {
    setFileName(getFileNameToExportDocx(typeEvaluation));
    if (typeEvaluation === 'ADVISOR') setIsExportOneFile(true);
  }, [typeEvaluation]);

  return (
    <Modal maxWidth='lg' open={open} onClose={onClose}>
      <Box height={'94vh'} pb={6}>
        <TitleManager
          mx={10}
          variant='h6'
          textTransform={'uppercase'}
          icon='vscode-icons:file-type-word2'
        >
          Xuất phiếu Chấm điểm {getTypeEvaluation(typeEvaluation)}
        </TitleManager>
        {isExportOneFile && typeEvaluation === TypeEvaluation.ADVISOR ? (
          <Box sx={{ display: 'flex', gap: 10, px: 10, py: 6 }}>
            <Box width={'calc(50%)'}>
              {typeEvaluation === 'ADVISOR' && (
                <SheetTranscriptAdvisor
                  lecturerSupportName={lecturerSupportName}
                  groupStudentName={groupStudentName}
                  lecturerToScoreName={lecturerToScoreName}
                  groupMember={groupMember}
                  topic={topic}
                  evaluations={evaluations}
                />
              )}
            </Box>
            {/* //**!PROBLEM form change update context **/}
            <Paper elevation={1} sx={{ width: '50%', px: 4, pt: 2, minHeight: 200 }}>
              <TitleManager mb={2}>Chỉnh sửa thông tin file tải xuống</TitleManager>
              <Formik
                initialValues={{
                  fileName: fileName + `${groupStudentName ? '_' + groupStudentName : ''}`,
                }}
                onSubmit={() => {}}
              >
                {({ values, handleBlur }) => (
                  <Form>
                    <Box sx={{ mx: 2 }}>
                      <Box>
                        <CustomTextField
                          placeholder='VD: GVPB_PhieuChamDiem_CuoiKy_KLTN'
                          onChange={(e) => {
                            setFileName(e.target.value);
                          }}
                          onBlur={handleBlur}
                          value={
                            `${values.fileName}` +
                            `${groupStudentName ? '_' + groupStudentName : ''}`
                          }
                          label='Tên file'
                        />
                      </Box>
                      <InfoGroupSupportFile />
                      {/* //![SUBMIT] */}
                      <Box mt={4} mx={2}>
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
        ) : (
          <Box display={'flex'} mt={3} gap={10} px={10}>
            <Box
              sx={{
                width: '50%',
                px: 4,
                pt: 10,
                maxHeight: 500,
              }}
            >
              <InfoOtherGroupFile
                changeCurrentGrLecturers={changeCurrentGrLecturers}
                evaluations={evaluations}
                typeEvaluation={typeEvaluation}
              />
            </Box>
            <Paper elevation={0} sx={{ width: '50%', px: 4, pt: 2, minHeight: 200, flexShrink: 0 }}>
              <TitleManager mb={2}>Thông tin file tải về</TitleManager>
              <Formik
                initialValues={{
                  fileName: fileName + `${groupStudentName ? '_' + groupStudentName : ''}`,
                }}
                onSubmit={() => {}}
              >
                {({ values, handleBlur }) => (
                  <Form>
                    <Box sx={{ mx: 2 }}>
                      <Box>
                        <CustomTextField
                          placeholder='VD: GVPB_PhieuChamDiem_CuoiKy_KLTN'
                          onChange={(e) => {
                            setFileName(e.target.value);
                          }}
                          onBlur={handleBlur}
                          value={
                            `${values.fileName}` +
                            `${groupStudentName ? '_' + groupStudentName : ''}`
                          }
                          label='Tên file'
                        />
                      </Box>
                      {/* //![SUBMIT] */}
                      <Box mt={4} mx={2}>
                        <Button
                          variant='contained'
                          type={'submit'}
                          color='primary'
                          onClick={() => handleSubmit()}
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
        )}
      </Box>
    </Modal>
  );
}

export default ExportWordModal;
