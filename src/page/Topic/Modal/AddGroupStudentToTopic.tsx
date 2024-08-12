import Modal from '@/components/ui/Modal';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
import { Link, useNavigate } from 'react-router-dom';
import DropDown from '@/components/ui/Dropdown';
import useDebounce from '@/hooks/ui/useDebounce';
import { useStudent } from '@/hooks/api/useQueryStudent';
import { Icon } from '@iconify/react';
import useGroupStudent from '@/hooks/api/useQueryGroupStudent';
import { useTopic } from '@/hooks/api/useQueryTopic';
import { GridExpandMoreIcon } from '@mui/x-data-grid';

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
  const { hanldeGetGroupsByTopic } = useTopic();
  const {
    data: groupFetch,
    isLoading: loadingGroups,
    isSuccess: successGroup,
  } = hanldeGetGroupsByTopic(topic.id);
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
  const onClear = () => {
    setStudents([]);
  };
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
                id='De-tai'
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
            <Paper sx={{ px: 10, py: 4, mt: 4, minHeight: 300 }}>
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
                {loadingGroups ? (
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    height={500}
                  >
                    <CircularProgress />
                  </Box>
                ) : (
                  <>
                    {successGroup &&
                    groupFetch?.groupStudents &&
                    groupFetch?.groupStudents.length < 1 ? (
                      <Box gap={10} display={'flex'}>
                        <Box width={'50%'} id='to-assign-section'>
                          {students && students.length > 0 ? (
                            <>
                              <Box
                                height={150}
                                bgcolor={'white'}
                                border={'2px solid #f3f3f3'}
                                borderRadius={4}
                              >
                                <Typography
                                  variant='body1'
                                  sx={{ fontWeight: '500', px: 10, py: 4, bgcolor: 'error.dark' }}
                                  color='white'
                                >
                                  {students[0].groupName}
                                </Typography>
                                <Box px={10} display={'flex'} gap={10}>
                                  {students?.map((std) => (
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
                            </>
                          ) : (
                            <Box
                              width={'100%'}
                              minHeight={140}
                              alignItems={'center'}
                              flexDirection={'column'}
                              justifyContent={'center'}
                              display={'flex'}
                              fontSize={14}
                            >
                              <Icon
                                icon='ic:round-group-add'
                                width={120}
                                style={{ color: '#f9eded' }}
                              />
                              Chọn nhóm sinh viên muốn phân mới
                            </Box>
                          )}
                          <Box mt={2}>
                            <Button
                              sx={{ mt: 4, mx: 2 }}
                              size='small'
                              disabled={students && students.length < 1}
                              onClick={hanldeSubmit}
                              variant='contained'
                              color='error'
                            >
                              {' '}
                              <Icon icon='icon-park-outline:add-two' style={{ marginRight: 2 }} />
                              Gán đề tài
                            </Button>
                            <Button
                              onClick={onClear}
                              variant='contained'
                              color='primary'
                              sx={{ mt: 4, ml: 2 }}
                              size='small'
                            >
                              <Icon icon='iconamoon:close-fill' style={{ marginRight: 1 }} />
                              Hủy
                            </Button>
                          </Box>
                        </Box>
                        <Box
                          alignItems={'center'}
                          flexDirection={'column'}
                          justifyContent={'center'}
                          display={'flex'}
                        >
                          <img width={100} src='/images/nodata.webp' />
                          Danh sách nhóm sinh viên được phân trống
                        </Box>
                      </Box>
                    ) : (
                      <Box gap={10} display={'flex'}>
                        <Box width={'50%'} id='to-assign-section'>
                          {students && students.length > 0 ? (
                            <>
                              <Box
                                height={150}
                                bgcolor={'white'}
                                border={'2px solid #f3f3f3'}
                                borderRadius={4}
                              >
                                <Typography
                                  variant='body1'
                                  sx={{ fontWeight: '500', px: 10, py: 4, bgcolor: 'error.dark' }}
                                  color='white'
                                >
                                  {students[0].groupName}
                                </Typography>
                                <Box px={10} display={'flex'} gap={10}>
                                  {students?.map((std) => (
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
                            </>
                          ) : (
                            <Box
                              width={'100%'}
                              alignItems={'center'}
                              flexDirection={'column'}
                              justifyContent={'center'}
                              display={'flex'}
                              fontSize={14}
                            >
                              <Icon
                                icon='icon-park-outline:hand-left'
                                width={100}
                                style={{ color: '#f9eded' }}
                              />
                              Chọn nhóm sinh viên muốn phân mới
                            </Box>
                          )}
                          <Box>
                            <Button
                              sx={{ mt: 4, mx: 2 }}
                              size='small'
                              disabled={students && students.length < 1}
                              onClick={hanldeSubmit}
                              variant='contained'
                              color='error'
                            >
                              {' '}
                              <Icon icon='icon-park-outline:add-two' style={{ marginRight: 2 }} />
                              Gán đề tài
                            </Button>
                            <Button
                              onClick={onClear}
                              variant='contained'
                              color='primary'
                              sx={{ mt: 4, ml: 2 }}
                              disabled={students && students.length < 1}
                              size='small'
                            >
                              <Icon icon='iconamoon:close-fill' style={{ marginRight: 1 }} />
                              Hủy gán
                            </Button>
                          </Box>
                        </Box>

                        <Box id='have-group-section'>
                          {groupFetch?.groupStudents.map((group) => (
                            <Box width={350} my={2}>
                              <Accordion
                                disableGutters
                                sx={{
                                  p: 0,

                                  '&.Mui-expanded': {
                                    minHeight: 0,
                                    margin: 0,
                                  },
                                }}
                              >
                                <AccordionSummary
                                  expandIcon={<GridExpandMoreIcon sx={{ color: '#fffff' }} />}
                                  sx={{
                                    bgcolor: '#848484',
                                    '&.Mui-expanded': {
                                      minHeight: 0,
                                      margin: 0,
                                    },
                                  }}
                                >
                                  <Box
                                    width={'100%'}
                                    justifyContent={'space-between'}
                                    display={'flex'}
                                  >
                                    <Typography color='white'>{group.name}</Typography>
                                  </Box>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Box display={'flex'} justifyContent={'space-between'}>
                                    <Box pl={4} mb={4}>
                                      {group.members.map((std: any) => (
                                        <Typography variant='body1'>
                                          {std.fullName} - {std.username}
                                        </Typography>
                                      ))}
                                      <Link
                                        style={{ fontSize: 12 }}
                                        to={`/group-students/detail/${group.id}`}
                                      >
                                        Xem chi tiết
                                      </Link>
                                    </Box>
                                    <Box flexDirection={'column'} display={'flex'}>
                                      <Button sx={{ mr: 2 }} color='error'>
                                        <Icon
                                          icon='zondicons:close-solid'
                                          style={{ color: '#e24646', marginRight: 2 }}
                                        />
                                        {'  '}Hủy gán
                                      </Button>
                                    </Box>
                                  </Box>
                                </AccordionDetails>
                              </Accordion>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    )}{' '}
                  </>
                )}
              </Box>
            </Paper>
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
}
export default AddGroupStudentToTopicModal;
