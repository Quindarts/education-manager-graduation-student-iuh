import CustomTextField from '@/components/ui/CustomTextField';
import { Box, Button, Chip, LinearProgress, Paper, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import CardLecturer from '../Card/CardLecturer';
import { Icon } from '@iconify/react';
import SekeletonUI from '@/components/ui/Sekeleton';
import { useTerm } from '@/hooks/api/useQueryTerm';
import { useGroupLecturer } from '@/hooks/api/useQueryGroupLecturer';

export const ENUM_STATUS_LECTURER = {
  NO_GROUP: 'NO_GROUP',
  GRADING_INSTRUCTION: 'GRADING_INSTRUCTION', // chấm hd
};
const TASKS = [
  {
    id: 1,
    status: ENUM_STATUS_LECTURER.NO_GROUP,
    fullName: 'Giảng viên A',
    username: '21089141',
    // degree: 'MASTER',
  },
  {
    id: 2,
    status: ENUM_STATUS_LECTURER.NO_GROUP,
    fullName: 'Giảng viên B',
    username: '21089141',
    // degree: 'MASTER',
  },
  {
    id: 3,
    status: 'Completed',
    fullName: 'Giảng viên C',
    username: '21089141',
    // degree: 'DOCTOR',
  },
  {
    id: 4,
    status: ENUM_STATUS_LECTURER.NO_GROUP,
    fullName: 'Giảng viên D',
    username: '21089141',
    // degree: 'DOCTOR',
  },
  {
    id: 5,
    status: ENUM_STATUS_LECTURER.NO_GROUP,
    fullName: 'Giảng viên E',
    username: '21089141',
    // degree: 'DOCTOR',
  },
  {
    id: 6,
    status: ENUM_STATUS_LECTURER.NO_GROUP,
    fullName: 'Giảng viên A',
    username: '21089141',
    // degree: 'DOCTOR',
  },
  {
    id: 7,
    status: ENUM_STATUS_LECTURER.NO_GROUP,
    fullName: 'Giảng viên A',
    username: '21089141',
    // degree: 'DOCTOR',
  },
];
const convertLecturerGroup = (data: any[]) => {
  if (!data) {
    return [];
  }
  const newData: any = [];
  data.map((lecturer: any) => {
    newData.push({ ...lecturer, status: ENUM_STATUS_LECTURER.NO_GROUP });
  });
  return newData;
};
function CreateInstructorGroupPage() {
  const [task, setTask] = React.useState<any[]>();
  const { handleGetLecturerNoGroupByTypeGroup, onCreateGroupLecturer } = useGroupLecturer();
  const { data, isLoading, isSuccess, isFetched } = handleGetLecturerNoGroupByTypeGroup('reviewer');

  useEffect(() => {
    setTask(convertLecturerGroup(data?.lecturers));
  }, [isSuccess, isFetched, data]);

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

    let updated = task?.map((task: any) => {
      if (task.id.toString() === data.toString()) {
        task.status = status;
      }
      return task;
    });
    setTask(updated);
  };
  let dataLecturerGradingAssembly = task?.filter(
    (data: any) => data.status === ENUM_STATUS_LECTURER.GRADING_INSTRUCTION,
  );
  let dataLecturerNoGroup = task?.filter(
    (data: any) => data.status === ENUM_STATUS_LECTURER.NO_GROUP,
  );
  const { mutate: create, isSuccess: successCreate } = onCreateGroupLecturer('reviewer');
  const { termStore } = useTerm();

  const handleCreateGroup = () => {
    let dataLecturerGradingAssembly = task?.filter(
      (data: any) => data.status === ENUM_STATUS_LECTURER.GRADING_INSTRUCTION,
    );
    const lecturers = dataLecturerGradingAssembly?.map((lec) => lec.id);
    create({ termId: termStore.currentTerm.id, lecturers: lecturers });
  };

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
          py: 6,
        }}
        elevation={1}
      >
        <Typography mb={4} variant='h5' color='primary'>
          Danh sách giảng viên trống lịch
        </Typography>
        <CustomTextField placeholder='Tim kiem giang vien' />
        <Box sx={{ overflowY: 'auto' }} height={450} pr={10}>
          {isLoading || !isFetched ? (
            <SekeletonUI />
          ) : (
            <Box>
              {dataLecturerNoGroup?.map((task: any) => (
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
          )}
        </Box>
      </Paper>
      <Paper
        sx={{
          flex: 1,
          px: 6,
          height: 450,
          py: 10,
        }}
        onDragLeave={(e: any) => handleOnDragLeave(e)}
        onDragEnter={(e) => handleOnDragEnter(e)}
        onDragEnd={(e) => handleOnDrageEnd(e)}
        onDragOver={(e) => handleOnDragOver(e)}
        onDrop={(e) => handleOnDrop(e, false, ENUM_STATUS_LECTURER.GRADING_INSTRUCTION)}
        elevation={6}
      >
        <Typography variant='h6' color='primary'>
          Tạo nhóm chấm phản biện
        </Typography>
        {dataLecturerGradingAssembly && dataLecturerGradingAssembly.length < 1 ? (
          <Box display={'flex'} sx={{ cursor: 'progress' }} flexDirection={'column'} height={500}>
            <Box display={'flex'} flexDirection={'column'} gap={10} alignItems={'center'}>
              <Typography color='grey.500' variant='h6' mt={20}>
                Vui lòng kéo thả giảng viên...
              </Typography>
              <Icon color='#dfdfdf' width={200} icon='icon-park-solid:hand-left' />
            </Box>
          </Box>
        ) : (
          <Box sx={{ minHeight: 200 }}>
            {dataLecturerGradingAssembly?.map((task: any) => (
              <Paper
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  my: 6,
                  px: 4,
                  py: 6,
                  cursor: 'pointer',
                  boxSizing: 'border-box',
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
                      {task.fullName}
                    </Typography>
                    <Typography ml={10} component='span' textAlign={'end'}>
                      {/* Trình độ: {task.degree} */}
                    </Typography>
                  </Typography>
                  <Typography variant='body1' fontWeight={500} color='grey.700'>
                    Mã giảng viên
                    <Typography mx={4} component='span'>
                      {task.username}
                    </Typography>
                  </Typography>
                </Box>
                <Box>
                  <Chip sx={{ color: 'white' }} color='success' label='Chọn để chấm' />
                </Box>
              </Paper>
            ))}{' '}
            {dataLecturerGradingAssembly?.length === 3 && (
              <Typography component={'span'} variant='body1' mt={10} color='warning.main'>
                <Icon icon='material-symbols-light:warning-outline' />
                Đã đạt số lượng thành viên tối đa
              </Typography>
            )}
            <Typography variant='body1' mt={10} color='primary'>
              Số lượng thành viên:{' '}
              <Typography component={'span'} variant='body1' mt={10} color='initial'>
                {dataLecturerGradingAssembly?.length} /3
              </Typography>
            </Typography>
            <Box display={'flex'} justifyContent={'end'} mt={10}>
              <Button color='error' variant='contained' onClick={handleCreateGroup}>
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

export default CreateInstructorGroupPage;