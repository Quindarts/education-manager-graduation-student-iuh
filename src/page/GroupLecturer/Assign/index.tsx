import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import {
  DialogTitle,
  DialogActions,
  Button,
  Box,
  Typography,
  Paper,
  CircularProgress,
  Link,
} from '@mui/material';
import Modal from '@/components/ui/Modal';
import { useSnackbar } from 'notistack';
import { useGroupLecturer } from '@/hooks/api/useQueryGroupLecturer';
import useAssign from '@/hooks/api/useQueryAssign';
import TitleManager from '@/components/ui/Title';
import { Icon } from '@iconify/react';
import {
  isExistLecturerSupport,
  startInitGrHaveAssigned,
  startInitGrNeedAssign,
  stylingGrHaveAssigned,
  toggleDataByTransferId,
} from './context';
import SearchInput from './SearchInput';
import { checkTypeEvaluation } from '@/utils/validations/transcript.validation';
import { checktTypeGroupLecturer } from '@/utils/validations/groupLecturer.validation';
import { useNavigate } from 'react-router-dom';
import { handleSearch } from '@/utils/search';

function Assign({ open, onClose, groupId, groupName, groupType, totalAssigns }: any) {
  //TODO: [Api hooks]
  const { handleGetGroupLecturerById } = useGroupLecturer();
  const { handletGetGroupStudentNoAssignByType, onCreateAssignByType, onUpdateAssignByType } =
    useAssign();
  const {
    data: fetchGrLecturer,
    isLoading: loadingFetchGrLecturer,
    isSuccess: successGetGrLecturer,
    refetch: refetchGrLecturer,
  } = handleGetGroupLecturerById(groupId);
  const {
    data: fetchGrStudent,
    isLoading: loadingFetchGrStudent,
    isSuccess: successGetGrStd,
    refetch: refetchGrStudent,
  } = handletGetGroupStudentNoAssignByType(groupType);
  const { mutate: createAssign, isSuccess: successCreate } = onCreateAssignByType(
    groupType,
    groupId,
  );
  const { mutate: updateAssign, isSuccess: successupdate } = onUpdateAssignByType(
    groupType,
    groupId,
  );

  //TODO: [States]
  const [grHaveAssigned, setGrHaveAssigned] = useState([]);
  const [grNeedAssign, setGrNeedAssign] = useState([]);
  const [infoGroupLecturer, setInfoGroupLecturer] = useState({
    name: groupName,
    totalAssigns: totalAssigns,
    members: [],
  });
  const [currentDrag, setCurrentDrag] = useState({
    type: 'NONE',
    value: false,
  });
  const [showSearch, setShowSearch] = useState(false);
  //TODO [Handle event]
  const { enqueueSnackbar } = useSnackbar();

  // [Event khi start kéo card nsv]
  const handleOnDrageStart = (evt: any, boardAdder) => {
    setCurrentDrag({ value: true, type: boardAdder });
    let element = evt.currentTarget;
    element.classList.add('dragged');
    evt.dataTransfer.setData('text/plain', evt.currentTarget.id);
    evt.dataTransfer.effectAllowed = 'move';

    //Kiem tra ton tai lecturer support
    let thisGrStudentNeedAssign = grNeedAssign.filter((gr) => gr.id === evt.currentTarget.id)[0];
    if (
      isExistLecturerSupport(infoGroupLecturer, thisGrStudentNeedAssign, '') &&
      (groupType === 'reviewer' || groupType === 'report_poster')
    ) {
      enqueueSnackbar(
        `Thành viên ${checktTypeGroupLecturer(groupType)} không được chấm nhóm hướng dẫn của mình`,
        {
          variant: 'error',
        },
      );
      evt.preventDefault();
    }
  };
  // [Event end khi kéo xong]
  const handleOnDrageEnd = (evt: any) => {
    evt.preventDefault();
    evt.currentTarget.classList.remove('dragged');
    setCurrentDrag((pre) => ({ ...pre, value: false }));
  };
  // [Event xác nhận khi kéo vào trong board được phân công]
  const handleOnDragEnter = (evt: any) => {
    evt.preventDefault();
    evt.stopPropagation();
    let element = evt.currentTarget;
    element.classList.add('dragged-over');
    evt.dataTransfer.dropEffect = 'move';
  };

  //[Event xác nhận khi kéo ra khỏi board được phân công]
  const handleOnDragLeave = (evt: any) => {
    let currentTarget = evt.currentTarget;
    let newTarget = evt.relatedTarget;
    if (newTarget.parentNode === currentTarget || newTarget === currentTarget) return;
    evt.preventDefault();
    evt.stopPropagation();

    let element = evt.currentTarget;
    element.classList.remove('dragged-over');
  };

  //[Event gọi khi phần tử kéo đang di chuyển qua board được phân công]
  const handleOnDragOver = (evt: any) => {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'move';
  };
  //[ Event được gọi khi phần tử kéo được thả vào board được phân công]
  const handleOnDrop = useCallback(
    (evt: any, typeGroupChange: string) => {
      evt.preventDefault();

      const transferGrId = evt.dataTransfer.getData('text/plain');
      if (!transferGrId) return;

      // Kiểm tra nếu phần tử đang thả lại chính vùng ban đầu (vùng cũ)
      const isDroppingInSameGroup =
        typeGroupChange === (grHaveAssigned.some((gr) => gr.id === transferGrId) ? 'NEED' : 'HAVE');
      if (isDroppingInSameGroup) {
        evt.currentTarget.classList.remove('dragged-over');
        return;
      }

      const updater = toggleDataByTransferId(
        typeGroupChange === 'HAVE' ? grHaveAssigned : grNeedAssign,
        transferGrId,
      );

      if (updater) {
        if (typeGroupChange === 'HAVE') {
          setGrHaveAssigned(updater.groupUpdate);
          setGrNeedAssign((prev) => [...prev, updater.groupTransfer]);
        } else {
          setGrNeedAssign(updater.groupUpdate);
          setGrHaveAssigned((prev) => [...prev, updater.groupTransfer]);
        }
      }
      setCurrentDrag((pre) => ({ ...pre, value: false }));
    },
    [grHaveAssigned, grNeedAssign],
  );
  //TODO: [Search by type]
  const [searchType, setSearchType] = useState('topicName');
  const [searchTerm, setSearchTerm] = useState('');
  const [isClear, setIsClear] = useState(false);
  const handleSearchType = (searchType) => {
    setSearchType(searchType);
  };

  const handleKeywords = (searchTerm) => {
    setSearchTerm(searchTerm);
  };
  const handleClearSearch = (clear: boolean) => {
    setIsClear(clear);
  };
  useEffect(() => {
    if (successGetGrLecturer && successGetGrStd) {
      setInfoGroupLecturer((pre) => ({ ...pre, members: fetchGrLecturer?.groupLecturer?.members }));
      // [Assigned]
      const dataConvert = stylingGrHaveAssigned(fetchGrLecturer?.groupLecturer);
      const initGrHavedAssign = startInitGrHaveAssigned(dataConvert);
      setGrHaveAssigned(initGrHavedAssign);

      // [Need Assign]
      const initGrNeedAssign = startInitGrNeedAssign(fetchGrStudent?.groupStudent);
      setGrNeedAssign(initGrNeedAssign);
    }
  }, [groupId, groupType, successGetGrLecturer, successGetGrStd, open]);

  const handleSubmit = (grStudentId) => {
    const isCreate = fetchGrLecturer.groupLecturer.groupStudents.length > 0;
    if (!isCreate) {
      createAssign({ groupLecturerId: groupId, listGroupStudentId: grStudentId, type: groupType });
      return;
    } else
      updateAssign({ groupLecturerId: groupId, listGroupStudentId: grStudentId, type: groupType });
    return;
  };
  useEffect(() => {
    if (successCreate || successCreate) {
      refetchGrLecturer();
      refetchGrStudent();
    }
  }, [successCreate, successupdate]);
  useEffect(() => {
    refetchGrLecturer();
    refetchGrStudent();
  }, []);

  return (
    <Modal open={open} onClose={onClose} maxWidth='xl' fullWidth>
      {loadingFetchGrLecturer || loadingFetchGrStudent ? (
        <Box
          width={'100%'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          height={400}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <DialogTitle>
            <TitleManager
              sx={{
                textTransform: 'uppercase',
              }}
              variant='h6'
              icon='pajamas:pencil-square'
            >
              Xem/Phân công chấm điểm cho nhóm sinh viên
            </TitleManager>
          </DialogTitle>

          <Box position={'relative'} sx={{ bgcolor: 'white', px: 6, borderRadius: 4 }}>
            <Box className='container' width={'full'} display={'flex'} gap={12}>
              <Box flex={1}>
                <Box alignItems={'center'} gap={4} mx={4} mb={2} display={'flex'}>
                  <Typography variant='h5' fontWeight={'500'} color='grey.700'>
                    Nhóm sinh viên chưa được phân công chấm điểm
                  </Typography>
                  <Box justifyItems={'flex-end'}>
                    <Button onClick={() => setShowSearch((pre) => !pre)} color='primary'>
                      Tìm kiếm
                      <Icon
                        width={20}
                        style={{ marginBottom: 'auto', marginLeft: 4 }}
                        icon={showSearch ? 'icon-park-solid:down-one' : 'iconamoon:arrow-up-2-fill'}
                      />
                    </Button>
                    {searchTerm.length > 0 && showSearch && (
                      <Button onClick={() => handleClearSearch(true)} color='error'>
                        Xóa tìm kiếm
                        <Icon
                          width={20}
                          style={{ marginBottom: 'auto', marginLeft: 4 }}
                          icon={'ic:twotone-clear'}
                        />
                      </Button>
                    )}
                  </Box>
                </Box>
                {showSearch && (
                  <SearchInput
                    handleSearchType={handleSearchType}
                    handleKeywords={handleKeywords}
                    handleClearSearch={handleClearSearch}
                    isClear={isClear}
                  />
                )}
                <Box
                  onDragLeave={(e: any) => handleOnDragLeave(e)}
                  onDragEnter={(e) => handleOnDragEnter(e)}
                  onDragEnd={(e) => handleOnDrageEnd(e)}
                  onDragOver={(e) => handleOnDragOver(e)}
                  onDrop={(e) => handleOnDrop(e, 'HAVE')}
                  borderRight={'1px solid #f9f9f9 '}
                  sx={{
                    overflowY: 'auto',
                    bgcolor: currentDrag.type === 'STUDENT' && currentDrag.value ? '#fef9f9 ' : '',

                    transition: '0.3s ease-in',
                    px: 4,
                    py: 4,
                    mt: 2,
                    '&::-webkit-scrollbar': {
                      width: 4,
                    },
                    '&::-webkit-scrollbar-thumb': {
                      borderRadius: 10,
                      width: 20,
                      bgcolor: 'grey.400',
                      color: 'grey.400',
                    },
                  }}
                  height={400}
                >
                  <Box className=''>
                    {grNeedAssign.length === 0 ? (
                      <Box
                        alignItems={'center'}
                        justifyContent={'center'}
                        display={'flex'}
                        flexDirection={'column'}
                      >
                        <img width={200} src='/images/nodata.webp' />
                        <Typography variant='body1' color='initial'>
                          Danh sách trống
                        </Typography>
                      </Box>
                    ) : (
                      handleSearch(grNeedAssign, searchType, searchTerm)?.map(
                        (group: any, index: number) => (
                          <Box
                            sx={{
                              bgcolor: 'grey.100',
                              borderRadius: 2,
                              p: 4,
                              color: 'white',
                              my: 3, // Điều chỉnh khoảng cách
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
                            key={group.id}
                            id={group.id}
                            draggable
                            onDragStart={(e) => handleOnDrageStart(e, 'LECTURER')}
                            onDragEnd={(e) => handleOnDrageStart(e, 'LECTURER')}
                          >
                            <Box>
                              <Typography variant='body1' color={'primary.dark'} fontWeight={'500'}>
                                {group?.name}
                              </Typography>
                              <Typography variant='body1' color={'primary.dark'} fontWeight={'400'}>
                                <span>Tên Đề tài : {'  '}</span>
                                {group?.topicName}
                              </Typography>
                              <Typography variant='body1' color={'grey.700'} fontWeight={'500'}>
                                <span>Giảng viên hướng dẫn : {'  '}</span>
                                {group?.fullName}
                              </Typography>
                            </Box>
                          </Box>
                        ),
                      )
                    )}
                  </Box>
                </Box>
                <Box mb={4} mt={10} pt={6} borderTop={'1px solid #f6f6f6'}>
                  <Typography variant='body1' color='grey.700' fontWeight={'500'}>
                    Số lượng nhóm sinh viên : {'      '}
                    <span style={{ color: 'black' }}>
                      {' '}
                      {handleSearch(grNeedAssign, searchType, searchTerm)?.length}
                    </span>
                  </Typography>
                </Box>
              </Box>
              <Box flex={1}>
                <Box justifyContent={'space-between'} display={'flex'} mb={10}>
                  <Typography variant='h5' fontWeight={'700'} color='error.main'>
                    {groupName}
                  </Typography>
                  <Box>
                    {infoGroupLecturer?.members?.map((member: any, index: number) => (
                      <Typography variant='body1' fontWeight={'500'} color='grey.700'>
                        Thành viên {index + 1}: {member.fullName}
                      </Typography>
                    ))}
                  </Box>
                </Box>
                <Box
                  sx={{
                    bgcolor: currentDrag.type === 'LECTURER' && currentDrag.value ? '#f9fefd ' : '',
                    transition: '0.3s ease-in',
                    px: 4,
                    py: 4,
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': {
                      width: 4,
                    },
                    borderRadius: '8px 0px',
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
                  onDrop={(e) => handleOnDrop(e, 'NEED')}
                >
                  <Typography variant='h5' fontWeight={500} color='grey.700'>
                    Nhóm sinh viên đã phân công
                  </Typography>
                  <Box>
                    <Box>
                      {grHaveAssigned.length === 0 ? (
                        <>
                          <Box
                            height={300}
                            alignItems={'center'}
                            justifyContent={'center'}
                            display={'flex'}
                            flexDirection={'column'}
                          >
                            <img width={200} src='/images/nodata.webp' />
                            <Typography variant='body1' color='grey.600'>
                              Danh sách trống
                            </Typography>
                          </Box>
                        </>
                      ) : (
                        grHaveAssigned?.map((group: any) => (
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
                            key={group.id}
                            id={group.id}
                            draggable
                            onDragStart={(e) => handleOnDrageStart(e, 'STUDENT')}
                            onDragEnd={(e) => handleOnDrageStart(e, 'STUDENT')}
                          >
                            <Box
                              gap={20}
                              position={'relative'}
                              alignItems={'center'}
                              display='flex'
                            >
                              <Box>
                                <Typography
                                  variant='body1'
                                  color={'primary.dark'}
                                  fontWeight={'500'}
                                >
                                  {group?.name}
                                </Typography>
                                <Typography
                                  variant='body1'
                                  color={'primary.dark'}
                                  fontWeight={'500'}
                                >
                                  <span>Tên Đề tài : {'  '}</span>
                                  {group?.topicName}
                                </Typography>
                                <Typography variant='body1' color={'grey.700'} fontWeight={'500'}>
                                  <span>Giảng viên hướng dẫn : {'  '}</span>
                                  {group?.fullName}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        ))
                      )}
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
                  borderTop={'1px solid #ededed'}
                >
                  <Typography flex={1} variant='body1' color='grey.700' fontWeight={'500'}>
                    Số lượng nhóm sinh viên: {'      '}
                    <span style={{ color: 'black' }}> {grHaveAssigned?.length}</span>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <DialogActions>
            <Button onClick={onClose} variant='contained' color='primary'>
              Đóng
            </Button>
            {fetchGrLecturer?.groupLecturer.groupStudents &&
            fetchGrLecturer?.groupLecturer.groupStudents?.length > 0 ? (
              <Button
                onClick={() => handleSubmit(grHaveAssigned.map((group) => group.id))}
                variant='contained'
                color='warning'
              >
                Cập nhật
              </Button>
            ) : (
              <Button
                onClick={() => handleSubmit(grHaveAssigned.map((group) => group.id))}
                variant='contained'
                color='success'
              >
                Lưu
              </Button>
            )}
          </DialogActions>
        </Box>
      )}
    </Modal>
  );
}

export default Assign;
