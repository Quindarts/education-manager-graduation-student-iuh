import React, { useCallback, useEffect, useState } from 'react';
import { DialogTitle, Button, Box, Typography, CircularProgress, Paper } from '@mui/material';
import Modal from '@/components/ui/Modal';
import { useSnackbar } from 'notistack';
import { useGroupLecturer } from '@/hooks/api/useQueryGroupLecturer';
import useAssign from '@/hooks/api/useQueryAssign';
import TitleManager from '@/components/ui/Title';
import {
  isExistLecturerSupport,
  startInitGrHaveAssigned,
  startInitGrNeedAssign,
  stylingGrHaveAssigned,
  toggleDataByTransferId,
} from './context';
import SearchInput from './SearchInput';

import { checktTypeGroupLecturer } from '@/utils/validations/groupLecturer.validation';
import ChipTag from '@/components/ui/Badge';

const convertToTagList = (data: any) => {
  if (!data) return [];
  const uniqueData = Array.from(new Set(data));
  const tags = uniqueData.map((key) => {
    return {
      id: key,
      name: key,
      selected: false,
    };
  });
  return tags.filter((tag) => tag.id !== '');
};

export function removeVietnameseTones(str: string) {
  return str
    ?.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

export const handleSearch = (
  data: any[],
  typeSearch: string, //'topicName' | 'fullName'
  keywords: string,
) => {
  if (keywords.length === 0) {
    return data;
  }
  let query = removeVietnameseTones(keywords?.toLowerCase());
  return data.filter((gr: any) => {
    let val = removeVietnameseTones(gr[`${typeSearch}`]?.toLowerCase());
    return val.includes(query);
  });
};
const handleTags = (tags: any[], topicsOfGroup: any[]) => {
  if (tags.filter((t: any) => t.selected).every((v) => v === false)) return topicsOfGroup;

  const resultTopics = topicsOfGroup.map((project) => {
    const isHaveTag = project.keywords.split(',').some((key: string) =>
      tags
        .filter((t) => t.selected)
        .map((t) => t.id.toUpperCase())
        .includes(key.toUpperCase().trim()),
    );
    return isHaveTag ? project : null;
  });
  return resultTopics.filter((v) => v !== null);
};

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
    keywords: [''],
  });
  const [currentDrag, setCurrentDrag] = useState({
    type: 'NONE',
    value: false,
  });
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
  //TODO: [Search by type and  keytag]
  const [searchType, setSearchType] = useState('topicName');
  const [searchTerm, setSearchTerm] = useState('');
  const [isClear, setIsClear] = useState(false);
  const [tags, setTags] = useState<any[]>([]);
  const handleSearchType = (searchType) => {
    setSearchType(searchType);
  };
  const handleKeywords = (searchTerm) => {
    setSearchTerm(searchTerm);
  };
  const handleClearSearch = (clear: boolean) => {
    setIsClear(clear);
  };
  const handleAddTags = (tag: string) => {
    setTags((tags) =>
      tags.map((t: any) => {
        if (t.id === tag) {
          let newT = { ...t, selected: !t.selected };
          return newT;
        } else return t;
      }),
    );
  };
  const handleClearTags = () => {
    setTags([]);
  };
  const onClearAll = () => {
    handleClearTags();
  };
  useEffect(() => {
    if (successGetGrLecturer && successGetGrStd) {
      setInfoGroupLecturer((pre) => ({
        ...pre,
        members: fetchGrLecturer?.groupLecturer?.members,
      }));
      setTags(convertToTagList(fetchGrLecturer?.groupLecturer?.keywords?.split(',')));
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

          <Box sx={{ bgcolor: 'white', px: 6, borderRadius: 4 }}>
            <Box className='container' width={'full'} display={'flex'} gap={12}>
              <Paper sx={{ flex: 1 }} elevation={1}>
                <Box sx={{ bgcolor: 'grey.100', pt: 2, px: 2, pb: 6, borderRadius: 1 }}>
                  <Box alignItems={'center'} gap={4} mx={4} mb={2} display={'flex'}></Box>
                  <SearchInput
                    handleSearchType={handleSearchType}
                    handleKeywords={handleKeywords}
                    handleClearSearch={handleClearSearch}
                    sx={{ bgcolor: 'white' }}
                    isClear={isClear}
                  />
                  <Box sx={{ mx: 2 }}>
                    <Typography
                      sx={{ mx: 4, mb: 2, mt: 6 }}
                      variant='body1'
                      fontWeight={600}
                      color='primary.dark'
                    >
                      Gợi ý từ khóa:
                    </Typography>
                    {tags.length === 0 ? (
                      <Typography component={'span'} mx={10} variant='body2' color='initial'>
                        Chưa có từ khóa.
                      </Typography>
                    ) : (
                      <Box sx={{ mx: 6 }}>
                        {tags?.map((k: any) => (
                          <ChipTag
                            onClick={() => handleAddTags(k.id)}
                            variant={k.selected ? 'filled' : 'outlined'}
                            color={k.selected ? 'primary' : 'default'}
                            label={k.id}
                            sx={{ mx: 2 }}
                          />
                        ))}
                      </Box>
                    )}
                  </Box>
                </Box>
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
                  height={360}
                >
                  <Box>
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
                      <Box sx={{ px: 15, py: 10, bgcolor: 'grey.50' }}>
                        {handleTags(tags, handleSearch(grNeedAssign, searchType, searchTerm))
                          .length === 0 ? (
                          <Typography variant='body1' color='initial'>
                            Không tìm thấy kết quả...
                          </Typography>
                        ) : (
                          handleTags(tags, handleSearch(grNeedAssign, searchType, searchTerm))?.map(
                            (group: any) => (
                              <Box
                                key={group.id}
                                id={group.id}
                                sx={{
                                  bgcolor: 'white',
                                  borderRadius: 2,
                                  px: 10,
                                  py: 4,
                                  color: 'white',
                                  my: 5, // Điều chỉnh khoảng cách
                                  cursor: 'pointer',
                                  border: '2px solid #E1E0E0FF',
                                  '&:hover': {
                                    border: '2px solid #2acf8a',
                                    boxShadow:
                                      '0 10px 20px rgba(166, 165, 165, 0.3), 0 6px 6px rgba(235, 235, 235, 0.23)',
                                    bgcolor: '#e8fef5',
                                    transition: '0.2s ease-in',
                                  },
                                }}
                                draggable
                                onDragStart={(e) => handleOnDrageStart(e, 'LECTURER')}
                                onDragEnd={(e) => handleOnDrageStart(e, 'LECTURER')}
                              >
                                <Box>
                                  <Typography
                                    variant='body1'
                                    color={'primary.dark'}
                                    fontWeight={'500'}
                                  >
                                    Nhóm sinh viên {group?.name}
                                  </Typography>
                                  <Typography
                                    variant='body1'
                                    color={'primary.dark'}
                                    fontWeight={'400'}
                                  >
                                    <span>Tên Đề tài : {'  '}</span>
                                    {group?.topicName}
                                  </Typography>
                                  <Typography variant='body1' color={'grey.700'} fontWeight={'500'}>
                                    <span>Giảng viên hướng dẫn : {'  '}</span>
                                    {group?.lecturerName}
                                  </Typography>
                                </Box>
                              </Box>
                            ),
                          )
                        )}
                      </Box>
                    )}
                  </Box>
                </Box>
                <Box mb={4} mx={10} mt={10} pt={6} borderTop={'1px solid #f6f6f6'}>
                  <Typography variant='body1' color='grey.700' fontWeight={'500'}>
                    Số nhóm sinh viên : {'      '}
                    <span style={{ color: 'black' }}>
                      {' '}
                      {handleTags(tags, handleSearch(grNeedAssign, searchType, searchTerm))?.length}
                    </span>
                  </Typography>
                </Box>
              </Paper>
              <Box flex={1}>
                <Box justifyContent={'space-between'} display={'flex'} mb={10}>
                  <Typography variant='h5' fontWeight={'700'} color='error.main'>
                    {checktTypeGroupLecturer(groupType)} {groupName}
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
                  height={400}
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
                                  Nhóm sinh viên {group?.name}
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
                                  {group?.lecturerName}
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
          <Box sx={{ display: 'flex', justifyContent: 'end', gap: 4, mr: 10, mb: 10 }}>
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
          </Box>
        </Box>
      )}
    </Modal>
  );
}

export default Assign;
