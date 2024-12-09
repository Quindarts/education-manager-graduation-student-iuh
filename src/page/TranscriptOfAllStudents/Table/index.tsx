import {
  checkTypeEvaluation,
  checkVietNamTypeEvaluation,
} from '@/utils/validations/transcript.validation';
import { Box, Button, Link, TableBody, TableHead, Tooltip, Typography } from '@mui/material';

import useTranscript from '@/hooks/api/useQueryTranscript';
import { StyledTableCell, StyledTableRow } from '@/components/iframe/PageWord/style';
import ScoreInput from '@/components/ui/ScoreInput';
import { Icon } from '@iconify/react';
import { EnumStatusStudent } from '@/types/enum';
import { useTerm } from '@/hooks/api/useQueryTerm';
import SekeletonTable from '@/components/ui/Sekeleton';
import ExportExcelButton from '@/components/ui/Export';

/**
 * ? bây giờ groupStudent sẽ số dòng
 * ? còn số cột sẽ là CLO evaluation
 */

function randomColor(index: number) {
  return index % 2 ? '#f9fcff' : '#ffffff';
}
const totalScores = (scores: any[]) => {
  if (!scores) return 0;
  return scores.reduce((score1, score2) => score1 + score2, 0);
};
const convertRowStudents = (groupStudents: any[]) => {
  if (groupStudents?.length === 0) return [];
  return groupStudents?.map((student: any, index: number) => {
    return {
      ...student,
      colorRow: randomColor(index),
      totalScores: totalScores(student?.evaluations.map((std: any) => std.score)),
    };
  });
};

const columnsExcelTranscripts = (evaluations, type) => {
  const init = [
    { header: 'Mã nhóm', key: 'groupName', width: 10 },
    { header: 'Mã sinh viên', key: 'username', width: 12 },
    { header: 'Họ và tên', key: 'studentName', width: 30 },
  ];
  if (!evaluations) return [...init];
  const evalColumns = evaluations
    ?.map((evaluation) => {
      return {
        header: `${evaluation.key} (${evaluation.scoreMax})`,
        key: evaluation.key,
        width: 10,
      };
    })
    .sort((a, b) => a.key.localeCompare(b.key));
  const totalScores = {
    header: `Tổng điểm (${checkVietNamTypeEvaluation(type)})`,
    key: 'totalScores',
    width: 14,
  };
  return [...init, ...evalColumns, totalScores];
};

const grScoresToExportExcel = (tranScripts) => {
  return tranScripts
    ?.map((transcript) => {
      let student = {
        username: transcript.username,
        studentName: transcript.fullName,
        groupName: transcript.groupName,
        topicName: transcript.topicName,
      };
      transcript?.evaluations
        .sort((a, b) => a.key.localeCompare(b.key))
        .map((evaluation) => {
          student = {
            ...student,
            [evaluation.key]: evaluation.score,
          };
        });
      return {
        ...student,
        totalScores: totalScores(transcript?.evaluations.map((std: any) => std.score)),
      };
    })
    .flat();
};
function TableScoreManagement({ typeScoreStudent }: any) {
  const { termStore } = useTerm();
  const termId = termStore.currentTerm.id;
  //[Handler update/ create transcript of group student]
  const { handleExportTranscripts, hanleGetEvalutaionsForScoring } = useTranscript();
  const { data: evaluationFetch } = hanleGetEvalutaionsForScoring(
    typeScoreStudent,
  );
  //![Get group student need score]
  const { data: groupTranscripts, isLoading } = handleExportTranscripts(typeScoreStudent);
  const columnsExcel = columnsExcelTranscripts(evaluationFetch?.evaluations, typeScoreStudent);
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'end', mb: 4 }}>
        <ExportExcelButton
          headerSetup={columnsExcel}
          data={grScoresToExportExcel(groupTranscripts?.transcripts)}
          entity='transcriptsOfLecturerScoring'
          label='Xuất bảng điểm'
        />
      </Box>
      {isLoading ? (
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
              {evaluationFetch?.evaluations
                ?.sort((a, b) => a.key.localeCompare(b.key))
                .map((evaluation: any) => (
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
          </TableHead>
          {/* Table body -> rows loading groupStudents */}{' '}
          {convertRowStudents(groupTranscripts?.transcripts)?.length > 0 ? (
            <TableBody>
              {convertRowStudents(groupTranscripts?.transcripts)?.map(
                (rows: any, index: number) => {
                  return (
                    <StyledTableRow key={index}>
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
                        <Typography color='grey.700'>
                          {' '}
                          {rows?.topicName}
                          <>
                            {rows?.link ? (
                              <Link
                                href={`${rows?.link}`}
                                sx={{ fontStyle: 'italic', fontWeight: 500, cursor: 'pointer' }}
                                mx={2}
                              >
                                Xem tài liệu{' '}
                              </Link>
                            ) : (
                              <Typography mx={2} component={'span'} variant='body1' color='initial'>
                                (Chưa nộp tài liệu)
                              </Typography>
                            )}
                          </>
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell sx={{ color: 'grey.600', width: '10%', fontSize: 14 }}>
                        {rows?.fullName}
                      </StyledTableCell>
                      <>
                        {rows?.evaluations.map((evaluation: any, index: number) => (
                          <StyledTableCell
                            key={index}
                            sx={{
                              color: 'grey.700',
                              width: '1%',
                              px: 4,
                              fontSize: 14,
                            }}
                          >
                            {evaluation.score}
                          </StyledTableCell>
                        ))}
                      </>
                      <StyledTableCell sx={{ color: 'error.main', width: '1%' }}>
                        {rows.totalScores}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                },
              )}
            </TableBody>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                py: 20,
              }}
            >
              <Box>
                <img src='/images/nodata.webp' width={200} height={200} alt='' />
                <Typography variant='body1' textAlign={'center'} color='grey.600'>
                  Bảng điểm trống
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export default TableScoreManagement;
