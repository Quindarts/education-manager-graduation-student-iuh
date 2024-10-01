import CustomTextField from '@/components/ui/CustomTextField';
import { Box, Button, Chip, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CardLecturer from '../Card/CardLecturer';
import { Icon } from '@iconify/react';
import SekeletonUI from '@/components/ui/Sekeleton';
import { useTerm } from '@/hooks/api/useQueryTerm';
import { useGroupLecturer } from '@/hooks/api/useQueryGroupLecturer';
import { useLecturerTerm } from '@/hooks/api/useQueryLecturerTerm';
import { ENUM_STATUS_LECTURER } from '@/utils/validations/groupLecturer.validation';
import TitleManager from '@/components/ui/Title';
import { removeVietnameseTones } from '@/utils/search';
import SearchInput from './SearchInput';

const convertLecturerGroup = (data: any[]) => {
  if (!data) {
    return [];
  }
  const newData: any = [];
  data.map((lecturerTerm: any) => {
    newData.push({ ...lecturerTerm, status: ENUM_STATUS_LECTURER.NO_GROUP });
  });
  return newData;
};

const handleSearch = (keywords: string, lecturers: any[]) => {
  if (keywords.length === 0) {
    return lecturers;
  }
  return lecturers.filter((lec) =>
    removeVietnameseTones(lec.fullName.toLowerCase()).includes(
      removeVietnameseTones(keywords.toLowerCase()),
    ),
  );
};
function CreateInstructorGroupPage() {
  const [task, setTask] = React.useState<any[]>();
  const { onCreateGroupLecturer } = useGroupLecturer();
  const { handleGetListLecturerTerms } = useLecturerTerm();
  const { termStore } = useTerm();

  const { data, isLoading, isSuccess, isFetched } = handleGetListLecturerTerms();

  const { mutate: create, isSuccess: successCreate } = onCreateGroupLecturer('reviewer');

  const handleCreateGroup = () => {
    let dataLecturerGradingAssembly = task?.filter(
      (data: any) => data.status === ENUM_STATUS_LECTURER.HAVE_GROUP,
    );
    const lecturers = dataLecturerGradingAssembly?.map((lec) => lec.lecturerId);
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
      if (task?.lecturerId?.toString() === data?.toString()) {
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

  //TODO: handle search
  const [keywords, setKeywords] = useState('');
  const changeSearch = (s: string) => {
    setKeywords(s);
  };
  return (
    <Box display={'flex'} pt={10} px={0} gap={10} justifyContent={'space-between'}>
      <Paper
        onDragLeave={(e: any) => handleOnDragLeave(e)}
        onDragEnter={(e) => handleOnDragEnter(e)}
        onDragEnd={(e) => handleOnDrageEnd(e)}
        onDragOver={(e) => handleOnDragOver(e)}
        onDrop={(e) => handleOnDrop(e, false, ENUM_STATUS_LECTURER.NO_GROUP)}
        sx={{
          flex: 1,
        }}
        elevation={1}
      >
        <Box px={10} bgcolor={'grey.50'} pt={2} pb={4} mb={4}>
          <TitleManager
            fontWeight={'bold'}
            mb={4}
            variant='h5'
            color={'grey.800'}
            icon='fluent-emoji-flat:man-student-light'
          >
            Danh sách giảng viên
          </TitleManager>

          <Box mt={10} bgcolor='white'>
            <SearchInput changeSearch={changeSearch} keywords={keywords} />
          </Box>
        </Box>

        <Box sx={{ overflowY: 'auto' }} height={400} px={2}>
          {isLoading || !isFetched ? (
            <SekeletonUI />
          ) : (
            <Box>
              {handleSearch(keywords, dataLecturerNoGroup)?.map((task: any) => (
                <CardLecturer
                  key={task.lecturerId}
                  id={task.lecturerId}
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
          height: 400,
          pb: 10,
        }}
        onDragLeave={(e: any) => handleOnDragLeave(e)}
        onDragEnter={(e) => handleOnDragEnter(e)}
        onDragEnd={(e) => handleOnDrageEnd(e)}
        onDragOver={(e) => handleOnDragOver(e)}
        onDrop={(e) => handleOnDrop(e, false, ENUM_STATUS_LECTURER.HAVE_GROUP)}
      >
        <Typography mt={4} fontWeight={'bold'} color={'primary'} variant='h5'>
          <Icon style={{ marginRight: 2 }} icon='gridicons:create' />
          Thông tin nhóm phản biện:
        </Typography>
        {dataLecturerGradingAssembly && dataLecturerGradingAssembly.length < 1 ? (
          <Box display={'flex'} flexDirection={'column'} height={500}>
            <Box
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'center'}
              gap={10}
              alignItems={'center'}
              height={300}
            >
              <img width={150} src='/images/nodata.webp' />
              <Typography color='grey.600' variant='h6' mt={1}>
                Để chọn giảng viên cần tạo nhóm, vui lòng kéo thả vào bảng này
              </Typography>
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
                key={task.lecturerId}
                id={task.lecturerId}
                draggable
                onDragStart={(e) => handleOnDrageStart(e)}
                onDragEnd={(e) => handleOnDrageStart(e)}
              >
                <Box px={10}>
                  <Typography variant='h6' fontWeight={600} color='grey.700'>
                    Giảng viên
                    <Typography mx={4} fontSize={14} component='span'>
                      {task.fullName} - {task.username}
                    </Typography>
                  </Typography>
                  <Typography variant='body1' color={'grey.600'}>
                    Ngành: <Typography component='span'>{task.majorName}</Typography>
                  </Typography>
                </Box>
              </Paper>
            ))}{' '}
            {dataLecturerGradingAssembly?.length >= 2 && (
              <Typography
                component={'span'}
                variant='body1'
                mt={10}
                fontWeight={'500'}
                color='warning.main'
              >
                Cảnh báo: Nhóm đã đủ thành viên!
              </Typography>
            )}
            {dataLecturerGradingAssembly?.length > 0 && (
              <>
                <Typography variant='h6' mt={2} fontWeight={'bold'} color='grey.800'>
                  Số lượng :{' '}
                  <Typography component={'span'} variant='h6' mt={10} color='initial'>
                    {dataLecturerGradingAssembly?.length} / 2 thành viên
                  </Typography>
                </Typography>
                <Box display={'flex'} justifyContent={'end'} mr={4} mt={10}>
                  <Button
                    disabled={
                      dataLecturerGradingAssembly && dataLecturerGradingAssembly?.length > 2
                    }
                    color='success'
                    variant='contained'
                    size='medium'
                    onClick={handleCreateGroup}
                  >
                    <Icon width={24} icon='dashicons:saved' />
                    Tạo nhóm
                  </Button>
                </Box>
              </>
            )}
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default CreateInstructorGroupPage;
