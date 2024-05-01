import TitleManager from '@/components/ui/Title';
import { Box, Link, Typography } from '@mui/material';
import React, { useState } from 'react';

function ListTeamStudent(props: any) {
  const { setCurrentTeam, listGroupStudent } = props;
  const [isSelectedGrading, setIsSelectedGrading] = useState(0);
  const handleChoiceTeam = (index: any, team: any) => {
    setIsSelectedGrading(index);
    setCurrentTeam(team);
  };
  return (
    <Box my={10} borderRadius={4} bgcolor={'white'} py={16} px={8}>
      <Box>
        <TitleManager sx={{ mb: 4 }}>Danh sách nhóm đề tài chấm điểm hội đồng </TitleManager>
      </Box>

      <Box display={'flex'} flexWrap={'wrap'} p={4} gap={10}>
        {listGroupStudent.map((team: number, index: number) => (
          <Box
            p={4}
            position={'relative'}
            onClick={() => handleChoiceTeam(team, index)}
            height={120}
            sx={{ cursor: 'pointer' }}
            border={`${index === isSelectedGrading && '2px solid #2acf8a'}`}
            borderRadius={4}
            bgcolor={index !== isSelectedGrading ? 'grey.200' : '#d0ffeb'}
            width={'calc(25%  - 16px)'}
          >
            <Typography fontWeight={'bold'} variant='h6' color='primary.dark'>
              Nhóm {team}
            </Typography>
            <Typography variant='body1'>GV hội đồng: Nguyễn Minh</Typography>
            <Typography variant='body1'>Tên đề tài: Phát triển ứng dụng</Typography>
            <Typography>
              <Box
                bottom={10}
                left={10}
                color={'grey.600'}
                position={'absolute'}
                fontSize={12}
                fontWeight={'bold'}
                borderRadius={'10px'}
              >
                Không có nhóm
              </Box>
              <Link bottom={10} right={10} color={'grey.600'} position={'absolute'}>
                Xem chi tiết
              </Link>
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default ListTeamStudent;
