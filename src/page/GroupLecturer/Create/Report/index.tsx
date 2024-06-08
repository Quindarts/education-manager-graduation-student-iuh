import CustomTextField from '@/components/ui/CustomTextField';
import { Box, Button, Card, Chip, LinearProgress, Paper, Tooltip, Typography } from '@mui/material';
import React from 'react';
import CardLecturer from '../Card/CardLecturer';
import { Icon } from '@iconify/react';
import SekeletonUI from '@/components/ui/Sekeleton';
import DropDown from '@/components/ui/Dropdown';

export const ENUM_STATUS_LECTURER = {
  NO_GROUP: 'NO_GROUP',
  GRADING_INSTRUCTION: 'GRADING_INSTRUCTION', // chấm hd
  GRADING_ASSEMBLY: 'GRADING_ASSEMBLY', // chấm hđ
  GRADING_POSTER: ' GRADING_POSTER', // chấm poster
};
const TASKS = [
  {
    id: 1,
    status: ENUM_STATUS_LECTURER.NO_GROUP,
    name: 'Giảng viên A',
    mssv: '21089141',
    degree: 'MASTER',
  },
  {
    id: 2,
    status: ENUM_STATUS_LECTURER.NO_GROUP,
    name: 'Giảng viên B',
    mssv: '21089141',
    degree: 'MASTER',
  },
  {
    id: 3,
    status: 'Completed',
    name: 'Giảng viên C',
    mssv: '21089141',
    degree: 'DOCTOR',
  },
  {
    id: 4,
    status: ENUM_STATUS_LECTURER.NO_GROUP,
    name: 'Giảng viên D',
    mssv: '21089141',
    degree: 'DOCTOR',
  },
  {
    id: 5,
    status: ENUM_STATUS_LECTURER.NO_GROUP,
    name: 'Giảng viên E',
    mssv: '21089141',
    degree: 'DOCTOR',
  },
  {
    id: 6,
    status: ENUM_STATUS_LECTURER.NO_GROUP,
    name: 'Giảng viên A',
    mssv: '21089141',
    degree: 'DOCTOR',
  },
  {
    id: 7,
    status: ENUM_STATUS_LECTURER.NO_GROUP,
    name: 'Giảng viên A',
    mssv: '21089141',
    degree: 'DOCTOR',
  },
];
function CreateReportGroupPage() {
  const [task, setTask] = React.useState(TASKS);
  const [currentGroup, setCurrentGroup] = React.useState(ENUM_STATUS_LECTURER.GRADING_POSTER);

  const handleDropGroup = (value: string) => {
    setCurrentGroup(value);
  };
  const handleOnDrageStart = (evt: any) => {
    let element = evt.currentTarget;
    element.classList.add('dragged');
    evt.dataTransfer.setData('text/plain', evt.currentTarget.id);
    evt.dataTransfer.effectAllowed = 'move';
  };
  const handleOnDrageEnd = (evt: any) => {
    evt.currentTarget.classList.remove('dragged');
  };

  const handleOnDragEnter = (evt: any) => {
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.add('dragged-over');
    evt.dataTransfer.dropEffect = 'move';
  };
  const handleOnDragLeave = (evt: any) => {
    let currentTarget = evt.currentTarget;
    let newTarget = evt.relatedTarget;
    if (newTarget.parentNode === currentTarget || newTarget === currentTarget) return;
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.remove('dragged-over');
  };
  const handleOnDragOver = (evt: any) => {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'move';
  };
  const handleOnDrop = (evt: any, value: any, status: any) => {
    evt.preventDefault();
    evt.currentTarget.classList.remove('dragged-over');
    let data = evt.dataTransfer.getData('text/plain');
    let updated = TASKS.map((task: any) => {
      if (task.id.toString() === data.toString()) {
        task.status = status;
      }
      return task;
    });
    setTask(updated);
  };
  let dataLecturerGradingAssembly = task.filter(
    (data: any) => data.status === ENUM_STATUS_LECTURER.GRADING_INSTRUCTION,
  );
  let dataLecturerNoGroup = task.filter(
    (data: any) => data.status === ENUM_STATUS_LECTURER.NO_GROUP,
  );

  return (
    <Box display={'flex'} py={10} px={0} gap={20} justifyContent={'space-between'}>
      <Paper
        onDragLeave={(e: any) => handleOnDragLeave(e)}
        onDragEnter={(e) => handleOnDragEnter(e)}
        onDragEnd={(e) => handleOnDrageEnd(e)}
        onDragOver={(e) => handleOnDragOver(e)}
        onDrop={(e) => handleOnDrop(e, false, ENUM_STATUS_LECTURER.NO_GROUP)}
        sx={{
          flex: 1,
          px: 10,
          minHeight: '80vh',
          py: 6,
        }}
        elevation={1}
      >
        <Typography mb={4} variant='h5' color='primary'>
          Danh sách giảng viên trống lịch
        </Typography>
        <CustomTextField placeholder='Tim kiem giang vien' />
        <Box>
          {dataLecturerNoGroup.map((task: any, index: number) => (
            <CardLecturer
              key={task.id}
              id={task.id}
              lecturer={task}
              draggable
              onDragStart={(e: any) => handleOnDrageStart(e)}
              onDragEnd={(e: any) => handleOnDrageStart(e)}
            />
          ))}
        </Box>
      </Paper>
      <Paper
        sx={{
          flex: 1,
          px: 6,
          height: 440,
          py: 10,
        }}
        onDragLeave={(e: any) => handleOnDragLeave(e)}
        onDragEnter={(e) => handleOnDragEnter(e)}
        onDragEnd={(e) => handleOnDrageEnd(e)}
        onDragOver={(e) => handleOnDragOver(e)}
        onDrop={(e) => handleOnDrop(e, false, ENUM_STATUS_LECTURER.GRADING_INSTRUCTION)}
        elevation={6}
      >
        <Box display={'flex'} mb={10} justifyContent={'space-between'}>
          <Typography variant='h6' color='primary'>
            Tạo nhóm chấm báo cáo cấp khoa
          </Typography>
          <DropDown
            onSelect={(e: any) => {
              handleDropGroup(e.target.value);
            }}
            defaultValue={`${ENUM_STATUS_LECTURER.GRADING_POSTER}`}
            options={[
              { _id: ENUM_STATUS_LECTURER.GRADING_POSTER, name: 'Chấm poster' },
              { _id: ENUM_STATUS_LECTURER.GRADING_ASSEMBLY, name: 'Chấm Hội đồng' },
            ]}
          />
        </Box>

        {dataLecturerGradingAssembly.length < 1 ? (
          <Box display={'flex'} sx={{ cursor: 'progress' }} flexDirection={'column'} height={400}>
            <LinearProgress />
            <Box display={'flex'} flexDirection={'column'} gap={10} alignItems={'center'}>
              <Typography color='primary.main' variant='h6' mt={20} fontWeight={600}>
                Kéo thả giảng viên trống lịch, để tạo nhóm giảng viên
              </Typography>
              <Icon color='#dfdfdf' width={200} icon='streamline:search-visual' />
            </Box>
          </Box>
        ) : (
          <Box sx={{ minHeight: 130 }}>
            {dataLecturerGradingAssembly.map((task: any) => (
              <Paper
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  my: 6,
                  px: 4,
                  py: 6,
                  boxSizing: 'border-box',
                  cursor: 'pointer',
                  ':hover': {
                    border: '2px solid #00B1A2',
                    boxShadow: '1px 1px 1px 1px #E6E6E6',
                    transition: '0.1s ease-in',
                    backgroundColor: '#D3FFEF',
                  },
                }}
                key={task.id}
                id={task.id}
                draggable
                onDragStart={(e) => handleOnDrageStart(e)}
                onDragEnd={(e) => handleOnDrageStart(e)}
              >
                <Box px={10}>
                  <Typography variant='body1' fontWeight={500} color='grey.700'>
                    Tên giảng viên
                    <Typography mx={4} component='span'>
                      {task.name}
                    </Typography>
                    <Typography ml={10} component='span' textAlign={'end'}>
                      Trình độ: {task.degree}
                    </Typography>
                  </Typography>
                  <Typography variant='body1' fontWeight={500} color='grey.700'>
                    Mã giảng viên
                    <Typography mx={4} component='span'>
                      {task.mssv}
                    </Typography>
                  </Typography>
                </Box>
                <Box>
                  <Chip sx={{ color: 'white' }} color='success' label={`${currentGroup}`} />
                </Box>
              </Paper>
            ))}{' '}
            <Typography variant='body1' mt={10} color='primary'>
              Số lượng thành viên:{' '}
              <Typography component={'span'} variant='body1' mt={10} color='initial'>
                0 /3
              </Typography>
            </Typography>
            <Box display={'flex'} justifyContent={'end'} mt={10}>
              <Button color='error' variant='contained'>
                <Icon icon='dashicons:saved' />
                Tạo nhóm
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default CreateReportGroupPage;
