import { Box, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';

import TitleManager from '@/components/ui/Title';
import { Icon } from '@iconify/react';
import CardStudentGroup from './Card';
import useGroupSupport from '@/hooks/api/useQueryGroupSupport';
import SekeletonUI from '@/components/ui/Sekeleton';
import AccordionListScore from './AccordionListScore';
import useQueryTranscript from '@/hooks/api/useQueryTranscript';

function ScoreGroupSupport() {
  const [currentGroupChecked, setCurrentGroupChecked] = useState<string[]>([]);
  const { handleGetMyGroupSupport, handleGetStudentMemberToScoring } = useGroupSupport();
  const { hanleGetEvalutaionsForScoring } = useQueryTranscript();
  const { data, isLoading, isFetching } = handleGetMyGroupSupport();
  const {
    data: dataEvaluation,
    isLoading: isloadingEvaluation,
    isFetching: isfetchingEvaluation,
  } = hanleGetEvalutaionsForScoring('advisor');
  const {
    data: dataMember,
    isLoading: loadingMember,
    isFetching: fetchingMember,
  } = handleGetStudentMemberToScoring();

  //[event]
  const handleSetCurrentGroupChecked = (groupStudentId: string, isChecked: boolean): void => {
    if (isChecked === true) setCurrentGroupChecked([...currentGroupChecked, groupStudentId]);
    else {
      const current = currentGroupChecked.filter((gr) => gr !== groupStudentId);
      setCurrentGroupChecked(current);
    }
  };

  return (
    <Paper sx={{ py: 20, px: 10 }} elevation={1}>
      <TitleManager>Chấm điểm nhóm sinh viên hướng dẫn</TitleManager>

      <Box minHeight={'80vh'} display={'flex'} mt={10} gap={10}>
        <Paper sx={{ px: 8, py: 10, width: 'calc(40% - 10px)' }}>
          <TitleManager color={'grey.900'} variant='body1'>
            Danh sách nhóm mà bạn đang hướng dẫn
          </TitleManager>
          <Box width={'full'} display={'flex'} flexDirection={'column'} mt={6}></Box>
          <Box component={'section'} mt={8} display={'flex'} flexDirection={'column'} gap={6}>
            {isLoading || isFetching ? (
              <SekeletonUI />
            ) : (
              data?.groupStudents.map((group: any) => (
                <CardStudentGroup
                  groupName={group.groupStudentName}
                  topicName={group.topicName}
                  groupStudentId={group.groupStudentId}
                  handleSetCurrentGroupChecked={handleSetCurrentGroupChecked}
                />
              ))
            )}
          </Box>
        </Paper>
        <Paper sx={{ px: 8, py: 10, width: '60%' }}>
          {currentGroupChecked.length < 1 ? (
            <Box display={'flex'} sx={{ cursor: 'progress' }} flexDirection={'column'} height={500}>
              <Box display={'flex'} flexDirection={'column'} gap={10} alignItems={'center'}>
                <Typography color='primary.main' variant='h6' mt={20} fontWeight={600}>
                  Vui lòng Chọn sinh viên trong danh sách sinh viên bên trái để chấm điểm ....
                </Typography>
                <Icon color='#dfdfdf' width={200} icon='icon-park-solid:hand-left' />
              </Box>
            </Box>
          ) : (
            <>
              {loadingMember || fetchingMember || isloadingEvaluation || isfetchingEvaluation ? (
                <SekeletonUI />
              ) : (
                <Box width={'100%'} my={4}>
                  {dataMember?.groupStudentMembers
                    ?.filter((student2: any) =>
                      currentGroupChecked.includes(student2.groupStudentId),
                    )
                    .map((student: any) => (
                      <AccordionListScore
                        student={student}
                        evaluations={dataEvaluation?.evaluations}
                      />
                    ))}
                </Box>
              )}
            </>
          )}
        </Paper>
      </Box>
    </Paper>
  );
}

export default ScoreGroupSupport;
