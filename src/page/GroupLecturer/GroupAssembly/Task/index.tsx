import { Icon } from '@iconify/react';
import { Box, Button, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

const isExistLecturerSupport = (team: any, currentTopics: any) => {
  if (team !== null && team !== undefined) {
    const listLecturerId = team?.members.map((mem: any) => mem.id);
    const valueCheck = currentTopics.map((topic: any) => topic.lecturerId);

    return valueCheck.filter((value: string) => listLecturerId.includes(value)).length > 0;
  }
  return false;
};

const convertGroupStudentNoGroupList = (groupStudent: any[]) => {
  return !groupStudent ? [] : groupStudent.map((std) => ({ ...std, status: 'no_group' }));
};
function Task(props: any) {
  const { team, typeGroupLecturer, handleGroupStudentHavedAssign, groupStudents } = props;
  const [tasks, setTask] = useState<any[]>([]);
  useEffect(() => {
    setTask(convertGroupStudentNoGroupList(groupStudents));
  }, [groupStudents]);
  let dataHaveGroup = tasks?.filter((data: any) => data.status === 'have_group');

  let dataNoGroup = tasks?.filter((data: any) => data.status === 'no_group');

  useEffect(() => {
    handleGroupStudentHavedAssign(dataHaveGroup.map((groupStudent) => groupStudent));
  }, [tasks]);

  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    let dataHaveGroup = tasks?.filter((data: any) => data.status === 'have_group');

    if (isExistLecturerSupport(team, dataHaveGroup) === true) {
      enqueueSnackbar('Giảng viên hướng dẫn không được chấm phản biện', { variant: 'error' });
    }
  }, [tasks]);

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
    let updated = tasks?.map((task: any) => {
      if (task.id.toString() === data.toString()) {
        task.status = status;
      }
      return task;
    });
    setTask(updated);
  };

  return (
    <Box position={'relative'} sx={{ bgcolor: 'white', minHeight: '80vh', p: 10, borderRadius: 4 }}>
      <Box className='container' width={'full'} display={'flex'} gap={20}>
        <Box flex={1}>
          <Box alignItems={'center'} gap={6} display={'flex'}>
            <Typography variant='h5' fontWeight={'500'} color='primary.main'>
              Danh sách nhóm sinh viên chưa được phân
            </Typography>
            <Button color='success'>
              <Icon width={20} icon='fluent:filter-12-filled' />
              Filter
            </Button>
          </Box>
          <Box
            onDragLeave={(e: any) => handleOnDragLeave(e)}
            onDragEnter={(e) => handleOnDragEnter(e)}
            onDragEnd={(e) => handleOnDrageEnd(e)}
            onDragOver={(e) => handleOnDragOver(e)}
            onDrop={(e) => handleOnDrop(e, false, 'no_group')}
            pr={20}
            borderRight={'1px solid #0052b1 '}
            sx={{
              overflowY: 'auto',
              '&::-webkit-scrollbar': {
                width: 4,
              },
              '.MuiPaper-root': {
                pl: 8,
                pr: 8,
                py: 0,
              },
              '&::-webkit-scrollbar-thumb': {
                borderRadius: 10,
                width: 20,
                bgcolor: 'grey.400',
                color: 'grey.400',
              },
            }}
            height={'80vh'}
          >
            <Box className=''>
              {dataNoGroup.map((task: any, index: number) => (
                <Box
                  sx={{
                    bgcolor: 'grey.100',
                    borderRadius: 2,
                    p: 4,
                    color: 'white',
                    my: 4,
                    cursor: 'pointer',
                    border: '2px solid #f2f2f2',
                    '&:hover': {
                      border: '2px solid #2acf8a',
                      boxShadow:
                        '0 10px 20px rgba(166, 165, 165, 0.3), 0 6px 6px rgba(235, 235, 235, 0.23)',
                      bgcolor: '#e8fef5',
                      transition: '0.2s ease-in',
                    },
                  }}
                  key={task.id}
                  id={task.id}
                  draggable
                  onDragStart={(e) => handleOnDrageStart(e)}
                  onDragEnd={(e) => handleOnDrageStart(e)}
                >
                  <Box>
                    <Typography variant='body1' color={'primary.main'} fontWeight={'500'}>
                      {task?.name}
                    </Typography>
                    <Typography variant='body1' color={'primary.dark'} fontWeight={'500'}>
                      <span>Tên Đề tài : {'  '}</span>
                      {task?.topicName}
                    </Typography>
                    <Typography variant='body1' color={'primary.dark'} fontWeight={'500'}>
                      <span>Giảng viên hướng dẫn : {'  '}</span>
                      {task?.fullName}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
            <Box mb={6} mt={14} pt={10} borderTop={'1px solid #56bae8'}>
              <Typography variant='body1' color='primary.main' fontWeight={'500'}>
                Số lượng : {'      '}
                <span style={{ color: 'black' }}> {dataNoGroup.length}</span>
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box flex={1}>
          <Box justifyContent={'space-between'} display={'flex'} mb={10}>
            <Typography variant='h4' fontWeight={'500'} color='error.main'>
              Nhóm giảng viên
            </Typography>
            <Box>
              <Typography variant='body1' fontWeight={'600'} color='primary.main'>
                Nhóm chấm : {team.name}
              </Typography>
              {team?.members?.map((member: any, index: number) => (
                <Typography variant='body2' fontWeight={'500'} color='primary.main'>
                  GV {index + 1}: {member.fullName}
                </Typography>
              ))}
            </Box>
          </Box>
          <Box
            sx={{
              overflowY: 'auto',
              '&::-webkit-scrollbar': {
                width: 4,
              },
              '.MuiPaper-root': {
                pl: 8,
                pr: 8,
                py: 0,
              },
              '&::-webkit-scrollbar-thumb': {
                borderRadius: 10,
                width: 20,
                bgcolor: 'grey.400',
                color: 'grey.400',
              },
            }}
            height={'50vh'}
            flex={1}
            onDragLeave={(e: any) => handleOnDragLeave(e)}
            onDragEnter={(e) => handleOnDragEnter(e)}
            onDragEnd={(e) => handleOnDrageEnd(e)}
            onDragOver={(e) => handleOnDragOver(e)}
            onDrop={(e) => handleOnDrop(e, false, 'have_group')}
          >
            <Box className='drag_container'>
              <Box className='container'>
                <Box className='drag_column'>
                  <Box className='drag_row'>
                    {dataHaveGroup?.map((task: any) => (
                      <Box
                        sx={{
                          bgcolor: 'grey.100',
                          borderRadius: 2,
                          p: 4,
                          color: 'white',
                          my: 4,
                          cursor: 'pointer',
                          border: '2px solid #fefefe',
                          '&:hover': {
                            border: '2px solid #f97979',
                            boxShadow:
                              '0 10px 20px rgba(166, 165, 165, 0.3), 0 6px 6px rgba(235, 235, 235, 0.23)',
                            bgcolor: '#fdf9f9',
                            transition: '0.2s ease-in',
                          },
                        }}
                        key={task.id}
                        id={task.id}
                        draggable
                        onDragStart={(e) => handleOnDrageStart(e)}
                        onDragEnd={(e) => handleOnDrageStart(e)}
                      >
                        <Box gap={20} position={'relative'} alignItems={'center'} display='flex'>
                          <Box>
                            <Typography variant='body1' color={'primary.main'} fontWeight={'500'}>
                              {task?.name}
                            </Typography>
                            <Typography variant='body1' color={'primary.dark'} fontWeight={'500'}>
                              <span>Tên Đề tài : {'  '}</span>
                              {task?.topicName}
                            </Typography>
                            <Typography variant='body1' color={'primary.dark'} fontWeight={'500'}>
                              <span>Giảng viên hướng dẫn : {'  '}</span>
                              {task?.fullName}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            mb={6}
            mt={14}
            pt={10}
            width={'full'}
            justifyItems={'space-between'}
            display={'flex'}
            borderTop={'1px solid #56bae8'}
          >
            <Typography flex={1} variant='body1' color='primary.main' fontWeight={'500'}>
              Số lượng : {'      '}
              <span style={{ color: 'black' }}> {dataHaveGroup.length}</span>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Task;
