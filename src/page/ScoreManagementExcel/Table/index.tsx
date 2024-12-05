import { checkTypeEvaluation } from '@/utils/validations/transcript.validation';
import { Box, Button, TableBody, TableHead, Typography } from '@mui/material';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import useQueryTranscript from '@/hooks/api/useQueryTranscript';
import useMemberGroupStudent from '@/hooks/api/useQueryMemberGroupStudent';
import useTranscript from '@/hooks/api/useQueryTranscript';
import { StyledTableCell, StyledTableRow } from '@/components/iframe/PageWord/style';
import Table from '@/components/ui/Table/Table';
import { getMemberInGroupStudent } from '@/services/apiGroupStudent';
import ScoreInput from '@/components/ui/ScoreInput';
import { Icon } from '@iconify/react';
import { EnumStatusStudent } from '@/types/enum';
import { useTerm } from '@/hooks/api/useQueryTerm';
import { getTranscriptOfStudentInGroup } from '@/services/apiTranscipts';
import SekeletonTable from '@/components/ui/Sekeleton';
function randomColor() {
  const r = Math.floor(Math.random() * 76) + 180;
  const g = Math.floor(Math.random() * 76) + 180;
  const b = Math.floor(Math.random() * 76) + 180;
  return `rgb(${r}, ${g}, ${b},0.3)`;
}
const NO_SCORE_STATUS_LIST = [
  EnumStatusStudent.FAIL_ADVISOR,
  EnumStatusStudent.FAIL_REVIEWER,
  EnumStatusStudent.FAIL_REPORT,
];
const checkScored = (transcripts: any[]) => {
  return transcripts && transcripts.length > 0 ? true : false;
};
function TableScoreManagement({ typeScoreStudent }: any) {
  const { termStore } = useTerm();
  const termId = termStore.currentTerm.id;
  const [loading, setLoading] = useState(false);

  //[Handler update/ create transcript of group student]
  const { onCreateTranscriptTypeExcelUI, onUpdateTranscripts } = useTranscript();
  const { mutate: createTranscripts, isSuccess: successCreate } = onCreateTranscriptTypeExcelUI();
  const { mutate: updateTranscripts, isSuccess: successUpdate } = onUpdateTranscripts();

  //![Get evaluations for scoring]
  const { hanleGetEvalutaionsForScoring, handleGetUnTranscriptGroupStudentsByType } =
    useQueryTranscript();
  const { data: evaluationFetch, isSuccess: fetchEvaluationSuccess } =
    hanleGetEvalutaionsForScoring(checkTypeEvaluation(typeScoreStudent));
  //![Get group student need score]
  const { data: grStudentsFetch } = handleGetUnTranscriptGroupStudentsByType(typeScoreStudent);
  const [rowGrStudents, setRowGrStudents] = React.useState([]);
  const initRowGrStudents = async () => {
    const grStudentPromises = grStudentsFetch.groupStudents.map((groupStudent: any) => {
      return {
        groupStudent: { ...groupStudent },
        grMemberFetch: getMemberInGroupStudent(groupStudent.id),
        colorRow: randomColor(),
      };
    });
    //Return list student of group student
    const data = grStudentPromises.map(async (grPromises: any) => {
      setLoading(true);
      const groupStudent = grPromises.groupStudent;
      //Get transcript of student in group
      const fetchTranscriptGroups = await getTranscriptOfStudentInGroup(
        termId,
        typeScoreStudent,
        groupStudent.id,
      );
      const transcripts_of_grStudent = await fetchTranscriptGroups.transcripts;
      // console.log(
      //   'transcripts_of_grStudent',
      //   transcripts_of_grStudent.map((v) => v.students).flat().some(s=>s.studentId === data.student.id),
      // );

      const grMemberFetchResult = grPromises.grMemberFetch;
      const dataGetGrStudentAxios = await grMemberFetchResult;

      //?Check if student don't have scored
      if (!checkScored(transcripts_of_grStudent)) {
        return await dataGetGrStudentAxios.members.map((data: any, index: number) => ({
          studentId: data.student.id,
          groupName: groupStudent.name,
          studentStatus: data.status,
          groupStudentId: groupStudent.id,
          studentName: data.student.fullName,
          topicName: groupStudent?.topicName,
          colorRow: grPromises.colorRow,
          isScored: transcripts_of_grStudent
            .map((v) => v.students)
            .flat()
            .some((s) => s.studentId === data.student.id),
          evaluations: evaluationFetch?.evaluations?.map((evaluation: any) => ({
            evaluationId: evaluation.id,
            scoreMax: evaluation.scoreMax,
            score: 0,
          })),
        }));
      }
      //--------------------------------------->>>
      //?Check if student have scored
      return await dataGetGrStudentAxios.members.map((data: any, index: number) => ({
        studentId: data.student.id,
        groupName: groupStudent.name,
        studentStatus: data.status,
        groupStudentId: groupStudent.id,
        studentName: data.student.fullName,
        topicName: groupStudent?.topicName,
        colorRow: grPromises.colorRow,
        isScored: transcripts_of_grStudent
          .map((v) => v.students)
          .flat()
          .some((s) => s.studentId === data.student.id),
        evaluations: evaluationFetch?.evaluations?.map((evaluation: any) => ({
          evaluationId: evaluation.id,
          scoreMax: evaluation.scoreMax,
          score:
            transcripts_of_grStudent
              .map((t: any) => {
                if (
                  t.evaluationId === evaluation.id &&
                  t.students.some((s: any) => s.studentId === data.student.id)
                ) {
                  setScoreStds((prev) => [
                    ...prev,
                    {
                      studentId: data.student.id,
                      evaluationId: evaluation.id,
                      score: t.students.find((s: any) => s.studentId === data.student.id)?.score,
                      termId: termId,
                    },
                  ]);
                  return t.students.find((s: any) => s.studentId === data.student.id)?.score;
                } else return -1;
              })
              .filter((sc: number) => sc > -1)[0] || 0,
        })),
      }));
    });
    const rowGrStudents = await Promise.all(data);
    setRowGrStudents(rowGrStudents.flat());
    // }
  };
  useEffect(() => {
    setRowGrStudents([]);
    setScoreStds([]);
    initRowGrStudents();
    setLoading(false);
  }, [typeScoreStudent, successCreate, successUpdate]);
  /**
   * ? bây giờ groupStudent sẽ số dòng
   * ? còn số cột sẽ là CLO evaluation
   */
  const [scoreStds, setScoreStds] = React.useState<any[]>([]);

  const handleChangeScore = (studentId: string, score: string, evaluationId: string) => {
    const scoreStudent = {
      studentId: studentId,
      evaluationId: evaluationId,
      score: score,
      termId: termId,
    };
    const index = scoreStds.findIndex(
      (scoreStd) => scoreStd.studentId === studentId && scoreStd.evaluationId === evaluationId,
    );
    if (index === -1) {
      setScoreStds([...scoreStds, scoreStudent]);
    } else {
      const newScoreStds = [...scoreStds];
      newScoreStds[index] = scoreStudent;
      setScoreStds(newScoreStds);
    }
  };

  //!Handle submit
  const handleSubmitCreateTranscipts = (studentId: string) => {
    const transcript = scoreStds.filter((scoreStd) => scoreStd.studentId === studentId);
    createTranscripts(transcript);
  };
  const handleSubmitUpdateTranscipts = (studentId: string) => {
    const transcript = scoreStds.filter((scoreStd) => scoreStd.studentId === studentId);
    updateTranscripts(transcript);
  };
  return (
    <>
      {loading ? (
        <SekeletonTable />
      ) : (
        <Box>
          {/* Table head -> loading CLO của evalution */}
          <TableHead sx={{ bgcolor: '#132e65' }}>
            <StyledTableCell sx={{ color: 'grey.300', width: '5%', fontSize: 14 }}>
              Thông tin nhóm sinh viên
            </StyledTableCell>
            <StyledTableCell sx={{ color: 'grey.300', width: '3%', fontSize: 14 }}>
              Họ tên sinh viên
            </StyledTableCell>
            <>
              {evaluationFetch?.evaluations?.map((evaluation: any) => (
                <StyledTableCell
                  key={evaluation._id}
                  sx={{ color: 'grey.300', width: '1%', fontSize: 14 }}
                >
                  {evaluation?.key} ({evaluation?.scoreMax})
                </StyledTableCell>
              ))}
            </>
            <StyledTableCell sx={{ color: 'grey.300', width: '3%', fontSize: 14 }}>
              Tổng điểm
            </StyledTableCell>
            <StyledTableCell sx={{ color: 'grey.300', width: '1%', fontSize: 14 }}>
              Chức năng
            </StyledTableCell>
          </TableHead>
          {/* Table body -> rows loading groupStudents */}
          <TableBody>
            {rowGrStudents?.map((rows: any, index: number) => {
              return (
                <StyledTableRow>
                  <StyledTableCell
                    sx={{
                      color: 'grey.700',
                      backgroundColor: rows?.colorRow,
                      width: '28%',
                      padding: 2,
                    }}
                  >
                    <Typography color='grey.700' mb={1} fontWeight={'bold'}>
                      {' '}
                      Nhóm {rows?.groupName}
                    </Typography>
                    <Typography color='grey.700'> {rows?.topicName}</Typography>
                  </StyledTableCell>
                  <StyledTableCell sx={{ color: 'grey.600', width: '10%', fontSize: 14 }}>
                    {rows?.studentName}
                  </StyledTableCell>
                  <>
                    {rows?.evaluations.map((evaluation: any, index: number) => (
                      <StyledTableCell sx={{ color: 'grey.700', width: '1%', p: 0 }}>
                        <ScoreInput
                          handleChangeScore={handleChangeScore}
                          evaluationId={evaluation.evaluationId}
                          studentId={rows?.studentId}
                          oldScore={evaluation.score}
                          disabled={NO_SCORE_STATUS_LIST?.some(
                            (status) => status === `${rows?.studentStatus}`,
                          )}
                          scoreMax={evaluation.scoreMax}
                        />
                      </StyledTableCell>
                    ))}
                  </>
                  <StyledTableCell sx={{ color: 'success.dark', width: '1%' }}>
                    {scoreStds
                      .filter((scoreStd) => scoreStd.studentId === rows?.studentId)
                      .map((scd) => parseInt(scd.score))
                      .reduce((sc1, sc2) => sc1 + sc2, 0)}
                    (
                    {(
                      scoreStds
                        .filter((scoreStd) => scoreStd.studentId === rows?.studentId)
                        .map((scd) => parseInt(scd.score))
                        .reduce((sc1, sc2) => sc1 + sc2, 0) / 10
                    ).toFixed(2)}
                    )
                    <>
                      {NO_SCORE_STATUS_LIST?.some(
                        (status) => status === `${rows?.studentStatus}`,
                      ) && (
                        <Typography color='error.dark' fontSize={12} fontWeight={500}>
                          - Không chấm -
                        </Typography>
                      )}
                    </>
                  </StyledTableCell>
                  <StyledTableCell sx={{ color: 'grey.700', width: '1%', fontSize: 14 }}>
                    {rows?.isScored ? (
                      <Button
                        onClick={() => handleSubmitUpdateTranscipts(rows?.studentId)}
                        color='warning'
                        disabled={NO_SCORE_STATUS_LIST?.some(
                          (status) => status === `${rows?.studentStatus}`,
                        )}
                        startIcon={<Icon icon={'emojione-monotone:writing-hand'} />}
                      >
                        Cập nhật
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleSubmitCreateTranscipts(rows?.studentId)}
                        disabled={NO_SCORE_STATUS_LIST?.some(
                          (status) => status === `${rows?.studentStatus}`,
                        )}
                        startIcon={<Icon icon={'emojione-monotone:writing-hand'} />}
                      >
                        Chấm
                      </Button>
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Box>
      )}
    </>
  );
}

export default TableScoreManagement;
