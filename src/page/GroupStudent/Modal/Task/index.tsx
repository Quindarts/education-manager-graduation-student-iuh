import { Icon } from '@iconify/react';
import { Box, Button, Link, Tooltip, Typography } from '@mui/material';
import React from 'react';

const listStudent = [
  {
    fullName: 'Le Minh Quang',
    mssv: 21089141,
    group_id: '100',
  },
  {
    fullName: 'Le Minh Long',
    mssv: 21089133,
    group_id: 'NO_GROUP',
  },
  {
    fullName: 'Phan Minh',
    mssv: 21094873,
    group_id: '100',
  },
  {
    fullName: 'Phan Lang',
    mssv: 21285831,
    group_id: 'NO_GROUP',
  },
  {
    fullName: 'Phan rang',
    mssv: 23123123,
    group_id: 'NO_GROUP',
  },
];
const currentGroup = '100';
function TaskAddStudent(props: any) {
  const [taskAddStudent, setTaskAddStudent] = React.useState(listStudent);

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
  const handleOnDrop = (evt: any, value: any, group_id: any) => {
    evt.preventDefault();
    evt.currentTarget.classList.remove('dragged-over');
    let data = evt.dataTransfer.getData('text/plain');

    let updated = taskAddStudent.map((task: any) => {
      if (task.mssv.toString() === data.toString()) {
        task.group_id = group_id;
      }
      return task;
    });
    setTaskAddStudent(updated);
  };
  let dataStudenInGroup = taskAddStudent.filter((data: any) => data.group_id === currentGroup);
  let dataStudentNoGroup = taskAddStudent.filter((data: any) => data.group_id === 'NO_GROUP');

  return (
    <Box position={'relative'} sx={{ bgcolor: 'white',py:4, px: 8, borderRadius: 4 }}>
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
                    {dataStudentNoGroup.map((item: any, index: number) => (
                      <Tooltip title={<Typography variant='body2'>Kéo thả thẻ này</Typography>}>
                        <Box
                          sx={{
                            bgcolor: 'grey.100',
                            borderRadius: 1,
                            px: 6,
                            py: 4,
                            color: 'white',
                            my: 4,
                          }}
                          key={item.mssv}
                          id={item.mssv}
                          draggable
                          onDragStart={(e) => handleOnDrageStart(e)}
                          onDragEnd={(e) => handleOnDrageStart(e)}
                        >
                          <Box gap={10} position={'relative'} alignItems={'center'} display='flex'>
                            <Box
                              bgcolor={'warning.main'}
                              borderRadius={'50%'}
                              width={30}
                              height={30}
                              justifyContent={'center'}
                              alignItems={'center'}
                              display={'flex'}
                            >
                              <Icon icon='fluent-emoji:man-student-medium-light' width={60} />
                            </Box>
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
                              <Link textAlign={'end'}>Xem chi tiết</Link>
                            </Box>
                          </Box>
                        </Box>
                      </Tooltip>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>
            {/* <Box mb={6} mt={14} pt={10}>  
              <Typography variant='h6' color='primary.main' fontWeight={'500'}>
                Số lượng : {'      '}
                <span style={{ color: 'black' }}> {dataStudentNoGroup.length}</span>
              </Typography>
            </Box> */}
          </Box>
        </Box>
        <Box flex={1}>
          <Box justifyContent={'space-between'} display={'flex'} mb={10}>
            <Typography variant='h4' fontWeight={'500'} color='error.main'>
              Nhóm sinh viên {currentGroup}
            </Typography>
            <Box>
              <Typography variant='body2' fontWeight={'500'} color='primary.main'>
                GV hướng dẫn: Chưa có
              </Typography>
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
              height: 280,
            }}
            flex={1}
            onDragLeave={(e: any) => handleOnDragLeave(e)}
            onDragEnter={(e) => handleOnDragEnter(e)}
            onDragEnd={(e) => handleOnDrageEnd(e)}
            onDragOver={(e) => handleOnDragOver(e)}
            onDrop={(e) => handleOnDrop(e, false, '100')}
          >
            <Box className='drag_container'>
              <Box className='container'>
                <Box className='drag_column'>
                  <Box className='drag_row'>
                    {dataStudenInGroup.map((item: any) => (
                      <Tooltip title={<Typography variant='body2'>Kéo thả thẻ này</Typography>}>
                        <Box
                          sx={{
                            bgcolor: 'grey.100',
                            borderRadius: 1,
                            px: 6,
                            py: 4,
                            color: 'white',
                            my: 4,
                          }}
                          key={item.mssv}
                          id={item.mssv}
                          draggable
                          onDragStart={(e) => handleOnDrageStart(e)}
                          onDragEnd={(e) => handleOnDrageStart(e)}
                        >
                          <Box gap={10} position={'relative'} alignItems={'center'} display='flex'>
                            <Box
                              bgcolor={'warning.main'}
                              borderRadius={'50%'}
                              width={30}
                              height={30}
                              justifyContent={'center'}
                              alignItems={'center'}
                              display={'flex'}
                            >
                              <Icon icon='fluent-emoji:man-student-medium-light' width={60} />
                            </Box>
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
                              <Link textAlign={'end'}>Xem chi tiết</Link>
                            </Box>
                          </Box>
                        </Box>
                      </Tooltip>
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
              <span style={{ color: 'black' }}> {dataStudenInGroup.length} / 3</span>
            </Typography>
            <Button color='warning' size='small'>
              Làm mới
            </Button>
            <Button color='success' size='small'>
              Tạo ngẫu nhiên
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default TaskAddStudent;
