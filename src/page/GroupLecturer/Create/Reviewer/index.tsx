import CustomTextField from '@/components/ui/CustomTextField';
import { Box, Button, Chip, LinearProgress, Paper, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import CardLecturer from '../Card/CardLecturer';
import { Icon } from '@iconify/react';
import SekeletonUI from '@/components/ui/Sekeleton';
import { useTerm } from '@/hooks/api/useQueryTerm';
import { useGroupLecturer } from '@/hooks/api/useQueryGroupLecturer';
import { useLecturerTerm } from '@/hooks/api/useQueryLecturerTerm';
import { ENUM_STATUS_LECTURER } from '@/utils/validations/groupLecturer.validation';

const convertLecturerGroup = (data: any[]) => {
  if (!data) {
    return [];
  }
  const newData: any = [];
  data.map((lecturerTerm: any) => {
    let lec = lecturerTerm.lecturer;
    newData.push({ ...lec, lecturerTerm, status: ENUM_STATUS_LECTURER.NO_GROUP });
  });
  return newData;
};

function CreateInstructorGroupPage() {
  const [task, setTask] = React.useState<any[]>();
  const { onCreateGroupLecturer } = useGroupLecturer();
  const { handleGetListLecturerTerms } = useLecturerTerm();
  const { termStore } = useTerm();

  const { data, isLoading, isSuccess, isFetched } = handleGetListLecturerTerms(
    termStore.currentTerm.id,
  );

  const { mutate: create, isSuccess: successCreate } = onCreateGroupLecturer('reviewer');

  const handleCreateGroup = () => {
    let dataLecturerGradingAssembly = task?.filter(
      (data: any) => data.status === ENUM_STATUS_LECTURER.HAVE_GROUP,
    );
    const lecturers = dataLecturerGradingAssembly?.map((lec) => lec.id);
    create({ termId: termStore.currentTerm.id, lecturers: lecturers });
  };
  useEffect(() => {
    setTask(convertLecturerGroup(data?.lecturerTerms));
  }, [successCreate, isFetched]);

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
      if (task?.id?.toString() === data?.toString()) {
        task.status = status;
      }
      return task;
    });
    setTask(updated);
  };
  let dataLecturerGradingAssembly = task?.filter(
    (data: any) => data.status === ENUM_STATUS_LECTURER.HAVE_GROUP,
  );
  let dataLecturerNoGroup = task?.filter(
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
          py: 6,
        }}
        elevation={1}
      >
        <Box borderBottom={'2px solid #0c6b9e'} mb={4}>
          <Typography mb={4} variant='h6' color='primary'>
            <Icon icon='ic:baseline-list' />
            Danh sách giảng viên trống lịch
          </Typography>
          <CustomTextField placeholder='Tim kiem giang vien' />
        </Box>

        <Box sx={{ overflowY: 'auto' }} height={500} pr={10}>
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
          height: 500,
          py: 10,
        }}
        onDragLeave={(e: any) => handleOnDragLeave(e)}
        onDragEnter={(e) => handleOnDragEnter(e)}
        onDragEnd={(e) => handleOnDrageEnd(e)}
        onDragOver={(e) => handleOnDragOver(e)}
        onDrop={(e) => handleOnDrop(e, false, ENUM_STATUS_LECTURER.HAVE_GROUP)}
        elevation={6}
      >
        <Typography variant='h6' color='primary'>
          <Icon icon='gridicons:create' />
          Tạo nhóm chấm phản biện
        </Typography>
        {dataLecturerGradingAssembly && dataLecturerGradingAssembly.length < 1 ? (
          <Box display={'flex'} sx={{ cursor: 'progress' }} flexDirection={'column'} height={500}>
            <Box display={'flex'} flexDirection={'column'} gap={10} alignItems={'center'}>
              <Typography color='grey.500' variant='h6' mt={20}>
                Vui lòng kéo thả giảng viên...
              </Typography>
              <Icon color='#dfdfdf' width={100} icon='icon-park-solid:hand-left' />
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
                  border: '2px solid #fefefe',
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
            {dataLecturerGradingAssembly?.length === 2 && (
              <Typography component={'span'} variant='body1' mt={10} color='warning.main'>
                <Icon icon='material-symbols-light:warning-outline' />
                Đã đạt số lượng thành viên tối đa
              </Typography>
            )}
            <Typography variant='body1' mt={6} color='primary'>
              Số lượng thành viên:{' '}
              <Typography component={'span'} variant='body1' mt={10} color='initial'>
                {dataLecturerGradingAssembly?.length} /2
              </Typography>
            </Typography>
            <Box display={'flex'} justifyContent={'end'} mt={10}>
              <Button
                disabled={dataLecturerGradingAssembly?.length > 2}
                color='error'
                variant='contained'
                onClick={handleCreateGroup}
              >
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