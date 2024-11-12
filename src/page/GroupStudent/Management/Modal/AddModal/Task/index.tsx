import useGroupStudent from '@/hooks/api/useQueryGroupStudent';
import { Icon } from '@iconify/react';
import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

const convertStudents = (data: any[]) => {
  if (!data) {
    return [];
  }
  const newData: any = [];
  data.map((student: any) => {
    newData.push({ ...student, mssv: student.username, group: 'NO_GROUP' });
  });
  return newData;
};

function TaskAddStudent(props: any) {
  const { nameGroup, handleSetData } = props;
  const currentGroup = nameGroup;

  const [taskAddStudent, setTaskAddStudent] = useState<any[]>();
  const { handleGetStudentNoHaveGroup } = useGroupStudent();
  const { data, isFetching, isLoading } = handleGetStudentNoHaveGroup();

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
  const handleOnDrop = (evt: any, value: any, group: any) => {
    evt.preventDefault();
    evt.currentTarget.classList.remove('dragged-over');
    let data = evt.dataTransfer.getData('text/plain');

    let updated = taskAddStudent?.map((task: any) => {
      if (task.mssv.toString() === data.toString()) {
        task.group = group;
      }
      return task;
    });
    setTaskAddStudent(updated);
  };
  const dataStudenInGroup = taskAddStudent?.filter((data: any) => data.group === nameGroup);
  const dataStudentNoGroup = taskAddStudent?.filter((data: any) => data.group === 'NO_GROUP');
  useEffect(() => {
    setTaskAddStudent(convertStudents(data?.students));
  }, [isFetching, isLoading]);

  useEffect(() => {
    handleSetData(taskAddStudent?.filter((data: any) => data.group === nameGroup));
  }, [taskAddStudent]);
  return (
    <Box position={'relative'} sx={{ bgcolor: 'white', py: 4, px: 8, borderRadius: 4 }}>
      <Box className='container' width={'full'} display={'flex'} gap={10}>
        <Box flex={1}>
          <Box alignItems={'center'} gap={4} display={'flex'}>
            <Typography variant='h5' fontWeight={'500'} color='primary.main'>
              Danh sách sinh viên
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
            onDrop={(e) => handleOnDrop(e, false, 'NO_GROUP')}
            pr={10}
            sx={{
              maxHeight: 400,
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
          >
            <Box className='drag_container'>
              <Box className='container'>
                <Box className='drag_column'>
                  <Box className='drag_row'>
                    {dataStudentNoGroup?.map((item: any, index: number) => (
                      <Box
                        sx={{
                          bgcolor: 'grey.100',
                          borderRadius: 1,
                          px: 6,
                          py: 4,
                          color: 'white',
                          my: 4,
                          border: '2px solid #fefefe',
                          cursor: 'pointer',
                          ':hover': {
                            border: '2px solid #00B1A2',
                            boxShadow: ' rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;',
                            transition: '0.1s ease-in',
                            backgroundColor: '#D3FFEF',
                          },
                        }}
                        key={item.mssv}
                        id={item.mssv}
                        draggable
                        onDragStart={(e) => handleOnDrageStart(e)}
                        onDragEnd={(e) => handleOnDrageStart(e)}
                        onDrop={(e) => handleOnDrop(e, false, nameGroup)}
                      >
                        <Box gap={10} position={'relative'} alignItems={'center'} display='flex'>
                          <Box>
                            <Typography
                              position='absolute'
                              right={10}
                              top={2}
                              bgcolor={'success.main'}
                              px={4}
                              py={2}
                              borderRadius={1}
                              variant='body2'
                              color={'white'}
                            >
                              Chưa có nhóm
                            </Typography>
                            <Typography variant='h6' color={'primary.main'} fontWeight={'500'}>
                              <span> Họ và tên: {'   '}</span>
                              {item.fullName}
                            </Typography>
                            <Typography variant='body2' color={'primary.dark'} fontWeight={'500'}>
                              <span>Mã sinh vien: {'  '}</span> {item.mssv}
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
        </Box>
        <Box mt={20} flex={1}>
          <Box justifyContent={'space-between'} display={'flex'} mb={10}>
            <Typography variant='h4' fontWeight={'500'} color='error.main'>
              Nhóm sinh viên {nameGroup}
            </Typography>
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
              height: 200,
            }}
            flex={1}
            onDragLeave={(e: any) => handleOnDragLeave(e)}
            onDragEnter={(e) => handleOnDragEnter(e)}
            onDragEnd={(e) => handleOnDrageEnd(e)}
            onDragOver={(e) => handleOnDragOver(e)}
            onDrop={(e) => handleOnDrop(e, false, nameGroup)}
          >
            <Box className='drag_container'>
              <Box className='container'>
                <Box className='drag_column'>
                  <Box className='drag_row'>
                    {dataStudenInGroup?.map((item: any) => (
                      <Box
                        sx={{
                          bgcolor: 'grey.100',
                          borderRadius: 1,
                          px: 6,
                          py: 4,
                          color: 'white',
                          my: 4,
                          border: '2px solid #fefefe',
                          cursor: 'pointer',
                          ':hover': {
                            border: '2px solid #b11500',
                            boxShadow: '1px 1px 1px 1px #E6E6E6',
                            transition: '0.1s ease-in',
                            backgroundColor: '#ffd5d3',
                          },
                        }}
                        key={item.mssv}
                        id={item.mssv}
                        draggable
                        onDragStart={(e) => handleOnDrageStart(e)}
                        onDragEnd={(e) => handleOnDrageStart(e)}
                      >
                        <Box gap={10} position={'relative'} alignItems={'center'} display='flex'>
                          <Box>
                            <Typography
                              position='absolute'
                              right={10}
                              top={2}
                              bgcolor={'error.main'}
                              px={4}
                              py={2}
                              borderRadius={2}
                              variant='body2'
                              color={'white'}
                            >
                              Nhóm {currentGroup}
                            </Typography>
                            <Typography variant='h6' color={'error.main'} fontWeight={'500'}>
                              <span> Họ và tên: {'   '}</span>
                              {item.fullName}
                            </Typography>
                            <Typography variant='body2' color={'error.dark'} fontWeight={'500'}>
                              <span>Mã sinh vien: {'  '}</span> {item.mssv}
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
            <Typography flex={1} variant='h6' color='primary.main' fontWeight={'500'}>
              Số lượng : {'      '}
              <span style={{ color: 'black' }}> {dataStudenInGroup?.length} / 2</span>
            </Typography>
            {dataStudenInGroup && dataStudenInGroup.length > 2 && (
              <Typography variant='body1' color='warning.dark'>
                <Icon icon='twemoji:warning' />
                Nhóm sinh viên tối đa 2 thành viên
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default TaskAddStudent;
