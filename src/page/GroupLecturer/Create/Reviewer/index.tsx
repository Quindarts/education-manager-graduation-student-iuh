import { Box, Button, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CardLecturer from '../Card/CardLecturer';
import { Icon } from '@iconify/react';
import SekeletonUI from '@/components/ui/Sekeleton';
import { useTerm } from '@/hooks/api/useQueryTerm';
import { useGroupLecturer } from '@/hooks/api/useQueryGroupLecturer';
import { useLecturerTerm } from '@/hooks/api/useQueryLecturerTerm';
import { ENUM_STATUS_LECTURER } from '@/utils/validations/groupLecturer.validation';
import SearchInput from './SearchInput';
import ChipTag from '@/components/ui/Badge';
import {
  getUniqueKeywords,
  convertLecturerGroup,
  handleSearch,
} from '@/page/GroupLecturer/Context';

function CreateInstructorGroupPage() {
  const [task, setTask] = React.useState<any[]>();
  const { onCreateGroupLecturer } = useGroupLecturer();
  const { handleGetListLecturerTerms } = useLecturerTerm();
  const { termStore } = useTerm();

  const {
    data: listLecturersDefault,
    isFetched,
    isLoading,
  } = handleGetListLecturerTerms('default');
  const { data: listLecturersKey } = handleGetListLecturerTerms('keyword');

  //TODO: [METHOD POST FORM]
  const { mutate: create, isSuccess: successCreate } = onCreateGroupLecturer('reviewer');
  const handleCreateGroup = () => {
    let dataLecturerGradingAssembly = task?.filter(
      (data: any) => data.status === ENUM_STATUS_LECTURER.HAVE_GROUP,
    );
    const keywords = getUniqueKeywords(dataLecturerGradingAssembly).join(',');
    const lecturers = dataLecturerGradingAssembly?.map((lec) => lec?.lecturerId);
    create({ termId: termStore.currentTerm.id, lecturers: lecturers, keywords });
  };

  //TODO: [GET DATA]
  useEffect(() => {
    setTask(convertLecturerGroup(listLecturersKey?.lecturerTerms));
  }, [successCreate, listLecturersDefault, listLecturersKey]);

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
    <Box display={'flex'} gap={5} justifyContent={'space-between'}>
      <Paper
        onDragLeave={(e: any) => handleOnDragLeave(e)}
        onDragEnter={(e) => handleOnDragEnter(e)}
        onDragEnd={(e) => handleOnDrageEnd(e)}
        onDragOver={(e) => handleOnDragOver(e)}
        onDrop={(e) => handleOnDrop(e, false, ENUM_STATUS_LECTURER.NO_GROUP)}
        sx={{
          flex: 1,
          minWidth: 500,
        }}
        elevation={0}
      >
        <Box px={4} bgcolor={'grey.100'} pt={2} pb={4} mb={3}>
          <Box mt={10}>
            <Box sx={{ display: 'flex', gap: 4 }}>
              <SearchInput
                changeSearch={changeSearch}
                sx={{ bgcolor: 'white' }}
                keywords={keywords}
              />
            </Box>
          </Box>
        </Box>

        <Box sx={{ overflowY: 'auto', px: 20, bgcolor: 'grey.50' }} height={500} px={2}>
          {isLoading || !isFetched ? (
            <SekeletonUI />
          ) : (
            <Box>
              {handleSearch(keywords, dataLecturerNoGroup)?.map((task: any) => (
                <CardLecturer
                  key={task.lecturerId}
                  id={task.lecturerId}
                  lecturer={task}
                  keywords={task.keywords}
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
        <Typography mt={4} fontWeight={'bold'} variant='h5'>
          <Icon style={{ marginRight: 2 }} icon='gridicons:create' />
          Thông tin tạo nhóm
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
            {dataLecturerGradingAssembly?.length > 0 && (
              <>
                <Box>
                  <Box sx={{ justifyContent: 'end', display: 'flex' }}>
                    {getUniqueKeywords(dataLecturerGradingAssembly).map((keyword: any) => (
                      <ChipTag sx={{ mx: 1, my: 2 }} color='info' size='small' label={keyword} />
                    ))}
                  </Box>
                </Box>
              </>
            )}
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
                color='error.main'
              >
                Cảnh báo: Nhóm đã đủ thành viên!
              </Typography>
            )}
            <Typography variant='h6' mt={2}>
              Số lượng :{' '}
              <Typography component={'span'} variant='h6' mt={10}>
                {dataLecturerGradingAssembly?.length} / 2 thành viên
              </Typography>
            </Typography>
            <Box display={'flex'} justifyContent={'end'} mr={4} mt={10}>
              <Button
                disabled={dataLecturerGradingAssembly && dataLecturerGradingAssembly?.length > 2}
                color='success'
                variant='contained'
                size='medium'
                onClick={handleCreateGroup}
              >
                <Icon width={24} icon='dashicons:saved' />
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
