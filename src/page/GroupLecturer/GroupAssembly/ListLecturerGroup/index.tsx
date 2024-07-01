import SekeletonUI from '@/components/ui/Sekeleton';
import TitleManager from '@/components/ui/Title';
import { useGroupLecturer } from '@/hooks/api/useQueryGroupLecturer';
import { Box, Link, Typography } from '@mui/material';
import React, { useState } from 'react';

const checkedTyperLecturer = (key: string) => {
  switch (key) {
    case 'report_poster':
      return 'Chấm Poster';
    case 'reviewer':
      return 'Chấm Phản biện';
    case 'report_council':
      return 'Chấm Hội đồng';
  }
  return;
};
function ListLecturerStudent(props: any) {
  const { setCurrentTeam, checkedTyper } = props;
  const [isSelectedGrading, setIsSelectedGrading] = useState();
  const handleChoiceTeam = (index: any, team: any) => {
    setIsSelectedGrading(index);
    setCurrentTeam({ id: team.groupLecturerId, team: team });
  };
  const { handleGetAllGroupLecturerByTypeGroup } = useGroupLecturer();
  const { data, isLoading, isSuccess, isFetched } = handleGetAllGroupLecturerByTypeGroup(checkedTyper);
  return (
    <Box my={10} borderRadius={4} bgcolor={'white'} py={16} px={8}>
      <Box>
        <TitleManager variant='body1' sx={{ mb: 4 }}>
          Danh sách nhóm giảng viên {checkedTyperLecturer(checkedTyper)}{' '}
        </TitleManager>
      </Box>

      {isLoading && !isSuccess && !isFetched ? (
        <SekeletonUI />
      ) : (
        <Box display={'flex'} flexWrap={'wrap'} p={4} gap={10}>
          {data?.groupLecturers.map((team: any, index: number) => (
            <Box
              p={4}
              position={'relative'}
              onClick={() => handleChoiceTeam(index, team)}
              height={120}
              sx={{ cursor: 'pointer' }}
              border={`${index === isSelectedGrading && '2px solid #2acf8a'}`}
              borderRadius={2}
              bgcolor={index !== isSelectedGrading ? 'grey.200' : '#d0ffeb'}
              width={'calc(25%  - 16px)'}
            >
              <Typography color='primary.dark'>{team.name}</Typography>
              {team.members.map((member: any, index: number) => (
                <>
                  <Typography variant='body2'>
                    GV {index + 1}: {member.fullName}
                  </Typography>
                </>
              ))}

              <Typography>
                <Link bottom={10} right={10} color={'grey.600'} position={'absolute'}>
                  Xem chi tiết
                </Link>
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default ListLecturerStudent;
