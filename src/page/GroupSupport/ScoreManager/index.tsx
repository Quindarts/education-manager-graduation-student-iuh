import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  LinearProgress,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import TitleManager from '@/components/ui/Title';
import { Icon } from '@iconify/react';
import ScoreInput from '@/components/ui/ScoreInput';
import CardStudentGroup from './Card';
import SekeletonUI from '@/components/ui/Sekeleton';

const STUDENT_IN_GROUP = [
  { fullName: 'Le Minh Quang', mssv: '21089141', group_id: '1' },
  { fullName: 'Nguyen Van Minh', mssv: '21089141', group_id: '2' },
  { fullName: 'Pham Huy Hoang', mssv: '21020241', group_id: '1' },
  { fullName: 'Nguyen Thi Nga', mssv: '21020241', group_id: '3' },
  { fullName: 'Nguyen Thien Tu', mssv: '21020241', group_id: '4' },
];

function ScoreGroupSupport() {
  const [currentGroupChecked, setCurrentGroupChecked] = useState<string[]>([]);

  const handleSetCurrentGroupChecked = (group_id: string, isChecked: boolean): void => {
    if (isChecked === true) setCurrentGroupChecked([...currentGroupChecked, group_id]);
    else {
      const current = currentGroupChecked.filter((gr) => gr !== group_id);
      setCurrentGroupChecked(current);
    }
  };
  const demo = ['1', '2', '3', '4'];

  return (
    <Paper sx={{ py: 20, px: 10 }} elevation={1}>
      <Box minHeight={'80vh'} display={'flex'} gap={4}>
        <Paper sx={{ px: 8, py: 10, flex: 1 }}>
          <TitleManager>Chấm điểm nhóm sinh viên hướng dẫn</TitleManager>

          <Box width={'full'} display={'flex'} flexDirection={'column'} mt={6}></Box>
          <Box component={'section'} mt={8} display={'flex'} flexDirection={'column'} gap={6}>
            {demo.map((group_id) => (
              <CardStudentGroup
                group_id={group_id}
                handleSetCurrentGroupChecked={handleSetCurrentGroupChecked}
              />
            ))}
          </Box>
        </Paper>
        <Paper sx={{ px: 8, py: 10, flex: 2 }}>
          {currentGroupChecked.length < 1 ? (
            <Box display={'flex'} sx={{ cursor: 'progress' }} flexDirection={'column'} height={500}>
              <LinearProgress />
              <Box display={'flex'} flexDirection={'column'} gap={10} alignItems={'center'}>
                <Typography color='primary.main' variant='h6' mt={20} fontWeight={600}>
                  Danh sách sinh viên chấm điểm trống...
                </Typography>
                <Icon color='#dfdfdf' width={200} icon='streamline:search-visual' />
              </Box>
            </Box>
          ) : (
            <Box my={10}>
              {STUDENT_IN_GROUP.filter((student2) =>
                currentGroupChecked.includes(student2.group_id),
              ).map((student: any) => (
                <Accordion sx={{ mb: 4 }}>
                  <AccordionSummary
                    sx={{ bgcolor: 'grey.100' }}
                    expandIcon={<ExpandMoreIcon color='primary' />}
                  >
                    <Box display={'flex'} gap={4}>
                      <Icon width={20} icon='flat-color-icons:folder' />

                      <Typography fontWeight={'bold'} color={'primary.main'} variant='body1'>
                        {student.fullName} - MSSV: {student.mssv}
                      </Typography>

                      <Typography
                        justifyContent={'end'}
                        fontWeight={'bold'}
                        color={'grey.500'}
                        variant='body1'
                      >
                        Nhóm Sinh viên {student.group_id}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box display={'flex'} flexDirection={'column'}>
                      <ScoreInput name='CLO1' scoreMax={10} />
                      <ScoreInput name='CLO2' scoreMax={10} />
                      <ScoreInput name='CLO3' scoreMax={10} />
                      <ScoreInput name='CLO4' scoreMax={10} />
                      <ScoreInput name='CLO5' scoreMax={10} />
                      <ScoreInput name='CLO6' scoreMax={10} />
                      <ScoreInput name='CLO7' scoreMax={10} />
                      <Box my={4} display={'flex'} gap={100} alignSelf={'end'} py={4} px={0}>
                        <Typography fontWeight={'bold'} variant='h5' color='error'>
                          Tổng Điểm : 100/100
                        </Typography>
                        <Button color='primary' variant='contained'>
                          <Icon icon='bi:pen-fill' />
                          Cập nhật điểm
                        </Button>
                      </Box>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          )}
        </Paper>
      </Box>
    </Paper>
  );
}

export default ScoreGroupSupport;
