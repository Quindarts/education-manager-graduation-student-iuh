import { Icon } from '@iconify/react';
import { Box, Button, Link, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { ENUM_STATUS_LECTURER } from '..';

function Task(props: any) {
  const { tasks, team } = props;
  const [task, setTask] = React.useState(tasks);


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
    let updated = tasks.map((task: any) => {
      if (task.id.toString() === data.toString()) {
        task.status = status;
      }
      return task;
    });
    setTask(updated);
  };
  let dataLecturerGradingAssembly = task.filter(
    (data: any) => data.status === ENUM_STATUS_LECTURER.GRADING_ASSEMBLY,
  );
  let dataLecturerNoGroup = task.filter(
    (data: any) => data.status === ENUM_STATUS_LECTURER.NO_GROUP,
  );

  return (
    <Box position={'relative'} sx={{ bgcolor: 'white', minHeight: '80vh', p: 10, borderRadius: 4 }}>
      <Box className='container' width={'full'} display={'flex'} gap={20}>
        <Box flex={1}>
          <Box alignItems={'center'} gap={6} display={'flex'}>
            <Typography variant='h5' fontWeight={'bold'} color='primary.main'>
              Danh sách giảng viên trống lịch
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
            onDrop={(e) => handleOnDrop(e, false, ENUM_STATUS_LECTURER.NO_GROUP)}
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
            <Box className='drag_container'>
              <Box className='container'>
                <Box className='drag_column'>
                  <Box className='drag_row'>
                    {dataLecturerNoGroup.map((task: any, index: number) => (
                      <Tooltip title={<Typography variant='body2'>Kéo thả thẻ này</Typography>}>
                        <Box
                          sx={{
                            bgcolor: 'grey.100',
                            borderRadius: 4,
                            p: 10,
                            color: 'white',
                            my: 4,
                          }}
                          key={task.id}
                          id={task.id}
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
                                p={4}
                                borderRadius={2}
                                variant='body2'
                                color={'white'}
                              >
                                {task.status}
                              </Typography>
                              <Typography variant='h6' color={'primary.main'} fontWeight={'bold'}>
                                <span> Họ và tên: {'   '}</span>
                                {task.name}
                              </Typography>
                              <Typography variant='body2' color={'primary.dark'} fontWeight={'500'}>
                                <span>Trình độ : {'  '}</span>
                                Thạc sĩ
                              </Typography>
                              <Typography variant='body2' color={'primary.dark'} fontWeight={'500'}>
                                <span>Giới tính : {'  '}</span> Nam
                              </Typography>
                              <Typography variant='body2' color={'primary.dark'} fontWeight={'500'}>
                                <span>Mã GV: {'  '}</span> 21071112
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
            <Box mb={6} mt={14} pt={10} borderTop={'1px solid #56bae8'}>
              <Typography variant='h6' color='primary.main' fontWeight={'500'}>
                Số lượng : {'      '}
                <span style={{ color: 'black' }}> {dataLecturerNoGroup.length}</span>
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box flex={1}>
          <Box justifyContent={'space-between'} display={'flex'} mb={10}>
            <Typography variant='h4' fontWeight={'bold'} color='error.main'>
              Nhóm giảng viên chấm hội đồng
            </Typography>
            <Box>
              <Typography variant='body1' fontWeight={'600'} color='primary.main'>
                Nhóm chấm : Nhóm số {team}
              </Typography>
              <Typography variant='body2' fontWeight={'500'} color='primary.main'>
                GV hướng dẫn: Lê Minh Quang
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
            }}
            height={'50vh'}
            flex={1}
            onDragLeave={(e: any) => handleOnDragLeave(e)}
            onDragEnter={(e) => handleOnDragEnter(e)}
            onDragEnd={(e) => handleOnDrageEnd(e)}
            onDragOver={(e) => handleOnDragOver(e)}
            onDrop={(e) => handleOnDrop(e, false, ENUM_STATUS_LECTURER.GRADING_ASSEMBLY)}
          >
            <Box className='drag_container'>
              <Box className='container'>
                <Box className='drag_column'>
                  <Box className='drag_row'>
                    {dataLecturerGradingAssembly.map((task: any) => (
                      <Tooltip title={<Typography variant='body2'>Kéo thả thẻ này</Typography>}>
                        <Box
                          sx={{
                            bgcolor: 'grey.100',
                            borderRadius: 4,
                            p: 10,
                            color: 'white',
                            my: 4,
                          }}
                          key={task.id}
                          id={task.id}
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
                                p={4}
                                borderRadius={2}
                                variant='body2'
                                color={'white'}
                              >
                                {task.status}
                              </Typography>
                              <Typography variant='h6' color={'error.main'} fontWeight={'bold'}>
                                <span> Họ và tên: {'   '}</span>
                                {task.name}
                              </Typography>
                              <Typography variant='body2' color={'error.dark'} fontWeight={'500'}>
                                <span>Trình độ : {'  '}</span>
                                Thạc sĩ
                              </Typography>
                              <Typography variant='body2' color={'error.dark'} fontWeight={'500'}>
                                <span>Giới tính : {'  '}</span> Nam
                              </Typography>
                              <Typography variant='body2' color={'error.dark'} fontWeight={'500'}>
                                <span>Mã GV: {'  '}</span> 21071112
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
              <span style={{ color: 'black' }}> {dataLecturerGradingAssembly.length} / 3</span>
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

export default Task;
