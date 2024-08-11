import Modal from '@/components/ui/Modal';
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import TitleManager from '@/components/ui/Title';
import { getCardTopicStatus } from '@/utils/validations/topic.validation';
import CustomTextField from '@/components/ui/CustomTextField';
import { useNavigate } from 'react-router-dom';
import DropDown from '@/components/ui/Dropdown';
import useDebounce from '@/hooks/ui/useDebounce';
import { useStudent } from '@/hooks/api/useQueryStudent';
import { Icon } from '@iconify/react';
import useGroupStudent from '@/hooks/api/useQueryGroupStudent';

const DROP_VALUE = [
  {
    _id: 'studentName',
    name: 'Tên sinh viên',
  },
  {
    _id: 'groupName',
    name: 'Nhóm sinh viên',
  },
];
function AddGroupStudentToTopicModal(props: any) {
  const { onClose, open, topic } = props;
  const [searchField, setSearchField] = useState(DROP_VALUE[0]?._id);
  const [keywords, setKeywords] = useState('');
  const keysend = useDebounce(keywords, 500);
  const [students, setStudents] = useState([]);
  const { handleGetStudentsAssignTopic } = useStudent();
  const { onAssignTopicGroupStudent } = useGroupStudent();
  const { mutate: assign, isSuccess: successAssign } = onAssignTopicGroupStudent(topic.id);
  const {
    data: fetchStudents,
    isLoading: loadingStudents,
    isFetching: fetchingStudents,
  } = handleGetStudentsAssignTopic(keysend, searchField);
  const hanldeSubmit = () => {
    assign(students[0]?.groupId);
  };
  useEffect(() => {
    if (successAssign === true) {
      onClose();
    }
  }, [successAssign]);

  const handleStudents = (std: any) => {
    let data = [];
    if (searchField === 'studentName') {
      setKeywords(std.groupName);
      setSearchField('groupName');
    } else data = fetchStudents.students.filter((std2: any) => std.groupId === std2.groupId);
    setStudents(data);
  };

  useEffect(() => {
    setStudents([]);
  }, [searchField]);

  useEffect(() => {
    setStudents([]);
    setKeywords('');
  }, [open]);

  const navigate = useNavigate();
  return (
    <Modal maxWidth='xl' open={open} onClose={onClose}>
      <Paper sx={{ px: 10, py: 4 }}>
        <TitleManager textTransform={'uppercase'}>Gán đề tài cho nhóm sinh viên</TitleManager>
        <Box gap={20} display={'flex'} my={10}>
          {' '}
          <Box width={'40%'}>
            <TitleManager color={'grey.700'} variant='body1' mb={4} textTransform={'uppercase'}>
              Danh sách sinh viên - Nhóm sinh viên
            </TitleManager>
            <Box width={'100%'}>
              <>
                <Box display={'flex'} gap={4}>
                  <DropDown
                    onChange={(e: any) => {
                      setSearchField(e.target.value);
                    }}
                    value={searchField}
                    options={DROP_VALUE}
                  />
                  <Box width={'100%'}>
                    <CustomTextField
                      fullWidth
                      value={keywords}
                      onChange={(e: any) => {
                        setKeywords(e.target.value);
                      }}
                      onBlur={(e: any) => {
                        setKeywords(e.target.value);
                      }}
                      placeholder={`Nhập vào tên sinh viên,tên nhóm sinh viên ....`}
                    />
                  </Box>
                </Box>
                <Typography
                  textTransform={'uppercase'}
                  mt={6}
                  mb={4}
                  variant='body1'
                  fontWeight={'bold'}
                >
                  Thông tin {searchField === 'groupName' ? 'Nhóm sinh viên' : 'Sinh viên'}
                </Typography>
                <Box sx={{ height: 400, bgcolor: 'grey.50', px: 6, overflowY: 'auto' }}>
                  <Box sx={{ height: 'auto' }}>
                    <Box>
                      {fetchingStudents || loadingStudents ? (
                        <Box
                          display={'flex'}
                          alignItems={'center'}
                          justifyContent={'center'}
                          height={300}
                          width={'100%'}
                        >
                          <CircularProgress />
                        </Box>
                      ) : (
                        <>
                          {fetchStudents?.students.length < 1 || keysend === '' ? (
                            <Box
                              height={300}
                              display={'flex'}
                              flexDirection={'column'}
                              justifyContent={'center'}
                              alignItems={'center'}
                            >
                              <Box>
                                <Icon
                                  icon='material-symbols-light:search'
                                  width={100}
                                  style={{ color: '#b7b7b8' }}
                                />
                              </Box>
                              <Typography
                                my={10}
                                textAlign={'center'}
                                variant='body1'
                                color='initial'
                              >
                                Chưa chọn sinh viên (nhóm sinh viên) nào...
                              </Typography>
                            </Box>
                          ) : (
                            <Box>
                              {fetchStudents?.students.map((std: any) => (
                                <Paper
                                  sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    p: 3,
                                    borderRadius: 2,
                                    boxShadow: 1,
                                    mt: 4,
                                  }}
                                >
                                  {std.groupId !== null ? (
                                    <Box
                                      py={2}
                                      flexDirection={'column'}
                                      display={'flex'}
                                      width={'100%'}
                                      border={'2px solid #d8d6d6'}
                                      px={10}
                                    >
                                      <Typography
                                        variant='body1'
                                        component='div'
                                        gutterBottom
                                        sx={{ fontWeight: 'bold', my: 2 }}
                                      >
                                        {std.studentName}
                                      </Typography>

                                      <Box>
                                        <Typography mb={2} variant='body1' color='text.primary'>
                                          <strong>Mã sinh viên </strong> {std.username}
                                        </Typography>
                                        <Typography variant='body1' color='primary.dark'>
                                          {std.groupName}
                                        </Typography>
                                      </Box>
                                      <Box justifyContent={'end'} display={'flex'}>
                                        <Box>
                                          <Button
                                            onClick={() => handleStudents(std)}
                                            color={
                                              searchField === 'groupName' ? 'success' : 'primary'
                                            }
                                          >
                                            {searchField === 'groupName'
                                              ? 'Chọn sinh viên nhóm này'
                                              : 'Truy cập nhóm sinh viên này'}
                                          </Button>
                                        </Box>
                                      </Box>
                                    </Box>
                                  ) : (
                                    <>
                                      <Box
                                        width={'100%'}
                                        justifyContent={'space-between'}
                                        display={'flex'}
                                        border={'2px solid #d8d6d6'}
                                        borderRadius={2}
                                        px={6}
                                        py={10}
                                      >
                                        <Box>
                                          <Typography
                                            variant='body1'
                                            component='div'
                                            gutterBottom
                                            sx={{ fontWeight: 'bold', my: 2 }}
                                          >
                                            {std.studentName}
                                          </Typography>
                                          <Box display={'flex'} gap={10}>
                                            <Typography mb={2} variant='body1' color='text.primary'>
                                              <strong>Mã sinh viên </strong> {std.username}
                                            </Typography>
                                            <Typography variant='body1' color='primary.dark'>
                                              {std.groupName}
                                            </Typography>
                                          </Box>
                                          <Typography
                                            mb={4}
                                            textAlign={'center'}
                                            variant='body1'
                                            color='initial'
                                          >
                                            Sinh viên này chưa có nhóm.
                                          </Typography>
                                        </Box>
                                        <Box justifyContent={'end'} display={'flex'}>
                                          <Box>
                                            <Button
                                              onClick={() => navigate('/group-students')}
                                              color='primary'
                                            >
                                              {' '}
                                              Cập nhật nhóm
                                            </Button>
                                          </Box>
                                        </Box>
                                      </Box>
                                    </>
                                  )}
                                </Paper>
                              ))}
                            </Box>
                          )}
                        </>
                      )}
                    </Box>
                  </Box>
                </Box>
              </>
            </Box>
          </Box>
          <Box width={'60%'}>
            <>
              <TitleManager color={'grey.700'} variant='body1' mb={4} textTransform={'uppercase'}>
                Thông tin đề tài
              </TitleManager>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  px: 10,
                  py: 6,
                  margin: 'auto',
                  borderRadius: 1,
                  boxShadow: 1,
                }}
              >
                <Typography variant='h6' component='div' sx={{ fontWeight: 'bold' }}>
                  Đề tài: {topic.name}
                </Typography>
                <Divider />
                <Box
                  sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                >
                  <Typography variant='body1' sx={{ fontWeight: 'medium' }}>
                    Tên Giảng viên:
                  </Typography>
                  <Typography variant='body1'>{topic.fullName}</Typography>
                </Box>
                <Box
                  sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                >
                  <Typography variant='body1' sx={{ fontWeight: 'medium' }}>
                    Số nhóm đã đăng ký:
                  </Typography>
                  <Typography variant='body1'>{topic.quantityGroup}</Typography>
                </Box>
                <Box
                  sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                >
                  <Typography variant='body1' sx={{ fontWeight: 'medium' }}>
                    Số nhóm đăng ký tối đa:
                  </Typography>
                  <Typography variant='body1'>{topic.quantityGroupMax}</Typography>
                </Box>
                <Box
                  sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                >
                  <Typography variant='body1' sx={{ fontWeight: 'medium' }}>
                    Trạng thái:
                  </Typography>
                  <Typography variant='body1'>{getCardTopicStatus(topic.status)}</Typography>
                </Box>
              </Box>
            </>
            <Box>
              <TitleManager
                mt={10}
                color={'grey.700'}
                variant='body1'
                mb={4}
                textTransform={'uppercase'}
              >
                Thông tin nhóm sinh viên được phân
              </TitleManager>
              <Box>
                {students.length < 1 ? (
                  <Box
                    alignItems={'center'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    display={'flex'}
                  >
                    <img width={200} src='/images/nodata.webp' />
                    Chưa chọn nhóm sinh viên nào...
                  </Box>
                ) : (
                  <Box bgcolor={'grey.50'} py={10} px={4}>
                    <Typography
                      variant='body1'
                      sx={{ fontWeight: 'bold', my: 4 }}
                      color='primary.dark'
                    >
                      {students[0].groupName}
                    </Typography>
                    <Box display={'flex'} gap={10}>
                      {students.map((std) => (
                        <Box>
                          <Typography variant='h6' component='div' gutterBottom>
                            {std.studentName}
                          </Typography>
                          <Box display={'flex'} gap={10}>
                            <Typography mb={2} variant='body1' color='text.primary'>
                              <strong>Mã sinh viên </strong> {std.username}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}
              </Box>
              <Box display={'flex'} gap={4} justifyContent={'end'} mt={20}>
                <Button onClick={hanldeSubmit} variant='contained' color='error'>
                  {' '}
                  Gán đề tài cho nhóm sinh viên
                </Button>
                <Button variant='contained' onClick={onClose}>
                  Thoát
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
}
export default AddGroupStudentToTopicModal;
